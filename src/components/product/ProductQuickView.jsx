import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Rating from '../common/Rating';
import { formatCurrency, calculateDiscount, cn } from '../../utils/helpers';
import toast from 'react-hot-toast';

// ProductQuickView - Content for the quick view modal
const ProductQuickView = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const currentPrice = calculateDiscount(product.price, product.discount);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`Added ${quantity} ${product.name} to cart`);
    if (onClose) onClose();
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) setQuantity(q => q + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-dark-800">
          <img 
            src={product.images?.[0] || `https://picsum.photos/seed/${product.id}/800/800`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wider mb-2">
          {product.category}
        </span>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-2">
          {product.name}
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
            In Stock ({product.stock})
          </span>
        </div>
        
        <div className="flex items-end gap-3 mb-6">
          <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(currentPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-lg text-dark-400 line-through mb-1">
              {formatCurrency(product.price)}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded mb-1 border border-red-100 dark:border-red-900/50">
              {product.discount}% OFF
            </span>
          )}
        </div>
        
        <p className="text-dark-600 dark:text-dark-300 mb-8 line-clamp-3">
          {product.description}
        </p>

        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-3">Color</h4>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 focus:outline-none transition-transform hover:scale-110",
                    selectedColor === color ? "border-primary-600 dark:border-primary-400" : "border-transparent ring-1 ring-gray-200 dark:ring-dark-700"
                  )}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-dark-900 dark:text-white">Size</h4>
              <button className="text-sm text-primary-600 hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-[3rem] h-10 px-3 rounded-lg border font-medium transition-colors focus:outline-none",
                    selectedSize === size 
                      ? "bg-dark-900 text-white border-dark-900 dark:bg-white dark:text-dark-900 dark:border-white" 
                      : "bg-white text-dark-600 border-gray-200 hover:border-dark-900 dark:bg-dark-800 dark:text-dark-300 dark:border-dark-600 dark:hover:border-white"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-dark-700">
          {/* Quantity Selector */}
          <div className="flex items-center h-12 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-1">
            <button 
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              className="w-10 h-full flex items-center justify-center text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-semibold text-dark-900 dark:text-white">
              {quantity}
            </span>
            <button 
              onClick={handleIncreaseQuantity}
              disabled={quantity >= product.stock}
              className="w-10 h-full flex items-center justify-center text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "btn btn-lg flex-grow",
              isOutOfStock ? "btn-outline opacity-50 cursor-not-allowed" : "btn-primary"
            )}
          >
            <ShoppingCart size={20} className="mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to={`/product/${product.id}`}
            onClick={onClose}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
