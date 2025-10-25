import React from 'react';
import ArtworkCard from './ArtworkCard';
import { useTheme } from '../../hooks/useTheme';

const ArtworkGrid = ({ artworks }) => {
  const { isDark } = useTheme();

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`text-6xl mb-4`}>🎨</div>
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          No artworks found
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkGrid;