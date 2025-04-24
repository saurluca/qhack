import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

// Define the shape of a cart item
interface CartItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const defaultItems: CartItemType[] = [
  {
    id: 1,
    name: "Bananas",
    description: "3 Bananas",
    price: 4.99,
    quantity: 1,
    imageUrl:
      "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/188/602/1-Bunch-Bananas__30199.1650549450.jpg?c=2",
  },
  {
    id: 2,
    name: "Flour",
    description: "400g",
    price: 6.49,
    quantity: 1,
    imageUrl:
      "https://www.genesis-kitchen.com/wp-content/uploads/2020/10/soft-wheat-flour.jpg",
  },
  {
    id: 3,
    name: "Eggs",
    description: "10",
    price: 3.99,
    quantity: 1,
    imageUrl:
      "https://i0.wp.com/poultrycartons.com/wp-content/uploads/2023/10/230901-Poultry-Cartons-055-2-scaled.jpg?fit=1350%2C1080&ssl=1",
  },
  {
    id: 4,
    name: "Sugar",
    description: "450g",
    price: 4.29,
    quantity: 1,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41umHWPV+vL._UL500_.jpg",
  },
  {
    id: 5,
    name: "Butter",
    description: "1/2 cup",
    price: 13.79,
    quantity: 1,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29a-eT_oIapG1WfVyn3aK_CEe_Y265uyfpw&s",
  },
];
// Reusable CartItem component
const CartItem: React.FC<{
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
}> = ({ item, onQuantityChange }) => {
  return (
    <div className="flex items-center p-4">
      <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover rounded"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
      <div className="flex items-center">
        <button
          className="text-gray-500 p-1"
          onClick={() =>
            onQuantityChange(item.id, Math.max(0, item.quantity - 1))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        <button
          className="text-gray-500 p-1"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="ml-4 text-right">
        <p className="font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  // Initialize cart items from localStorage or use default
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : defaultItems;
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle quantity changes and remove item if quantity is 0
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity === 0) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // Assuming 10% tax rate
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Items</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.length === 0 ? (
              <p className="p-4 text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-second text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
