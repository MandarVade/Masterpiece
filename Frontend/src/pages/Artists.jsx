import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Image, Users as UsersIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { artists } from '../data/artists';

const Artists = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Meet Our Artists
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Discover the talented creators behind our curated collection of masterpieces
          </p>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.slug}`}
              className={`group rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2`}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={artist.coverImage}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Artist Info */}
              <div className="p-6 text-center">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full mx-auto -mt-16 mb-4 border-4 border-white shadow-xl"
                />
                
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {artist.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {artist.nationality}
                  </span>
                </div>

                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                  {artist.bio}
                </p>

                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                  {artist.movement}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Image size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {artist.artworks}
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Artworks</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <UsersIcon size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {(artist.followers / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Followers</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;