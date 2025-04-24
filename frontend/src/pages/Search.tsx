import React from "react";
import Footer from "../components/Footer";

const Search: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
              Italian
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              Vegetarian
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              Desserts
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              Asian
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              Quick Meals
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              Gluten Free
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Search Results</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1588247866001-68fa8c438dd7"
                alt="Pasta dish"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">
                  Classic Italian Lasagna
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Italian
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Layers of pasta, meat sauce, and creamy bechamel
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600">45 min</span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85"
                alt="Pasta carbonara"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">Spaghetti Carbonara</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Italian
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Creamy egg-based sauce with pancetta and cheese
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600">30 min</span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-600">Easy</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3"
                alt="Pizza"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">Margherita Pizza</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Italian
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Classic pizza with tomato sauce, mozzarella, and basil
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600">40 min</span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
