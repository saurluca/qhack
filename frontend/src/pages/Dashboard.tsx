import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mock data - in a real implementation, this would come from your backend API
const mockNutritionData = {
    weeklyAverage: {
        calories: 2100,
        protein: 75,
        carbs: 240,
        fat: 60,
        fiber: 28,
    },
    recommended: {
        calories: 2000,
        protein: 50,
        carbs: 275,
        fat: 70,
        fiber: 25,
    },
    monthlyStats: {
        protein: {
            current: 150,
            goal: 200,
            topSources: ['lentils', 'eggs', 'tofu'],
            comparison: '+20g',
            achievement: 'Protein Explorer',
            achievementWeeks: 2
        }
    },
    dailyTrack: [
        { day: 'Mon', calories: 1950, carbonFootprint: 4.2 },
        { day: 'Tue', calories: 2200, carbonFootprint: 5.1 },
        { day: 'Wed', calories: 1850, carbonFootprint: 3.5 },
        { day: 'Thu', calories: 2300, carbonFootprint: 6.2 },
        { day: 'Fri', calories: 2100, carbonFootprint: 4.8 },
        { day: 'Sat', calories: 2500, carbonFootprint: 7.1 },
        { day: 'Sun', calories: 1800, carbonFootprint: 3.2 },
    ],
};

const mockCarbonData = {
    weeklyTotal: 34.1, // kg CO2
    weeklyAverage: 4.9, // kg CO2 per day
    sustainableTarget: 3.0, // kg CO2 per day
    topContributors: [
        { name: 'Beef', amount: '500g', impact: 7.2 },
        { name: 'Dairy', amount: '1.5L milk, 200g cheese', impact: 4.8 },
        { name: 'Imported Produce', amount: '1kg', impact: 3.5 },
    ],
    savings: 12.5, // kg CO2 saved this month
};

const mockRecentRecipes = [
    { name: 'Vegetarian Falafel Bowl', calories: 550, carbon: 1.2, type: 'vegetarian' },
    { name: 'Chicken Curry', calories: 620, carbon: 3.8, type: 'non-vegetarian' },
    { name: 'Mediterranean Salad', calories: 320, carbon: 0.9, type: 'vegetarian' },
];

// New mock data for budget tracking
const mockBudgetData = {
    monthlyBudget: 450,
    currentSpent: 325,
    previousMonthSpent: 410,
    savingsThisMonth: 85,
    categoryBreakdown: [
        { category: 'Meat & Fish', amount: 120, percentage: 37, previousMonth: 145 },
        { category: 'Fruits & Vegetables', amount: 95, percentage: 29, previousMonth: 85 },
        { category: 'Dairy & Eggs', amount: 65, percentage: 20, previousMonth: 70 },
        { category: 'Pantry Items', amount: 45, percentage: 14, previousMonth: 60 },
    ],
    expensiveItems: [
        { name: 'Premium Beef Steak', price: 22.95, sustainable: false, alternatives: ['Chicken Breast', 'Plant-based Meat'] },
        { name: 'Imported Cheese Selection', price: 18.50, sustainable: false, alternatives: ['Local Cheeses', 'Plant-based Cheese'] },
        { name: 'Wild-caught Salmon', price: 16.75, sustainable: true, alternatives: [] },
    ],
    smartSavings: [
        { tip: 'Switch to seasonal produce', potentialSavings: 25 },
        { tip: 'Buy pantry staples in bulk', potentialSavings: 15 },
        { tip: 'Replace one meat meal with plant-based', potentialSavings: 20 },
    ]
};

