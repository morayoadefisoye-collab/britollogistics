import { X, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from './ImageGallery';
import AdvancedProductSelector from './AdvancedProductSelector';
import ProductReviews from './ProductReviews';
import { useLanguage } from '../contexts/LanguageContext';

function ProductModal({ product, onClose, onAddToCart, openGalleryOnLoad = false }) {
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showGallery, setShowGallery] = useState(openGalleryOnLoad && product.images && product.images.length > 0);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#16A34A' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Purple', value: '#9333EA' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Brown', value: '#A16207' }
  ];

  const needsSizes = product.category.includes('Fashion') ||
    product.category.includes('Wear') ||
    product.category.includes('Accessories') ||
    product.hasGallery;

  const needsColors = product.category.includes('Fashion') ||
    product.category.includes('Wear') ||
    product.category.includes('Accessories') ||
    product.category.includes('Home') ||
    product.category.includes('Decor') ||
    product.hasGallery;

  const availableSizes = product.sizes || sizes;

  const availableColors = product.colors ?
    product.colors.map(colorName => {
      const colorMap = {
        'Green': '#16A34A',
        'Cream': '#FEF3C7',
        'White': '#FFFFFF',
        'Red': '#DC2626',
        'Purple': '#9333EA',
        'Black': '#000000',
        'Blue': '#2563EB',
        'Pink': '#EC4899',
        'Gray': '#6B7280',
        'Brown': '#A16207',
        'Yellow': '#EAB308',
        'Blush Pink': '#F9A8D4',
        'Champagne': '#F7E7CE',
        'Navy Blue': '#1E3A8A',
        'Sage Green': '#84CC16'
      };
      return {
        name: colorName,
        value: colorMap[colorName] || '#6B7280'
      };
    }) : colors;

  const handleAddToCart = (productToAdd = product, quantityToAdd = quantity) => {
    if (product.hasGallery && productToAdd !== product) {
      onAddToCart(productToAdd, quantityToAdd);
      setQuantity(1);
      onClose();
      return;
    }

    if (needsSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }

    if (needsColors && !selectedColor) {
      alert('Please select a color');
      return;
    }

    const finalProduct = {
      ...product,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
      quantity: quantity
    };

    onAddToCart(finalProduct, quantity);
    setQuantity(1);
    onClose();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>

          <div className="modal-body">
            <div className="modal-image">
              {product.images && product.images.length > 0 ? (
                <div className="product-gallery-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="modal-main-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGallery(true);
                    }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23f0f0f0" width="200" height="200"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="%23999" font-size="16">Image</text></svg>';
                    }}
                    style={{ cursor: 'zoom-in' }}
                    title="Click to expand image"
                  />
                  <button
                    className="view-gallery-btn"
                    onClick={() => setShowGallery(true)}
                    title={product.images.length > 1 ? "View all images" : "View image in full"}
                  >
                    <Eye size={16} />
                    {product.images.length > 1 ? `View Gallery (${product.images.length})` : 'View Image'}
                  </button>
                </div>
              ) : (
                <div className="product-image-placeholder">
                  <span>New product soon to drop</span>
                </div>
              )}
            </div>

            <div className="modal-details">
              <div className="product-category">{product.category}</div>
              <h2>{product.name}</h2>
              <p className="modal-description">{product.description}</p>

              <div className="modal-price">
                <span className="price-label">{t('price')}:</span>
                <span className="price-value">₦{product.price.toLocaleString()}</span>
              </div>

              <AdvancedProductSelector
                product={product}
                onAddToCart={handleAddToCart}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />

              <div className="product-info-note">
                <p><strong>Note:</strong> Contact us on WhatsApp for bulk orders or special requests.</p>
              </div>

              <div className="product-reviews-section">
                <ProductReviews product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGallery && product.images && (
        <ImageGallery
          images={product.images}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
}

export default ProductModal;
