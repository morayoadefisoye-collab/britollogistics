import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import AuthGuard from './components/AuthGuard';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import WhatWeSell from './pages/WhatWeSell';
import Wholesale from './pages/Wholesale';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import './App.css';

function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Ensure we have an image for the cart item
    const productImage = product.image || 
                        (Array.isArray(product.images) ? product.images[0] : product.images) || 
                        '/placeholder.jpg';
    
    const existing = cart.find(item => 
      item.id === product.id && 
      item.size === (product.size || 'N/A') && 
      item.color === (product.color || 'N/A')
    );
    
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id && 
        item.size === (product.size || 'N/A') && 
        item.color === (product.color || 'N/A')
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity,
        image: productImage, // Ensure image is always set
        size: product.size || 'N/A',
        color: product.color || 'N/A',
        addedAt: new Date().toISOString()
      }]);
    }
  };

  const removeFromCart = (productId, size = 'N/A', color = 'N/A') => {
    setCart(cart.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (productId, quantity, size = 'N/A', color = 'N/A') => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
    } else {
      setCart(cart.map(item => 
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shopping_cart');
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <WishlistProvider>
            <Router>
              <ScrollToTopOnMount />
              <div className="app">
                <ErrorBoundary>
                  <AuthGuard>
                    <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
                    <Breadcrumb />
                    <main id="main-content">
                      <Routes>
                        <Route path="/" element={<Home addToCart={addToCart} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/what-we-sell" element={<WhatWeSell />} />
                        <Route path="/wholesale" element={<Wholesale />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/returns" element={<Returns />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/track-order" element={<TrackOrder />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
                        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
                        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
                      </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                    <ScrollToTop />
                  </AuthGuard>
                </ErrorBoundary>
              </div>
            </Router>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
