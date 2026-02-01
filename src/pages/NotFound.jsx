import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <Section className="text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
          <span className="text-6xl font-bold text-white">404</span>
        </div>
        
        <h1 className="text-4xl font-luxury font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Browse Products
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Need help finding something?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link to="/contact" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link to="/products" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              View All Products
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link to="/about" className="text-gold-600 hover:text-gold-700 transition-colors duration-200">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NotFound;