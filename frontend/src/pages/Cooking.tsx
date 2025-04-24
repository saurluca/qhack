import React, { useState, useRef } from 'react';
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
    { id: 'r8XuBXT_SlA', title: 'Easy Hummus', category: 'Middle Eastern', time: '15 min', difficulty: 'Easy', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 'QQfaL3Jjdew', title: 'Spaghetti Carbonara', category: 'Italian', time: '30 min', difficulty: 'Medium', imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 'L0oKJpGI4Yg', title: 'Chicken Curry', category: 'Indian', time: '45 min', difficulty: 'Medium', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 'DkWYQgCTNkU', title: 'Chocolate Cake', category: 'Dessert', time: '60 min', difficulty: 'Medium', imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 't5DNoGO26lM', title: 'Knoblauch Hummus', category: 'Middle Eastern', time: '10 min', difficulty: 'Easy', imageUrl: 'https://images.unsplash.com/photo-1617734076071-381a8cb41b6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
];

const Cooking: React.FC = () => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
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
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'step-by-step'>('list');
    const instructionRef = useRef<HTMLDivElement>(null);

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

    // Function to navigate to the next instruction step
    const goToNextStep = () => {
        if (recipeData && activeStepIndex < recipeData.instructions.length - 1) {
            setActiveStepIndex(prev => prev + 1);
            // Scroll to the instruction when changing steps
            if (instructionRef.current) {
                instructionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Function to navigate to the previous instruction step
    const goToPrevStep = () => {
        if (activeStepIndex > 0) {
            setActiveStepIndex(prev => prev - 1);
            // Scroll to the instruction when changing steps
            if (instructionRef.current) {
                instructionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Calculate progress percentage for step-by-step mode
    const calculateProgress = () => {
        if (!recipeData || recipeData.instructions.length === 0) return 0;
        return ((activeStepIndex + 1) / recipeData.instructions.length) * 100;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0 relative">
            {/* Modern header with app branding */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                src="/Icons/Logo.svg"
                                alt="App Logo"
                                className="h-8 w-auto mr-2"
                            />
                            <h1 className="text-lg font-bold text-gray-800">
                                {recipeData ? "Cooking Mode" : "Find Recipe"}
                            </h1>
                        </div>

                        {recipeData && (
                            <button
                                onClick={() => {
                                    setRecipeData(null);
                                    setYoutubeUrl('');
                                    setError('');
                                    setCheckedIngredients({});
                                    setActiveStepIndex(0);
                                    setViewMode('list');
                                }}
                                className="text-gray-600 hover:text-gray-800 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-4 flex-grow">
                {!recipeData ? (
                    <div className="space-y-6">
                        {/* Welcoming introduction */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-green-100 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Let's Start Cooking!</h2>
                            </div>
                            <p className="text-sm text-gray-600 ml-11">
                                Choose a recipe from our collection or enter a YouTube recipe URL to get step-by-step cooking instructions.
                            </p>
                        </div>

                        {/* Featured recipes - With visual cards */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Featured Recipes
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {sampleRecipes.map(recipe => (
                                    <div
                                        key={recipe.id}
                                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                                        onClick={() => handleSelectRecipe(recipe.id)}
                                    >
                                        <div className="h-24 bg-gray-200 relative">
                                            <img
                                                src={recipe.imageUrl}
                                                alt={recipe.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                                                <div className="text-white text-xs font-medium">{recipe.time}</div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm truncate">{recipe.title}</h3>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                                                    {recipe.category}
                                                </span>
                                                <span className="text-xs text-gray-500">{recipe.difficulty}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Search by YouTube URL - More prominent */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l-8-4v8l8-4z" />
                                </svg>
                                Find Recipe by YouTube URL
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div className="bg-gray-50 p-2 rounded-lg flex items-center">
                                    <div className="bg-red-100 rounded-full p-1.5 mr-2">
                                        <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                        placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                                        className="flex-1 text-sm border-0 bg-transparent focus:ring-0 outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Extracting Recipe...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Get Recipe
                                        </span>
                                    )}
                                </button>

                                {error && (
                                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                                        <div className="font-medium">Error:</div>
                                        <div>{error}</div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Recipe Details with YouTube Embed */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${recipeData.videoId}`}
                                    title={recipeData.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{recipeData.title}</h2>

                                {/* View mode toggle */}
                                <div className="flex justify-center mt-4 bg-gray-100 p-1 rounded-lg">
                                    <button
                                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        List View
                                    </button>
                                    <button
                                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${viewMode === 'step-by-step' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setViewMode('step-by-step')}
                                    >
                                        Step by Step
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content based on view mode */}
                        {viewMode === 'list' ? (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="flex border-b">
                                    <button className="flex-1 py-2.5 font-medium text-sm text-center text-green-700 border-b-2 border-green-600">
                                        All Steps & Ingredients
                                    </button>
                                </div>

                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Ingredients with checkbox */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Ingredients
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <ul className="space-y-2 max-h-96 overflow-y-auto">
                                                {recipeData.ingredients.map((ingredient, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <div className="flex items-center h-5 mt-0.5">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                                                                checked={!!checkedIngredients[ingredient]}
                                                                onChange={() => toggleIngredient(ingredient)}
                                                            />
                                                        </div>
                                                        <span className={`ml-3 text-sm ${checkedIngredients[ingredient] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                            {ingredient}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Add to shopping list button */}
                                            <button className="w-full mt-3 bg-green-100 text-green-700 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Add Missing Items to Shopping List
                                            </button>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            Steps
                                        </h3>
                                        <ol className="space-y-3 max-h-96 overflow-y-auto list-decimal list-inside">
                                            {recipeData.instructions.map((step, index) => (
                                                <li key={index} className="p-2 hover:bg-gray-50 rounded">
                                                    <span className="ml-1">{step}</span>
                                                </li>
                                            ))}
                                        </ol>

                                        {/* Switch to step-by-step mode button */}
                                        <button
                                            onClick={() => setViewMode('step-by-step')}
                                            className="w-full mt-3 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Start Cooking (Step by Step)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm" ref={instructionRef}>
                                {/* Progress bar */}
                                <div className="p-4 pb-0">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Step {activeStepIndex + 1} of {recipeData.instructions.length}</span>
                                        <span>{Math.round(calculateProgress())}% Complete</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-600"
                                            style={{ width: `${calculateProgress()}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Current step details */}
                                <div className="p-4 pt-3">
                                    <div className="mb-6">
                                        <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">Step {activeStepIndex + 1}</span>
                                        <h3 className="text-lg font-semibold mt-3">
                                            {recipeData.instructions[activeStepIndex]}
                                        </h3>
                                    </div>

                                    {/* Ingredients needed for this step - This would need logic to match ingredients to steps */}
                                    <div className="bg-gray-50 rounded-lg p-3 mb-6">
                                        <h4 className="font-medium text-sm text-gray-700 mb-2">Ingredients Reminder:</h4>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {recipeData.ingredients.slice(0, 3).map((ingredient, index) => (
                                                <li key={index} className="text-xs text-gray-600 flex items-center">
                                                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                                    {ingredient}
                                                </li>
                                            ))}
                                            {recipeData.ingredients.length > 3 && (
                                                <li className="text-xs text-gray-600">
                                                    <button onClick={() => setViewMode('list')} className="text-green-600 hover:underline">
                                                        View all ingredients
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Step navigation */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={goToPrevStep}
                                            disabled={activeStepIndex === 0}
                                            className={`px-4 py-2 rounded-lg border flex items-center text-sm ${activeStepIndex === 0
                                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous
                                        </button>

                                        {activeStepIndex < recipeData.instructions.length - 1 ? (
                                            <button
                                                onClick={goToNextStep}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center text-sm hover:bg-green-700"
                                            >
                                                Next Step
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    // Handle recipe completion
                                                    alert('Congratulations! You completed the recipe.');
                                                    setViewMode('list');
                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center text-sm hover:bg-green-700"
                                            >
                                                Finish Cooking
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Cooking timer FAB */}
            {recipeData && (
                <div className="fixed right-4 bottom-20 z-10">
                    <button
                        className="bg-amber-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-600 transition"
                        onClick={() => alert('Timer functionality would go here')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Cooking;