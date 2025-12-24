function Shipping() {
  return (
    <div className="container">
      <div className="page-content">
        <h1>Delivery Information</h1>
        
        <section className="content-section">
          <h2>Fast Delivery Nationwide</h2>
          <p>We deliver across Lagos and Nigeria with speed and reliability. Our delivery service ensures your items reach you in perfect condition.</p>
        </section>

        <section className="content-section">
          <h2>Delivery Options</h2>
          <div className="shipping-options">
            <div className="shipping-option">
              <h3>Lagos Delivery</h3>
              <p className="price">Varies by location</p>
              <p>Same day or next day delivery available</p>
            </div>
            <div className="shipping-option">
              <h3>Nationwide Delivery</h3>
              <p className="price">Contact for rates</p>
              <p>Delivery within 2-5 business days</p>
            </div>
            <div className="shipping-option">
              <h3>Store Pickup</h3>
              <p className="price">FREE</p>
              <p>Visit us at 165, Seliat Bus-Stop, Egbeda</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>How to Order</h2>
          <ol className="process-list">
            <li>Browse our products online or visit our physical store</li>
            <li>Contact us via WhatsApp (08102505875) to place your order</li>
            <li>Make payment via bank transfer or cash at our store</li>
            <li>Send proof of payment via WhatsApp</li>
            <li>Receive confirmation of your order</li>
            <li>Your items will be dispatched for delivery or prepared for pickup</li>
          </ol>
        </section>

        <section className="content-section">
          <h2>Payment Information</h2>
          <div className="bank-details-section">
            <h3>Bank Transfer Details:</h3>
            <div className="bank-info-card">
              <p><strong>Account Name:</strong> Everything by Britol</p>
              <p><strong>Account Number:</strong> 0087407663</p>
              <p><strong>Bank:</strong> Sterling Bank</p>
            </div>
            <p className="payment-note">After making payment, please send proof of payment to our WhatsApp (08102505875) along with your order details and delivery address.</p>
          </div>
        </section>

        <section className="content-section">
          <h2>Availability Guarantee</h2>
          <p><strong>100% Availability</strong> - Items posted are available and ready for pickup or delivery, except where stated otherwise. We maintain accurate inventory to ensure you get what you order.</p>
        </section>

        <section className="content-section">
          <h2>Delivery Contact</h2>
          <p>For delivery inquiries, rates, and scheduling, please contact us:</p>
          <ul className="feature-list">
            <li>WhatsApp: 08102505875</li>
            <li>Visit our store: 165, Seliat Bus-Stop, Egbeda, Lagos</li>
            <li>Opening Hours: Monday - Saturday, 9:00am - 5:00pm</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Shipping;
