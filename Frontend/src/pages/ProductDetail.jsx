import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Star, Check, Truck, Shield, RotateCcw, Calendar, Palette, Ruler } from 'lucide-react';
import RelatedProducts from '../components/product/RelatedProducts';
import { paintings } from '../data/paintings';
import { artists } from '../data/artists';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundProduct = paintings.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      
      if (foundProduct) {
        setSelectedImage(foundProduct.image);
        // Find the artist for this product
        const foundArtist = artists.find(a => a.id === foundProduct.artistId);
        setArtist(foundArtist);
      }
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item exists
      const updatedCart = existingCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const newItem = {
        id: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        quantity: quantity,
        size: product.dimensions,
        image: product.image,
        category: product.category,
        year: product.year,
        medium: product.medium
      };
      localStorage.setItem('cart', JSON.stringify([...existingCart, newItem]));
    }
    
    // Show success message
    alert(`${product.title} added to cart!`);
    
    // Optionally redirect to cart page
    // window.location.href = '/cart';
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    // Get existing wishlist from localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if item is already in wishlist
    const isInWishlist = existingWishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert(`${product.title} removed from wishlist!`);
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        image: product.image,
        category: product.category
      };
      localStorage.setItem('wishlist', JSON.stringify([...existingWishlist, wishlistItem]));
      alert(`${product.title} added to wishlist!`);
    }
  };

  const handleShare = () => {
    if (!product) return;
    
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Share feature not supported in this browser.');
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Loading skeleton for image */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              </div>
            </div>
            
            {/* Loading skeleton for info */}
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0112 9c2.34 0 4.29-1.009 5.824-2.709" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The artwork you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/discover"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Browse Artworks
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
          <Link to="/discover" className="hover:text-purple-600 dark:hover:text-purple-400">Discover</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-semibold">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4 animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={selectedImage} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg">
                <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Since paintings data has single image, we'll show the same image as thumbnails */}
            {/* <div className="grid grid-cols-3 gap-4">
              {[product.image, product.image, product.image].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-xl overflow-hidden ${
                    selectedImage === image 
                      ? 'ring-4 ring-purple-600' 
                      : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400'
                  } transition-all`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            {/* Artist Info */}
            <Link to={`/artist/${artist?.slug || product.artistId}`} className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {product.artist.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created by</p>
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {product.artist}
                </p>
              </div>
            </Link>

            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                {product.category}
                </div>
                {product.subcategory && (
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                    {product.subcategory}
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-semibold">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <span className="text-sm font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Artwork Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dimensions</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.dimensions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.medium}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.rating}/5</p>
                    </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                ))}
              </div>
            </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                {product.inStock && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-semibold">In Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => handleAddToCart()}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                onClick={() => handleToggleWishlist()}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
              >
                <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
              <button 
                onClick={() => handleShare()}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
              >
                <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;