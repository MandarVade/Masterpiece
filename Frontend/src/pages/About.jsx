import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Palette, Award, Globe, Heart, Shield, Truck, RotateCcw } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Artworks', icon: Palette },
    { number: '100+', label: 'Artists', icon: Users },
    { number: '50+', label: 'Countries', icon: Globe },
    { number: '10K+', label: 'Happy Customers', icon: Heart }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'We believe art has the power to transform spaces and inspire lives. Every piece in our collection is carefully curated to bring beauty and meaning to your home.'
    },
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'Every artwork comes with a certificate of authenticity. We work directly with artists and verified galleries to ensure the provenance of every piece.'
    },
    {
      icon: Users,
      title: 'Artist Support',
      description: 'We champion emerging and established artists by providing them with a platform to showcase their work and connect with art lovers worldwide.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Our platform connects art lovers, collectors, and artists from around the world, creating a vibrant community that celebrates creativity and culture.'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      description: 'We offer free shipping on all orders over $500 to anywhere in the world. Your artwork will be carefully packaged and insured.'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is protected with bank-level security. We accept all major credit cards and PayPal.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Not satisfied with your purchase? We offer a 30-day return policy for all artworks in original condition.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-appear">
            About MasterPiece
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto mb-8 animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
            We're passionate about connecting art lovers with extraordinary artworks from talented artists around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section - Fixed colors */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16 animate-appear opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story - Fixed colors */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-black mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-800 dark:text-black leading-relaxed text-base">
              <p>
                MasterPiece was born from a simple belief: everyone deserves access to beautiful, meaningful art. 
                Founded in 2020 by a team of art enthusiasts and technology experts, we set out to democratize 
                the art world and create a platform where artists and collectors could connect seamlessly.
              </p>
              <p>
                What started as a small marketplace has grown into a global community of over 10,000 artists 
                and 50,000 collectors. We've facilitated the sale of thousands of artworks, from emerging 
                artists' first pieces to established masters' iconic works.
              </p>
              <p>
                Today, we continue to innovate, using technology to make art more accessible while maintaining 
                the personal touch that makes each transaction special. Every artwork tells a story, and we're 
                honored to be part of that narrative.
              </p>
            </div>
          </div>
          <div className="animate-appear opacity-0 delay-400" style={{ animationFillMode: 'forwards' }}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                alt="Our team at work"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Our Values - Fixed colors */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-appear opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-black mb-4">
              Our Values
            </h2>
            <p className="text-lg text-black dark:text-black max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to artists, collectors, and the art community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-appear opacity-0"
                style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features - Fixed colors */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-appear opacity-0 delay-700" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-black mb-4">
              Why Choose MasterPiece?
            </h2>
            <p className="text-lg text-black-700 dark:text-black max-w-2xl mx-auto ">
              We've built our platform with your needs in mind, offering features that make buying and selling art simple and secure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center animate-appear opacity-0"
                style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700 dark:text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Fixed colors */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white animate-appear opacity-0 delay-900" style={{ animationFillMode: 'forwards' }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Start Your Art Journey?
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Join thousands of art lovers who have discovered their perfect pieces on MasterPiece
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/discover"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Artworks
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/artists"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-black border-2 border-white/30 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
            >
              Meet Our Artists
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;