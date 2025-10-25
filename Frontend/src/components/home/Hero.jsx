import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[256px] scale-[2.5] rounded-full bg-gradient-radial from-purple-400/30 via-blue-400/20 to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-appear">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Discover Extraordinary Art
            </span>
            <ArrowRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight animate-appear opacity-0 delay-100">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
              Where Art Meets
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Masterpiece
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 animate-appear opacity-0 delay-300">
            Explore a curated collection of stunning artworks from talented artists around the world. 
            Find your perfect piece and transform your space.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-appear opacity-0 delay-500">
            <Link 
              to="/discover" 
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              Explore Artworks
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/artists" 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              Meet Artists
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 animate-appear opacity-0 delay-700">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Artworks</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                100+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Artists</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Featured Image with Frame */}
        <div className="relative mt-16 animate-appear opacity-0 delay-1000">
          <div className="relative max-w-5xl mx-auto">
            {/* Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-900/50 dark:to-blue-900/50 rounded-2xl blur-2xl opacity-60" />
            <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop" 
                  alt="Featured Artwork" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom Glow */}
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[40%] h-[128px] scale-[2] rounded-full bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;