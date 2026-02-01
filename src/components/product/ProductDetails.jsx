import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../hooks/useWishlist';
import Button from '../ui/Button';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Mock additional images - in real app, these would come from product data
  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-gold-500' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="w-full h-96 overflow-hidden rounded-2xl bg-gray-200">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
            }}
          />
        </div>
        
        {/* Thumbnail Images */}
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index 
                  ? 'border-gold-500 ring-2 ring-gold-200' 
                  : 'border-gray-200 hover:border-gold-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Img';
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-luxury font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-600">({product.rating} rating)</span>
            <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <p className="text-4xl font-bold text-gold-600 mb-4">
            ${product.price}
          </p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Quantity Selector */}
        {product.inStock && (
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100 transition-colors duration-200"
                disabled={quantity <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1"
            size="lg"
          >
            {!product.inStock 
              ? 'Out of Stock' 
              : isInCart(product.id) 
                ? `Add ${quantity} More to Cart` 
                : `Add ${quantity} to Cart`
            }
          </Button>
          
          <Button
            onClick={() => toggleWishlist(product)}
            variant={isInWishlist(product.id) ? 'primary' : 'outline'}
            size="lg"
            className="px-6"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>

        {/* Product Features */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Premium quality materials
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free shipping on orders over $200
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              30-day return policy
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Authentic luxury guarantee
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;