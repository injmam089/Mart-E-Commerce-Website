// FlashSale - Flash sale with countdown
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { getFlashSaleProducts } from '../../services/productService';
import { getTimeRemaining } from '../../utils/helpers';
import ProductCard from '../product/ProductCard';

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, total: 1
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFlashSaleProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load flash sale products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    
    // Assume all products share the same flash sale end time for this component
    const endDate = products[0]?.flashSaleEndsAt;
    if (!endDate) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endDate);
      setTimeLeft(remaining);
      
      if (remaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-900">
        <div className="container-custom animate-pulse space-y-8">
          <div className="h-10 bg-white/20 w-1/3 rounded"></div>
          <div className="flex gap-6 overflow-x-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[280px] h-80 bg-white/20 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const isEnded = timeLeft.total <= 0;

  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-900 text-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-10 gap-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 fill-yellow-300 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Flash Sale</h2>
          </div>
          
          {!isEnded ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-semibold text-primary-100 hidden sm:inline-block mr-2">Ends in:</span>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-center min-w-[60px] sm:min-w-[70px] border border-white/10 shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold leading-none mb-1">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs uppercase font-medium text-primary-100 tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-red-500/80 backdrop-blur-sm px-6 py-3 rounded-xl font-bold text-lg border border-red-400">
              Sale Ended
            </div>
          )}
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 snap-x snap-mandatory">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start"
            >
              {/* Product cards inside flash sale have white background implicitly from styling */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                 <ProductCard product={{ ...product, isFlashSale: true }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
