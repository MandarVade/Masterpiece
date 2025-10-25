import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Star, Check, Truck, Shield, RotateCcw, Calendar, Palette, Ruler } from 'lucide-react';

const ProductInfo = ({ 
  product = null,
  onAddToCart = null,
  onToggleWishlist = null,
  onShare = null 
}) => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="space-y-6 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        quantity,
        selectedSize
      });
    }
  };

  const handleToggleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(product);
    }
  };

  return (
    <div className="space-y-6 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
      {/* Artist Info */}
      <Link to={`/artist/${product.artistId}`} className="flex items-center gap-4 group">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {product.artist.charAt(0)}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Created by</p>
          <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {product.artist}
          </p>
        </div>
      </Link>

      {/* Title & Category */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
            {product.category}
          </div>
          {product.subcategory && (
            <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
              {product.subcategory}
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {product.title}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          ${product.price.toLocaleString()}
        </span>
        {product.inStock ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <Check className="w-5 h-5" />
            <span className="text-sm font-semibold">In Stock</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <span className="text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {product.description}
      </p>

      {/* Artwork Details */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center gap-3">
          <Ruler className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dimensions</p>
            <p className="font-semibold text-gray-900 dark:text-white">{product.dimensions}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
            <p className="font-semibold text-gray-900 dark:text-white">{product.medium}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
            <p className="font-semibold text-gray-900 dark:text-white">{product.year}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
            <p className="font-semibold text-gray-900 dark:text-white">{product.rating}/5</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              -
            </button>
            <span className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ShoppingCart className="w-5 h-5" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <button 
          onClick={handleToggleWishlist}
          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
        >
          <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <button 
          onClick={handleShare}
          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
        >
          <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Easy Returns</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
