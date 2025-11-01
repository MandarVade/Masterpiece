// src/components/artist/ArtistCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Palette, Users, ArrowRight, User as UserIcon } from 'lucide-react';

const ArtistCard = ({ artist = {}, index = 0 }) => {
  const navigate = useNavigate();
  const id = artist._id || artist.id || artist.slug || index;

  const goToArtist = () => navigate(`/artist/${id}`);

  // avatar fallback (initials)
  const renderAvatar = () => {
    if (artist.avatar) {
      return (
        <img
          src={artist.avatar}
          alt={artist.name || 'Artist avatar'}
          className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover"
          loading="lazy"
        />
      );
    }
    const name = artist.name || artist.fullname || '';
    const initials = name
      .split(' ')
      .map(n => n?.[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || null;

    return (
      <div className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold text-gray-700 dark:text-gray-200">
        {initials || <UserIcon className="w-6 h-6" />}
      </div>
    );
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={goToArtist}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToArtist();
        }
      }}
      aria-label={`Open profile for ${artist.name || 'artist'}`}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/30"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Cover */}
      <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {artist.coverImage ? (
          <img
            src={artist.coverImage}
            alt={`${artist.name || 'Artist'} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="opacity-30">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-gray-800/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-4 space-y-3">
        <div className="flex items-start -mt-12">
          <div className="relative -mt-1">
            {renderAvatar()}
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 bg-green-400" />
          </div>

          <div className="ml-4 flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
              {artist.name || artist.fullname || 'Unknown Artist'}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{artist.nationality || artist.location || '—'}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {artist.bio || artist.description || 'No bio available.'}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center gap-1 text-xs">
            <Palette className="w-3 h-3" />
            <span className="truncate max-w-[8rem]">{artist.movement || '—'}</span>
          </div>
          <div className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
            {artist.artworks ?? 0} works
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span className="truncate">{artist.followers ?? 0} followers</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToArtist();
              }}
              className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm"
              aria-label={`View profile of ${artist.name || 'artist'}`}
            >
              View Profile
              <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToArtist();
          }}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Explore Gallery
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default ArtistCard;
