import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const OrderSuccess = () => {
  const orderNumber = `LUX-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Section background="bg-gray-50" padding="py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-luxury font-bold text-gray-900 mb-4 animate-slide-up">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>

        {/* Order Details Card */}
        <Card className="p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{orderNumber}</span>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Date</span>
              <span className="font-semibold text-gray-900">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-semibold text-gold-600">{estimatedDelivery}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800">
                <div className="w-2 h-2 bg-gold-600 rounded-full mr-2"></div>
                Processing
              </span>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                <p className="text-gray-600 text-sm">You'll receive an email confirmation with your order details shortly.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Processing & Packaging</h3>
                <p className="text-gray-600 text-sm">Our team will carefully prepare your luxury items for shipment.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping Notification</h3>
                <p className="text-gray-600 text-sm">You'll receive tracking information once your order ships.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delivery</h3>
                <p className="text-gray-600 text-sm">Your order will arrive at your doorstep in premium packaging.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <Link to="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Track Your Order
          </Button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-200 animate-slide-up" style={{ animationDelay: '1s' }}>
          <p className="text-gray-600 mb-4">
            Questions about your order? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link to="/contact" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a href="mailto:support@luxestore.com" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              support@luxestore.com
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a href="tel:+15551234567" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              +1 (555) 123-4567
            </a>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 p-6 bg-gold-50 rounded-2xl border border-gold-200 animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <h3 className="text-lg font-semibold text-gold-800 mb-2">
            Thank You for Choosing LuxeStore
          </h3>
          <p className="text-gold-700">
            We appreciate your trust in us for your luxury needs. Your satisfaction is our priority, 
            and we're committed to providing you with an exceptional experience.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default OrderSuccess;