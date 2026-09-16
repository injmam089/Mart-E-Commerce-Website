import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Breadcrumb = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={cn("flex text-sm text-dark-500 dark:text-dark-400", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 whitespace-nowrap overflow-x-auto pb-1 no-scrollbar">
        <li className="inline-flex items-center">
          <Link 
            to="/" 
            className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={`${item.path}-${index}`} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-dark-300 dark:text-dark-600 mx-1" />
              {isLast ? (
                <span className="font-semibold text-dark-900 dark:text-white truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-[100px] sm:max-w-none hidden sm:inline-block"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span className="sm:hidden text-dark-400">...</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
