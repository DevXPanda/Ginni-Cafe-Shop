import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // In a real app, this would make an API call to create an order
    // For demo purposes, we'll just simulate a successful order
    setTimeout(() => {
      clearCart();
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-100 p-8 rounded-lg">
          <div className="inline-flex items-center justify-center p-4 bg-green-500 text-white rounded-full mb-4">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll process it right away and notify you when it's ready.
          </p>
          <Link 
            to="/menu" 
            className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            to="/menu" 
            className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Items ({items.length})</h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item._id} className="p-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 w-20 h-20 mb-4 sm:mb-0 sm:mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-pink-600 font-bold">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="mx-3 w-8 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="ml-4 p-1 text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-4 border-t">
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>₹40.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(totalPrice + 40 + totalPrice * 0.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-pink-600 text-white py-3 rounded-md font-medium hover:bg-pink-700 transition-colors"
            >
              {user ? 'Place Order' : 'Login to Checkout'}
            </button>
            
            <div className="mt-4">
              <Link 
                to="/menu" 
                className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center justify-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;