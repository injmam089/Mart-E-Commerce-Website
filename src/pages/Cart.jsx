import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const Cart = () => {
  const { cart, clearCart } = useCart();

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
          Home &gt; Shopping Cart
        </nav>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} className="text-primary-500" />
            <h1 className="text-3xl font-bold dark:text-dark-100">Shopping Cart</h1>
            <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 py-1 px-3 rounded-full text-sm font-semibold">
              {cart.length} Items
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center card py-20 px-4 max-w-3xl mx-auto mt-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={48} className="text-dark-400" />
            </div>
            <h2 className="text-2xl font-bold dark:text-dark-100 mb-4">Your cart is empty</h2>
            <p className="text-dark-500 dark:text-dark-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything yet. Explore our products and find something you love.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg px-8">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="card p-0 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-dark-700 flex justify-between items-center bg-white dark:bg-dark-800">
                  <h2 className="font-bold text-lg dark:text-dark-100">Items in Cart</h2>
                  <button 
                    onClick={() => {
                      clearCart();
                      toast.success('Cart cleared');
                    }}
                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-dark-700 bg-white dark:bg-dark-800">
                  <AnimatePresence>
                    {cart.map(item => (
                      <CartItem key={`${item.id}-${item.selectedColor?.name}-${item.selectedSize}`} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/products" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-2">
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 sticky top-24">
              <CartSummary checkoutPath="/checkout" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
