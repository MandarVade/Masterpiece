// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  loginAPI,
  registerAPI,
  logoutAPI,
  refreshAPI,
  getProfileAPI,
  setAccessToken,
  clearAccessToken
} from '../api/apiclient.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // keep only minimal local cache; actual source-of-truth is backend
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loadingAuth, setLoadingAuth] = useState(true); // initial bootstrapping
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // attempt refresh on mount to obtain access token & profile
  const bootstrapAuth = useCallback(async () => {
    setLoadingAuth(true);
    try {
      const refreshRes = await refreshAPI(); // will use httpOnly cookie
      const token = refreshRes?.accessToken || refreshRes?.data?.accessToken;
      if (token) {
        setAccessToken(token);
        // try to fetch profile
        const profileRes = await getProfileAPI();
        const userData = profileRes?.data || profileRes?.user || profileRes;
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        // maybe server returns profile inside refresh
        const profileRes = refreshRes?.data || refreshRes;
        if (profileRes?.user) {
          setUser(profileRes.user);
          localStorage.setItem('user', JSON.stringify(profileRes.user));
        }
      }
    } catch (err) {
      // refresh failed — user remains null
      setUser(null);
      clearAccessToken();
      localStorage.removeItem('user');
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  // login wrapper
  const login = async (email, password) => {
    const res = await loginAPI({ email, password });
    const token = res?.data?.accessToken || res?.accessToken || res?.data?.data?.accessToken;
    if (token) setAccessToken(token);
    // fetch profile (some backends return user in response)
    try {
      const profileRes = await getProfileAPI();
      const userData = profileRes?.data || profileRes?.user || profileRes;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      // fallback: backend might have sent user in login response
      const userData = res?.data?.user || res?.user || res?.data?.data?.user;
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    setShowAuthModal(false);
    return res;
  };

  // signup wrapper (expects FormData for avatar upload)
  const signup = async (name, email, password, avatarFile = null) => {
    const fd = new FormData();
    fd.append('fullname', name);
    fd.append('email', email);
    fd.append('password', password);
    // default role: buyer — change if you have a role selector
    fd.append('role', 'buyer');
    if (avatarFile) fd.append('avatar', avatarFile);

    const res = await registerAPI(fd);
    const token = res?.data?.accessToken || res?.accessToken || res?.data?.data?.accessToken;
    if (token) setAccessToken(token);

    // fetch profile or take from response
    try {
      const profileRes = await getProfileAPI();
      const userData = profileRes?.data || profileRes?.user || profileRes;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      const userData = res?.data?.user || res?.user || res?.data?.data?.user;
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    setShowAuthModal(false);
    return res;
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
    clearAccessToken();
    localStorage.removeItem('user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loadingAuth,
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
