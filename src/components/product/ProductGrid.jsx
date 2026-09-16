import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import ProductCard from './ProductCard';
import Skeleton from '../common/Skeleton';
import { cn } from '../../utils/helpers';

// ProductGrid - Container for rendering a grid or list of products
const ProductGrid = ({ products = [], loading = false, viewMode = 'grid', emptyMessage = 'No products found' }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      )}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center card bg-white dark:bg-dark-800"
      >
        <div className="w-20 h-20 bg-gray-50 dark:bg-dark-700 rounded-full flex items-center justify-center mb-6">
          <PackageSearch size={32} className="text-dark-400 dark:text-dark-500" />
        </div>
        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">No Results</h3>
        <p className="text-dark-500 dark:text-dark-400 max-w-md">
          {emptyMessage}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
