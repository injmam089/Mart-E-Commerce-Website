import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import ThemeToggle from '../common/ThemeToggle';
import MobileMenu from './MobileMenu';
import { cn } from '../../utils/helpers';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Categories', path: '/categories' },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Sale', path: '/sale' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled 
            ? 'glass-strong border-b border-gray-200/50 dark:border-dark-700/50 py-3' 
            : 'bg-white dark:bg-dark-900 py-4 lg:py-5'
        )}
      >
        <div className="container-custom flex items-center justify-between h-12 lg:h-14">
          
          {/* Mobile Menu Button & Search (Left side on mobile) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1 z-10 mx-auto lg:mx-0">
            <span className="text-2xl font-extrabold gradient-text tracking-tight">Nova</span>
            <span className="text-2xl font-extrabold text-dark-900 dark:text-white tracking-tight">Mart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 mx-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-[15px] font-medium transition-colors relative py-1 hover:text-primary-600 dark:hover:text-primary-400',
                  location.pathname === link.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-dark-600 dark:text-dark-300'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden lg:flex p-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggle className="hidden sm:flex" />

            <Link 
              to="/wishlist" 
              className="relative p-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="relative p-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:block">
              {isAuthenticated ? (
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || <User size={14} />
                    )}
                  </div>
                  <span className="text-sm font-medium text-dark-800 dark:text-dark-200 max-w-[100px] truncate">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center p-2 text-dark-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 shadow-lg overflow-hidden"
            >
              <div className="container-custom py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products, categories, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-dark-800 border-none rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-primary-500 dark:text-white"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navLinks={NAV_LINKS}
      />
    </>
  );
};

export default Navbar;
