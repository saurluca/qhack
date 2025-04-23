import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

interface Ingredient {
    id: number;
    created_at: string;
    name: string;
    carbon_footprint: number;
}

const Test: React.FC = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [name, setName] = useState('');
    const [carbonFootprint, setCarbonFootprint] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const { data, error } = await supabase
                .from('ingredients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            if (data) {
                setIngredients(data);
            }
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            setMessage('Error fetching ingredients');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !carbonFootprint) {
            setMessage('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            const { error } = await supabase
                .from('ingredients')
                .insert([
                    {
                        name: name.trim(),
                        carbon_footprint: parseFloat(carbonFootprint)
                    }
                ]);

            if (error) {
                throw error;
            }

            setMessage('Ingredient added successfully!');
            setName('');
            setCarbonFootprint('');
            fetchIngredients();
        } catch (error) {
            console.error('Error adding ingredient:', error);
            setMessage('Error adding ingredient');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="container mx-auto py-8 px-4 flex-grow">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
                        Ingredient Management
                    </h1>

                    {/* Add Ingredient Form */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Ingredient</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ingredient Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter ingredient name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="carbonFootprint" className="block text-sm font-medium text-gray-700 mb-1">
                                    Carbon Footprint
                                </label>
                                <input
                                    type="number"
                                    id="carbonFootprint"
                                    value={carbonFootprint}
                                    onChange={(e) => setCarbonFootprint(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter carbon footprint"
                                    step="0.01"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Ingredient'}
                            </button>

                            {message && (
                                <p className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Ingredients List */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients List</h2>
                        {ingredients.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No ingredients found</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon Footprint</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ingredients.map((ingredient) => (
                                            <tr key={ingredient.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ingredient.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ingredient.carbon_footprint}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Test; 