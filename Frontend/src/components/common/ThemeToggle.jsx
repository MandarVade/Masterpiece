import React, { useContext } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = ({ 
  variant = 'button', // 'button', 'switch', 'dropdown'
  size = 'md', // 'sm', 'md', 'lg'
  showLabel = false,
  className = ""
}) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </span>
        )}
        <button
          onClick={toggleTheme}
          className={`relative inline-flex ${sizeClasses[size]} items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
            isDark ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <Moon className={`${iconSizes[size]} text-blue-600`} />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
            isDark ? 'translate-y-full' : 'translate-y-0'
          }`}>
            <Sun className={`${iconSizes[size]} text-yellow-500`} />
          </div>
        </button>
        {showLabel && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${sizeClasses[size]}`}
          aria-label="Theme selector"
        >
          {isDark ? (
            <Moon className={`${iconSizes[size]} text-gray-600 dark:text-gray-400`} />
          ) : (
            <Sun className={`${iconSizes[size]} text-gray-600 dark:text-gray-400`} />
          )}
          {showLabel && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDark ? 'Dark' : 'Light'}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 ${sizeClasses[size]} ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        {/* Sun Icon */}
        <Sun className={`${iconSizes[size]} text-yellow-500 transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        
        {/* Moon Icon */}
        <Moon className={`${iconSizes[size]} text-blue-600 absolute inset-0 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
