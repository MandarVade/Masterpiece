import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { paintings, categories, priceRanges } from '../data/paintings';
import { formatPrice } from '../utils/helpers';

const Discover = () => {
  const { isDark } = useTheme();
  const { addToWishlist, isInWishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPaintings = paintings.filter(painting => {
    const categoryMatch = selectedCategory === 'All' || painting.category === selectedCategory;
    const priceMatch = !selectedPriceRange || (painting.price >= selectedPriceRange.min && painting.price <= selectedPriceRange.max);
    return categoryMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Discover Artworks</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore our curated collection of {paintings.length} masterpieces</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`hidden lg:block w-64 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 h-fit sticky top-24`}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Filters</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Price Range</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedPriceRange
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Prices
                </button>
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPriceRange === range
                        ? 'bg-blue-600 text-white'
                        : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
              >
                <Filter size={20} />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Results Count */}
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Showing {filteredPaintings.length} artwork{filteredPaintings.length !== 1 ? 's' : ''}
            </p>

            {/* Artwork Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPaintings.map((artwork) => (
                <div key={artwork.id} className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all group`}>
                  <Link to={`/product/${artwork.id}`} className="block relative overflow-hidden aspect-square">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {!artwork.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${artwork.id}`}>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`}>
                          {artwork.title}
                        </h3>
                      </Link>
                      <button
                        onClick={() => addToWishlist(artwork)}
                        className={`p-2 rounded-full transition-colors ${
                          isInWishlist(artwork.id)
                            ? 'text-red-500'
                            : isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart size={20} className={isInWishlist(artwork.id) ? 'fill-current' : ''} />
                      </button>
                    </div>
                    
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{artwork.artist}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        {artwork.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {artwork.rating} ({artwork.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">{formatPrice(artwork.price)}</span>
                      <Link
                        to={`/product/${artwork.id}`}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          artwork.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPaintings.length === 0 && (
              <div className="text-center py-16">
                <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No artworks found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;