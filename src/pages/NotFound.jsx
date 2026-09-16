import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, ShoppingBag } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const NotFound = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.div 
      className="min-h-[80vh] flex items-center justify-center section-padding relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Animated floating shapes */}
      <motion.div 
        className="absolute w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div 
        className="absolute w-80 h-80 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ bottom: '10%', right: '10%' }}
      />

      <div className="container-custom max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <h1 className="text-[120px] md:text-[180px] font-extrabold gradient-text leading-none tracking-tighter drop-shadow-sm">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-4 mt-4">
            Page Not Found
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-400 mb-10 max-w-xl mx-auto">
            Oops! The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 relative">
            <input 
              type="text" 
              name="search"
              placeholder="Try searching for what you need..." 
              className="input-base w-full pl-5 pr-14 py-4 rounded-full shadow-lg border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:border-primary-500"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 w-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/" className="btn btn-lg btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link to="/products" className="btn btn-lg btn-outline flex items-center gap-2 w-full sm:w-auto justify-center">
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
