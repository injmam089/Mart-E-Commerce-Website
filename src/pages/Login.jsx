import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const response = login(email, password);
      setIsLoading(false);
      
      if (response.success) {
        toast.success(response.message);
        navigate('/');
      } else {
        toast.error(response.message);
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    toast.error(`${provider} login is not available in demo mode.`);
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold tracking-tight gradient-text">
                NovaMart
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Welcome Back</h1>
            <p className="text-dark-500 dark:text-dark-400 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type="email"
                  className="input-base w-full pl-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                  className="input-base w-full pl-10 pr-10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-dark-600 dark:bg-dark-800" />
                <span className="text-dark-600 dark:text-dark-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-lg btn-primary w-full shadow-lg shadow-primary-500/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-dark-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-dark-500 dark:text-dark-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button onClick={() => handleSocialLogin('Google')} className="btn btn-ghost border border-gray-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 hover:bg-gray-50 dark:hover:bg-dark-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button onClick={() => handleSocialLogin('Apple')} className="btn btn-ghost border border-gray-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 hover:bg-gray-50 dark:hover:bg-dark-700">
                <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 0-1.855.151-3.6 1.258-1.58 1.002-2.585 2.658-2.585 2.658s1.614-.23 3.45-1.13c1.55-.76 2.735-2.786 2.735-2.786zm-6.136 4.34c-1.85-.298-3.375 1.124-4.887 1.124-1.512 0-2.825-1.125-4.225-1.125-1.925 0-4.012 1.488-5.012 3.663-1.425 3.087-1.163 8.35 1.775 11.537 1.275 1.375 2.862 2.787 4.575 2.787 1.763 0 2.225-1.025 4.375-1.025 2.175 0 2.563 1.025 4.413 1.025 1.787 0 3.125-1.4 4.325-2.787 1.637-1.9 2.15-3.325 2.15-3.325s-2.887-1.112-2.887-4.475c0-2.925 2.45-4.187 2.45-4.187-1.4-2.113-3.662-2.313-4.525-2.313z"/>
                </svg>
              </button>
              <button onClick={() => handleSocialLogin('Facebook')} className="btn btn-ghost border border-gray-200 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 hover:bg-gray-50 dark:hover:bg-dark-700">
                <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-dark-600 dark:text-dark-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Register
            </Link>
          </p>
          
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-xs text-center text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: demo@novamart.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
