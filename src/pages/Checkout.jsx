import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Delivery fee calculated based on location
  const finalTotal = total;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create order summary
    const orderItems = cart.map(item => {
      let itemDetails = `${item.name} x ${item.quantity}`;
      if (item.size && item.size !== 'N/A') {
        itemDetails += ` (Size: ${item.size})`;
      }
      if (item.color && item.color !== 'N/A') {
        itemDetails += ` (Color: ${item.color})`;
      }
      return `${itemDetails} = ₦${(item.price * item.quantity).toLocaleString()}`;
    }).join('%0A');
    
    // Create WhatsApp message
    const message = `*NEW ORDER REQUEST*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A%0A` +
      `*Delivery Address:*%0A` +
      `${formData.address}%0A` +
      `${formData.city}, ${formData.state}%0A%0A` +
      `*Order Items:*%0A` +
      `${orderItems}%0A%0A` +
      `*Total Amount:* ₦${finalTotal.toLocaleString()}%0A%0A` +
      `*Payment Details:*%0A` +
      `Account Name: Everything by Britol%0A` +
      `Account Number: 0087407663%0A` +
      `Bank: Sterling Bank%0A%0A` +
      `Kindly proceed with payment and send your proof of payment to confirm this order. Thank you!`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/2348102505875?text=${message}`, '_blank');
    
    // Clear cart after sending to WhatsApp
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="container">
      <div className="checkout-header">
        <h2>Order Request</h2>
        <div className="secure-badge">
          <ShieldCheck size={16} />
          <span>Verified Store</span>
        </div>
      </div>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Contact Information</h3>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <h3>Delivery Address</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <h3>How to Complete Your Order</h3>
          <div className="checkout-notice">
            <p><strong>To complete your order, please contact us:</strong></p>
            <ul className="feature-list">
              <li>WhatsApp: 08102505875</li>
              <li>WhatsApp Group: <a href="https://chat.whatsapp.com/EESwJfHY3Eb7XhRp8VuNFs" target="_blank" rel="noopener noreferrer" style={{color: '#2563eb', textDecoration: 'underline'}}>Join Here</a></li>
              <li>Visit our store: 165, Seliat Bus-Stop, Egbeda, Lagos</li>
              <li>Instagram: @ever.ythingbybritol | Facebook: everythingbybritol | TikTok: @britol2024</li>
            </ul>
            
            <div className="bank-details">
              <h4>Bank Transfer Details:</h4>
              <div className="bank-info">
                <p><strong>Account Name:</strong> Everything by Britol</p>
                <p><strong>Account Number:</strong> 0087407663</p>
                <p><strong>Bank:</strong> Sterling Bank</p>
              </div>
              <p className="bank-note">After payment, please send proof of payment via WhatsApp (08102505875) with your order details.</p>
            </div>
            
            <p>We also accept cash payments at our store. Our team will guide you through the delivery process.</p>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit Order Request
          </button>

          <p className="checkout-terms">
            By submitting your order, you agree to our Terms of Service. We operate a NO REFUND policy.
          </p>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items-list">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-details">
                  <span className="item-name">{item.name} x {item.quantity}</span>
                  <div className="item-attributes">
                    {item.size && item.size !== 'N/A' && (
                      <span className="attribute">Size: {item.size}</span>
                    )}
                    {item.color && item.color !== 'N/A' && (
                      <span className="attribute">Color: {item.color}</span>
                    )}
                  </div>
                </div>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-calculations">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Contact us for rates</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₦{finalTotal.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
