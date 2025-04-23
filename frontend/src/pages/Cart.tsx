import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <Header />
            <main className="container mx-auto px-4 py-6 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h1>

                <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">Your Items</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        <div className="flex items-center p-4">
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded">
                                <img
                                    src="https://images.unsplash.com/photo-1518977676601-b53f82aba655"
                                    alt="Tomatoes"
                                    className="h-full w-full object-cover rounded"
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-medium">Tomatoes</h3>
                                <p className="text-sm text-gray-500">Fresh, organic</p>
                            </div>
                            <div className="flex items-center">
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <span className="mx-2 w-8 text-center">2</span>
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="font-medium">$3.99</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4">
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded">
                                <img
                                    src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d"
                                    alt="Pasta"
                                    className="h-full w-full object-cover rounded"
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-medium">Spaghetti</h3>
                                <p className="text-sm text-gray-500">Dried, 500g</p>
                            </div>
                            <div className="flex items-center">
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <span className="mx-2 w-8 text-center">1</span>
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="font-medium">$2.49</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4">
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded">
                                <img
                                    src="https://images.unsplash.com/photo-1631897206565-5e7f59339136"
                                    alt="Cheese"
                                    className="h-full w-full object-cover rounded"
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-medium">Parmesan Cheese</h3>
                                <p className="text-sm text-gray-500">Grated, 100g</p>
                            </div>
                            <div className="flex items-center">
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <span className="mx-2 w-8 text-center">1</span>
                                <button className="text-gray-500 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="font-medium">$4.99</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>$11.47</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span>$2.99</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>$1.15</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>$15.61</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Proceed to Checkout
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default Cart; 