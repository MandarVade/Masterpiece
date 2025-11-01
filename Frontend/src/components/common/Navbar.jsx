// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Home,
  Compass,
  BookOpen,
  Users
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isDark } = useTheme();
  const { user, logout, openAuthModal } = useAuth();
  const { cartCount = 0, wishlist = [] } = useCart(); // default values
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (err) {
      // optional: show toast / console
      // console.error('Logout failed', err);
    }
  };

  // avatar fallback: initials inside colored circle
  const renderAvatar = () => {
    const name = user?.name || user?.fullname || user?.email || '';
    const initials = name
      .split(' ')
      .map((n) => n?.[0]?.toUpperCase())
      .slice(0, 2)
      .join('');

    if (user?.avatar) {
      // user.avatar might be a full url string
      return <img src={user.avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />;
    }

    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
        style={{ background: isDark ? '#1f2937' : '#e6e6ff', color: isDark ? '#fff' : '#111' }}
        aria-hidden
      >
        {initials || <UserIcon className="w-5 h-5" />}
      </div>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} hidden sm:block`}>
              Masterpiece
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/discover" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              <Compass size={18} />
              <span>Discover</span>
            </Link>
            <Link to="/artists" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              <Users size={18} />
              <span>Artists</span>
            </Link>
            <Link to="/blogs" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              <BookOpen size={18} />
              <span>Blogs</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Toggle search"
            >
              <Search size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
            </button>

            <ThemeToggle />

            {user ? (
              <>
                <Link to="/wishlist" className="relative p-2" aria-label="Wishlist">
                  <Heart size={24} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative p-2" aria-label="Cart">
                  <ShoppingCart size={24} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="hidden md:flex items-center space-x-3">
                  {renderAvatar()}
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{user?.name || user?.fullname || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className={`p-2 ${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}
                    aria-label="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="hidden md:block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className={isDark ? 'text-gray-300' : 'text-gray-600'} /> : <Menu size={24} className={isDark ? 'text-gray-300' : 'text-gray-600'} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4">
            <input
              type="text"
              placeholder="Search artworks, artists, blogs..."
              className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
              aria-label="Search"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Home</Link>
            <Link to="/discover" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Discover</Link>
            <Link to="/artists" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Artists</Link>
            <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Blogs</Link>

            {user ? (
              <>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Cart ({cartCount})</Link>
                <button onClick={() => { handleLogout(); }} className={`block w-full text-left px-4 py-3 rounded-lg ${isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>Logout</button>
              </>
            ) : (
              <button onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
