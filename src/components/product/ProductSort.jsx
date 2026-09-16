import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/helpers';
// Assuming SORT_OPTIONS is exported from constants, if not we define it here as fallback
import { SORT_OPTIONS } from '../../utils/constants';

const DEFAULT_SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' }
];

const ProductSort = ({ sortBy, onSortChange, viewMode = 'grid', onViewModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = SORT_OPTIONS || DEFAULT_SORT_OPTIONS;

  const currentOption = options.find(opt => opt.id === sortBy) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (id) => {
    onSortChange(id);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 w-full border-b border-gray-200 dark:border-dark-700 mb-6">
      
      <div className="text-sm text-dark-500 dark:text-dark-400">
        Showing all available results
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-dark-600 dark:text-dark-300 hidden sm:inline-block">
            Sort by:
          </span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-4 py-2 text-sm font-medium text-dark-900 dark:text-white hover:border-primary-500 transition-colors min-w-[160px]"
            >
              {currentOption.label}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-dark-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 rounded-xl shadow-lg z-20 py-2 overflow-hidden"
                >
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortSelect(option.id)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors",
                        sortBy === option.id 
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium" 
                          : "text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700"
                      )}
                    >
                      {option.label}
                      {sortBy === option.id && <Check size={16} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 bg-gray-100 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'grid' 
                ? "bg-white dark:bg-dark-700 text-primary-600 shadow-sm" 
                : "text-dark-500 hover:text-dark-900 dark:hover:text-white"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'list' 
                ? "bg-white dark:bg-dark-700 text-primary-600 shadow-sm" 
                : "text-dark-500 hover:text-dark-900 dark:hover:text-white"
            )}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
