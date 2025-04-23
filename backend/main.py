import os
import sys
import argparse
import time
import requests
import json
import re
from urllib.parse import urlparse, parse_qs
import yt_dlp
import googlesearch
from recipe_extractor import HuggingFaceAPIProcessor
from flask import Flask, request, jsonify
from flask_cors import CORS

class LoggingManager:
    """Class for logging progress and updating the user during recipe extraction"""
    
    @staticmethod
    def start_task(task_name):
        """Start a new task and print its name"""
        print(f"\n[STARTED] {task_name}")
        return time.time()
    
    @staticmethod
    def update_task(message):
        """Update the current task with progress information"""
        print(f"  → {message}")
    
    @staticmethod
    def finish_task(task_name, start_time):
        """Finish a task and print the time taken"""
        elapsed = time.time() - start_time
        print(f"[COMPLETED] {task_name} (took {elapsed:.2f} seconds)")

class VideoTranscriptExtractor:
    """Class for extracting transcripts from videos across multiple platforms"""
    
    @staticmethod
    def is_supported_url(url):
        """Check if the URL is from a supported platform"""
        domain = urlparse(url).netloc.lower()
        return any(platform in domain for platform in ['youtube', 'youtu.be', 'instagram', 'tiktok'])
    
    @staticmethod
    def identify_platform(url):
        """Identify which platform the URL is from"""
        domain = urlparse(url).netloc.lower()
        if any(platform in domain for platform in ['youtube', 'youtu.be']):
            return "youtube"
        elif 'instagram' in domain:
            return "instagram"
        elif 'tiktok' in domain:
            return "tiktok"
        else:
            return "unknown"
    
    @staticmethod
    def extract_video_id(url):
        """Extract video ID from URL across different platforms"""
        platform = VideoTranscriptExtractor.identify_platform(url)
        
        if platform == "youtube":
            if 'youtube.com/shorts/' in url:
                video_id = url.split('youtube.com/shorts/')[1].split('?')[0]
            elif 'youtu.be/' in url:
                video_id = url.split('youtu.be/')[1].split('?')[0]
            elif 'youtube.com/watch' in url:
                parsed_url = urlparse(url)
                video_id = parse_qs(parsed_url.query)['v'][0]
            else:
                raise ValueError("Unsupported YouTube URL format")
            return video_id
        
        # For Instagram and TikTok, we'll just return the full URL as ID
        # as we'll use yt-dlp to download these anyway
        return url
    
    @staticmethod
    def check_video_description(url):
        """Check if the video description already contains the recipe (for any platform)"""
        try:
            # Use yt-dlp to get metadata including description
            with yt_dlp.YoutubeDL({'quiet': True}) as ydl:
                info = ydl.extract_info(url, download=False)
                title = info.get('title', '')
                description = info.get('description', '')
                
                if not description:
                    return None, title, None
                
                # Check if the description has ingredient lists or recipe-like content
                recipe_indicators = ['ingredients', 'instructions', 'recipe', 'method', 'steps', 
                                    'cups', 'tbsp', 'tablespoon', 'teaspoon', 'tsp', 'grams', 'oz',
                                    'ounces', 'pinch', 'dash', 'ml', 'lb', 'pound']
                
                # Look for recipe indicators in the description
                has_recipe = any(indicator in description.lower() for indicator in recipe_indicators)
                
                if has_recipe:
                    platform = VideoTranscriptExtractor.identify_platform(url)
                    print(f"Recipe found in {platform} video description!")
                    return description, title, "description"
                else:
                    # Return the description anyway, it might be useful as context
                    return None, title, description
        except Exception as e:
            print(f"Error checking video description: {str(e)}")
            return None, "Unknown recipe", None
    
    @staticmethod
    def search_recipe_online(title, platform):
        """Search for a recipe online based on video title"""
        try:
            search_query = f"{title} recipe"
            print(f"Searching online for: {search_query}")
            
            # Use Google search
            search_results = list(googlesearch.search(search_query, num_results=3))
            
            if search_results:
                recipe_context = f"Based on searching for '{search_query}', found these potential sources:\n"
                for idx, result in enumerate(search_results):
                    recipe_context += f"{idx+1}. {result}\n"
                recipe_context += f"\nThis appears to be a recipe video from {platform} with title: {title}. Please extract the recipe based on typical recipes with this title."
                return recipe_context
            else:
                return None
        except Exception as e:
            print(f"Error searching for recipe online: {str(e)}")
            return None
    
    @staticmethod
    def download_video_transcript(url, api_key):
        """Get transcript from video using multiple fallback methods with clear priority"""
        platform = VideoTranscriptExtractor.identify_platform(url)
        source_type = "unknown"
        
        # Priority 1: Check video description for all platforms
        description, title, description_context = VideoTranscriptExtractor.check_video_description(url)
        if description:
            print(f"Using recipe found in {platform} video description (PRIMARY SOURCE)")
            source_type = "description"
            return description, source_type, title
        
        # Priority 2: Transcribe the video content directly
        try:
            print(f"Attempting to transcribe {platform} video content (SECONDARY SOURCE)")
            # Try the API endpoint directly with the video URL
            API_URL = "https://api-inference.huggingface.co/models/distil-whisper/distil-large-v2"
            headers = {"Authorization": f"Bearer {api_key}"}
            
            payload = {
                "inputs": url,
                "use_yt_dlp": True
            }
            
            response = requests.post(API_URL, headers=headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                transcript = result.get('text', '')
                if transcript and len(transcript) > 30:  # Make sure it's meaningful content
                    print(f"Successfully transcribed {platform} video content")
                    source_type = "video_transcription"
                    return transcript, source_type, title
                else:
                    print(f"Transcription too short or empty, trying alternative methods")
            else:
                print(f"API returned status code {response.status_code}, trying alternative methods")
        except Exception as e:
            print(f"Direct API transcription failed: {str(e)}. Trying alternative methods...")
        
        # Priority 2b: Use yt-dlp to download audio and then transcribe if direct API failed
        try:
            print(f"Downloading {platform} video audio for transcription")
            # Create a temporary directory for the audio file
            temp_audio_file = f"temp_audio_{int(time.time())}.mp3"
            
            # Download with yt-dlp (works for YouTube, Instagram, TikTok)
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': temp_audio_file,
                'quiet': True,
                'no_warnings': True,
                'extractaudio': True,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
            }
            
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=True)
                    # If we get here, the file was downloaded
            except Exception as e:
                print(f"Download failed: {str(e)}. Moving to fallback methods...")
                
            # If the file exists, transcribe it
            if os.path.exists(temp_audio_file):
                try:
                    # Call the API with the audio file
                    API_URL = "https://api-inference.huggingface.co/models/distil-whisper/distil-large-v2"
                    headers = {"Authorization": f"Bearer {api_key}"}
                    
                    with open(temp_audio_file, 'rb') as f:
                        response = requests.post(API_URL, headers=headers, data=f)
                    
                    if response.status_code == 200:
                        result = response.json()
                        transcript = result.get('text', '')
                        if transcript and len(transcript) > 30:
                            # Clean up the temp file
                            try:
                                os.remove(temp_audio_file)
                            except:
                                pass
                            print(f"Successfully transcribed downloaded audio")
                            source_type = "video_transcription"
                            return transcript, source_type, title
                except Exception as file_e:
                    print(f"File transcription failed: {str(file_e)}")
                
                # Clean up regardless of success
                try:
                    os.remove(temp_audio_file)
                except:
                    pass
        except Exception as dl_e:
            print(f"Audio extraction failed: {str(dl_e)}")
        
        # Priority 3: Use video metadata as context with description
        if description_context:
            context = f"Video title: {title}\n\nDescription: {description_context}\n\n"
            context += f"This appears to be a recipe video from {platform}. Please extract the recipe based on the title and description."
            print(f"Using video metadata as context (FALLBACK 1)")
            source_type = "metadata"
            return context, source_type, title
            
        # Priority 4: Search online (last resort)
        if title and title != "Unknown recipe":
            print(f"Searching online for recipe based on video title (LAST RESORT)")
            online_recipe = VideoTranscriptExtractor.search_recipe_online(title, platform)
            if online_recipe:
                source_type = "internet_search"
                return online_recipe, source_type, title
        
        # Final fallback: Just return a generic context based on the URL
        platform_name = platform.capitalize()
        generic_msg = f"This is a {platform_name} recipe video with URL: {url}. Please extract a possible recipe based on typical recipes shown on {platform_name}."
        source_type = "generic_fallback"
        return generic_msg, source_type, title

