// src/pages/Cart.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Cart = () => {
  const { isDark } = useTheme();
  const {
    cartItems,
    addToCart,       // contexts keep syncing to backend per previous CartContext
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount
  } = useCart();

  // local loading state during initial fetch/sync handled by CartContext; we keep a light local flag
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If your CartContext needs an explicit fetch call on mount, call it here.
    // In our CartContext earlier we auto-fetch when user logs in, so nothing to do.
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-appear">
          <Link to="/discover" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
              <p className="text-gray-600 dark:text-gray-400">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold">{cartItems.length}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <CartItem
                key={item.id}
                item={item}
                index={idx}
                onUpdateQuantity={(newQty) => updateQuantity(item.id, newQty)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary items={cartItems} onClear={clearCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
