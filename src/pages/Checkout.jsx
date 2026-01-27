import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    customCity: '',
    customState: ''
  });
  
  const [selectedAccount, setSelectedAccount] = useState('sterling'); // Default to Sterling Bank
  const [citySearch, setCitySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  // Nigerian states
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  // Nigerian cities organized by state
  const citiesByState = {
    'Lagos': [
      'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa',
      'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
      'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere', 'Yaba', 'Egbeda', 'Ikotun', 'Idimu',
      'Igando', 'Isheri', 'Ejigbo', 'Isolo', 'Oshodi', 'Mafoluku', 'Okota', 'Bucknor', 'Iyana Ipaja',
      'Abule Egba', 'Meiran', 'Ayobo', 'Ipaja', 'Command', 'Dopemu', 'Orile', 'Alagbado'
    ],
    'Abuja': [
      'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council', 'Garki', 'Wuse',
      'Maitama', 'Asokoro', 'Gwarinpa', 'Kubwa', 'Nyanya', 'Karu', 'Lugbe', 'Jahi', 'Utako'
    ],
    'Kano': [
      'Kano Municipal', 'Fagge', 'Dala', 'Gwale', 'Tarauni', 'Nassarawa', 'Ungogo', 'Kumbotso',
      'Warawa', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Karaye', 'Rimin Gado', 'Tofa'
    ],
    'Oyo': [
      'Ibadan North', 'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West',
      'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju',
      'Iwajowa', 'Kajola', 'Lagelu', 'Ogbomoso North', 'Ogbomoso South', 'Ogo Oluwa', 'Olorunsogo',
      'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West',
      'Surulere'
    ],
    'Rivers': [
      'Port Harcourt', 'Obio-Akpor', 'Okrika', 'Ogu–Bolo', 'Eleme', 'Tai', 'Gokana', 'Khana',
      'Oyigbo', 'Opobo–Nkoro', 'Andoni', 'Bonny', 'Degema', 'Asari-Toru', 'Akuku-Toru', 'Abua–Odual',
      'Ahoada East', 'Ahoada West', 'Ogba–Egbema–Ndoni', 'Emohua', 'Ikwerre', 'Etche', 'Omuma'
    ],
    'Kaduna': [
      'Kaduna North', 'Kaduna South', 'Chikun', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia',
      'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari',
      'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
    ],
    'Katsina': [
      'Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Kafur', 'Kaita', 'Bindawa', 'Dutsi',
      'Batagarawa', 'Rimi', 'Bakori', 'Faskari', 'Dandume', 'Sabuwa', 'Kankara', 'Malumfashi'
    ],
    'Anambra': [
      'Awka', 'Onitsha', 'Nnewi', 'Ekwusigo', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North',
      'Awka South', 'Ayamelum', 'Dunukofia', 'Idemili North', 'Idemili South', 'Ihiala', 'Njikoka',
      'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 'Orumba North'
    ],
    'Delta': [
      'Warri', 'Asaba', 'Agbor', 'Sapele', 'Ughelli', 'Kwale', 'Ozoro', 'Oleh', 'Abraka', 'Effurun',
      'Warri South', 'Warri North', 'Warri South West', 'Uvwie', 'Udu', 'Okpe', 'Sapele', 'Ethiope East'
    ]
  };

  // All cities flattened for easy selection
  const allCities = Object.values(citiesByState).flat().sort();

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
    const finalCity = formData.city === 'other' ? formData.customCity : formData.city;
    const finalState = formData.state === 'other' ? formData.customState : formData.state;
    
    const message = `*NEW ORDER REQUEST*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A%0A` +
      `*Delivery Address:*%0A` +
      `${formData.address}%0A` +
      `${finalCity}, ${finalState}%0A%0A` +
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

  const handleStateChange = (e) => {
    const value = e.target.value;
    setFormData({ 
      ...formData, 
      state: value,
      customState: value === 'other' ? formData.customState : ''
    });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    
    if (selectedCity === 'other') {
      setFormData({ 
        ...formData, 
        city: selectedCity,
        customCity: formData.customCity,
        state: formData.state // Keep current state selection
      });
    } else if (selectedCity) {
      // Find which state this city belongs to
      const stateForCity = Object.keys(citiesByState).find(state => 
        citiesByState[state].includes(selectedCity)
      );
      
      setFormData({ 
        ...formData, 
        city: selectedCity,
        customCity: '',
        state: stateForCity || formData.state // Auto-set state if found
      });
      setStateSearch(stateForCity || ''); // Update state search display
    } else {
      setFormData({ 
        ...formData, 
        city: selectedCity,
        customCity: ''
      });
    }
    setCitySearch(selectedCity);
    setShowCityDropdown(false);
  };

  const handleCitySearchChange = (e) => {
    const value = e.target.value;
    setCitySearch(value);
    setShowCityDropdown(true);
    
    // If exact match found, select it
    const exactMatch = filteredCities.find(city => 
      city.toLowerCase() === value.toLowerCase()
    );
    if (exactMatch) {
      const stateForCity = Object.keys(citiesByState).find(state => 
        citiesByState[state].includes(exactMatch)
      );
      setFormData({
        ...formData,
        city: exactMatch,
        state: stateForCity || formData.state
      });
      setStateSearch(stateForCity || '');
    }
  };

  const handleStateSearchChange = (e) => {
    const value = e.target.value;
    setStateSearch(value);
    setShowStateDropdown(true);
    
    // If exact match found, select it
    const exactMatch = filteredStates.find(state => 
      state.toLowerCase() === value.toLowerCase()
    );
    if (exactMatch) {
      setFormData({
        ...formData,
        state: exactMatch
      });
    }
  };

  const handleCitySelect = (city) => {
    const stateForCity = Object.keys(citiesByState).find(state => 
      citiesByState[state].includes(city)
    );
    
    setFormData({
      ...formData,
      city: city,
      state: stateForCity || formData.state
    });
    setCitySearch(city);
    setStateSearch(stateForCity || '');
    setShowCityDropdown(false);
  };

  const handleStateSelect = (state) => {
    setFormData({
      ...formData,
      state: state
    });
    setStateSearch(state);
    setShowStateDropdown(false);
  };

  // Filter cities based on search
  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  ).slice(0, 10); // Limit to 10 results

  // Filter states based on search
  const filteredStates = nigerianStates.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  ).slice(0, 10); // Limit to 10 results

  const validateCheckoutForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Invalid phone number';
    if (!formData.address.trim()) errors.address = 'Address is required';
    
    // Validate city
    const finalCity = formData.city === 'other' ? formData.customCity : formData.city;
    if (!finalCity.trim()) errors.city = 'City is required';
    
    // Validate state
    const finalState = formData.state === 'other' ? formData.customState : formData.state;
    if (!finalState.trim()) errors.state = 'State is required';
    
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
            <div className="form-group">
              <label htmlFor="city-search">City</label>
              <div className="searchable-dropdown">
                <input
                  type="text"
                  id="city-search"
                  placeholder="Search for your city..."
                  value={citySearch}
                  onChange={handleCitySearchChange}
                  onFocus={() => setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                  className="search-input"
                  required
                />
                {showCityDropdown && citySearch && (
                  <div className="dropdown-results">
                    {filteredCities.length > 0 ? (
                      filteredCities.map(city => (
                        <div
                          key={city}
                          className="dropdown-item"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">
                        No cities found. You can type your city name.
                      </div>
                    )}
                  </div>
                )}
              </div>
              {formData.city === 'other' && (
                <input
                  type="text"
                  name="customCity"
                  placeholder="Enter your city"
                  value={formData.customCity}
                  onChange={handleChange}
                  required
                  className="custom-location-input"
                />
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="state-search">State</label>
              <div className="searchable-dropdown">
                <input
                  type="text"
                  id="state-search"
                  placeholder="Search for your state..."
                  value={stateSearch}
                  onChange={handleStateSearchChange}
                  onFocus={() => setShowStateDropdown(true)}
                  onBlur={() => setTimeout(() => setShowStateDropdown(false), 200)}
                  className="search-input"
                  required
                />
                {showStateDropdown && stateSearch && (
                  <div className="dropdown-results">
                    {filteredStates.length > 0 ? (
                      filteredStates.map(state => (
                        <div
                          key={state}
                          className="dropdown-item"
                          onClick={() => handleStateSelect(state)}
                        >
                          {state}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">
                        No states found. You can type your state name.
                      </div>
                    )}
                  </div>
                )}
              </div>
              {formData.state === 'other' && (
                <input
                  type="text"
                  name="customState"
                  placeholder="Enter your state"
                  value={formData.customState}
                  onChange={handleChange}
                  required
                  className="custom-location-input"
                />
              )}
            </div>
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
            {cart.map((item, index) => {
              // Determine the best image to display
              const itemImage = item.image || 
                              (Array.isArray(item.images) ? item.images[0] : item.images) || 
                              '/placeholder.jpg';
              
              // Create a safe key that handles undefined values
              const safeSize = item.size || 'N/A';
              const safeColor = item.color || 'N/A';
              const uniqueKey = `checkout-${item.id}-${safeSize}-${safeColor}-${index}`;
              
              return (
                <div key={uniqueKey} className="summary-item">
                  <div className="summary-item-image">
                    <img 
                      src={itemImage} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>';
                      }}
                    />
                  </div>
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
                  <span className="summary-item-price">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              );
            })}
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
