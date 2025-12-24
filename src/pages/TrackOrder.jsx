import { Package, MessageCircle } from 'lucide-react';

function TrackOrder() {
  const handleWhatsAppClick = () => {
    const trackingMessage = `Hello! I would like to track my order. Please provide the current status of my delivery.`;
    window.open(`https://wa.me/2348102505875?text=${trackingMessage}`, '_blank');
  };

  return (
    <div className="container">
      <div className="page-content">
        <div className="track-order-header">
          <Package size={48} />
          <h1>Track Your Order</h1>
          <p>Contact us directly to check the status of your delivery</p>
        </div>

        <div className="track-order-cta">
          <p>To track your order, please contact us via WhatsApp with your order details. Our team will provide you with the current status and estimated delivery time.</p>
          
          <button onClick={handleWhatsAppClick} className="btn btn-primary btn-large">
            <MessageCircle size={24} />
            Track Order via WhatsApp
          </button>
        </div>

        <div className="track-order-info">
          <h3>Need Help?</h3>
          <p>For immediate assistance with your order, contact us:</p>
          <ul className="feature-list">
            <li>WhatsApp: 08102505875</li>
            <li>WhatsApp Group: <a href="https://chat.whatsapp.com/EESwJfHY3Eb7XhRp8VuNFs" target="_blank" rel="noopener noreferrer">Join Here</a></li>
            <li>Visit our store: 165, Seliat Bus-Stop, Egbeda, Lagos</li>
            <li>Instagram: @ever.ythingbybritol</li>
            <li>Facebook: everythingbybritol</li>
            <li>TikTok: @britol2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
