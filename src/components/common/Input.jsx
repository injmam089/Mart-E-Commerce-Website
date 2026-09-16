import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
  className = '',
  name,
  id,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseInputClasses = cn(
    'input-base w-full rounded-xl border bg-white px-4 py-2 text-dark-900 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-800 dark:text-dark-100',
    error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-dark-700 dark:focus:border-primary-500',
    icon ? 'pl-10' : '',
    isPassword ? 'pr-10' : '',
    className
  );

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-dark-700 dark:text-dark-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            {icon}
          </div>
        )}
        
        {isTextarea ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={baseInputClasses}
            rows={4}
            {...rest}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={baseInputClasses}
            {...rest}
          />
        )}

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
