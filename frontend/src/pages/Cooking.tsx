import React, { useState, Dispatch, SetStateAction } from 'react';
import Footer from '../components/Footer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Backend URL configuration - allows for easy switching between environments
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Sample recipe data to show before a user selects something
const sampleRecipes = [
    { id: 'r8XuBXT_SlA', title: 'Easy Hummus', category: 'Middle Eastern', time: '15 min', difficulty: 'Easy' },
    { id: 'QQfaL3Jjdew', title: 'Spaghetti Carbonara', category: 'Italian', time: '30 min', difficulty: 'Medium' },
    { id: 'L0oKJpGI4Yg', title: 'Chicken Curry', category: 'Indian', time: '45 min', difficulty: 'Medium' },
    { id: 'DkWYQgCTNkU', title: 'Chocolate Cake', category: 'Dessert', time: '60 min', difficulty: 'Medium' },
    { id: 't5DNoGO26lM', title: 'Knoblauch Hummus', category: 'Middle Eastern', time: '10 min', difficulty: 'Easy' },
];

interface CookingProps {
    youtubeUrl: string;
    setYoutubeUrl: Dispatch<SetStateAction<string>>;
}

const Cooking: React.FC<CookingProps> = ({ youtubeUrl, setYoutubeUrl }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [recipeData, setRecipeData] = useState<{
        videoId: string;
        title: string;
        ingredients: string[];
        instructions: string[];
        source_url?: string;
    } | null>(null);
    const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

    // Function to fetch recipe data from the backend
    const fetchRecipeData = async (videoUrl: string) => {
        try {
            setIsLoading(true);
            setError('');

            // Extract video ID from YouTube URL
            const videoId = extractYoutubeVideoId(videoUrl);
            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            console.log('Extracted video ID:', videoId);

            // First try to load from local recipes folder
            try {
                const recipeResponse = await fetch(`/recipes/recipe_${videoId}.json`);
                const ingredientsResponse = await fetch(`/recipes/ingredients_${videoId}.json`);

                if (recipeResponse.ok && ingredientsResponse.ok) {
                    const recipeData = await recipeResponse.json();
                    const ingredientsData = await ingredientsResponse.json();

                    setRecipeData({
                        videoId,
                        title: recipeData.metadata?.title || 'Recipe',
                        ingredients: ingredientsData.ingredients || [],
                        instructions: recipeData.instructions || [],
                        source_url: videoUrl
                    });

                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.log('Local recipe not found, trying Supabase...');
            }

            // Then check if we already have this recipe in our database
            const { data: existingRecipe } = await supabase
                .from('recipes')
                .select('*')
                .eq('video_id', videoId)
                .single();

            if (existingRecipe) {
                // Recipe already exists, fetch it
                setRecipeData({
                    videoId,
                    title: existingRecipe.title || 'Recipe',
                    ingredients: existingRecipe.ingredients || [],
                    instructions: existingRecipe.instructions || [],
                    source_url: videoUrl
                });
            } else {
                // Call backend API to extract recipe
                console.log('Calling backend API with URL:', videoUrl);
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

                    const response = await fetch(`${BACKEND_URL}/extract-recipe?url=${encodeURIComponent(videoUrl)}`, {
                        method: 'GET',
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`Failed to extract recipe: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('Backend response:', data);

                    // Format the received data
                    setRecipeData({
                        videoId,
                        title: data.metadata?.title || 'Recipe',
                        ingredients: data.ingredients || [],
                        instructions: data.instructions || [],
                        source_url: videoUrl
                    });
                } catch (error) {
                    console.error('Backend API error:', error);
                    if (error instanceof DOMException && error.name === 'AbortError') {
                        throw new Error('Request timed out. The backend server may be unavailable.');
                    } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                        throw new Error('Network error: Unable to connect to the backend server. Make sure it is running at ' + BACKEND_URL);
                    } else {
                        throw error;
                    }
                }
            }
        } catch (err) {
            console.error('Error fetching recipe:', err);
            setError(`Failed to extract recipe: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to extract YouTube video ID from URL
    const extractYoutubeVideoId = (url: string): string | null => {
        try {
            // Handle various YouTube URL formats
            let videoId = null;

            // For standard URLs: https://www.youtube.com/watch?v=VIDEO_ID
            if (url.includes('youtube.com/watch')) {
                const urlObj = new URL(url);
                videoId = urlObj.searchParams.get('v');
            }
            // For shortened URLs: https://youtu.be/VIDEO_ID
            else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
            }
            // For embed URLs: https://www.youtube.com/embed/VIDEO_ID
            else if (url.includes('youtube.com/embed/')) {
                videoId = url.split('youtube.com/embed/')[1]?.split(/[?#]/)[0];
            }
            // For short format: https://youtube.com/shorts/VIDEO_ID
            else if (url.includes('youtube.com/shorts/')) {
                videoId = url.split('youtube.com/shorts/')[1]?.split(/[?#]/)[0];
            }

            console.log('Extracted videoId:', videoId);

            // Return the extracted ID if it's non-empty and a valid ID (alphanumeric with some special chars, typically 11 chars)
            return videoId && /^[\w-]{11}$/.test(videoId) ? videoId : null;
        } catch (error) {
            console.error('Error extracting YouTube video ID:', error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (youtubeUrl) {
            fetchRecipeData(youtubeUrl);
        }
    };

    // Handle selecting a sample recipe
    const handleSelectRecipe = async (recipeId: string) => {
        try {
            setIsLoading(true);
            setError('');

            // First try to load from local recipes folder
            try {
                const recipeResponse = await fetch(`/recipes/recipe_${recipeId}.json`);
                const ingredientsResponse = await fetch(`/recipes/ingredients_${recipeId}.json`);

                if (recipeResponse.ok && ingredientsResponse.ok) {
                    const recipeData = await recipeResponse.json();
                    const ingredientsData = await ingredientsResponse.json();

                    setRecipeData({
                        videoId: recipeId,
                        title: recipeData.metadata?.title || 'Recipe',
                        ingredients: ingredientsData.ingredients || [],
                        instructions: recipeData.instructions || [],
                        source_url: recipeData.source_url
                    });

                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.log('Local recipe not found, trying Supabase...');
            }

            // Then check if we have this recipe in Supabase
            const { data: recipeDetails } = await supabase
                .from('recipes')
                .select('*')
                .eq('video_id', recipeId)
                .single();

            if (recipeDetails) {
                setRecipeData({
                    videoId: recipeId,
                    title: recipeDetails.title || 'Recipe',
                    ingredients: recipeDetails.ingredients || [],
                    instructions: recipeDetails.instructions || [],
                    source_url: recipeDetails.source_url
                });
            } else {
                // Fallback to sample data
                const recipe = sampleRecipes.find(r => r.id === recipeId);
                if (recipe) {
                    // Construct a YouTube URL
                    const youtubeUrl = `https://www.youtube.com/watch?v=${recipeId}`;
                    setYoutubeUrl(youtubeUrl);
                    fetchRecipeData(youtubeUrl);
                }
            }
        } catch (err) {
            console.error('Error selecting recipe:', err);
            setError('Failed to load the selected recipe.');
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle ingredient checked state
    const toggleIngredient = (ingredient: string) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [ingredient]: !prev[ingredient]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <main className="container mx-auto px-4 py-6 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Cooking Mode</h1>

                {!recipeData ? (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Start Cooking</h2>

                        {/* Recipe Selection */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3">Choose a recipe:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sampleRecipes.map(recipe => (
                                    <div
                                        key={recipe.id}
                                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                                        onClick={() => handleSelectRecipe(recipe.id)}
                                    >
                                        <h4 className="font-medium">{recipe.title}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                {recipe.category}
                                            </span>
                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                                {recipe.time}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                {recipe.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* YouTube URL Input */}
                        <div>
                            <h3 className="font-medium text-gray-700 mb-3">Or enter a YouTube recipe URL:</h3>
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                                <input
                                    type="text"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Get Recipe'}
                                </button>
                            </form>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">{recipeData.title}</h2>

                            {/* YouTube Video Embed */}
                            <div className="mb-6">
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${recipeData.videoId}`}
                                        title={recipeData.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ingredients */}
                                <div>
                                    <h3 className="font-semibold text-lg border-b border-gray-200 pb-2 mb-4">Ingredients</h3>
                                    <ul className="space-y-2">
                                        {recipeData.ingredients.map((ingredient, index) => (
                                            <li key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-green-600 rounded"
                                                    checked={!!checkedIngredients[ingredient]}
                                                    onChange={() => toggleIngredient(ingredient)}
                                                />
                                                <span className={`ml-2 ${checkedIngredients[ingredient] ? 'line-through text-gray-400' : ''}`}>
                                                    {ingredient}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h3 className="font-semibold text-lg border-b border-gray-200 pb-2 mb-4">Steps</h3>
                                    <ol className="space-y-4">
                                        {recipeData.instructions.map((step, index) => (
                                            <li key={index} className="flex">
                                                <span className="bg-green-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <p>{step}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            {/* Back button */}
                            <div className="mt-8 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setRecipeData(null);
                                        setYoutubeUrl('');
                                        setError('');
                                        setCheckedIngredients({});
                                    }}
                                    className="text-gray-600 hover:text-gray-800 flex items-center transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Back to recipe selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cooking;