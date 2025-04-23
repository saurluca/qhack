import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Test: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="container mx-auto py-8 px-4 flex-grow">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
                        Test Page
                    </h1>
                    <p className="text-gray-700 text-center mb-4">
                        This is a test page to demonstrate routing functionality.
                    </p>
                    <div className="mt-6 space-y-4">
                        <div className="p-4 bg-gray-100 rounded-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Testing Components</h2>
                            <p className="text-gray-600">
                                This page shows how we can create different routes in a React application.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Navigation Demo</h2>
                            <p className="text-gray-600">
                                Try using the navigation links in the header to move between pages.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Test; 