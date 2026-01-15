import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, CheckCircle2, Truck, Award, Clock } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="badge">
              <CheckCircle2 size={32} />
              <h4>100% Availability</h4>
              <p>Items posted are available</p>
            </div>
            <div className="badge">
              <Truck size={32} />
              <h4>Fast Delivery</h4>
              <p>Lagos & Nationwide</p>
            </div>
            <div className="badge">
              <Award size={32} />
              <h4>Quality Guaranteed</h4>
              <p>Trusted suppliers</p>
            </div>
            <div className="badge">
              <Clock size={32} />
              <h4>Excellent Service</h4>
              <p>Mon-Sat 9am-5pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
                <img src="/ladies wear/logo.jpg" alt="Everything By Britol Logo" className="footer-logo-image" />
                <h3>EVERYTHING BY BRITOL</h3>
              </div>
              <p>Your one-stop destination for quality fashion, lifestyle essentials, and luxury items. Located at 165, Seliat Bus-Stop, Egbeda, Lagos. We serve both wholesale and retail customers.</p>
              <div className="social-links">
                <a href="https://www.instagram.com/ever.ythingbybritol" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/everythingbybritol" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                <a href="https://www.tiktok.com/@britol2024" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://wa.me/2348102505875" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><Phone size={20} /></a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Customer Service</h4>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/shipping">Shipping Information</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/track-order">Track Your Order</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/">All Products</Link></li>
                <li><Link to="/what-we-sell">What We Sell</Link></li>
                <li><Link to="/wholesale">Wholesale & Retail</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                <li>
                  <Phone size={16} />
                  <span>08102505875 (WhatsApp)</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>@ever.ythingbybritol</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>165, Seliat Bus-Stop<br />Egbeda, Lagos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 EVERYTHING BY BRITOL. All rights reserved.</p>
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span className="payment-icon">Bank Transfer</span>
              <span className="payment-icon">Cash</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
