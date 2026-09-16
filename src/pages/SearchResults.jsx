import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchX, Clock, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductSort from '../components/product/ProductSort';
import { searchProducts } from '../services/productService';
import { useSearch } from '../context/SearchContext';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { searchHistory, clearHistory, addToHistory } = useSearch();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (query) {
      setLoading(true);
      addToHistory(query);
      
      setTimeout(() => {
        const hits = searchProducts(query);
        setResults(hits);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const sortedResults = React.useMemo(() => {
    let sorted = [...results];
    if (sortBy === 'price-asc') sorted.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-desc') sorted.sort((a,b) => b.price - a.price);
    else if (sortBy === 'rating') sorted.sort((a,b) => b.rating - a.rating);
    return sorted;
  }, [results, sortBy]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-50 dark:bg-dark-900 pb-20"
    >
      <div className="container-custom pt-8">
        <nav className="text-sm mb-6 text-dark-500 dark:text-dark-400">
          Home &gt; Search Results
        </nav>

        {!query ? (
          <div className="max-w-2xl mx-auto mt-12">
            <h1 className="text-2xl font-bold dark:text-dark-100 mb-6">Search History</h1>
            {searchHistory.length > 0 ? (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-dark-500 dark:text-dark-400 font-medium">Recent Searches</span>
                  <button onClick={clearHistory} className="text-sm text-red-500 hover:underline">Clear</button>
                </div>
                <ul className="space-y-3">
                  {searchHistory.map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        to={`/search?q=${encodeURIComponent(item)}`}
                        className="flex items-center gap-3 text-dark-700 dark:text-dark-300 hover:text-primary-600 transition-colors p-2 -mx-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      >
                        <Clock size={16} className="text-dark-400" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-dark-500 dark:text-dark-400">No recent searches.</p>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-100">
                Search results for "{query}"
              </h1>
              <p className="text-dark-500 dark:text-dark-400 mt-2">
                Found {results.length} results
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => <div key={i} className="skeleton h-80 rounded-xl"></div>)}
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col gap-6">
                <div className="flex justify-end">
                  <ProductSort sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode} />
                </div>
                <ProductGrid products={sortedResults} viewMode={viewMode} />
              </div>
            ) : (
              <div className="text-center card p-16 max-w-2xl mx-auto mt-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchX size={40} className="text-dark-400" />
                </div>
                <h2 className="text-2xl font-bold dark:text-dark-100 mb-4">No results found</h2>
                <p className="text-dark-500 dark:text-dark-400 mb-8">
                  We couldn't find anything matching "{query}". Try adjusting your search.
                </p>
                <div className="text-left">
                  <h3 className="font-semibold dark:text-dark-200 mb-3">Search suggestions:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-dark-600 dark:text-dark-300">
                    <li>Check your spelling for typos</li>
                    <li>Use more generic terms</li>
                    <li>Try searching by category or brand</li>
                  </ul>
                </div>
                <Link to="/products" className="btn btn-primary mt-8 inline-block">
                  Browse All Products
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResults;
