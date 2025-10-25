import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import { paintings } from '../../data/paintings';

const ProductDetails = ({ 
  productId = null,
  showBreadcrumb = true,
  showRelated = true 
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  // Get product ID from props or URL params
  const currentProductId = productId || id;

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundProduct = paintings.find(p => p.id === parseInt(currentProductId));
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedImage(foundProduct.image);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentProductId]);

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // Implement add to cart logic here
    // You can dispatch to Redux store, call API, etc.
  };

  const handleToggleWishlist = (productId) => {
    console.log('Toggling wishlist for product:', productId);
    // Implement wishlist logic here
  };

  const handleShare = (product) => {
    console.log('Sharing product:', product);
    // Implement share logic here
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
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
        {showBreadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8 animate-appear">
            <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
            <span>/</span>
            <Link to="/discover" className="hover:text-purple-600 dark:hover:text-purple-400">Discover</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold">{product.title}</span>
          </nav>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <ProductImage 
            images={[product.image]} // Using single image from paintings data
            title={product.title}
            onImageChange={handleImageChange}
            showWishlist={true}
            showZoom={true}
          />

          {/* Product Info */}
          <ProductInfo 
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onShare={handleShare}
          />
        </div>

        {/* Related Products */}
        {showRelated && (
          <div className="mt-20">
            <RelatedProducts currentProductId={product.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
