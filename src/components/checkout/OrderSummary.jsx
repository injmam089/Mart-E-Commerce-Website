import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import CouponInput from '../cart/CouponInput';

// OrderSummary - Compact summary for checkout page
const OrderSummary = () => {
  const { cart, subtotal, shipping, tax, discount, total } = useCart();

  return (
    <div className="card p-6 bg-gray-50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-700 lg:sticky lg:top-24">
      <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Your Order</h3>
      
      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6 custom-scrollbar">
        {cart.map((item) => {
          const currentPrice = calculateDiscount(item.price, item.discount);
          return (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-white dark:bg-dark-700 shrink-0 border border-gray-100 dark:border-dark-600 overflow-hidden relative">
                <img 
                  src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/100/100`} 
                  alt={item.name}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary-600 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-dark-800 z-10">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <h5 className="text-sm font-semibold text-dark-900 dark:text-white line-clamp-1">
                  {item.name}
                </h5>
                <div className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                  {item.selectedColor && `Color: ${item.selectedColor}`}
                  {item.selectedColor && item.selectedSize && ` | `}
                  {item.selectedSize && `Size: ${item.selectedSize}`}
                </div>
              </div>
              <div className="text-sm font-bold text-dark-900 dark:text-white flex items-center shrink-0">
                {formatCurrency(currentPrice * item.quantity)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <CouponInput />
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex justify-between text-sm text-dark-600 dark:text-dark-300">
          <span>Subtotal</span>
          <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-dark-600 dark:text-dark-300">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-medium text-green-600 dark:text-green-400">FREE</span>
          ) : (
            <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(shipping)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-dark-600 dark:text-dark-300">
          <span>Tax (8%)</span>
          <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-medium">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-700 flex justify-between items-end">
        <span className="text-base font-bold text-dark-900 dark:text-white">Total</span>
        <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
