import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, User, Settings, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';

const MobileMenu = ({ isOpen, onClose, navLinks = [] }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const containerVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', bounce: 0, duration: 0.4 }
    },
    exit: { 
      x: '-100%',
      transition: { type: 'spring', bounce: 0, duration: 0.3 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1, 
      x: 0,
      transition: { delay: 0.1 + (i * 0.05), duration: 0.3 }
    })
  };

  const categories = [
    { name: 'Electronics', path: '/categories/electronics' },
    { name: 'Clothing', path: '/categories/clothing' },
    { name: 'Home & Kitchen', path: '/categories/home' },
    { name: 'Beauty', path: '/categories/beauty' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-[85%] max-w-sm h-full bg-white dark:bg-dark-900 shadow-2xl flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-800">
              <Link to="/" onClick={onClose} className="flex items-center gap-1">
                <span className="text-2xl font-extrabold gradient-text tracking-tight">Nova</span>
                <span className="text-2xl font-extrabold text-dark-900 dark:text-white tracking-tight">Mart</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-dark-500 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
              {/* Main Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div custom={i} variants={linkVariants} initial="hidden" animate="visible" key={link.name}>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="text-xl font-bold text-dark-900 dark:text-white py-3 border-b border-gray-50 dark:border-dark-800 flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronRight size={18} className="text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Top Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat, i) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={onClose}
                      className="bg-gray-50 dark:bg-dark-800 p-3 rounded-xl text-center text-sm font-medium text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100 dark:border-dark-800 bg-gray-50 dark:bg-dark-950 mt-auto">
              <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-sm font-medium text-dark-600 dark:text-dark-400">Theme</span>
                <ThemeToggle />
              </div>

              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center text-lg font-bold overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user?.name?.charAt(0).toUpperCase() || <User size={24} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-dark-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-dark-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/profile" onClick={onClose} className="btn btn-sm btn-outline flex justify-center py-2">
                      <Settings size={16} className="mr-2" /> Profile
                    </Link>
                    <Link to="/orders" onClick={onClose} className="btn btn-sm btn-outline flex justify-center py-2">
                      <ShoppingBag size={16} className="mr-2" /> Orders
                    </Link>
                  </div>
                  <button onClick={handleLogout} className="btn btn-md btn-ghost text-red-500 w-full flex justify-center mt-2">
                    <LogOut size={18} className="mr-2" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={onClose} className="btn btn-md btn-outline w-full flex justify-center">
                    <LogIn size={18} className="mr-2" /> Login
                  </Link>
                  <Link to="/register" onClick={onClose} className="btn btn-md btn-primary w-full flex justify-center">
                    <UserPlus size={18} className="mr-2" /> Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
