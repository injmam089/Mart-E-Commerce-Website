import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

// CouponInput - Handles discount codes in cart and checkout
const CouponInput = () => {
  const [code, setCode] = useState('');
  const { applyCoupon, removeCoupon, appliedCoupon } = useCart();

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = applyCoupon(code.trim());
    if (result.success) {
      toast.success(result.message);
      setCode('');
    } else {
      toast.error(result.message);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg p-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-md text-green-600 dark:text-green-400 shrink-0">
            <Tag size={16} />
          </div>
          <div>
            <div className="font-semibold text-green-700 dark:text-green-400 uppercase text-sm">
              {appliedCoupon.code}
            </div>
            <div className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              {appliedCoupon.description}
            </div>
          </div>
        </div>
        <button 
          onClick={removeCoupon}
          className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-300 p-1"
          aria-label="Remove coupon"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="flex gap-2">
      <div className="relative flex-grow">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
          <Tag size={16} />
        </span>
        <input 
          type="text" 
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Promo code"
          className="input-base pl-9 py-2 w-full text-sm"
        />
      </div>
      <button 
        type="submit" 
        disabled={!code.trim()}
        className="btn btn-outline text-sm px-4 py-2 disabled:opacity-50"
      >
        Apply
      </button>
    </form>
  );
};

export default CouponInput;
