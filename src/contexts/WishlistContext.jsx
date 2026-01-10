import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

// Custom hook for using wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } else {
      // For non-authenticated users, use general wishlist
      const saved = localStorage.getItem('wishlist_guest');
      setWishlist(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Save wishlist when it changes
  useEffect(() => {
    const key = user ? `wishlist_${user.id}` : 'wishlist_guest';
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      setWishlist(prev => [...prev, { ...product, addedAt: new Date().toISOString() }]);
      return true; // Added successfully
    }
    return false; // Already exists
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false; // Removed
    } else {
      addToWishlist(product);
      return true; // Added
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    toggleWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};