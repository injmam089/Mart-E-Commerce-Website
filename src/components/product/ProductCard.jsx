import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, PackageSearch } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import ProductQuickView from './ProductQuickView';
import { formatCurrency, calculateDiscount, cn } from '../../utils/helpers';

// ProductCard - Reusable product card component for grid and list views
const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const openQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const isGrid = viewMode === 'grid';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "card card-hover overflow-hidden group bg-white dark:bg-dark-800",
          isGrid ? "flex flex-col" : "flex flex-col sm:flex-row gap-4 p-4"
        )}
      >
        {/* Image Section */}
        <div className={cn(
          "relative overflow-hidden",
          isGrid ? "aspect-square" : "w-full sm:w-48 shrink-0 rounded-xl"
        )}>
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img 
              src={product.images?.[0] || `https://picsum.photos/seed/${product.id}/500/500`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="badge-new">New</Badge>}
            {product.isBestSeller && <Badge className="badge-bestseller">Best Seller</Badge>}
            {product.isFlashSale && <Badge className="badge-sale">Flash Sale</Badge>}
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white border-none">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm text-dark-400 hover:text-red-500 dark:text-dark-300 dark:hover:text-red-500 transition-colors shadow-sm"
            aria-label="Toggle Wishlist"
          >
            <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
          </button>

          {/* Quick View Button */}
          <button 
            onClick={openQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 btn btn-sm bg-white/90 text-dark-900 hover:bg-white hover:text-primary-600 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
          >
            <Eye size={16} className="mr-2" />
            Quick View
          </button>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/50 dark:bg-dark-900/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-dark-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={cn(
          "flex flex-col flex-grow",
          isGrid ? "p-4" : "flex-grow justify-center py-2"
        )}>
          <span className="text-xs text-primary-500 font-medium uppercase tracking-wide mb-1">
            {product.category}
          </span>
          
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <h3 className="font-semibold text-dark-900 dark:text-white line-clamp-1 mb-2">
              {product.name}
            </h3>
          </Link>

          <div className="mb-3">
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>

          {/* Description for list view */}
          {!isGrid && (
            <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="mt-auto">
            <div className="flex items-end gap-2 mb-4">
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(calculateDiscount(product.price, product.discount))}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-dark-400 line-through mb-0.5">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={cn(
                "btn btn-sm w-full",
                isOutOfStock ? "btn-outline opacity-50 cursor-not-allowed" : "btn-primary"
              )}
            >
              <ShoppingCart size={16} className="mr-2" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <Modal size="lg" isOpen={showQuickView} onClose={() => setShowQuickView(false)}>
            <ProductQuickView product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
