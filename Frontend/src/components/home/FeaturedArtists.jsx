import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { artists } from '../../data/artists';

const FeaturedArtists = () => {
  const { isDark } = useTheme();
  const featuredArtists = artists.slice(0, 3);

  return (
    <section className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Featured Artists
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Meet the talented creators behind these stunning masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtists.map((artist) => (
            <Link 
              key={artist.id} 
              to={`/artist/${artist.slug}`} 
              className="group"
            >
              <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={artist.coverImage} 
                    alt={artist.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <img 
                    src={artist.avatar} 
                    alt={artist.name} 
                    className="w-20 h-20 rounded-full mx-auto -mt-12 mb-4 border-4 border-white shadow-xl ring-2 ring-blue-500" 
                  />
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {artist.name}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {artist.movement}
                  </p>
                  <div className="flex justify-around text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {artist.artworks}
                      </div>
                      <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Artworks
                      </div>
                    </div>
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {(artist.followers / 1000).toFixed(1)}K
                      </div>
                      <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Followers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/artists" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            View All Artists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;