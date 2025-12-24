import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you have a physical store?",
      answer: "Yes! We have a verified physical store located at 165, Seliat Bus-Stop, Egbeda, Lagos. You can visit us Monday to Saturday, 9:00am - 5:00pm."
    },
    {
      question: "How do I place an order?",
      answer: "You can place orders by contacting us on WhatsApp at 08102505875, visiting our physical store, or through our social media pages (@ever.ythingbybritol on Instagram)."
    },
    {
      question: "Do you deliver nationwide?",
      answer: "Yes, we deliver across Lagos and all states in Nigeria. Delivery fees vary by location. Contact us for specific rates to your area."
    },
    {
      question: "What is your refund policy?",
      answer: "We operate a NO REFUND policy. However, exchanges may be considered for selected items depending on our terms. Items must be unused and in original condition."
    },
    {
      question: "Are the items posted online available?",
      answer: "Yes! We guarantee 100% availability. Items posted are available and ready for pickup or delivery, except where stated otherwise."
    },
    {
      question: "Do you sell wholesale?",
      answer: "Yes, we serve both wholesale and retail customers. We cater to boutique owners, online sellers, bulk buyers, and individual shoppers."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers (Sterling Bank: 0087407663 - Everything by Britol) and cash payments at our store. After bank transfer, send proof of payment to our WhatsApp: 08102505875."
    },
    {
      question: "How long does delivery take?",
      answer: "Lagos deliveries typically take 1-2 days. Nationwide deliveries take 2-5 business days depending on your location."
    },
    {
      question: "Can I see items before buying?",
      answer: "Absolutely! Visit our physical store at 165, Seliat Bus-Stop, Egbeda, Lagos to see and try items before purchasing."
    },
    {
      question: "Do you have new arrivals regularly?",
      answer: "Yes! We constantly update our inventory with new arrivals. Follow us on Instagram @ever.ythingbybritol to stay updated on new stock."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="page-content">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about shopping with Everything By Britol</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
