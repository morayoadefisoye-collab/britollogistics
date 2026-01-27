import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';
import { User, LogIn, ShoppingBag } from 'lucide-react';

function AuthGuard({ children }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Block access if user is not authenticated
  if (!user) {
    return (
      <>
        <div className="auth-required-overlay">
          <div className="auth-required-content">
            <div className="auth-required-header">
              <ShoppingBag size={48} />
              <h1>Welcome to Everything By Britol</h1>
              <p>Please create an account or sign in to start shopping</p>
            </div>
            
            <div className="auth-required-buttons">
              <button 
                onClick={() => handleAuthClick('signup')} 
                className="auth-required-btn primary"
              >
                <User size={20} />
                Create Account
              </button>
              <button 
                onClick={() => handleAuthClick('login')} 
                className="auth-required-btn secondary"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </div>
            
            <div className="auth-required-info">
              <p>Join thousands of satisfied customers shopping with us!</p>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
        />
      </>
    );
  }

  // Render children only if user is authenticated
  return children;
}

export default AuthGuard;