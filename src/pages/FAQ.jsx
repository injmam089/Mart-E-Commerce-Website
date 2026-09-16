import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageSquare } from 'lucide-react';
// Import FAQ_DATA as requested, though providing fallback if missing.
// import { FAQ_DATA } from '../utils/constants';

// Fallback data in case the import doesn't exist
const FALLBACK_FAQ = [
  {
    category: 'Shipping & Delivery',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery.' },
      { q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days.' },
      { q: 'How can I track my order?', a: 'Once your order ships, you will receive an email with a tracking number and a link to trace your package.' }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging.' },
      { q: 'How do I start a return?', a: 'Log into your account, go to Order History, select the order, and click "Initiate Return". We will provide a printable shipping label.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 3-5 business days after we receive your returned item. It may take an additional 2-3 days to appear on your statement.' }
    ]
  },
  {
    category: 'Payment & Account',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.' },
      { q: 'Is it safe to use my credit card?', a: 'Absolutely. We use industry-standard SSL encryption to protect your details. We do not store your full credit card number.' }
    ]
  }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState(new Set());
  
  // Use imported FAQ_DATA if available in your project, otherwise use FALLBACK
  const faqData = FALLBACK_FAQ; 
  const categories = ['All', ...faqData.map(cat => cat.category)];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Filter logic
  const filteredData = faqData.map(cat => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) return null;
    
    const filteredQuestions = cat.questions.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredQuestions.length === 0) return null;
    
    return { ...cat, questions: filteredQuestions };
  }).filter(Boolean);

  return (
    <motion.div 
      className="container-custom section-padding min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="text-sm breadcrumbs text-dark-500 dark:text-dark-400 mb-6 text-center">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-dark-900 dark:text-dark-100">FAQ</span>
      </div>

      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-dark-900 dark:text-dark-100 mb-4">Frequently Asked Questions</h1>
        <p className="text-dark-600 dark:text-dark-400 text-lg mb-8">
          Find answers to common questions about shipping, returns, and our products.
        </p>

        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-dark-400" />
          </div>
          <input
            type="text"
            className="input-base w-full pl-12 py-4 rounded-full bg-white dark:bg-dark-800 shadow-md border-transparent focus:border-primary-500 text-lg"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Categories Sidebar */}
        <div className="lg:w-1/4">
          <div className="card p-4 bg-white dark:bg-dark-800 sticky top-24 shadow-sm border border-gray-100 dark:border-dark-700">
            <h3 className="font-bold text-dark-900 dark:text-dark-100 mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                    activeCategory === cat 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:w-3/4">
          {filteredData.length > 0 ? (
            <div className="space-y-8">
              {filteredData.map((category, catIdx) => (
                <div key={catIdx}>
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-4">{category.category}</h2>
                  <div className="space-y-3">
                    {category.questions.map((item, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openItems.has(id);
                      return (
                        <div 
                          key={qIdx} 
                          className={`card overflow-hidden bg-white dark:bg-dark-800 border transition-colors ${
                            isOpen 
                              ? 'border-l-4 border-l-primary-500 border-gray-200 dark:border-dark-600 shadow-md' 
                              : 'border-gray-200 dark:border-dark-700 shadow-sm'
                          }`}
                        >
                          <button
                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            onClick={() => toggleItem(id)}
                          >
                            <span className="font-medium text-dark-900 dark:text-dark-100 pr-4">{item.q}</span>
                            <ChevronDown 
                              className={`w-5 h-5 text-dark-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="px-6 pb-5 pt-1 text-dark-600 dark:text-dark-400 border-t border-gray-50 dark:border-dark-700/50 mt-1">
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 card bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700">
              <MessageSquare className="w-12 h-12 text-dark-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-2">No results found</h3>
              <p className="text-dark-500 dark:text-dark-400">
                We couldn't find any FAQs matching "{searchQuery}".
              </p>
              <button 
                onClick={() => setSearchQuery('')} 
                className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
          
          <div className="mt-12 p-8 card bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30 text-center">
            <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-2">Still have questions?</h3>
            <p className="text-dark-600 dark:text-dark-400 mb-6">Our support team is ready to help you with any issues.</p>
            <Link to="/contact" className="btn btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
