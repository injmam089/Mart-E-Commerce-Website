import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Check, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProductById, getRelatedProducts, getProductReviews } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ReviewSection from '../components/product/ReviewSection';
import ProductCard from '../components/product/ProductCard';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setTimeout(() => {
        const prodData = getProductById(id);
        if (prodData) {
          setProduct(prodData);
          if (prodData.colors && prodData.colors.length > 0) setSelectedColor(prodData.colors[0]);
          if (prodData.sizes && prodData.sizes.length > 0) setSelectedSize(prodData.sizes[0]);
          
          setRelatedProducts(getRelatedProducts(id));
          setReviews(getProductReviews(id));
        }
        setLoading(false);
      }, 500);
    };
    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="container-custom section-padding min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="skeleton h-[500px] rounded-2xl"></div>
          <div className="space-y-6">
            <div className="skeleton h-10 w-3/4 rounded"></div>
            <div className="skeleton h-6 w-1/4 rounded"></div>
            <div className="skeleton h-12 w-1/3 rounded"></div>
            <div className="skeleton h-32 w-full rounded"></div>
            <div className="skeleton h-12 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom section-padding min-h-screen flex items-center justify-center">
        <div className="text-center card p-12">
          <h2 className="text-2xl font-bold dark:text-dark-100 mb-4">Product Not Found</h2>
          <p className="text-dark-500 dark:text-dark-400 mb-6">The product you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-dark-900 pb-20"
    >
      <div className="container-custom pt-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 text-dark-500 dark:text-dark-400">
          Home &gt; Products &gt; {product.category} &gt; {product.name}
        </nav>

        {/* Top Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Gallery */}
          <div className="w-full">
            <ProductImageGallery images={product.images || []} name={product.name} />
          </div>

          {/* Right Details */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
              {product.discount > 0 && <Badge variant="sale">Sale {product.discount}% Off</Badge>}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <Rating value={product.rating} readonly />
              <span className="text-sm text-dark-500 dark:text-dark-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-dark-400 dark:text-dark-500 line-through mb-1">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-dark-600 dark:text-dark-300 text-base mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark-900 dark:text-dark-100 mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor?.name === color.name ? 'border-primary-500 ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-900' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark-900 dark:text-dark-100 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                        selectedSize === size 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                          : 'border-gray-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 hover:border-primary-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-dark-900 dark:text-dark-100 mb-3">Quantity</h3>
              <div className="flex items-center w-32 border border-gray-200 dark:border-dark-700 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-dark-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="text" 
                  readOnly 
                  value={quantity} 
                  className="w-full text-center bg-transparent font-medium dark:text-dark-100"
                />
                <button 
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="p-3 text-dark-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-lg btn-primary flex-1 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
              >
                <ShoppingCart size={20} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleWishlistToggle}
                className="btn btn-lg btn-outline flex items-center justify-center px-6"
                aria-label="Toggle Wishlist"
              >
                <Heart 
                  size={24} 
                  className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-dark-700 dark:text-dark-300'} 
                />
              </button>
            </div>

            {/* Stock status */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 dark:border-dark-700 pt-6">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-dark-600 dark:text-dark-300">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="flex border-b border-gray-200 dark:border-dark-700 mb-8 overflow-x-auto hide-scrollbar">
            {['description', 'features', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-8 font-semibold text-base whitespace-nowrap transition-colors relative ${
                  activeTab === tab 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-lg">
                  {product.description}
                  <br/><br/>
                  Experience premium quality and uncompromised design. We ensure each product meets the highest standards of craftsmanship.
                </p>
              </motion.div>
            )}
            {activeTab === 'features' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-4 card">
                      <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Check size={16} />
                      </div>
                      <span className="text-dark-700 dark:text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ReviewSection productId={product.id} reviews={reviews} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold dark:text-dark-100 mb-8 border-l-4 border-primary-500 pl-4">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
