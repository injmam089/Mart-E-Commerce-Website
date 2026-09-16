import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, Calendar, CreditCard, MapPin, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

// Page wrapper animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate some random confetti dots
  const confetti = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: (Math.random() - 0.5) * 500,
    color: ['bg-primary-500', 'bg-secondary-500', 'bg-green-500', 'bg-pink-500', 'bg-purple-500'][Math.floor(Math.random() * 5)],
    scale: Math.random() * 0.5 + 0.5,
  }));

  if (!order && mounted) {
    return (
      <motion.div 
        className="container-custom section-padding min-h-[70vh] flex flex-col items-center justify-center text-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-100 mb-2">Order Placed Successfully!</h1>
        <p className="text-dark-600 dark:text-dark-400 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn btn-lg btn-primary">
            Continue Shopping
          </Link>
          <Link to="/profile" className="btn btn-lg btn-outline">
            View Order History
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!order) return null;

  return (
    <motion.div 
      className="container-custom section-padding relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {/* Confetti Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {mounted && confetti.map((dot) => (
          <motion.div
            key={dot.id}
            className={`absolute w-3 h-3 rounded-full ${dot.color}`}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: dot.x,
              y: dot.y,
              scale: dot.scale,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Check className="w-12 h-12 text-green-600 dark:text-green-400" strokeWidth={3} />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p 
            className="text-dark-600 dark:text-dark-400 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Thank you for your purchase. A confirmation email has been sent to you.
          </motion.p>
        </div>

        <motion.div 
          className="card p-6 md:p-8 mb-8 border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-xl shadow-primary-900/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 border-b border-gray-100 dark:border-dark-700 pb-2">
                Order Details
              </h3>
              
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Order ID</p>
                  <p className="font-mono font-medium text-dark-900 dark:text-dark-100">{order.id}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Date</p>
                  <p className="font-medium text-dark-900 dark:text-dark-100">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Payment Method</p>
                  <p className="font-medium text-dark-900 dark:text-dark-100 capitalize">
                    {order.paymentMethod.replace('-', ' ')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 border-b border-gray-100 dark:border-dark-700 pb-2">
                Shipping Address
              </h3>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-dark-100">{order.shippingAddress?.fullName || 'Customer Name'}</p>
                  <p className="text-dark-600 dark:text-dark-400 text-sm mt-1">
                    {order.shippingAddress?.street}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
                    {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 border-b border-gray-100 dark:border-dark-700 pb-2 mb-4">
              Items Ordered
            </h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-dark-700/50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-100 dark:bg-dark-700 overflow-hidden flex-shrink-0">
                      <img src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/100/100`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-900 dark:text-dark-100 text-sm md:text-base line-clamp-1">{item.name}</p>
                      <p className="text-sm text-dark-500 dark:text-dark-400">
                        Qty: {item.quantity} {item.selectedColor && `• Color: ${item.selectedColor}`} {item.selectedSize && `• Size: ${item.selectedSize}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-dark-900 dark:text-dark-100">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-dark-900/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm text-dark-600 dark:text-dark-400">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-dark-600 dark:text-dark-400">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm text-dark-600 dark:text-dark-400">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-medium">
                <span>Discount</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-dark-700 pt-2 mt-2 flex justify-between items-center">
              <span className="font-bold text-lg text-dark-900 dark:text-dark-100">Total</span>
              <span className="font-bold text-xl text-primary-600 dark:text-primary-400">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/products" className="btn btn-lg btn-primary flex-1 sm:flex-none justify-center">
            Continue Shopping
          </Link>
          <Link to="/profile" className="btn btn-lg btn-outline flex-1 sm:flex-none justify-center">
            View Order History
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
