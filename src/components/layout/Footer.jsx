import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

const FOOTER_LINKS = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Store Locations', path: '/stores' },
    { name: 'Blog', path: '/blog' },
    { name: 'Reviews', path: '/reviews' }
  ],
  support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Returns & Refunds', path: '/returns' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Contact Us', path: '/contact' }
  ]
};

const SOCIAL_LINKS = [
  { icon: Facebook, path: '#' },
  { icon: Twitter, path: '#' },
  { icon: Instagram, path: '#' },
  { icon: Youtube, path: '#' }
];

const Footer = () => {
  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-dark-300 pt-16 pb-8 border-t border-dark-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-1 inline-block">
              <span className="text-2xl font-extrabold text-primary-400 tracking-tight">Nova</span>
              <span className="text-2xl font-extrabold text-white tracking-tight">Mart</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              Your premium destination for high-quality electronics, fashion, and home goods. We deliver happiness right to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.path}
                    className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-dark-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-dark-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Connected</h4>
            <p className="text-dark-400 text-sm mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder-dark-500"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full btn btn-primary flex justify-center items-center gap-2 py-3"
              >
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} NovaMart. All rights reserved.
          </p>
          <div className="flex gap-3 items-center opacity-70">
            <span className="px-2 py-1 bg-dark-800 rounded text-xs font-semibold">Visa</span>
            <span className="px-2 py-1 bg-dark-800 rounded text-xs font-semibold">Mastercard</span>
            <span className="px-2 py-1 bg-dark-800 rounded text-xs font-semibold">PayPal</span>
            <span className="px-2 py-1 bg-dark-800 rounded text-xs font-semibold">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
