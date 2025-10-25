import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );
};

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const categories = [
    { name: 'Abstract', count: 124 },
    { name: 'Contemporary', count: 89 },
    { name: 'Landscape', count: 156 },
    { name: 'Portrait', count: 67 },
    { name: 'Nature', count: 143 },
    { name: 'Urban', count: 78 }
  ];

  const styles = [
    { name: 'Modern', count: 234 },
    { name: 'Classical', count: 145 },
    { name: 'Minimalist', count: 189 },
    { name: 'Impressionist', count: 98 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
        <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
          Clear All
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Categories">
        {categories.map((category) => (
          <label key={category.name} className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {category.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {category.count}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Min</span>
            <span className="font-semibold text-gray-900 dark:text-white">${priceRange[0]}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Max</span>
            <span className="font-semibold text-gray-900 dark:text-white">${priceRange[1]}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>
      </FilterSection>

      {/* Styles */}
      <FilterSection title="Art Styles">
        {styles.map((style) => (
          <label key={style.name} className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {style.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {style.count}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Orientation */}
      <FilterSection title="Orientation">
        {['Portrait', 'Landscape', 'Square'].map((orientation) => (
          <label key={orientation} className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {orientation}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Apply Button */}
      <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;