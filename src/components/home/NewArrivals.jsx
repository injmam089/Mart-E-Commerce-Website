// NewArrivals - Fresh additions
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getNewArrivals } from '../../services/productService';
import ProductCard from '../product/ProductCard';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getNewArrivals();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load new arrivals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 dark:bg-dark-800/50">
        <div className="container-custom animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-dark-700 w-1/4 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-dark-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-800/50">
      <div className="container-custom">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="section-title gradient-text inline-block">New Arrivals</h2>
          <p className="section-subtitle">Fresh additions to our collection</p>
        </div>

        {/* Mobile horizontal scroll, Desktop grid */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 snap-x snap-mandatory">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[260px] sm:min-w-[300px] lg:min-w-0 snap-start"
            >
              <ProductCard product={{ ...product, isNew: true }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
