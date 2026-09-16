import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const response = register(formData);
      setIsLoading(false);
      
      if (response.success) {
        toast.success(response.message);
        navigate('/');
      } else {
        toast.error(response.message);
      }
    }, 1000);
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800 py-12"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="glass-card w-full max-w-lg p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold tracking-tight gradient-text">
                NovaMart
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Create Account</h1>
            <p className="text-dark-500 dark:text-dark-400 mt-1">Join the NovaMart family</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  className="input-base w-full pl-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-dark-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="input-base w-full pl-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Phone (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-dark-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="input-base w-full pl-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-base w-full pl-10 pr-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="input-base w-full pl-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-dark-600 dark:bg-dark-800" />
                <span className="text-sm text-dark-600 dark:text-dark-400">
                  I agree to the <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-lg btn-primary w-full shadow-lg shadow-primary-500/30 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Creating account...</>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-dark-600 dark:text-dark-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
