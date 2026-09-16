import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Badge = ({ children, variant = 'custom', className = '' }) => {
  let badgeClasses = 'badge inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full';
  let defaultText = '';

  switch (variant) {
    case 'sale':
      badgeClasses = cn(badgeClasses, 'badge-sale bg-red-500 text-white shadow-sm');
      defaultText = 'SALE';
      break;
    case 'new':
      badgeClasses = cn(badgeClasses, 'badge-new bg-primary-500 text-white shadow-sm');
      defaultText = 'NEW';
      break;
    case 'bestseller':
      badgeClasses = cn(badgeClasses, 'badge-bestseller bg-secondary-500 text-white shadow-sm');
      defaultText = 'BESTSELLER';
      break;
    case 'outOfStock':
      badgeClasses = cn(badgeClasses, 'bg-gray-200 text-gray-700 dark:bg-dark-700 dark:text-dark-300');
      defaultText = 'OUT OF STOCK';
      break;
    case 'custom':
    default:
      badgeClasses = cn(badgeClasses, 'bg-gray-100 text-gray-800 dark:bg-dark-800 dark:text-gray-200');
      break;
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(badgeClasses, className)}
    >
      {children || defaultText}
    </motion.span>
  );
};

export default Badge;
