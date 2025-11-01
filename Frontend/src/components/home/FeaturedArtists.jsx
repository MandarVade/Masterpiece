import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { artists } from '../../data/artists';

const FeaturedArtists = () => {
  const { isDark } = useTheme();
  const featuredArtists = artists.slice(0, 3);

  return (
    <section className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Fixed spacing */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Featured Artists
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Meet the talented creators behind these stunning masterpieces
          </p>
        </div>

        {/* Grid Section - Fixed spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredArtists.map((artist) => (
            <Link 
              key={artist.id} 
              to={`/artist/${artist.slug}`} 
              className="group"
            >
              <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300`}>
                {/* Cover Image - Fixed spacing */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={artist.coverImage} 
                    alt={artist.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <br></br>
                <br></br>
                {/* Content Section - Fixed spacing */}
                <div className="p-6 text-center">
                  {/* Avatar - Fixed spacing */}
                  <img 
                    src={artist.avatar} 
                    alt={artist.name} 
                    className="w-24 h-24 rounded-full mx-auto -mt-14 mb-4 border-4 ${isDark ? 'border-gray-900' : 'border-white'} shadow-xl ring-2 ring-blue-500" 
                  />
                  
                  {/* Artist Info - Fixed spacing */}
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {artist.name}
                  </h3>
                  <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    {artist.movement}
                  </p>
                  
                  {/* Stats Section - Fixed spacing */}
                  <div className={`flex justify-around text-sm pt-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div>
                      <div className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {artist.artworks}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Artworks
                      </div>
                    </div>
                    <div className={`h-12 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div>
                      <div className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {(artist.followers / 1000).toFixed(1)}K
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Followers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button - Fixed spacing */}
        <div className="mt-16 text-center">
          <Link 
            to="/artists" 
            className="inline-flex items-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            View All Artists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;