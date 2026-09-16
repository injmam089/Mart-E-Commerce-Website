import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';
import { 
  User, Package, MapPin, Settings, ChevronRight, 
  LogOut, Edit3, Camera, Bell, Moon, Sun, Trash2 
} from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const tabVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      updateProfile({ name, email, phone });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }, 500);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
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
      <div className="mb-8">
        <div className="text-sm breadcrumbs text-dark-500 dark:text-dark-400 mb-2">
          <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-900 dark:text-dark-100">My Account</span>
        </div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-100">My Account</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-1">
          <div className="card bg-white dark:bg-dark-800 p-6 shadow-sm border border-gray-200 dark:border-dark-700 sticky top-24">
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100 dark:border-dark-700">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 border-4 border-white dark:border-dark-800 overflow-hidden shadow-md">
                  <img 
                    src={user.avatar || `https://picsum.photos/seed/${user.name}/100/100`} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-dark-900 dark:text-dark-100">{user.name}</h2>
              <p className="text-sm text-dark-500 dark:text-dark-400">{user.email}</p>
              <p className="text-xs text-dark-400 mt-2 bg-gray-100 dark:bg-dark-700 px-3 py-1 rounded-full">
                Member since {new Date(user.createdAt || Date.now()).getFullYear()}
              </p>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                        : 'text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-1 lg:col-span-3">
          <div className="card bg-white dark:bg-dark-800 p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-700 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" variants={tabVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Profile Information</h2>
                    {!isEditing && (
                      <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-sm flex items-center gap-2">
                        <Edit3 className="w-4 h-4" /> Edit Profile
                      </button>
                    )}
                  </div>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Full Name</label>
                        <input 
                          type="text" 
                          className="input-base w-full bg-gray-50 dark:bg-dark-900 disabled:opacity-60" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Email Address</label>
                        <input 
                          type="email" 
                          className="input-base w-full bg-gray-50 dark:bg-dark-900 disabled:opacity-60" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 dark:text-dark-300">Phone Number</label>
                        <input 
                          type="tel" 
                          className="input-base w-full bg-gray-50 dark:bg-dark-900 disabled:opacity-60" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-dark-700">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div key="orders" variants={tabVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-6">Order History</h2>
                  
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-dark-700">
                            <div>
                              <p className="font-bold text-dark-900 dark:text-dark-100">{order.id}</p>
                              <p className="text-sm text-dark-500 dark:text-dark-400">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                                {formatCurrency(order.total)}
                              </span>
                              <span className="badge bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 overflow-x-auto pb-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex-shrink-0 w-16 h-16 rounded bg-gray-100 dark:bg-dark-700 overflow-hidden relative group">
                                <img src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/100/100`} alt={item.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-white text-xs font-medium">x{item.quantity}</span>
                                </div>
                              </div>
                            ))}
                            {order.items.length > 0 && (
                              <button className="text-sm font-medium text-primary-600 dark:text-primary-400 whitespace-nowrap ml-2 hover:underline">
                                View Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-2">No orders yet</h3>
                      <p className="text-dark-500 dark:text-dark-400 mb-6 max-w-md">
                        When you place an order, it will appear here. Start exploring our collection!
                      </p>
                      <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div key="addresses" variants={tabVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Saved Addresses</h2>
                    <button className="btn btn-outline btn-sm">Add New Address</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Address */}
                    <div className="border-2 border-primary-500 dark:border-primary-500 rounded-lg p-5 relative">
                      <span className="absolute -top-3 left-4 bg-white dark:bg-dark-800 px-2 text-xs font-bold text-primary-600 dark:text-primary-400">Default</span>
                      <h3 className="font-bold text-dark-900 dark:text-dark-100 mb-1">{user.name}</h3>
                      <p className="text-sm text-dark-600 dark:text-dark-400 mb-4">
                        123 Commerce Street, Suite 400<br />
                        New York, NY 10001<br />
                        United States<br />
                        Phone: {user.phone || '+1 (555) 123-4567'}
                      </p>
                      <div className="flex gap-3">
                        <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">Edit</button>
                        <button className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div key="settings" variants={tabVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-6">Account Settings</h2>
                  
                  <div className="space-y-8 max-w-2xl">
                    {/* Appearance */}
                    <div>
                      <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 mb-4 border-b border-gray-100 dark:border-dark-700 pb-2">Appearance</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-900 dark:text-dark-100">Dark Mode</p>
                          <p className="text-sm text-dark-500 dark:text-dark-400">Toggle dark/light theme</p>
                        </div>
                        <button 
                          onClick={toggleTheme}
                          className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-dark-600 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                        >
                          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 mb-4 border-b border-gray-100 dark:border-dark-700 pb-2">Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-dark-900 dark:text-dark-100">Order Updates</p>
                            <p className="text-sm text-dark-500 dark:text-dark-400">Receive emails about your order status</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 bg-gray-100 border-gray-300 dark:bg-dark-700 dark:border-dark-600" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-dark-900 dark:text-dark-100">Promotions</p>
                            <p className="text-sm text-dark-500 dark:text-dark-400">Receive emails about sales and new products</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 bg-gray-100 border-gray-300 dark:bg-dark-700 dark:border-dark-600" />
                        </label>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div>
                      <h3 className="text-lg font-bold text-red-600 dark:text-red-500 mb-4 border-b border-red-100 dark:border-red-900/30 pb-2">Danger Zone</h3>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-dark-900 dark:text-dark-100">Delete Account</p>
                          <p className="text-sm text-dark-500 dark:text-dark-400">Permanently delete your account and all data</p>
                        </div>
                        <button className="btn btn-danger flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
