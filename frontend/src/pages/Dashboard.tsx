import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <Header />
            <main className="container mx-auto px-4 py-6 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Recent Recipes</h2>
                        <div className="space-y-2">
                            <div className="p-2 border border-gray-200 rounded">Pasta Carbonara</div>
                            <div className="p-2 border border-gray-200 rounded">Chicken Curry</div>
                            <div className="p-2 border border-gray-200 rounded">Greek Salad</div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Popular Categories</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Italian</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vegetarian</span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Desserts</span>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Asian</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Quick Meals</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Your Activity</h2>
                        <div className="space-y-2">
                            <div className="flex items-center p-2 border border-gray-200 rounded">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Saved 3 recipes</span>
                            </div>
                            <div className="flex items-center p-2 border border-gray-200 rounded">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span>Cooked 2 meals</span>
                            </div>
                            <div className="flex items-center p-2 border border-gray-200 rounded">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                <span>Added 5 ingredients to cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard; 