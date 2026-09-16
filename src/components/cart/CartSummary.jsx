import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CouponInput from './CouponInput';
import { formatCurrency, cn } from '../../utils/helpers';

// CartSummary - Order summary sidebar for the cart page
const CartSummary = () => {
  const { cart, subtotal, shipping, tax, discount, total } = useCart();
  
  const isEmpty = cart.length === 0;

  return (
    <div className="card p-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 sticky top-24">
      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-dark-600 dark:text-dark-300">
          <span>Subtotal</span>
          <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center text-dark-600 dark:text-dark-300">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-green-600 dark:text-green-400">FREE</span>
          ) : (
            <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(shipping)}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-dark-600 dark:text-dark-300">
          <span>Estimated Tax</span>
          <span className="font-medium text-dark-900 dark:text-white">{formatCurrency(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}
      </div>

      <div className="divider my-4"></div>

      <div className="flex justify-between items-end mb-8">
        <span className="text-lg font-bold text-dark-900 dark:text-white">Total</span>
        <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="mb-6">
        <CouponInput />
      </div>

      <Link 
        to={isEmpty ? "#" : "/checkout"} 
        className={cn(
          "btn btn-lg w-full flex justify-center items-center group",
          isEmpty ? "btn-outline opacity-50 cursor-not-allowed pointer-events-none" : "btn-primary"
        )}
      >
        Proceed to Checkout
        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-dark-500 dark:text-dark-400">
          <Lock size={14} />
          Secure Encrypted Checkout
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-dark-500 dark:text-dark-400">
          <ShieldCheck size={14} className="text-green-500" />
          100% Satisfaction Guarantee
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
