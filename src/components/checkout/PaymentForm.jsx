import React, { useState } from 'react';
import { CreditCard, Wallet, Smartphone, ShieldAlert } from 'lucide-react';
import { cn } from '../../utils/helpers';

// PaymentForm - Simulated payment collection for checkout
const PaymentForm = ({ paymentData, onChange, errors }) => {
  const [activeMethod, setActiveMethod] = useState('card');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format card number with spaces
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    }
    // Format expiry date with slash
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
    }
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    onChange(name, formattedValue);
  };

  const methods = [
    { id: 'card', label: 'Credit Card', icon: CreditCard },
    { id: 'paypal', label: 'PayPal', icon: Wallet },
    { id: 'applepay', label: 'Apple Pay', icon: Smartphone }
  ];

  return (
    <div className="card p-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-dark-900 dark:text-white">Payment Method</h3>
      </div>

      {/* Demo Warning */}
      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl mb-6 text-amber-800 dark:text-amber-400">
        <ShieldAlert size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium">
          This is a demo application. No real payment processing will occur. You can use any fictional data to proceed.
        </p>
      </div>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setActiveMethod(method.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
              activeMethod === method.id
                ? "border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-900/20 dark:text-primary-400"
                : "border-gray-200 bg-white text-dark-600 hover:border-primary-300 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-400 dark:hover:border-dark-600"
            )}
          >
            <method.icon size={24} className="mb-2" />
            <span className="font-semibold text-sm">{method.label}</span>
          </button>
        ))}
      </div>

      {/* Card Form */}
      {activeMethod === 'card' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
              Name on Card
            </label>
            <input
              type="text"
              name="cardName"
              value={paymentData.cardName || ''}
              onChange={handleChange}
              placeholder="JOHN DOE"
              className={cn(
                "input-base w-full uppercase",
                errors?.cardName ? "border-red-500 focus:ring-red-500/20" : ""
              )}
            />
            {errors?.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
              Card Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                <CreditCard size={18} />
              </span>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber || ''}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                className={cn(
                  "input-base w-full pl-10 tracking-widest font-mono text-sm",
                  errors?.cardNumber ? "border-red-500 focus:ring-red-500/20" : ""
                )}
              />
            </div>
            {errors?.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate || ''}
                onChange={handleChange}
                placeholder="MM/YY"
                className={cn(
                  "input-base w-full tracking-widest font-mono text-sm",
                  errors?.expiryDate ? "border-red-500 focus:ring-red-500/20" : ""
                )}
              />
              {errors?.expiryDate && <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={paymentData.cvv || ''}
                onChange={handleChange}
                placeholder="***"
                maxLength="4"
                className={cn(
                  "input-base w-full tracking-widest font-mono text-sm",
                  errors?.cvv ? "border-red-500 focus:ring-red-500/20" : ""
                )}
              />
              {errors?.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}

      {activeMethod !== 'card' && (
        <div className="text-center py-8 animate-in fade-in zoom-in duration-300 border-2 border-dashed border-gray-200 dark:border-dark-700 rounded-xl">
          <p className="text-dark-600 dark:text-dark-300 mb-4 font-medium">
            You will be redirected to {methods.find(m => m.id === activeMethod)?.label} to complete your purchase securely.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
