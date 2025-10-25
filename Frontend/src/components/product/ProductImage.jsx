import React, { useState } from 'react';
import { Heart, ZoomIn } from 'lucide-react';

const ProductImage = ({ 
  images = [], 
  title = "Product", 
  onImageChange = null,
  showWishlist = true,
  showZoom = true 
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    if (onImageChange) {
      onImageChange(image);
    }
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4 animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
        <div className="relative aspect-[4/5] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">No image available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl group">
        <img 
          src={selectedImage} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {showWishlist && (
              <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg">
                <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            )}
            {showZoom && (
              <button 
                onClick={handleZoom}
                className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
              >
                <ZoomIn className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm">
            Click to zoom out
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(image)}
              className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                selectedImage === image 
                  ? 'ring-4 ring-purple-600 scale-105' 
                  : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:scale-105'
              }`}
            >
              <img 
                src={image} 
                alt={`${title} view ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {images.findIndex(img => img === selectedImage) + 1} of {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
