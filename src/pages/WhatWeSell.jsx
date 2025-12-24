import { Shirt, User, Baby, Home, Gem, ShoppingBag } from 'lucide-react';

function WhatWeSell() {
  return (
    <div className="container">
      <div className="page-content">
        <h1>What We Sell</h1>
        <p>Discover our wide range of quality products for everyone in your family</p>

        <section className="content-section">
          <div className="category-showcase">
            <div className="category-card">
              <div className="category-icon-svg">
                <Shirt size={48} strokeWidth={1.5} />
              </div>
              <h2>LADIES' WEARS</h2>
              <ul className="category-list">
                <li>Mikkaye Wears</li>
                <li>Luxury Wears</li>
                <li>Turkey Wears</li>
                <li>Two-Piece Sets, Tops & Dresses</li>
                <li>Corporate & Casual Ladies Clothing</li>
                <li>Stylish Handbags</li>
                <li>Ladies' Shoes & Footwear</li>
                <li>Lingerie & Undergarments</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon-svg">
                <User size={48} strokeWidth={1.5} />
              </div>
              <h2>MEN'S FASHION</h2>
              <ul className="category-list">
                <li>Corporate & Casual Men's Clothing</li>
                <li>T-shirts, Polos, Jeans, Joggers</li>
                <li>Men's Luxury Jalamia</li>
                <li>Men's Shoes & Footwear (Sneakers, Loafers, Corporate Shoes, Slides)</li>
                <li>Men's Bags, Belts, and Purses</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon-svg">
                <Baby size={48} strokeWidth={1.5} />
              </div>
              <h2>CHILDREN'S CLOTHING</h2>
              <ul className="category-list">
                <li>Boys' and Girls' wears</li>
                <li>Cute fits for all age ranges</li>
                <li>Durable and affordable kids' fashion</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon-svg">
                <Home size={48} strokeWidth={1.5} />
              </div>
              <h2>HOUSEHOLD ITEMS</h2>
              <ul className="category-list">
                <li>Beddings</li>
                <li>Towels</li>
                <li>Kitchen essentials</li>
                <li>Home accessories</li>
                <li>General home items</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon-svg">
                <Gem size={48} strokeWidth={1.5} />
              </div>
              <h2>GOLD ACCESSORIES</h2>
              <ul className="category-list">
                <li>Gold chains</li>
                <li>Earrings</li>
                <li>Wrist bracelets</li>
                <li>Quality fashion accessories for men and women</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2><ShoppingBag size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Wholesale & Retail Available</h2>
          <p>We serve boutique owners, online sellers, walk-in customers, bulk buyers, and individuals shopping for personal use. We offer both wholesale and retail pricing.</p>
          <div className="cta-buttons">
            <a href="/wholesale" className="btn btn-secondary">
              Learn About Wholesale
            </a>
          </div>
        </section>

        <section className="content-section">
          <h2>Ready to Shop?</h2>
          <p>Contact us today to place your order or visit our store to see our products in person!</p>
          <div className="cta-buttons">
            <a href="https://wa.me/2348102505875" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              WhatsApp Us
            </a>
            <a href="/contact" className="btn btn-secondary">
              Visit Our Store
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WhatWeSell;
