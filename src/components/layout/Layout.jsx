import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import useScrollToTop from '../../hooks/useScrollToTop';

const Layout = ({ children }) => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 text-dark-900 dark:text-dark-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-dark-800 dark:text-white',
          style: {
            borderRadius: '12px',
            background: 'var(--toast-bg, #fff)',
            color: 'var(--toast-color, #1e293b)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
