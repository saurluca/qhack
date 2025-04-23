import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cooking: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <Header />
            <main className="container mx-auto px-4 py-6 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Cooking Mode</h1>

                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-3">Spaghetti Carbonara</h2>
                    <div className="flex justify-between mb-4">
                        <div>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Italian</span>
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">30 min</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Difficulty:</span>
                            <span className="text-sm font-medium">Medium</span>
                        </div>
                    </div>

                    <div className="h-48 bg-gray-200 rounded mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1600803907087-f56d462fd26b"
                            alt="Spaghetti Carbonara"
                            className="w-full h-full object-cover rounded"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg border-b border-gray-200 pb-2 mb-2">Ingredients</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">350g spaghetti</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">200g pancetta or guanciale, diced</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">4 large eggs</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">50g Pecorino Romano, grated</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">50g Parmesan, grated</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                                    <span className="ml-2">Freshly ground black pepper</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg border-b border-gray-200 pb-2 mb-2">Steps</h3>
                            <ol className="space-y-3">
                                <li className="flex">
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                                    <p className="text-sm">Bring a large pot of salted water to a boil and cook spaghetti until al dente.</p>
                                </li>
                                <li className="flex">
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                                    <p className="text-sm">While the pasta is cooking, heat a large skillet and cook the pancetta until crispy.</p>
                                </li>
                                <li className="flex">
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                                    <p className="text-sm">In a bowl, whisk together the eggs, cheese, and plenty of black pepper.</p>
                                </li>
                                <li className="flex">
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                                    <p className="text-sm">Drain pasta, reserving a little cooking water. Add to the pancetta pan while still very hot.</p>
                                </li>
                                <li className="flex">
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                                    <p className="text-sm">Remove from heat and quickly stir in the egg mixture, thinning with pasta water if needed.</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cooking; 