class RecipeExtractor:
    """Main class for extracting recipes from videos across platforms"""
    
    def __init__(self, api_key=None):
        """Initialize with Hugging Face API key"""
        self.api_key = api_key or os.environ.get('HF_API_KEY', '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')
        self.ai_processor = HuggingFaceAPIProcessor(self.api_key)
        self.logger = LoggingManager()
    
    def extract_from_url(self, url):
        """Extract recipe from a video URL"""
        if not VideoTranscriptExtractor.is_supported_url(url):
            raise ValueError("URL not supported. Currently only YouTube, Instagram, and TikTok links are supported.")
        
        # Start the overall process
        platform = VideoTranscriptExtractor.identify_platform(url)
        self.logger.update_task(f"Processing {platform} video URL: {url}")
        print(f"Starting recipe extraction process from {platform} video...")
        overall_start = time.time()
        
        try:
            # Get transcript from the video
            transcript_start = self.logger.start_task(f"Getting transcript from {platform}")
            self.logger.update_task("Downloading and processing video content...")
            transcript, source_type, title = VideoTranscriptExtractor.download_video_transcript(url, self.api_key)
            transcript_words = len(transcript.split())
            self.logger.update_task(f"Transcript acquired ({transcript_words} words)")
            self.logger.finish_task("Transcript acquisition", transcript_start)
            
            # Extract recipe using Hugging Face API
            recipe_start = self.logger.start_task("Extracting recipe from transcript")
            self.logger.update_task("Analyzing transcript content...")
            self.logger.update_task("Using model: mistralai/Mixtral-8x7B-Instruct-v0.1")
            
            # Enhance the prompt to specify what kind of recipe to look for
            recipe_hint = ""
            if "hummus" in url.lower() or "hummus" in transcript.lower():
                recipe_hint = "This appears to be a hummus recipe. "
            
            self.logger.update_task("Identifying ingredients and cooking instructions...")
            recipe = self.ai_processor.extract_recipe(transcript, recipe_hint)
            self.logger.update_task("Recipe extraction completed")
            self.logger.finish_task("Recipe extraction", recipe_start)
            
            # Format the results
            format_start = self.logger.start_task("Formatting results")
            result = {
                "transcript": transcript,
                "recipe": recipe,
                "source_type": source_type,
                "title": title
            }
            self.logger.finish_task("Formatting", format_start)
            
            # Calculate total processing time
            total_time = time.time() - overall_start
            print(f"\nTotal processing time: {total_time:.2f} seconds")
            
            # Print results
            print("\n=== TRANSCRIPT ===")
            print(result["transcript"])
            
            print("\n=== INGREDIENTS ===")
            print(result["recipe"]["ingredients"])
            
            print("\n=== INSTRUCTIONS ===")
            print(result["recipe"]["instructions"])
            
            return result
        except Exception as e:
            print(f"\n[ERROR] Process failed: {str(e)}")
            raise

