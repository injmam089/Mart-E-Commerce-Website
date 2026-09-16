import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Rating = ({ 
  value = 0, 
  onChange, 
  size = 'md', 
  showValue = false, 
  totalReviews,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const isInteractive = typeof onChange === 'function';

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const iconSize = sizeClasses[size];
  const displayValue = hoverValue > 0 ? hoverValue : value;

  const handleMouseEnter = (index) => {
    if (isInteractive) setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (isInteractive) setHoverValue(0);
  };

  const handleClick = (index) => {
    if (isInteractive) onChange(index);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div 
        className={cn("flex", isInteractive ? "cursor-pointer" : "")}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((index) => {
          const isFull = index <= displayValue;
          const isPartial = !isFull && index - 1 < displayValue;
          const fillPercent = isPartial ? Math.round((displayValue % 1) * 100) : 0;
          
          return (
            <div 
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(index)}
            >
              <Star 
                className={cn(
                  iconSize, 
                  isFull 
                    ? "fill-secondary-400 text-secondary-400" 
                    : "fill-transparent text-gray-300 dark:text-dark-600",
                  isInteractive && "transition-transform hover:scale-110"
                )} 
              />
              {isPartial && (
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${fillPercent}%` }}
                >
                  <Star className={cn(iconSize, "fill-secondary-400 text-secondary-400")} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-dark-900 dark:text-white">
          {Number(value).toFixed(1)}
        </span>
      )}
      
      {totalReviews !== undefined && (
        <span className="ml-1 text-xs text-dark-500 dark:text-dark-400">
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default Rating;
