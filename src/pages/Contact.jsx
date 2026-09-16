import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Address', details: '123 Commerce Street, New York, NY 10001' },
    { icon: Phone, title: 'Phone', details: '+1 (555) 123-4567' },
    { icon: Mail, title: 'Email', details: 'support@novamart.com' },
    { icon: Clock, title: 'Working Hours', details: 'Mon - Fri: 9AM - 6PM EST' },
  ];

  return (
    <motion.div 
      className="container-custom section-padding min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="text-sm breadcrumbs text-dark-500 dark:text-dark-400 mb-6">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-dark-900 dark:text-dark-100">Contact Us</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">Get in Touch</h1>
        <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto text-lg">
          Have a question or need assistance? We're here to help. Fill out the form below or reach out to us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="card p-8 bg-white dark:bg-dark-800 shadow-xl border border-gray-100 dark:border-dark-700">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-base w-full bg-gray-50 dark:bg-dark-900"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-base w-full bg-gray-50 dark:bg-dark-900"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-base w-full bg-gray-50 dark:bg-dark-900"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Return Request">Return Request</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="input-base w-full bg-gray-50 dark:bg-dark-900 resize-none py-3"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-lg btn-primary w-full flex justify-center items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="w-5 h-5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="card p-6 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 dark:text-dark-100 mb-1">{info.title}</h3>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">{info.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30 mt-6">
            <h3 className="font-bold text-dark-900 dark:text-dark-100 mb-4 text-center">Follow Us</h3>
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-96 bg-gray-200 dark:bg-dark-800 rounded-2xl overflow-hidden relative flex items-center justify-center border border-gray-300 dark:border-dark-700">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="text-center z-10 flex flex-col items-center">
          <MapPin className="w-12 h-12 text-primary-500 mb-2" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100">Map View</h3>
          <p className="text-dark-500 dark:text-dark-400">Interactive map integration would go here</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
