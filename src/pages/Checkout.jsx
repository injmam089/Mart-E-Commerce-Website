import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { generateOrderId } from '../utils/helpers';
import CheckoutForm from '../components/checkout/CheckoutForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const Checkout = () => {
  const { cart, clearCart, subtotal, shipping, tax, discount, total } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zip || '',
    country: user?.address?.country || 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    method: 'credit_card',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleNextStep = (e) => {
    e?.preventDefault();
    if (step === 1) {
      if (!shippingData.firstName || !shippingData.email || !shippingData.address || !shippingData.city) {
        toast.error('Please fill in all required shipping fields');
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      if (paymentData.method === 'credit_card' && (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv)) {
        toast.error('Please complete your payment details');
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      id: generateOrderId(),
      items: [...cart],
      subtotal,
      shipping,
      tax,
      discount,
      total,
      status: 'Processing',
      shippingAddress: shippingData,
      paymentMethod: paymentData.method,
      createdAt: new Date().toISOString()
    };

    if (isAuthenticated) {
      addOrder(newOrder);
    }

    clearCart();
    toast.success('Order placed successfully!');
    navigate('/order-success', { state: { order: newOrder } });
  };

  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' }
  ];

  if (cart.length === 0) return null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-50 dark:bg-dark-900 pb-20"
    >
      <div className="container-custom pt-8">
        <nav className="text-sm mb-6 text-dark-500 dark:text-dark-400">
          Home &gt; Cart &gt; Checkout
        </nav>

        {/* Steps Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-dark-700 z-0"></div>
            
            {steps.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isCurrent ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/30' :
                    'bg-gray-200 text-gray-500 dark:bg-dark-700 dark:text-dark-400'
                  }`}>
                    {isCompleted ? <Check size={20} /> : s.num}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isCurrent ? 'text-primary-600 dark:text-primary-400' : 'text-dark-500 dark:text-dark-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card p-6 md:p-8"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-dark-700 pb-4">
                    <h2 className="text-2xl font-bold dark:text-dark-100">Shipping Information</h2>
                    {!isAuthenticated && (
                      <span className="text-sm text-dark-500 dark:text-dark-400">
                        Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Log in</Link>
                      </span>
                    )}
                  </div>
                  <form onSubmit={handleNextStep}>
                    <CheckoutForm data={shippingData} onChange={setShippingData} />
                    <div className="mt-8 flex justify-end">
                      <button type="submit" className="btn btn-primary btn-lg px-8">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-dark-700 pb-4">
                    <ShieldCheck size={24} className="text-green-500" />
                    <h2 className="text-2xl font-bold dark:text-dark-100">Secure Payment</h2>
                  </div>
                  <form onSubmit={handleNextStep}>
                    <PaymentForm data={paymentData} onChange={setPaymentData} />
                    <div className="mt-8 flex justify-between items-center">
                      <button type="button" onClick={() => setStep(1)} className="btn btn-ghost text-dark-600 dark:text-dark-300">
                        Back to Shipping
                      </button>
                      <button type="submit" className="btn btn-primary btn-lg px-8">
                        Review Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6 md:p-8">
                    <h2 className="text-2xl font-bold dark:text-dark-100 mb-6 border-b border-gray-100 dark:border-dark-700 pb-4">Review Your Order</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-lg dark:text-dark-200">Shipping Address</h3>
                          <button onClick={() => setStep(1)} className="text-primary-600 hover:underline text-sm">Edit</button>
                        </div>
                        <div className="text-dark-600 dark:text-dark-400 text-sm space-y-1 bg-gray-50 dark:bg-dark-800 p-4 rounded-lg">
                          <p className="font-semibold">{shippingData.firstName} {shippingData.lastName}</p>
                          <p>{shippingData.address}</p>
                          <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                          <p>{shippingData.country}</p>
                          <p className="mt-2 text-dark-500">{shippingData.email} • {shippingData.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-lg dark:text-dark-200">Payment Method</h3>
                          <button onClick={() => setStep(2)} className="text-primary-600 hover:underline text-sm">Edit</button>
                        </div>
                        <div className="text-dark-600 dark:text-dark-400 text-sm bg-gray-50 dark:bg-dark-800 p-4 rounded-lg h-[132px] flex flex-col justify-center">
                          {paymentData.method === 'credit_card' ? (
                            <>
                              <p className="font-semibold capitalize">Credit Card</p>
                              <p>Ending in {paymentData.cardNumber.slice(-4) || 'XXXX'}</p>
                            </>
                          ) : (
                            <p className="font-semibold capitalize">{paymentData.method.replace('_', ' ')}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-dark-700">
                      <button type="button" onClick={() => setStep(2)} className="btn btn-ghost text-dark-600 dark:text-dark-300">
                        Back to Payment
                      </button>
                      <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg px-8 shadow-lg shadow-primary-500/30">
                        Place Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-1 sticky top-24">
            <OrderSummary compact />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
