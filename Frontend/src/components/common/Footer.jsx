import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-600'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Masterpiece</h3>
            <p className="mb-4">Your destination for discovering and collecting extraordinary artworks from talented artists around the world.</p>
            <div className="flex space-x-4">
              <a href="#" className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                <Facebook size={20} />
              </a>
              <a href="#" className={`${isDark ? 'hover:text-pink-400' : 'hover:text-pink-600'} transition-colors`}>
                <Instagram size={20} />
              </a>
              <a href="#" className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Home</Link></li>
              <li><Link to="/discover" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Discover</Link></li>
              <li><Link to="/artists" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Artists</Link></li>
              <li><Link to="/blogs" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Blogs</Link></li>
              <li><Link to="/about" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Help Center</a></li>
              <li><a href="#" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Shipping Info</a></li>
              <li><a href="#" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Returns</a></li>
              <li><a href="#" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Privacy Policy</a></li>
              <li><a href="#" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Art Street, NY 10001, USA</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span>hello@masterpiece.art</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} text-center`}>
          <p>&copy; 2025 Masterpiece. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;