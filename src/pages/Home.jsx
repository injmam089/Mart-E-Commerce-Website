import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FlashSale from '../components/home/FlashSale';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Home = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-dark-900"
    >
      <HeroBanner />
      <CategoryGrid />
      <FlashSale />
      <FeaturedProducts />
      <NewArrivals />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
