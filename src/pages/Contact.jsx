import { useState } from 'react';
import { Send, Phone, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `*NEW CONTACT MESSAGE*%0A%0A` +
      `*From:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A%0A` +
      `*Message:*%0A${formData.message}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/2348102505875?text=${whatsappMessage}`, '_blank');
    
    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
            <button type="submit" className="btn btn-primary btn-block">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
