import React from 'react';
import { cn } from '../../utils/helpers';

// CheckoutForm - Shipping information form for checkout process
const CheckoutForm = ({ formData, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "input-base w-full",
          errors?.[name] ? "border-red-500 focus:ring-red-500/20" : ""
        )}
      />
      {errors?.[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="card p-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700">
      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">Shipping Address</h3>
      
      <div className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" placeholder="John" />
          <InputField label="Last Name" name="lastName" placeholder="Doe" />
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" />
          <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>

        {/* Address */}
        <InputField label="Street Address" name="address" placeholder="123 Main St, Apt 4B" />

        {/* City / State Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="City" name="city" placeholder="New York" />
          <InputField label="State / Province" name="state" placeholder="NY" />
        </div>

        {/* Zip / Country Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="ZIP / Postal Code" name="zipCode" placeholder="10001" />
          
          <div className="w-full">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country || 'US'}
              onChange={handleChange}
              className={cn(
                "input-base w-full appearance-none bg-no-repeat",
                errors?.country ? "border-red-500 focus:ring-red-500/20" : ""
              )}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.2em'
              }}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
            </select>
            {errors?.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