def process_instructions(instructions_text):
    """Process recipe instructions to ensure clear step-by-step format"""
    if not instructions_text:
        return []
    
    # First, try to split by numbered steps if present
    if re.search(r'^\d+\.', instructions_text, re.MULTILINE):
        # Split by numbered steps
        steps = re.split(r'\n\d+\.|\n\s*\d+\.\s*', instructions_text)
        # Remove empty steps and strip whitespace
        steps = [step.strip() for step in steps if step.strip()]
        if len(steps) > 1:  # If we found at least 2 steps, it worked
            return steps
    
    # If there are no numbered steps, try to split by newlines
    steps = instructions_text.split('\n')
    steps = [step.strip() for step in steps if step.strip()]
    
    # If still not enough steps, try to split by periods (sentences)
    if len(steps) <= 1:
        steps = re.split(r'(?<=[.!?])\s+', instructions_text)
        steps = [step.strip() for step in steps if step.strip()]
    
    # Clean up the steps to remove any remaining numbers, bullets, etc.
    cleaned_steps = []
    for step in steps:
        # Remove numbering at beginning
        step = re.sub(r'^\d+\.\s*', '', step).strip()
        # Remove bullet points
        step = re.sub(r'^[-•*]\s*', '', step).strip()
        if step:
            cleaned_steps.append(step)
    
    return cleaned_steps

