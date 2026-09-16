import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Monitor, Smartphone, Watch, Headphones, Camera, Sparkles } from 'lucide-react';
import { getCategories } from '../services/productService';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const IconMap = {
  'Monitor': Monitor,
  'Smartphone': Smartphone,
  'Watch': Watch,
  'Headphones': Headphones,
  'Camera': Camera,
  'Sparkles': Sparkles,
  'Box': Box
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-50 dark:bg-dark-900 pb-20"
    >
      <div className="container-custom pt-12">
        <nav className="text-sm mb-8 text-dark-500 dark:text-dark-400">
          Home &gt; Categories
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">
            Browse Categories
          </h1>
          <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
            Explore our curated collection of premium products across various categories.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map(category => {
            const Icon = IconMap[category.icon] || Box;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link to={`/products?category=${category.slug}`} className="block group">
                  <div className="card card-hover overflow-hidden h-full flex flex-col p-0">
                    <div 
                      className="h-48 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${category.image || 'https://picsum.photos/seed/'+category.slug+'/600/400'})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white">
                          <Icon size={32} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col bg-white dark:bg-dark-800 relative z-10">
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400 flex-1 mb-4">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm font-medium pt-4 border-t border-gray-100 dark:border-dark-700">
                        <span className="text-primary-600 dark:text-primary-400">{category.productCount || 0} Products</span>
                        <span className="flex items-center text-dark-400 group-hover:text-primary-600 transition-colors">
                          Explore <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Categories;
