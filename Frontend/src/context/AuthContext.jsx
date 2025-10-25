import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const login = (email, password) => {
    // Mock login - in real app, make API call
    const userData = {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`
    };
    setUser(userData);
    setShowAuthModal(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signup = (name, email, password) => {
    // Mock signup - in real app, make API call
    const userData = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}`
    };
    setUser(userData);
    setShowAuthModal(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode,
      openAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};