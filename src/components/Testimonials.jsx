import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Amazing quality and fast shipping! I\'ve been shopping here for over a year and never been disappointed.',
    date: 'November 2024'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    text: 'Best customer service I\'ve experienced. They helped me find exactly what I needed and the prices are unbeatable.',
    date: 'October 2024'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 5,
    text: 'Trustworthy and reliable. The return process was seamless when I needed to exchange an item.',
    date: 'December 2024'
  }
];

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
