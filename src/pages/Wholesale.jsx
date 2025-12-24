import { Link } from 'react-router-dom';
import { Package, Users, TrendingUp, BadgeDollarSign, Truck, ShieldCheck } from 'lucide-react';

function Wholesale() {
  return (
    <div className="container">
      <div className="page-content">
        <h1>Wholesale & Retail</h1>
        <p>Partner with Everything By Britol for quality products at competitive prices</p>

        <section className="content-section">
          <h2>Who We Serve</h2>
          <div className="wholesale-grid">
            <div className="wholesale-card">
              <Package size={40} />
              <h3>Boutique Owners</h3>
              <p>Stock your boutique with quality fashion items from trusted suppliers</p>
            </div>

            <div className="wholesale-card">
              <TrendingUp size={40} />
              <h3>Online Sellers</h3>
              <p>Get competitive wholesale prices for your online business</p>
            </div>

            <div className="wholesale-card">
              <Users size={40} />
              <h3>Bulk Buyers</h3>
              <p>Special rates for large quantity orders</p>
            </div>

            <div className="wholesale-card">
              <BadgeDollarSign size={40} />
              <h3>Retail Customers</h3>
              <p>Individual shoppers welcome for personal purchases</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Why Choose Us for Wholesale?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <ShieldCheck size={32} />
              <h4>Quality Guaranteed</h4>
              <p>All products sourced from reliable manufacturers and trusted suppliers, especially from Turkey and other reputable markets</p>
            </div>

            <div className="benefit-item">
              <BadgeDollarSign size={32} />
              <h4>Competitive Pricing</h4>
              <p>Best wholesale rates in Lagos. The more you buy, the more you save</p>
            </div>

            <div className="benefit-item">
              <Truck size={32} />
              <h4>Fast Delivery</h4>
              <p>Quick turnaround for bulk orders across Lagos and Nigeria</p>
            </div>

            <div className="benefit-item">
              <Package size={32} />
              <h4>Wide Selection</h4>
              <p>Extensive range of products across all categories - fashion, household, accessories</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Product Categories Available</h2>
          <div className="categories-list">
            <div className="category-column">
              <h3>Fashion</h3>
              <ul className="feature-list">
                <li>Ladies' Wears (Mikkaye, Luxury, Turkey)</li>
                <li>Men's Fashion (Corporate, Casual, Jalamia)</li>
                <li>Children's Clothing</li>
                <li>Shoes & Footwear</li>
                <li>Bags & Accessories</li>
              </ul>
            </div>

            <div className="category-column">
              <h3>Household & Accessories</h3>
              <ul className="feature-list">
                <li>Beddings & Towels</li>
                <li>Kitchen Essentials</li>
                <li>Home Accessories</li>
                <li>Gold Accessories</li>
                <li>Fashion Jewelry</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>How to Order Wholesale</h2>
          <ol className="process-list">
            <li>Contact us via WhatsApp (08102505875) or visit our store</li>
            <li>Discuss your requirements and get a quote</li>
            <li>Receive wholesale pricing based on quantity</li>
            <li>Make payment via bank transfer or cash</li>
            <li>Send proof of payment</li>
            <li>Receive your order - pickup or delivery available</li>
          </ol>
        </section>

        <section className="content-section">
          <h2>Wholesale Terms</h2>
          <ul className="feature-list">
            <li>Minimum order quantities may apply for wholesale pricing</li>
            <li>Prices vary based on quantity and product category</li>
            <li>Payment required before delivery or pickup</li>
            <li>Bulk orders may require advance notice for preparation</li>
            <li>Special discounts available for regular customers</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Ready to Start Your Wholesale Order?</h2>
          <div className="cta-buttons">
            <a href="https://wa.me/2348102505875?text=Hello!%20I'm%20interested%20in%20wholesale%20orders" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Contact for Wholesale
            </a>
            <Link to="/what-we-sell" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </section>

        <div className="bank-details-section">
          <h3>Payment Information:</h3>
          <div className="bank-info-card">
            <p><strong>Account Name:</strong> Everything by Britol</p>
            <p><strong>Account Number:</strong> 0087407663</p>
            <p><strong>Bank:</strong> Sterling Bank</p>
          </div>
          <p className="payment-note">After payment, send proof to WhatsApp: 08102505875</p>
        </div>
      </div>
    </div>
  );
}

export default Wholesale;
