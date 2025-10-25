import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import RelatedProducts from '../components/product/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    title: "Sunset Dreams",
    artist: "Sarah Chen",
    artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=1000&fit=crop"
    ],
    category: "Abstract",
    description: "A stunning abstract piece that captures the essence of a perfect sunset. The vibrant colors and fluid movements create a sense of warmth and tranquility, perfect for any modern living space.",
    features: [
      "High-quality canvas print",
      "Hand-stretched on wooden frame",
      "Ready to hang",
      "Certificate of authenticity included"
    ],
    sizes: [
      { name: 'Small', dimensions: '16x20"', price: 899 },
      { name: 'Medium', dimensions: '24x36"', price: 1299 },
      { name: 'Large', dimensions: '36x48"', price: 1799 }
    ],
    inStock: true
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

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

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
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
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            {/* Artist Info */}
            <Link to={`/artist/${product.id}`} className="flex items-center gap-4 group">
              <img 
                src={product.artistAvatar} 
                alt={product.artist}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created by</p>
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {product.artist}
                </p>
              </div>
            </Link>

            {/* Title & Category */}
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-3">
                {product.category}
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
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 dark:text-gray-600 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name.toLowerCase())}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize === size.name.toLowerCase()
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{size.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{size.dimensions}</div>
                    <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
                      ${size.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
              <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-400 transition-colors">
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

            {/* Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;