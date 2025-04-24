import React from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation

const Footer: React.FC = () => {
  const location = useLocation(); // Get current URL path

  // Add a CSS rule for the filter
  const filterRedStyle = {
    filter:
      "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
  };

  return (
    <>
      {/* Mobile Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden">
        <nav>
          <ul className="flex justify-between items-center">
            <li className="flex-1">
              <Link to="/" className="flex flex-col items-center">
                <img
                  src="/Icons/Home Tab.svg"
                  alt="Home"
                  className={`w-8 h-8`}
                  style={location.pathname === "/" ? filterRedStyle : {}}
                />
                <span
                  className={`text-xs mt-1 ${location.pathname === "/" ? "text-red-500" : "text-gray-500"}`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/favorites" className="flex flex-col items-center">
                <img
                  src="/Icons/Purchases Tab.svg"
                  alt="Favorite"
                  className={`w-8 h-8`}
                  style={
                    location.pathname === "/favorites" ? filterRedStyle : {}
                  }
                />
                <span
                  className={`text-xs mt-1 ${location.pathname === "/favorites" ? "text-red-500" : "text-gray-500"}`}
                >
                  Favorites
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/cooking" className="flex flex-col items-center">
                <img
                  src="/Icons/Meals Tab.svg"
                  alt="Meals"
                  className={`w-8 h-8`}
                  style={location.pathname === "/cooking" ? filterRedStyle : {}}
                />
                <span
                  className={`text-xs mt-1 ${location.pathname === "/cooking" ? "text-red-500" : "text-gray-500"}`}
                >
                  Meals
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/search" className="flex flex-col items-center">
                <img
                  src="/Icons/Search Tab.svg"
                  alt="Search"
                  className={`w-8 h-8`}
                  style={location.pathname === "/search" ? filterRedStyle : {}}
                />
                <span
                  className={`text-xs mt-1 ${location.pathname === "/search" ? "text-red-500" : "text-gray-500"}`}
                >
                  Search
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/cart" className="flex flex-col items-center">
                <img
                  src="/Icons/Basket.svg"
                  alt="Basket"
                  className={`w-8 h-8`}
                  style={location.pathname === "/cart" ? filterRedStyle : {}}
                />
                <span
                  className={`text-xs mt-1 ${location.pathname === "/cart" ? "text-red-500" : "text-gray-500"}`}
                >
                  Cart
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>

      {/* Desktop Footer (unchanged) */}
      <footer className="hidden md:block bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2023 My Application. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
