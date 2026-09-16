import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('novamart-user', null);
  const [users, setUsers] = useLocalStorage('novamart-users', []);
  const [allOrders, setAllOrders] = useLocalStorage('novamart-orders', []);

  const isAuthenticated = !!user;

  const login = (email, password) => {
    if (email === 'demo@novamart.com' && password === 'password123') {
      const demoUser = {
        id: 'user-0',
        name: 'Demo User',
        email: 'demo@novamart.com',
        avatar: 'https://picsum.photos/seed/demo/100/100',
        phone: '123-456-7890',
        address: { street: '123 Main St', city: 'Tech City', state: 'CA', zip: '90210', country: 'USA' },
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      toast.success('Logged in successfully');
      return { success: true, message: 'Logged in successfully' };
    }

    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast.success('Logged in successfully');
      return { success: true, message: 'Logged in successfully' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const userExists = users.some((u) => u.email === userData.email);
    if (userExists) {
      return { success: false, message: 'User with this email already exists' };
    }

    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      avatar: `https://picsum.photos/seed/${userData.name.replace(/\s+/g, '')}/100/100`,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    toast.success('Account created successfully');
    return { success: true, message: 'Account created successfully' };
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    toast.success('Profile updated successfully');
  };

  const addOrder = (order) => {
    if (!user) return;
    const newOrder = {
      ...order,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    setAllOrders((prev) => [newOrder, ...prev]);
  };

  const userOrders = useMemo(() => {
    if (!user) return [];
    return allOrders.filter((o) => o.userId === user.id);
  }, [user, allOrders]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        addOrder,
        orders: userOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
