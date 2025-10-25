import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedArtworks from '../components/home/FeaturedArtworks';
import FeaturedArtists from '../components/home/FeaturedArtists';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedArtworks />
      <FeaturedArtists />
      <CTASection />
    </div>
  );
};

export default Home;