import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';
import { User, LogIn } from 'lucide-react';

function AuthGuard({ children }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Always render children - no blocking authentication
  return (
    <>
      {children}
      
      {/* Minimal auth prompt for non-authenticated users */}
      {!user && (
        <div className="minimal-auth-prompt">
          <div className="auth-prompt-content">
            <div className="auth-prompt-text">
              <User size={20} />
              <span>Sign in for a better experience</span>
            </div>
            <div className="auth-prompt-buttons">
              <button 
                onClick={() => handleAuthClick('login')} 
                className="auth-prompt-btn login"
              >
                <LogIn size={16} />
                {t('login')}
              </button>
              <button 
                onClick={() => handleAuthClick('signup')} 
                className="auth-prompt-btn signup"
              >
                <User size={16} />
                {t('signup')}
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}

export default AuthGuard;