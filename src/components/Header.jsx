import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';

function Header({ cartCount }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { getWishlistCount } = useWishlist();

  const wishlistCount = getWishlistCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home page with search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after navigation
      setMobileMenuOpen(false); // Close mobile menu
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="advanced-header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-announcements">
              <span>{t('returnGuarantee')}</span>
            </div>
            <div className="header-top-actions">
              <LanguageSelector />
              <Link to="/track-order" className="header-link">{t('trackOrder')}</Link>
              <Link to="/contact" className="header-link">{t('contact')}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="advanced-logo">
              <img src="/ladies wear/logo.jpg" alt="Everything By Britol Logo" className="logo-image" />
              <div className="logo-text">
                <h1>EVERYTHING BY BRITOL</h1>
              </div>
            </Link>
            
            <div className="header-search">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder={t('searchProducts')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="header-actions">
              {user ? (
                <div className="user-menu">
                  <div className="user-info">
                    <User size={20} />
                    <span className="user-name">{user.firstName}</span>
                  </div>
                  <button onClick={handleLogout} className="action-btn logout-btn" title={t('logout')}>
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button onClick={() => handleAuthClick('login')} className="auth-btn login-btn">
                    {t('login')}
                  </button>
                  <button onClick={() => handleAuthClick('signup')} className="auth-btn signup-btn">
                    {t('signup')}
                  </button>
                </div>
              )}
              
              <Link to="/wishlist" className="action-btn wishlist-btn" title={t('wishlist')}>
                <Heart size={20} />
                {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
              </Link>
              
              <Link to="/cart" className="cart-btn">
                <ShoppingCart size={20} />
                <span className="cart-text">{t('cart')}</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <div className={`nav-content ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('home')}
            </Link>
            <Link to="/what-we-sell" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('whatWeSell')}
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('about')}
            </Link>
            <Link to="/wholesale" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('wholesale')}
            </Link>
            <Link to="/testimonials" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('testimonials')}
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('contact')}
            </Link>
          </div>
        </div>
      </nav>


      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            
            <div className="mobile-nav-links">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t('home')}</Link>
              <Link to="/what-we-sell" onClick={() => setMobileMenuOpen(false)}>{t('whatWeSell')}</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</Link>
              <Link to="/wholesale" onClick={() => setMobileMenuOpen(false)}>{t('wholesale')}</Link>
              <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)}>{t('testimonials')}</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</Link>
            </div>

            <div className="mobile-actions">
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="mobile-wishlist">
                <Heart size={20} />
                <span>{t('wishlist')} ({wishlistCount})</span>
              </Link>
              
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="mobile-cart">
                <ShoppingCart size={20} />
                <span>{t('cart')} ({cartCount})</span>
              </Link>

              {user ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <User size={20} />
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    <LogOut size={20} />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <button onClick={() => handleAuthClick('login')} className="mobile-auth-btn login">
                    {t('login')}
                  </button>
                  <button onClick={() => handleAuthClick('signup')} className="mobile-auth-btn signup">
                    {t('signup')}
                  </button>
                </div>
              )}
            </div>

            <LanguageSelector variant="mobile" />
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
}

export default Header;
