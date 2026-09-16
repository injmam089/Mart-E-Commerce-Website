import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HeartOff, Trash2, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import Rating from '../components/common/Rating';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success('Moved to cart');
  };

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
          Home &gt; Wishlist
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Heart size={32} className="text-primary-500 fill-primary-500" />
            <h1 className="text-3xl font-bold dark:text-dark-100">My Wishlist</h1>
            <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 py-1 px-3 rounded-full text-sm font-semibold">
              {wishlist.length} Items
            </span>
          </div>
          
          {wishlist.length > 0 && (
            <button 
              onClick={() => {
                clearWishlist();
                toast.success('Wishlist cleared');
              }}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center card py-20 px-4 max-w-3xl mx-auto mt-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartOff size={48} className="text-dark-400" />
            </div>
            <h2 className="text-2xl font-bold dark:text-dark-100 mb-4">Your wishlist is empty</h2>
            <p className="text-dark-500 dark:text-dark-400 mb-8 max-w-md mx-auto">
              Start adding items you love to your wishlist by clicking the heart icon on products.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg px-8">
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlist.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="card card-hover flex flex-col overflow-hidden p-0"
                >
                  <Link to={`/product/${product.id}`} className="relative h-60 bg-gray-100 dark:bg-dark-800 block overflow-hidden">
                    <img 
                      src={product.images?.[0] || 'https://picsum.photos/seed/wishlist/400'} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                        toast.success('Removed from wishlist');
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Link>
                  <div className="p-5 flex-1 flex flex-col">
                    <Link to={`/product/${product.id}`} className="block mb-2">
                      <h3 className="font-bold text-dark-900 dark:text-dark-100 line-clamp-1 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-3">
                      <Rating value={product.rating} readonly size={14} />
                    </div>
                    <div className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4 mt-auto">
                      {formatCurrency(product.price)}
                    </div>
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      className="btn btn-sm btn-primary w-full flex justify-center items-center gap-2"
                    >
                      <ShoppingCart size={16} /> Move to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
