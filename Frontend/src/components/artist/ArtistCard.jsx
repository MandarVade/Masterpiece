import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Palette, Users, ArrowRight } from 'lucide-react';

const ArtistCard = ({ artist, index }) => {
  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 animate-appear opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={artist.coverImage} 
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-800" />
      </div>

      {/* Avatar */}
      <div className="relative px-6 -mt-16">
        <div className="relative inline-block">
          <img 
            src={artist.avatar} 
            alt={artist.name}
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800" />
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pb-6 pt-4 space-y-4">
        <div>
          <Link to={`/artist/${artist.id}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {artist.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
            <MapPin className="w-4 h-4" />
            {artist.nationality}
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {artist.bio}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center gap-1 text-sm">
            <Palette className="w-3 h-3" />
            {artist.movement}
          </div>
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            {artist.artworks} works
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{artist.followers} followers</span>
          </div>
          <Link 
            to={`/artist/${artist.id}`}
            className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm group/link"
          >
            View Profile
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Link 
          to={`/artist/${artist.id}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Explore Gallery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard;