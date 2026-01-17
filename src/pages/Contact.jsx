import { useState } from 'react';
import { Send, Phone, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess(false);
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create WhatsApp message with proper encoding
      const whatsappMessage = `*NEW CONTACT MESSAGE*%0A%0A` +
        `*From:* ${encodeURIComponent(formData.name)}%0A` +
        `*Email:* ${encodeURIComponent(formData.email)}%0A%0A` +
        `*Message:*%0A${encodeURIComponent(formData.message)}`;
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/2348102505875?text=${whatsappMessage}`, '_blank');
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Error sending message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="container">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="info-card">
              <Phone size={24} />
              <h3>Phone/WhatsApp</h3>
              <p>08102505875</p>
              <p className="info-detail">Mon-Sat 9am-5pm</p>
            </div>

            <div className="info-card">
              <Send size={24} />
              <h3>Social Media</h3>
              <p>Instagram: @ever.ythingbybritol</p>
              <p className="info-detail">Facebook: everythingbybritol</p>
              <p className="info-detail">TikTok: @britol2024</p>
            </div>

            <div className="info-card">
              <MapPin size={24} />
              <h3>Visit Our Store</h3>
              <p>165, Seliat Bus-Stop</p>
              <p className="info-detail">Egbeda, Lagos</p>
            </div>

            <div className="info-card">
              <Clock size={24} />
              <h3>Opening Hours</h3>
              <p>Monday - Saturday</p>
              <p className="info-detail">9:00am - 5:00pm</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a Message</h2>
            
            {submitSuccess && (
              <div className="success-message">Message sent! We'll get back to you soon.</div>
            )}
            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                maxLength="50"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message * <span className="char-count">({formData.message.length}/1000)</span></label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                rows="6"
                maxLength="1000"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
