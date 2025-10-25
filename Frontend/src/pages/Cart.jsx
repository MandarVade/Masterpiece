import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { paintings } from '../data/paintings';
import { artists } from '../data/artists';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart items from localStorage or API
    const timer = setTimeout(() => {
      // For demo purposes, let's add some paintings to cart
      const sampleCartItems = paintings.slice(0, 3).map((painting, index) => {
        const artist = artists.find(a => a.id === painting.artistId);
        return {
          id: painting.id,
          title: painting.title,
          artist: painting.artist,
          price: painting.price,
          quantity: index === 1 ? 2 : 1, // Second item has quantity 2
          size: painting.dimensions, // Using dimensions instead of size
          image: painting.image,
          category: painting.category,
          year: painting.year,
          medium: painting.medium
        };
      });
      
      setCartItems(sampleCartItems);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Loading skeleton for cart items */}
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0 w-full sm:w-32 h-40 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="flex-1 space-y-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Loading skeleton for cart summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-appear">
          <Link 
            to="/discover" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold">{cartItems.length}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary items={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;