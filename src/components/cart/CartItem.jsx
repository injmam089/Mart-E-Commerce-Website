import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount, cn } from '../../utils/helpers';
import toast from 'react-hot-toast';

// CartItem - Individual product row in the cart
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const currentPrice = calculateDiscount(item.price, item.discount);
  const totalPrice = currentPrice * item.quantity;

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      toast.error(`Only ${item.stock} items available in stock`);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -20 }}
      transition={{ duration: 0.2 }}
      className="card p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700"
    >
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="shrink-0 w-24 h-24 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-900 block">
        <img 
          src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/200/200`} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow text-center sm:text-left flex flex-col">
        <Link to={`/product/${item.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <h4 className="font-bold text-dark-900 dark:text-white line-clamp-1 mb-1">
            {item.name}
          </h4>
        </Link>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2 text-xs">
          {item.selectedColor && (
            <span className="flex items-center gap-1 text-dark-600 dark:text-dark-300 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-md">
              <span 
                className="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-dark-500" 
                style={{ backgroundColor: item.selectedColor }}
              />
              {item.selectedColor}
            </span>
          )}
          {item.selectedSize && (
            <span className="text-dark-600 dark:text-dark-300 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-md font-medium">
              Size: {item.selectedSize}
            </span>
          )}
        </div>

        <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
          {formatCurrency(currentPrice)} 
          {item.discount > 0 && (
            <span className="text-xs text-dark-400 line-through ml-2 font-normal">
              {formatCurrency(item.price)}
            </span>
          )}
        </div>
      </div>

      {/* Actions & Price */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-dark-700">
        
        {/* Quantity Controls */}
        <div className="flex items-center h-10 bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-200 dark:border-dark-700">
          <button 
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            className="w-8 h-full flex items-center justify-center text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white disabled:opacity-50 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-dark-900 dark:text-white">
            {item.quantity}
          </span>
          <button 
            onClick={handleIncrease}
            disabled={item.quantity >= item.stock}
            className="w-8 h-full flex items-center justify-center text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white disabled:opacity-50 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="text-base sm:text-lg font-bold text-dark-900 dark:text-white w-20 text-right">
          {formatCurrency(totalPrice)}
        </div>

        <button 
          onClick={handleRemove}
          className="p-2 text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Remove Item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
