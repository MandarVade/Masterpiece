import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Tag, Truck, Shield } from 'lucide-react';

const CartSummary = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 49;
  const tax = subtotal * 0.08; // 8% tax
  const discount = 0;
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

      {/* Promo Code */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Enter code"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white transition-all"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Apply
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 py-6 border-y border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
          ) : (
            <span className="font-semibold">${shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>Tax (8%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between text-xl font-bold">
        <span className="text-gray-900 dark:text-white">Total</span>
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link 
        to="/checkout"
        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Lock className="w-5 h-5" />
        Proceed to Checkout
      </Link>

      {/* Free Shipping Notice */}
      {shipping > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Add <span className="font-bold">${(1000 - subtotal).toFixed(2)}</span> more to get free shipping!
            </p>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">On orders over $1,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">100% secure transactions</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">We accept</p>
        <div className="flex items-center gap-2 flex-wrap">
          {['Visa', 'Mastercard', 'AmEx', 'PayPal'].map((method) => (
            <div key={method} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">
              {method}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;