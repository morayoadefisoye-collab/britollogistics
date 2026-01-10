import { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, signup, isLoading } = useAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (mode === 'signup') {
      if (!formData.firstName.trim()) return 'First name is required';
      if (!formData.lastName.trim()) return 'Last name is required';
      if (!formData.phone.trim()) return 'Phone number is required';
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
      if (formData.password.length < 6) return 'Password must be at least 6 characters';
    }
    
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.password.trim()) return 'Password is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email';
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      } else {
        await signup(formData);
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: ''
    });
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-header">
          <h2>{mode === 'login' ? t('login') : t('signup')}</h2>
          <p>{mode === 'login' ? t('loginSubtitle') : t('signupSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t('firstName')}</label>
                  <div className="input-with-icon">
                    <User size={18} />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('enterFirstName')}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">{t('lastName')}</label>
                  <div className="input-with-icon">
                    <User size={18} />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('enterLastName')}
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('enterEmail')}
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label htmlFor="phone">{t('phone')}</label>
                <div className="input-with-icon">
                  <Phone size={18} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('enterPhone')}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">{t('address')}</label>
                <div className="input-with-icon">
                  <MapPin size={18} />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t('enterAddress')}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('enterPassword')}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t('confirmPassword')}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('loading') : (mode === 'login' ? t('login') : t('createAccount'))}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {mode === 'login' ? t('noAccount') : t('haveAccount')}{' '}
            <button type="button" onClick={switchMode} className="auth-switch-btn">
              {mode === 'login' ? t('signup') : t('login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;