const Dashboard: React.FC = () => {
    const [mainTab, setMainTab] = useState<'sustainability' | 'nutritional' | 'smart-shopping'>('nutritional');
    const [nutritionView, setNutritionView] = useState<'weekly' | 'monthly'>('weekly');
    const [carbonView, setCarbonView] = useState<'overview' | 'details'>('overview');
    const [shoppingView, setShoppingView] = useState<'spending' | 'savings' | 'recommendations'>('spending');

    // Calculate percentage of recommended values
    const calculatePercentage = (actual: number, recommended: number): number => {
        return Math.round((actual / recommended) * 100);
    };

    // Determine color based on percentage
    const getStatusColor = (percentage: number, lowerIsBetter = false): string => {
        if (lowerIsBetter) {
            if (percentage <= 90) return 'bg-green-500';
            if (percentage <= 110) return 'bg-yellow-500';
            return 'bg-red-500';
        } else {
            if (percentage >= 90 && percentage <= 110) return 'bg-green-500';
            if (percentage >= 70 && percentage <= 130) return 'bg-yellow-500';
            return 'bg-red-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <Header />
            <main className="container mx-auto px-4 py-6 flex-grow">
                {/* Delivery Time Banner */}
                <div className="flex justify-between items-center mb-5 text-green-600">
                    <span className="font-medium">Choose your delivery time &gt;</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                
                {/* Monthly Stats Title with Trophy Icon */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    Your stats this month 
                    <span className="ml-2 text-amber-500">🏆</span>
                </h1>

                {/* Illustration */}
                <div className="flex justify-center mb-6">
                    <img 
                        src="/path/to/illustration.png" 
                        alt="Happy shopper with groceries" 
                        className="h-40"
                        style={{ opacity: 0.8 }}
                    />
                </div>

                {/* Main Tab Navigation */}
                <div className="flex justify-center mb-6 space-x-2">
                    <button 
                        className={`px-5 py-2 rounded-full ${mainTab === 'sustainability' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
                        onClick={() => setMainTab('sustainability')}
                    >
                        Sustainability
                    </button>
                    <button 
                        className={`px-5 py-2 rounded-full ${mainTab === 'nutritional' ? 'bg-yellow-400 text-yellow-800' : 'bg-yellow-100 text-yellow-700'}`}
                        onClick={() => setMainTab('nutritional')}
                    >
                        Nutritional
                    </button>
                    <button 
                        className={`px-5 py-2 rounded-full ${mainTab === 'smart-shopping' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'}`}
                        onClick={() => setMainTab('smart-shopping')}
                    >
                        Smart shopping
                    </button>
                </div>

                {/* Weekly Overview Title */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly overview</h2>

                {/* Content based on selected main tab */}
                {mainTab === 'nutritional' && (
                    <div className="space-y-6">
                        {/* Toggle between weekly and monthly view */}
                        <div className="flex justify-end">
                            <div className="bg-white rounded-lg shadow-sm p-1">
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${nutritionView === 'weekly' ? 'bg-yellow-400 text-yellow-800' : 'text-gray-600'}`}
                                    onClick={() => setNutritionView('weekly')}
                                >
                                    Weekly
                                </button>
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${nutritionView === 'monthly' ? 'bg-yellow-400 text-yellow-800' : 'text-gray-600'}`}
                                    onClick={() => setNutritionView('monthly')}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>

                        {nutritionView === 'weekly' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {Object.entries(mockNutritionData.weeklyAverage).map(([nutrient, value]) => {
                                    const recommended = mockNutritionData.recommended[nutrient as keyof typeof mockNutritionData.recommended];
                                    const percentage = calculatePercentage(value, recommended);
                                    const statusColor = getStatusColor(percentage);
                                    
                                    return (
                                        <div key={nutrient} className="bg-white p-4 rounded-lg shadow">
                                            <h3 className="text-lg font-semibold mb-1 capitalize">{nutrient}</h3>
                                            <div className="flex items-end space-x-2">
                                                <span className="text-2xl font-bold">{value}</span>
                                                <span className="text-gray-500 text-sm mb-1">
                                                    {nutrient === 'calories' ? 'kcal' : 'g'}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${statusColor}`} 
                                                    style={{ width: `${Math.min(percentage, 150)}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-1 text-sm">
                                                <span className={percentage > 100 ? 'text-red-500' : 'text-green-500'}>
                                                    {percentage}%
                                                </span>
                                                <span className="text-gray-500">
                                                    Goal: {recommended}{nutrient === 'calories' ? 'kcal' : 'g'}
                                                </span>
                                            </div>
                                            {/* Add tips for improvement */}
                                            {(percentage < 80 || percentage > 120) && (
                                                <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-1 rounded">
                                                    <span className="font-medium">Tip:</span> {percentage < 80 ? 
                                                        `Increase ${nutrient} intake by adding more ${nutrient === 'protein' ? 'lean meats, beans, and nuts' : 
                                                        nutrient === 'carbs' ? 'whole grains and fruits' : 
                                                        nutrient === 'fat' ? 'healthy oils and nuts' : 
                                                        nutrient === 'fiber' ? 'vegetables and whole grains' : 'nutritious foods'}.` : 
                                                        `Reduce ${nutrient} consumption by limiting ${nutrient === 'protein' ? 'processed meats' : 
                                                        nutrient === 'carbs' ? 'refined sugars' : 
                                                        nutrient === 'fat' ? 'fried foods' : 
                                                        nutrient === 'calories' ? 'portion sizes' : 'processed foods'}.`}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Left side: Protein circle chart */}
                                <div className="bg-white p-4 rounded-lg shadow flex-1">
                                    <h3 className="text-gray-600 font-medium mb-2">You're fueling like a pro!</h3>
                                    <div className="flex justify-center items-center h-40 relative">
                                        {/* Circle chart */}
                                        <div className="relative w-32 h-32">
                                            {/* Background circle */}
                                            <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                                            {/* Progress circle */}
                                            <div className="absolute inset-0 rounded-full border-8 border-yellow-300" 
                                                style={{ 
                                                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 0.75)}% ${50 - 50 * Math.sin(Math.PI * 0.75)}%, 50% 50%)`,
                                                    transform: 'rotate(0deg)' 
                                                }}>
                                            </div>
                                            {/* Center text */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold">150/200g</div>
                                                    <div className="text-sm text-gray-500">protein</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-center">
                                        <button className="bg-yellow-300 text-yellow-800 px-4 py-1.5 rounded-md font-medium text-sm">
                                            Nutrition Goal
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Right side: Top sources and details */}
                                <div className="bg-white p-4 rounded-lg shadow flex-1">
                                    <div className="mb-4">
                                        <h3 className="flex items-center text-gray-700 font-medium">
                                            <span className="text-red-600 mr-1">🍂</span> 
                                            Top sources
                                        </h3>
                                        <ul className="mt-2 space-y-1 text-sm ml-4">
                                            <li className="flex items-baseline">
                                                <span className="mr-2">•</span>
                                                <span>lentils</span>
                                            </li>
                                            <li className="flex items-baseline">
                                                <span className="mr-2">•</span>
                                                <span>eggs</span>
                                            </li>
                                            <li className="flex items-baseline">
                                                <span className="mr-2">•</span>
                                                <span>tofu</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="flex items-center text-gray-700 font-medium">
                                            <span className="text-yellow-400 mr-1">⭐</span>
                                            Protein Explorer
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">2 weeks in a row</p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-green-500">+20g</h3>
                                        <p className="text-sm text-gray-500">compared to last week</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-3">Recent Meals</h3>
                            <div className="space-y-3">
                                {mockRecentRecipes.map((recipe, index) => (
                                    <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                                        <div className="flex justify-between">
                                            <div>
                                                <h4 className="font-medium">{recipe.name}</h4>
                                                <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${recipe.type === 'vegetarian' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                                    {recipe.type}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500">{recipe.calories} kcal</div>
                                                <div className="text-sm text-gray-500">{recipe.carbon} kg CO₂</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-2">View all meals</button>
                            </div>
                            
                            {/* New: Meal Planning Button */}
                            <div className="mt-4 flex">
                                <button className="flex-1 mr-2 bg-yellow-100 text-yellow-700 py-2 rounded-md text-sm font-medium hover:bg-yellow-200 transition flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Plan Next Week's Meals
                                </button>
                                <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    View Recipe Collection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {mainTab === 'sustainability' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Carbon Footprint</h2>
                            <div className="bg-white rounded-lg shadow-sm p-1">
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${carbonView === 'overview' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
                                    onClick={() => setCarbonView('overview')}
                                >
                                    Overview
                                </button>
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${carbonView === 'details' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
                                    onClick={() => setCarbonView('details')}
                                >
                                    Detailed Breakdown
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-3">Weekly Carbon Impact</h3>
                                <div className="flex items-end space-x-2">
                                    <span className="text-3xl font-bold">{mockCarbonData.weeklyTotal}</span>
                                    <span className="text-gray-500 text-sm mb-1">kg CO₂</span>
                                </div>
                                <div className="mt-2">
                                    <div className="text-sm text-gray-600">Daily Average: {mockCarbonData.weeklyAverage} kg CO₂</div>
                                    <div className="text-sm mt-1">
                                        {mockCarbonData.weeklyAverage > mockCarbonData.sustainableTarget ? (
                                            <span className="text-amber-600">
                                                {((mockCarbonData.weeklyAverage - mockCarbonData.sustainableTarget) / mockCarbonData.sustainableTarget * 100).toFixed(0)}% above sustainable target
                                            </span>
                                        ) : (
                                            <span className="text-green-600">
                                                Within sustainable target range!
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${getStatusColor(mockCarbonData.weeklyAverage / mockCarbonData.sustainableTarget * 100, true)}`}
                                        style={{ width: `${Math.min((mockCarbonData.weeklyAverage / mockCarbonData.sustainableTarget) * 100, 150)}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                    <span>Target: {mockCarbonData.sustainableTarget} kg/day</span>
                                    <span>High Impact</span>
                                </div>
                                
                                {/* New: Weekly Progress */}
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Weekly Trend</span>
                                        <span className="text-green-600 font-medium">↓ 8% from last week</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-3">Top Carbon Contributors</h3>
                                <div className="space-y-3">
                                    {mockCarbonData.topContributors.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div 
                                                className="w-1 h-12 mr-2" 
                                                style={{ 
                                                    backgroundColor: index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#eab308',
                                                    width: `${3 + index}px`
                                                }}
                                            ></div>
                                            <div className="flex-1">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.amount}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{item.impact} kg CO₂</div>
                                                <div className="text-xs text-gray-500">
                                                    {((item.impact / mockCarbonData.weeklyTotal) * 100).toFixed(0)}% of total
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* New: Alternatives Button */}
                                <button className="w-full mt-4 border border-green-500 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition">
                                    View Lower-Impact Alternatives
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-3">Carbon Savings</h3>
                                <div className="flex items-center justify-center h-32">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-green-500">{mockCarbonData.savings}</div>
                                        <div className="text-gray-500 mt-1">kg CO₂ saved this month</div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm">
                                    <div className="flex items-center mb-1">
                                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>Equivalent to planting 2 trees</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>Driving 50 km less in a car</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-green-100 text-green-700 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition">
                                    Tips to reduce your footprint
                                </button>
                            </div>
                        </div>

                        {carbonView === 'details' && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-3">Carbon Footprint Breakdown</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="text-sm font-medium">Meat & Dairy</div>
                                        <div className="text-xl font-bold mt-1">52%</div>
                                        <div className="text-sm text-gray-500">17.7 kg CO₂</div>
                                        <div className="h-1 w-full bg-red-200 mt-2">
                                            <div className="h-full bg-red-500" style={{ width: '52%' }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="text-sm font-medium">Processed Foods</div>
                                        <div className="text-xl font-bold mt-1">24%</div>
                                        <div className="text-sm text-gray-500">8.2 kg CO₂</div>
                                        <div className="h-1 w-full bg-orange-200 mt-2">
                                            <div className="h-full bg-orange-500" style={{ width: '24%' }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="text-sm font-medium">Produce</div>
                                        <div className="text-xl font-bold mt-1">15%</div>
                                        <div className="text-sm text-gray-500">5.1 kg CO₂</div>
                                        <div className="h-1 w-full bg-green-200 mt-2">
                                            <div className="h-full bg-green-500" style={{ width: '15%' }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="text-sm font-medium">Other</div>
                                        <div className="text-xl font-bold mt-1">9%</div>
                                        <div className="text-sm text-gray-500">3.1 kg CO₂</div>
                                        <div className="h-1 w-full bg-blue-200 mt-2">
                                            <div className="h-full bg-blue-500" style={{ width: '9%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Eco Tips</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mt-0.5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Try having 1-2 meat-free days each week to reduce your carbon impact by up to 30%</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mt-0.5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Choose local, seasonal produce to reduce transportation emissions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mt-0.5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Reduce food waste by planning meals and using leftovers creatively</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {mainTab === 'smart-shopping' && (
                    <div className="space-y-6">
                        {/* Smart Shopping Navigation */}
                        <div className="flex justify-center mb-4">
                            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${shoppingView === 'spending' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                                    onClick={() => setShoppingView('spending')}
                                >
                                    Spending Breakdown
                                </button>
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${shoppingView === 'savings' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                                    onClick={() => setShoppingView('savings')}
                                >
                                    Saving Opportunities
                                </button>
                                <button 
                                    className={`px-3 py-1 text-sm rounded-md ${shoppingView === 'recommendations' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                                    onClick={() => setShoppingView('recommendations')}
                                >
                                    Recommendations
                                </button>
                            </div>
                        </div>
                        
                        {shoppingView === 'spending' && (
                            <>
                                {/* Budget Overview */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">Monthly Grocery Budget</h3>
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                            ↓ -20% from last month
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center mb-3">
                                        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl font-bold mr-4">
                                            {Math.round((mockBudgetData.currentSpent / mockBudgetData.monthlyBudget) * 100)}%
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">Spent so far</span>
                                                <span className="font-medium">€{mockBudgetData.currentSpent}</span>
                                            </div>
                                            <div className="w-full h-3 bg-gray-200 rounded-full">
                                                <div 
                                                    className="h-full bg-pink-500 rounded-full" 
                                                    style={{width: `${(mockBudgetData.currentSpent / mockBudgetData.monthlyBudget) * 100}%`}}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-sm mt-1">
                                                <span className="font-medium text-green-600">€{mockBudgetData.monthlyBudget - mockBudgetData.currentSpent} remaining</span>
                                                <span className="text-gray-500">Budget: €{mockBudgetData.monthlyBudget}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <h4 className="text-sm font-medium mb-3">Spending by Category</h4>
                                        
                                        <div className="space-y-3">
                                            {mockBudgetData.categoryBreakdown.map((category, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{category.category}</span>
                                                        <div>
                                                            <span className="font-medium">€{category.amount}</span>
                                                            <span className="text-xs text-gray-500 ml-1">({category.percentage}%)</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="flex-1">
                                                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                                                <div 
                                                                    className={`h-full rounded-full ${
                                                                        index === 0 ? 'bg-red-500' : 
                                                                        index === 1 ? 'bg-green-500' : 
                                                                        index === 2 ? 'bg-yellow-500' : 
                                                                        'bg-blue-500'
                                                                    }`} 
                                                                    style={{width: `${category.percentage}%`}}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3 w-16 text-xs">
                                                            {category.amount > category.previousMonth ? (
                                                                <span className="text-red-500">↑ +€{(category.amount - category.previousMonth).toFixed(0)}</span>
                                                            ) : (
                                                                <span className="text-green-500">↓ -€{(category.previousMonth - category.amount).toFixed(0)}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Highest Expense Items */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold mb-3">Highest Expense Items</h3>
                                    <div className="space-y-3">
                                        {mockBudgetData.expensiveItems.map((item, index) => (
                                            <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{item.name}</h4>
                                                        <div className="mt-1 flex items-center">
                                                            <span className="text-gray-500 text-sm mr-2">€{item.price}</span>
                                                            {item.sustainable ? (
                                                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Sustainable</span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">High Impact</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item.alternatives.length > 0 && (
                                                        <button className="text-pink-600 text-xs hover:text-pink-700">
                                                            View Alternatives
                                                        </button>
                                                    )}
                                                </div>
                                                {item.alternatives.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                                        <div className="text-xs text-gray-500">Try instead:</div>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {item.alternatives.map((alt, i) => (
                                                                <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">{alt}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {shoppingView === 'savings' && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-2">
                                        <span className="text-2xl font-bold">€{mockBudgetData.savingsThisMonth}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold">You've saved this month!</h3>
                                    <p className="text-sm text-gray-500 mt-1">Compared to your previous monthly average</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <h4 className="font-medium border-b pb-2">Smart Saving Opportunities</h4>
                                    
                                    {mockBudgetData.smartSavings.map((saving, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 transition rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span>{saving.tip}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-green-600">€{saving.potentialSavings}</div>
                                                <div className="text-xs text-gray-500">potential monthly savings</div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="border-t pt-4 mt-4">
                                        <h4 className="font-medium mb-3">Seasonal Price Drops</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                                <div className="text-sm font-medium">Strawberries</div>
                                                <div className="text-xs text-green-600">↓ 30% cheaper now</div>
                                            </div>
                                            <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                                <div className="text-sm font-medium">Asparagus</div>
                                                <div className="text-xs text-green-600">↓ 25% cheaper now</div>
                                            </div>
                                            <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                                <div className="text-sm font-medium">Spring Greens</div>
                                                <div className="text-xs text-green-600">↓ 20% cheaper now</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {shoppingView === 'recommendations' && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Smart Shopping Recommendations</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="p-2 bg-pink-100 text-pink-600 rounded-md mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Weekly Meal Planning</h4>
                                                <p className="text-sm text-gray-600 mt-1">Plan your meals in advance to avoid impulse purchases and reduce food waste.</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-right">
                                            <button className="bg-pink-100 text-pink-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-pink-200 transition">
                                                Create Meal Plan
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="p-2 bg-green-100 text-green-600 rounded-md mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 3.414 16.586 5l-.708.707-1.586 1.586-.707.707a1 1 0 01-1.414-1.414l.707-.707L14.586 4l-.707-.707-.707-.707A1 1 0 0112 2zm.707 10.293a1 1 0 010 1.414l-.707.707 1.586 1.586.708.707a1 1 0 01-1.414 1.414l-.707-.707-1.586-1.586-.707-.707a1 1 0 111.414-1.414l.707.707 1.586-1.586.707-.707z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Seasonal Produce Guide</h4>
                                                <p className="text-sm text-gray-600 mt-1">Currently in season: asparagus, strawberries, and spring greens.</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            <div className="bg-green-50 p-2 rounded-md text-center">
                                                <div className="text-sm font-medium">Asparagus</div>
                                                <div className="text-xs text-green-600">€2.50/bunch</div>
                                            </div>
                                            <div className="bg-green-50 p-2 rounded-md text-center">
                                                <div className="text-sm font-medium">Strawberries</div>
                                                <div className="text-xs text-green-600">€3.20/kg</div>
                                            </div>
                                            <div className="bg-green-50 p-2 rounded-md text-center">
                                                <div className="text-sm font-medium">Spring Greens</div>
                                                <div className="text-xs text-green-600">€1.80/bunch</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Budget-Friendly Protein Sources</h4>
                                                <p className="text-sm text-gray-600 mt-1">Try these cost-effective and nutritious options:</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    <span>Lentils (dried)</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">€1.95/kg</span>
                                                    <span className="text-xs text-green-600 ml-1">-30%</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    <span>Chickpeas (canned)</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">€0.85/can</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                                    <span>Eggs (free-range)</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">€2.50/dozen</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="w-full mt-5 bg-pink-100 text-pink-700 py-2 rounded-md text-sm font-medium hover:bg-pink-200 transition flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/0/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    Generate Smart Shopping List
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;