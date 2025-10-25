import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { paintings } from '../../data/paintings';

const EmptyCart = () => {
  // Get first 3 paintings as recommendations
  const recommendations = paintings.slice(0, 3).map(painting => ({
    id: painting.id,
    title: painting.title,
    price: painting.price,
    image: painting.image,
    artist: painting.artist,
    category: painting.category
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Empty State */}
        <div className="text-center mb-16 animate-appear">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
            <ShoppingBag className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any artworks to your cart yet. Start exploring our collection!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/discover"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Browse Artworks
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/artists"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-purple-400 dark:hover:border-purple-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Artists
            </Link>
          </div>
        </div>

        {/* Recommendations */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              You Might Like
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 animate-appear opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    by {item.artist}
                  </p>
                  <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;