import React from 'react';
import { MapPin, Calendar, Award, Users, Mail, Share2, Heart } from 'lucide-react';

const ArtistProfile = ({ artist }) => {
  const stats = [
    { label: 'Artworks', value: artist.artworks || '24', icon: Award },
    { label: 'Followers', value: artist.followers || '1.2K', icon: Users },
    { label: 'Years Active', value: artist.yearsActive || '5', icon: Calendar }
  ];

  const socialLinks = [
    { name: 'Instagram', url: '#', color: 'from-pink-500 to-purple-500' },
    { name: 'Twitter', url: '#', color: 'from-blue-400 to-blue-600' },
    { name: 'Website', url: '#', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl">
        <img 
          src={artist.coverImage || "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop"}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Share Button */}
        <button className="absolute top-6 right-6 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg group">
          <Share2 className="w-5 h-5 text-gray-900 dark:text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative -mt-20 px-6 pb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative">
              <img 
                src={artist.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"}
                alt={artist.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {artist.name || 'Artist Name'}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{artist.location || 'Location'}</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                    {artist.specialty || 'Specialty'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  Follow
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-purple-400 dark:hover:border-purple-600 transition-all">
                  <Mail className="w-5 h-5" />
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl animate-appear opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              Connect with {artist.name?.split(' ')[0]}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${social.color} text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;