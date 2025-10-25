import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const ArtworkCard = ({ artwork }) => {
  const { isDark } = useTheme();
  const { addToWishlist, isInWishlist } = useCart();

  return (
    <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all group`}>
      <Link to={`/product/${artwork.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={artwork.image} 
          alt={artwork.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {!artwork.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
          {artwork.category}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${artwork.id}`}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors line-clamp-1`}>
              {artwork.title}
            </h3>
          </Link>
          <button
            onClick={() => addToWishlist(artwork)}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              isInWishlist(artwork.id)
                ? 'text-red-500'
                : isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={isInWishlist(artwork.id) ? 'fill-current' : ''} />
          </button>
        </div>
        
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
          {artwork.artist}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {artwork.subcategory}
          </span>
          <div className="flex items-center">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {artwork.rating}
            </span>
            <span className={`ml-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              ({artwork.reviews})
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(artwork.price)}
          </span>
          <Link
            to={`/product/${artwork.id}`}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              artwork.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {artwork.inStock ? 'View' : 'Sold'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;