import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Grid, List } from 'lucide-react';

const ArtistGallery = ({ artistId }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const artworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      price: 1299,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop",
      category: "Abstract",
      likes: 234,
      sold: false
    },
    {
      id: 2,
      title: "Urban Symphony",
      price: 899,
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=800&fit=crop",
      category: "Contemporary",
      likes: 189,
      sold: false
    },
    {
      id: 3,
      title: "Ocean Whispers",
      price: 1499,
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=800&fit=crop",
      category: "Landscape",
      likes: 312,
      sold: true
    },
    {
      id: 4,
      title: "Golden Hour",
      price: 1099,
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop",
      category: "Nature",
      likes: 267,
      sold: false
    },
    {
      id: 5,
      title: "Cosmic Dance",
      price: 1799,
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=800&fit=crop",
      category: "Abstract",
      likes: 445,
      sold: false
    },
    {
      id: 6,
      title: "Silent Night",
      price: 1199,
      image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=800&fit=crop",
      category: "Portrait",
      likes: 198,
      sold: false
    }
  ];

  const categories = ['All', 'Abstract', 'Contemporary', 'Landscape', 'Nature', 'Portrait'];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category.toLowerCase() === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-appear">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Artworks Gallery
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? 'piece' : 'pieces'} available
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-50 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork, index) => (
            <div 
              key={artwork.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 animate-appear opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {!artwork.sold ? (
                      <div className="flex gap-2">
                        <button className="flex-1 bg-white text-gray-900 py-2 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2 px-4 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl font-semibold">
                        Sold Out
                      </div>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  {artwork.likes}
                </div>
                
                {artwork.sold && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                    SOLD
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <Link to={`/product/${artwork.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {artwork.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${artwork.price}
                  </span>
                  <Link 
                    to={`/product/${artwork.id}`}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 text-sm font-semibold"
                  >
                    View <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredArtworks.map((artwork, index) => (
            <div 
              key={artwork.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 animate-appear opacity-0"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-64 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.sold && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                      SOLD
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${artwork.id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-2">
                        {artwork.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                        {artwork.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        <span>{artwork.likes} likes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ${artwork.price}
                    </span>
                    {!artwork.sold && (
                      <div className="flex gap-2">
                        <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistGallery;       