import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index: React.FC = () => {

    // define an input stat

    // calute root of input

    // printing function 
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="container mx-auto py-8 px-4 flex-grow">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
                        Hello World!
                    </h1>
                    <p className="text-gray-700 text-center">
                        Welcome to my TypeScript and Tailwind CSS application.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Index; 