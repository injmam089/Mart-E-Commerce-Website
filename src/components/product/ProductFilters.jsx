import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Filter } from 'lucide-react';
import { cn } from '../../utils/helpers';

// ProductFilters - Sidebar filter panel for product listing
const ProductFilters = ({ filters, onFilterChange, categories = [], brands = [], mobileOpen = false, onMobileClose }) => {
  
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (slug) => {
    const newCategories = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (min, max) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: [0, 2000],
      rating: 0
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                           filters.brands.length > 0 || 
                           filters.priceRange[0] > 0 || 
                           filters.priceRange[1] < 2000 || 
                           filters.rating > 0;

  const FilterSection = ({ title, section, count, children }) => (
    <div className="border-b border-gray-200 dark:border-dark-700 py-4">
      <button 
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left font-semibold text-dark-900 dark:text-white"
      >
        <span className="flex items-center gap-2">
          {title}
          {count > 0 && (
            <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-xs py-0.5 px-2 rounded-full">
              {count}
            </span>
          )}
        </span>
        <motion.div
          animate={{ rotate: expandedSections[section] ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-dark-500" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-1 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-bold text-dark-900 dark:text-white flex items-center gap-2">
          <Filter size={20} />
          Filters
        </h2>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-1">
        {/* Categories */}
        <FilterSection title="Categories" section="categories" count={filters.categories.length}>
          {categories.map(category => (
            <label key={category.slug} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox"
                  checked={filters.categories.includes(category.slug)}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-dark-600 rounded bg-white dark:bg-dark-900 peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-all"></div>
                <motion.svg 
                  initial={{ scale: 0 }}
                  animate={{ scale: filters.categories.includes(category.slug) ? 1 : 0 }}
                  className="absolute w-3 h-3 text-white pointer-events-none" 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              </div>
              <span className="text-dark-600 dark:text-dark-300 group-hover:text-dark-900 dark:group-hover:text-white transition-colors text-sm">
                {category.name}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands" section="brands" count={filters.brands.length}>
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-dark-600 rounded bg-white dark:bg-dark-900 peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-all"></div>
                <motion.svg 
                  initial={{ scale: 0 }}
                  animate={{ scale: filters.brands.includes(brand) ? 1 : 0 }}
                  className="absolute w-3 h-3 text-white pointer-events-none" 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              </div>
              <span className="text-dark-600 dark:text-dark-300 group-hover:text-dark-900 dark:group-hover:text-white transition-colors text-sm">
                {brand}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price" count={0}>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 text-sm">$</span>
              <input 
                type="number"
                min="0"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                className="input-base pl-7 text-sm py-2"
                placeholder="Min"
              />
            </div>
            <span className="text-dark-400">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 text-sm">$</span>
              <input 
                type="number"
                min="0"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                className="input-base pl-7 text-sm py-2"
                placeholder="Max"
              />
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating" section="rating" count={filters.rating > 0 ? 1 : 0}>
          {[4, 3, 2, 1].map(star => (
            <label key={star} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox"
                  checked={filters.rating === star}
                  onChange={() => handleRatingChange(star)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-dark-600 rounded-full bg-white dark:bg-dark-900 peer-checked:bg-secondary-500 peer-checked:border-secondary-500 transition-all"></div>
                <div className={cn("absolute w-2 h-2 rounded-full bg-white transition-opacity", filters.rating === star ? "opacity-100" : "opacity-0")} />
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i} 
                    className={cn("w-4 h-4", i < star ? "text-secondary-500 fill-secondary-500" : "text-gray-300 dark:text-dark-600")} 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
                <span className="text-sm text-dark-500 ml-1">& Up</span>
              </div>
            </label>
          ))}
        </FilterSection>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0 pr-6">
        <div className="sticky top-24">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-dark-900 z-50 p-6 overflow-y-auto lg:hidden shadow-2xl"
            >
              <button 
                onClick={onMobileClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                <X size={20} className="text-dark-500" />
              </button>
              <div className="mt-2">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;
