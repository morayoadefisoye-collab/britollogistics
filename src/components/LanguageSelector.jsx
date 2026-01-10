import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' }
];

function LanguageSelector({ variant = 'header' }) {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="mobile-language-selector">
        <div className="mobile-lang-header">
          <Globe size={20} />
          <span>{t('language')}</span>
        </div>
        <div className="mobile-lang-options">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`mobile-lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.nativeName}</span>
              {currentLanguage === lang.code && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className={`lang-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
      >
        <Globe size={18} />
        <span className="current-lang">
          <span className="lang-flag">{currentLang?.flag}</span>
          <span className="lang-code">{currentLang?.code.toUpperCase()}</span>
        </span>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          <div className="lang-dropdown-header">
            <Globe size={16} />
            <span>{t('language')}</span>
          </div>
          <div className="lang-options">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <div className="lang-info">
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-native">{lang.nativeName}</span>
                </div>
                {currentLanguage === lang.code && (
                  <Check size={16} className="check-icon" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;