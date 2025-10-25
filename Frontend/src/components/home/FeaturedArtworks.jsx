import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { paintings } from '../../data/paintings';
import { formatPrice } from '../../utils/helpers';

const FeaturedArtworks = () => {
  const { isDark } = useTheme();
  const featuredArtworks = paintings.slice(0, 6);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Featured Artworks
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Curated masterpieces from our collection
            </p>
          </div>
          <Link 
            to="/discover" 
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
          >
            View All 
            <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork) => (
            <Link 
              key={artwork.id} 
              to={`/product/${artwork.id}`} 
              className="group"
            >
              <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300`}>
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                    {artwork.category}
                  </div>
                  {!artwork.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-1`}>
                    {artwork.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    {artwork.artist}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(artwork.price)}
                    </span>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={18} />
                      <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {artwork.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/discover" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View All Artworks
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;