def main():
    """Main function for running the recipe extractor"""
    parser = argparse.ArgumentParser(description='Extract recipes from videos.')
    parser.add_argument('--url', type=str, help='URL of the video to extract recipe from')
    parser.add_argument('--api-key', type=str, default="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", 
                        help='Hugging Face API key')
    parser.add_argument('--output-dir', type=str, default="./recipes", 
                        help='Directory to save the output JSON files')
    args = parser.parse_args()
    
    # Get URL from args, prompt the user, or use a default example
    video_url = args.url
    if not video_url:
        video_url = input("Enter a video URL (or press Enter to use the default example): ")
        if not video_url:
            print("No URL provided. Using default example URL.")
            video_url = "https://youtube.com/shorts/6cR7Al-INw4?si=txxxHAsxoZeMkKsE"
    
    # Create extractor and process video
    try:
        print("Starting recipe extraction process...")
        extractor = RecipeExtractor(args.api_key)
        recipe_data = extractor.extract_from_url(video_url)
        
        # Process recipe data for JSON output
        video_id = VideoTranscriptExtractor.extract_video_id(video_url)
        platform = VideoTranscriptExtractor.identify_platform(video_url)
        
        # Create output directory if it doesn't exist
        os.makedirs(args.output_dir, exist_ok=True)
        
        # Prepare ingredients JSON
        ingredients_data = {
            "video_id": video_id,
            "source_url": video_url,
            "ingredients": recipe_data["recipe"]["ingredients"].split('\n')
        }
        
        # Clean up ingredients list (remove bullet points, empty items, etc.)
        cleaned_ingredients = []
        for item in ingredients_data["ingredients"]:
            item = item.strip()
            if item and not item.startswith("**"):  # Skip any markdown formatting
                # Remove bullet points and other common markers
                item = re.sub(r'^[-•*]\s*', '', item).strip()
                cleaned_ingredients.append(item)
        
        ingredients_data["ingredients"] = cleaned_ingredients
        
        # Prepare recipe details JSON
        recipe_details = {
            "video_id": video_id,
            "source_url": video_url,
            "transcript": recipe_data["transcript"],
            "instructions": process_instructions(recipe_data["recipe"]["instructions"]),
            "metadata": {
                "extraction_timestamp": int(time.time()),
                "video_platform": platform,
                "source_type": recipe_data.get("source_type", "unknown"),
                "title": recipe_data.get("title", "")
            }
        }
        
        # For internet search results, add a note about source reliability
        if recipe_data.get("source_type") == "internet_search":
            recipe_details["metadata"]["note"] = "Recipe extracted from internet search results, not directly from video content."
        
        # Clean up instructions list (remove numbering, empty items, etc.)
        cleaned_instructions = []
        for item in recipe_details["instructions"]:
            item = item.strip()
            if item and not item.startswith("**"):  # Skip any markdown formatting
                # Remove numbering
                item = re.sub(r'^\d+\.\s*', '', item).strip()
                cleaned_instructions.append(item)
        
        recipe_details["instructions"] = cleaned_instructions
        
        # Save to JSON files
        ingredients_file = os.path.join(args.output_dir, f"ingredients_{video_id}.json")
        recipe_file = os.path.join(args.output_dir, f"recipe_{video_id}.json")
        
        with open(ingredients_file, 'w', encoding='utf-8') as f:
            json.dump(ingredients_data, f, indent=2)
        
        with open(recipe_file, 'w', encoding='utf-8') as f:
            json.dump(recipe_details, f, indent=2)
        
        print(f"\nRecipe extraction complete!")
        print(f"Source type: {recipe_data.get('source_type', 'unknown')}")
        print(f"Ingredients saved to: {ingredients_file}")
        print(f"Recipe details saved to: {recipe_file}")
        
        # Return successful exit code
        return 0
    except Exception as e:
        print(f"Error: {str(e)}")
        return 1

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow requests from frontend

# Initialize the recipe extractor with API key
API_KEY = os.environ.get('HF_API_KEY', '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')
extractor = None  # Will be initialized on first request

# Flask routes
@app.route('/extract-recipe', methods=['GET'])
def extract_recipe():
    """API endpoint to extract recipe from a video URL"""
    global extractor
    
    # Initialize extractor if needed
    if extractor is None:
        extractor = RecipeExtractor(API_KEY)
    
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    
    try:
        print(f"API request received for URL: {url}")
        recipe_data = extractor.extract_from_url(url)
        
        # Process recipe data for structured response
        video_id = VideoTranscriptExtractor.extract_video_id(url)
        
        # Prepare ingredients list
        ingredients = recipe_data["recipe"]["ingredients"].split('\n')
        cleaned_ingredients = []
        for item in ingredients:
            item = item.strip()
            if item and not item.startswith("**"):
                item = re.sub(r'^[-•*]\s*', '', item).strip()
                cleaned_ingredients.append(item)
        
        # Prepare instructions list
        instructions = process_instructions(recipe_data["recipe"]["instructions"])
        
        # Create response
        response = {
            'video_id': video_id,
            'ingredients': cleaned_ingredients,
            'instructions': instructions,
            'metadata': {
                'title': recipe_data.get('title', 'Recipe'),
                'source_type': recipe_data.get('source_type', 'unknown')
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Run the Flask app if script is executed directly
if __name__ == "__main__":
    # Check if running as API server or command line tool
    if len(sys.argv) > 1 and sys.argv[1] == '--server':
        # Remove the --server argument
        sys.argv.pop(1)
        # Run the Flask app
        print("Starting recipe extraction API server on http://localhost:5000")
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        # Run as command line tool
        sys.exit(main())