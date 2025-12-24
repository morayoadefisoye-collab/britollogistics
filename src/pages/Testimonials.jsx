import { Star, Quote } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Chioma Okafor',
      role: 'Boutique Owner, Ikeja',
      rating: 5,
      text: 'I\'ve been buying wholesale from Everything By Britol for over a year. Their quality is consistent and prices are unbeatable. My customers always ask where I get my stock from!',
      date: 'November 2024'
    },
    {
      id: 2,
      name: 'Adebayo Johnson',
      role: 'Online Seller',
      rating: 5,
      text: 'Best supplier in Lagos! Fast delivery, quality products, and excellent customer service. They always have new arrivals and the wholesale prices help my business grow.',
      date: 'December 2024'
    },
    {
      id: 3,
      name: 'Fatima Abdullahi',
      role: 'Regular Customer',
      rating: 5,
      text: 'I love shopping at Everything By Britol! The store is well organized, staff are friendly, and I always find what I need. Their Turkey wears are authentic and beautiful.',
      date: 'October 2024'
    },
    {
      id: 4,
      name: 'Emmanuel Eze',
      role: 'Corporate Client',
      rating: 5,
      text: 'Bought corporate shirts and shoes for my team. The quality exceeded expectations and the prices were very reasonable. Highly recommend for bulk purchases!',
      date: 'September 2024'
    },
    {
      id: 5,
      name: 'Blessing Nwosu',
      role: 'Fashion Enthusiast',
      rating: 5,
      text: 'Everything By Britol is my go-to store! From luxury wears to casual outfits, they have it all. The Mikkaye collection is stunning. Plus, their WhatsApp service is super convenient.',
      date: 'December 2024'
    },
    {
      id: 6,
      name: 'Yusuf Ibrahim',
      role: 'Wholesale Buyer',
      rating: 5,
      text: 'Reliable and trustworthy. I supply several boutiques and Everything By Britol never disappoints. Items are always available as advertised. No scam, just quality business.',
      date: 'November 2024'
    },
    {
      id: 7,
      name: 'Grace Okonkwo',
      role: 'Mother of Three',
      rating: 5,
      text: 'I buy all my children\'s clothes here. Durable, affordable, and cute! The staff help me pick the right sizes and the kids love their outfits. Thank you Everything By Britol!',
      date: 'October 2024'
    },
    {
      id: 8,
      name: 'Tunde Bakare',
      role: 'First-time Customer',
      rating: 5,
      text: 'Visited the store for the first time last week. Impressed by the variety and quality. Bought beddings and kitchen items - everything was perfect. Will definitely be back!',
      date: 'December 2024'
    },
    {
      id: 9,
      name: 'Amaka Nnamdi',
      role: 'Online Seller',
      rating: 5,
      text: 'Their gold accessories are top quality! I resell online and my customers are always satisfied. The pricing allows me to make good profit. Best decision partnering with them.',
      date: 'November 2024'
    }
  ];

  return (
    <div className="container">
      <div className="page-content">
        <h1>Customer Testimonials</h1>
        <p>See what our satisfied customers are saying about Everything By Britol</p>

        <section className="content-section">
          <div className="testimonials-showcase">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card-large">
                <Quote size={32} className="quote-icon" />
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" stroke="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-text-large">"{testimonial.text}"</p>
                <div className="testimonial-author-large">
                  <strong>{testimonial.name}</strong>
                  <span className="testimonial-role">{testimonial.role}</span>
                  <span className="testimonial-date">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2>Join Our Satisfied Customers</h2>
          <p>Experience quality products and excellent service at Everything By Britol</p>
          <div className="cta-buttons">
            <a href="https://wa.me/2348102505875" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Shop Now
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

export default Testimonials;
