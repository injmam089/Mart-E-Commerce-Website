// BestSellers - Best sellers section
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBestSellers } from '../../services/productService';
import ProductCard from '../product/ProductCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBestSellers();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load best sellers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding container-custom">
        <div className="animate-pulse space-y-8">
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
    <section className="section-padding container-custom">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">Most loved by our customers</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={{ ...product, isBestSeller: true }} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestSellers;
