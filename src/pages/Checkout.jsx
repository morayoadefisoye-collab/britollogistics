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
  
  const [selectedAccount, setSelectedAccount] = useState('sterling'); // Default to Sterling Bank

  const bankAccounts = {
    sterling: {
      name: 'Everything by Britol',
      number: '0087407663',
      bank: 'Sterling Bank'
    },
    firstbank: {
      name: 'OGUNBIYI OLAITAN',
      number: '3117116985',
      bank: 'First Bank'
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const shipping = 0; // Delivery fee calculated based on location - currently free
  const finalTotal = total;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateCheckoutForm();
    if (Object.keys(errors).length > 0) {
      alert('Please fix the following errors:\n\n' + Object.values(errors).join('\n'));
      return;
    }
    
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
      `*Payment Details (Selected Account):*%0A` +
      `Account Name: ${bankAccounts[selectedAccount].name}%0A` +
      `Account Number: ${bankAccounts[selectedAccount].number}%0A` +
      `Bank: ${bankAccounts[selectedAccount].bank}%0A%0A` +
      `Kindly proceed with payment and send your proof of payment to confirm this order. Thank you!`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/2348102505875?text=${message}`, '_blank');
    
    // Clear cart immediately
    clearCart();
    
    // Show success message
    alert('Order request sent successfully! Your cart has been cleared and you will be redirected to the home page.');
    
    // Redirect after alert
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCheckoutForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Invalid phone number';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    return errors;
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
              <h4>Select Payment Account:</h4>
              
              <div className="account-selection">
                <label className="account-option">
                  <input
                    type="radio"
                    name="account"
                    value="sterling"
                    checked={selectedAccount === 'sterling'}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                  />
                  <div className="account-info">
                    <div className="account-header">
                      <strong>Sterling Bank</strong>
                      <span className="account-badge">Option 1</span>
                    </div>
                    <p><strong>Account Name:</strong> Everything by Britol</p>
                    <p><strong>Account Number:</strong> 0087407663</p>
                  </div>
                </label>
                
                <label className="account-option">
                  <input
                    type="radio"
                    name="account"
                    value="firstbank"
                    checked={selectedAccount === 'firstbank'}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                  />
                  <div className="account-info">
                    <div className="account-header">
                      <strong>First Bank</strong>
                      <span className="account-badge">Option 2</span>
                    </div>
                    <p><strong>Account Name:</strong> OGUNBIYI OLAITAN</p>
                    <p><strong>Account Number:</strong> 3117116985</p>
                  </div>
                </label>
              </div>
              
              <div className="selected-account-summary">
                <h5>Selected Account for Payment:</h5>
                <div className="selected-account-details">
                  <p><strong>Bank:</strong> {bankAccounts[selectedAccount].bank}</p>
                  <p><strong>Account Name:</strong> {bankAccounts[selectedAccount].name}</p>
                  <p><strong>Account Number:</strong> {bankAccounts[selectedAccount].number}</p>
                </div>
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
