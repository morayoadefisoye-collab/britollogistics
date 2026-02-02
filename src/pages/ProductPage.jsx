import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../utils/data';
import ProductDetails from '../components/product/ProductDetails';
import ProductGrid from '../components/product/ProductGrid';
import Section from '../components/layout/Section';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Section className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </Section>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <Section background="bg-white" padding="py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gold-600 transition-colors duration-200">
            Home
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/products" className="text-gray-500 hover:text-gold-600 transition-colors duration-200">
            Products
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium capitalize">{product.category}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gold-600 font-medium">{product.name}</span>
        </nav>
      </Section>

      {/* Product Details */}
      <Section background="bg-white" padding="py-12">
        <ProductDetails product={product} />
      </Section>

      {/* Product Description */}
      <Section background="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-luxury font-bold text-gray-900 mb-8 text-center">
            Product Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This exceptional piece represents the pinnacle of luxury craftsmanship, 
                  combining traditional techniques with contemporary design sensibilities. 
                  Each item is carefully inspected to ensure it meets our exacting standards 
                  for quality and authenticity.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="font-medium text-gray-600">Category</dt>
                  <dd className="text-gray-900 capitalize">{product.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="font-medium text-gray-600">Rating</dt>
                  <dd className="text-gray-900 flex items-center">
                    <div className="stars mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                      ))}
                    </div>
                    {product.rating}/5.0
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="font-medium text-gray-600">Availability</dt>
                  <dd className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="font-medium text-gray-600">SKU</dt>
                  <dd className="text-gray-900">LUX-{product.id.toString().padStart(4, '0')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section background="bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-luxury font-bold text-gray-900 mb-4">
              You Might Also Like
            </h2>
            <p className="text-xl text-gray-600">
              Discover more items from the {product.category} collection
            </p>
          </div>
          
          <ProductGrid products={relatedProducts} />
          
          <div className="text-center mt-12">
            <Link
              to={`/products?category=${product.category}`}
              className="inline-flex items-center px-8 py-3 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors duration-200 font-medium"
            >
              View All {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Section>
      )}
    </div>
  );
};

export default ProductPage;