import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-appear opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image */}
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
          <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden group">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <Link to={`/product/${item.id}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                {item.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              by {item.artist}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {item.size || item.dimensions}
            </p>
            {item.category && (
              <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mt-2">
                {item.category}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-xl"
                >
                  <Minus className="w-4 h-4 text-gray-900 dark:text-white" />
                </button>
                <span className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-xl"
                >
                  <Plus className="w-4 h-4 text-gray-900 dark:text-white" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${item.price * item.quantity}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${item.price} each
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;