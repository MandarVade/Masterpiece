// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import {
  fetchCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeFromCartAPI,
  clearCartAPI
} from '../api/apiclient.js';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // persist to localStorage always (fast UI), but sync with server when user present
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // fetch server cart on login (if user exists)
  useEffect(() => {
    let mounted = true;
    const loadServerCart = async () => {
      if (!user) return;
      try {
        const res = await fetchCartAPI();
        const items = res?.data || res?.cart || res;
        if (mounted && Array.isArray(items)) setCartItems(items.map(i => ({
          id: i.product?._id || i.product,
          quantity: i.quantity,
          price: i.product?.price || i.price || 0,
          title: i.product?.title || i.title || '',
          image: i.product?.images?.[0] || i.image || ''
        })));
      } catch (err) {
        // ignore — keep local cart
      }
    };
    loadServerCart();
    return () => { mounted = false; };
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    // optimistic local update
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...product, quantity }];
    });

    if (user) {
      try {
        await addToCartAPI({ productId: product.id, quantity });
      } catch (err) {
        // optionally rollback or show error
      }
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
    if (user) {
      try { await removeFromCartAPI(productId); } catch {}
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
    if (user) {
      try { await updateCartItemAPI(productId, { quantity }); } catch {}
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      try { await clearCartAPI(); } catch {}
    }
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      isInWishlist,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
