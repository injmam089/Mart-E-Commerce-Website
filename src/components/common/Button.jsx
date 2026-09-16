import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  const baseClasses = 'btn flex items-center justify-center font-medium transition-all duration-200';
  
  const sizeClasses = {
    sm: 'btn-sm text-sm px-3 py-1.5 rounded-lg',
    md: 'btn-md text-base px-4 py-2 rounded-xl',
    lg: 'btn-lg text-lg px-6 py-3 rounded-2xl',
  };
  
  const variantClasses = {
    primary: 'btn-primary bg-primary-600 text-white hover:bg-primary-700 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]',
    secondary: 'btn-secondary bg-secondary-500 text-white hover:bg-secondary-600 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    outline: 'btn-outline border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/30',
    ghost: 'btn-ghost text-dark-700 hover:bg-gray-100 dark:text-dark-300 dark:hover:bg-dark-800',
    danger: 'btn-danger bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]',
  };

  const isDisabled = disabled || loading;
  
  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
