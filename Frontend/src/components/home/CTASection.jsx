import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1920')] bg-cover bg-center opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
          <Zap size={18} className="text-yellow-300" />
          <span className="text-sm font-semibold">Start Your Journey Today</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Start Your Art Collection Today
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of art enthusiasts discovering and collecting unique pieces from talented artists worldwide
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/discover" 
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Browse Collection 
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Learn More
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { number: '10K+', label: 'Artworks' },
            { number: '500+', label: 'Artists' },
            { number: '$2M+', label: 'In Sales' }
          ].map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;