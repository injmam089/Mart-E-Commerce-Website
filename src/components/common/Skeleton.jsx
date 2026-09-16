import React from 'react';
import { cn } from '../../utils/helpers';

export const SkeletonText = ({ width = '100%', height = '1rem', className = '' }) => (
  <div 
    className={cn('skeleton rounded bg-gray-200 dark:bg-dark-700', className)} 
    style={{ width, height }}
  />
);

export const SkeletonImage = ({ aspectRatio = '1/1', className = '' }) => (
  <div 
    className={cn('skeleton rounded-xl bg-gray-200 dark:bg-dark-700', className)} 
    style={{ aspectRatio }}
  />
);

export const SkeletonCircle = ({ size = '3rem', className = '' }) => (
  <div 
    className={cn('skeleton rounded-full bg-gray-200 dark:bg-dark-700', className)} 
    style={{ width: size, height: size }}
  />
);

export const SkeletonProductCard = () => {
  return (
    <div className="card rounded-2xl overflow-hidden bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 flex flex-col h-full">
      <div className="skeleton w-full h-[280px] bg-gray-200 dark:bg-dark-700" />
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <SkeletonText width="40%" height="0.875rem" />
        <SkeletonText width="90%" height="1.25rem" />
        <SkeletonText width="60%" height="1.25rem" />
        <div className="flex-grow" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonText width="30%" height="1.5rem" />
          <SkeletonText width="2.5rem" height="2.5rem" className="!rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default {
  Text: SkeletonText,
  Image: SkeletonImage,
  Circle: SkeletonCircle,
  ProductCard: SkeletonProductCard
};
