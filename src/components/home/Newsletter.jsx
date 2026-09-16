// Newsletter - Newsletter subscription section
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Welcome! You're now subscribed to our newsletter.");
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-400/20 dark:bg-secondary-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto bg-white dark:bg-dark-800 rounded-2xl shadow-lg flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400">
            <Mail className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dark-900 dark:text-white">
            Stay in the Loop
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 mb-8">
            Subscribe for exclusive deals, new arrivals, and insider-only discounts.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-base w-full pl-11 py-3 h-auto text-base rounded-xl shadow-sm border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-lg btn-primary rounded-xl whitespace-nowrap sm:w-auto w-full"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          <p className="mt-4 text-sm text-dark-500 dark:text-dark-400">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
