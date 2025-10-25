import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Palette, Star, Share2, Heart, ExternalLink } from 'lucide-react';
import ArtistProfile from '../components/artist/ArtistProfile';
import ArtistBio from '../components/artist/ArtistBio';
import ArtistGallery from '../components/artist/ArtistGallery';
import { artists } from '../data/artists';

const ArtistDetails = () => {
  const { slug } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundArtist = artists.find(a => a.slug === slug);
      setArtist(foundArtist);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Artist Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The artist you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/artists"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Artists
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8 animate-appear">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
          <span>/</span>
          <Link to="/artists" className="hover:text-purple-600 dark:hover:text-purple-400">Artists</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-semibold">{artist.name}</span>
        </nav>

        {/* Artist Profile */}
        <div className="mb-12">
          <ArtistProfile artist={artist} />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            {[
              { id: 'gallery', label: 'Gallery', icon: Palette },
              { id: 'bio', label: 'Biography', icon: Calendar },
              { id: 'exhibitions', label: 'Exhibitions', icon: ExternalLink }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
          {activeTab === 'gallery' && <ArtistGallery artist={artist} />}
          {activeTab === 'bio' && <ArtistBio artist={artist} />}
          {activeTab === 'exhibitions' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exhibitions</h3>
              <div className="space-y-4">
                {artist.exhibitions ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    {artist.name} has participated in {artist.exhibitions} exhibitions throughout their career.
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Exhibition information is not available for this artist.
                  </p>
                )}
                {artist.awards && artist.awards.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Awards & Recognition</h4>
                    <ul className="space-y-2">
                      {artist.awards.map((award, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
