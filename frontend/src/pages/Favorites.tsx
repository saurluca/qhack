import React from "react";
import Footer from "../components/Footer";

const Favorites: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your Favorites
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="Healthy salad"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Garden Fresh Salad</h3>
              <p className="text-gray-600 text-sm mt-1">
                A refreshing salad with mixed greens and vinaigrette
              </p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">(42 reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141"
                alt="Pasta dish"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Creamy Garlic Pasta</h3>
              <p className="text-gray-600 text-sm mt-1">
                Rich and creamy pasta with garlic infused sauce
              </p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">(28 reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1529042410759-befb1204b468"
                alt="Chocolate cake"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Decadent Chocolate Cake</h3>
              <p className="text-gray-600 text-sm mt-1">
                Rich, moist chocolate cake with ganache frosting
              </p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">(56 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
