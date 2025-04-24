import os
import re
import requests

class HuggingFaceAPIProcessor:
    """Class for processing text using Hugging Face API"""
    
    def __init__(self, api_key=None):
        """Initialize with Hugging Face API key"""
        self.api_key = api_key
        if not self.api_key:
            self.api_key = os.environ.get("HF_API_KEY")
            
        if not self.api_key:
            print("Warning: No Hugging Face API key provided. API calls won't work.")
    
    def extract_recipe(self, transcript, recipe_hint=""):
        """Extract recipe from transcript using Hugging Face's API
        
        Args:
            transcript: The transcript text
            recipe_hint: Optional hint about the recipe type (e.g., "hummus recipe")
        """
        if not self.api_key:
            raise ValueError("Hugging Face API key not provided.")
        
        try:
            # Using Mixtral model via API
            API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
            headers = {"Authorization": f"Bearer {self.api_key}"}
            
            # Create prompt for the model, with optional recipe hint
            hint_text = recipe_hint + " " if recipe_hint else ""
            prompt = {
                "inputs": f"""<s>[INST] You are a helpful assistant that extracts recipes from food video transcripts.
{hint_text}Extract the complete recipe including all ingredients and detailed cooking steps from this food video transcript.
Format your response in two clear sections:
1. "Ingredients:" (as a bullet point list with one ingredient per line)
2. "Instructions:" (as numbered steps with ONE CLEAR ACTION per step, broken down into separate steps)

IMPORTANT: For the instructions, please break down complex steps into individual actions. Each step should focus on a single task to make the recipe easier to follow. Number each step and put each step on a new line.

Here's the transcript:
{transcript}
[/INST]"""
            }
            
            response = requests.post(API_URL, headers=headers, json=prompt)
            result = response.json()
            
            # Check for errors
            if isinstance(result, dict) and "error" in result:
                raise RuntimeError(f"API Error: {result['error']}")
                
            # Extract the generated text
            if isinstance(result, list) and len(result) > 0:
                recipe_text = result[0].get("generated_text", "")
                # Extract part after the instruction
                if "[/INST]" in recipe_text:
                    recipe_text = recipe_text.split("[/INST]")[-1].strip()
            else:
                recipe_text = ""
            
            # Extract ingredients and instructions sections
            ingredients_match = re.search(r'(?:Ingredients:|INGREDIENTS:)(.*?)(?:Instructions:|INSTRUCTIONS:|$)', recipe_text, re.DOTALL)
            instructions_match = re.search(r'(?:Instructions:|INSTRUCTIONS:)(.*?)$', recipe_text, re.DOTALL)
            
            ingredients = ingredients_match.group(1).strip() if ingredients_match else "Could not extract ingredients"
            instructions = instructions_match.group(1).strip() if instructions_match else "Could not extract instructions"
            
            return {
                "ingredients": ingredients,
                "instructions": instructions
            }
            
        except Exception as e:
            raise RuntimeError(f"Recipe extraction failed: {str(e)}")