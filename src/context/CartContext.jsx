import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';
import { COUPON_CODES } from '../utils/constants';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('novamart-cart', []);
  const [appliedCoupon, setAppliedCoupon] = useLocalStorage('novamart-coupon', null);

  const addToCart = (product, quantity = 1, color = null, size = null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity in cart`);
        return newCart;
      }

      toast.success(`${product.name} added to cart`);
      return [...prevCart, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.value / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = appliedCoupon.value;
    }
  }

  const total = Math.max(0, subtotal + shipping + tax - discount);

  const applyCoupon = (code) => {
    const coupon = COUPON_CODES.find((c) => c.code.toUpperCase() === code.toUpperCase());
    
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    
    if (subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of $${coupon.minOrder} required` };
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon ${code} applied successfully!`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
