// CategoryGrid - Category browsing grid
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getCategories } from '../../services/productService';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const renderIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.ShoppingBag;
    return <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2" strokeWidth={1.5} />;
  };

  if (loading) {
    return (
      <section className="section-padding container-custom">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-1/4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding container-custom">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Find what you need</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Link
              to={`/products?category=${category.slug}`}
              className="block group relative rounded-2xl overflow-hidden aspect-square sm:h-64 lg:h-72"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {renderIcon(category.icon)}
                <h3 className="font-bold text-white text-lg sm:text-xl lg:text-2xl tracking-wide mb-1">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {category.productCount} Products
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryGrid;
