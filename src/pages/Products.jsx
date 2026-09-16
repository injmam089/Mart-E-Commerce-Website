import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import { getAllProducts, filterProducts, sortProducts } from '../services/productService';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    brands: [],
    priceRange: [0, 1000],
    rating: 0
  });
  
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        const data = getAllProducts();
        setProducts(data);
        setLoading(false);
      }, 500);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;
    if (filters) {
      result = filterProducts(result, filters);
    }
    if (sortBy) {
      result = sortProducts(result, sortBy);
    }
    return result;
  }, [products, filters, sortBy]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-8 pb-16"
    >
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-dark-500 dark:text-dark-400">
          Home &gt; Products {categoryParam && `> ${categoryParam}`}
        </nav>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-100">All Products</h1>
            <p className="text-dark-500 dark:text-dark-400 mt-2">
              Showing {filteredAndSortedProducts.length} results
            </p>
          </div>
          <div className="hidden lg:block">
            <ProductSort sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode} />
          </div>
          <button 
            className="btn btn-outline lg:hidden flex items-center gap-2"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Sliders size={20} /> Filters
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="lg:hidden mb-6">
              <ProductSort sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton h-80 rounded-xl"></div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <>
                <ProductGrid products={filteredAndSortedProducts} viewMode={viewMode} />
                <div className="mt-12 flex justify-center">
                  <button className="btn btn-outline px-8 py-3 rounded-full">Load More</button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 card">
                <h3 className="text-xl font-bold mb-2 dark:text-dark-100">No products found</h3>
                <p className="text-dark-500 dark:text-dark-400">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  className="btn btn-primary mt-6"
                  onClick={() => setFilters({ categories: [], brands: [], priceRange: [0, 1000], rating: 0 })}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-dark-900 p-6 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-dark-100">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full">
                  <X size={24} className="dark:text-dark-100" />
                </button>
              </div>
              <ProductFilters filters={filters} setFilters={setFilters} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;
