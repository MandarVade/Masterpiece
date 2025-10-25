import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onClose }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/discover?search=${encodeURIComponent(query)}`);
      onClose && onClose();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artworks, artists, blogs..."
        className={`w-full pl-12 pr-12 py-3 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
        autoFocus
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <X size={20} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;