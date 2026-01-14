import { X, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from './ImageGallery';
import AdvancedProductSelector from './AdvancedProductSelector';
import ProductReviews from './ProductReviews';
import { useLanguage } from '../contexts/LanguageContext';

function ProductModal({ product, onClose, onAddToCart }) {
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

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
  
  // Categories that need sizes
  const needsSizes = product.category.includes('Fashion') || 
                     product.category.includes('Wear') || 
                     product.category.includes('Accessories') ||
                     product.hasGallery; // Gallery products also need sizes

  // Categories that need colors (similar to sizes but could be different)
  const needsColors = product.category.includes('Fashion') || 
                      product.category.includes('Wear') || 
                      product.category.includes('Accessories') ||
                      product.category.includes('Home') ||
                      product.category.includes('Decor') ||
                      product.hasGallery; // Gallery products also need colors

  // Use product-specific sizes if available, otherwise use default sizes
  const availableSizes = product.sizes || sizes;
  
  // Use product-specific colors if available, otherwise use default colors
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
    // For advanced selector, the product and quantity are passed directly
    if (product.hasGallery && productToAdd !== product) {
      onAddToCart(productToAdd, quantityToAdd);
      onClose();
      return;
    }

    // Original logic for regular products
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
    onClose();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            {product.hasGallery && product.images ? (
              <div className="product-gallery-container">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="modal-main-image"
                  onClick={() => setShowGallery(true)}
                />
                <button 
                  className="view-gallery-btn"
                  onClick={() => setShowGallery(true)}
                >
                  <Eye size={16} />
                  {t('viewGallery')} ({product.images.length} {t('photos')})
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

            {product.hasGallery ? (
              <AdvancedProductSelector 
                product={product}
                onAddToCart={handleAddToCart}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />
            ) : (
              <>
                {needsSizes && (
                  <div className="size-selector">
                    <label>{t('selectSize')}:</label>
                    <div className="size-options">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {needsColors && (
                  <div className="color-selector">
                    <label>{t('selectColor')}:</label>
                    <div className="color-options">
                      {availableColors.map(color => (
                        <button
                          key={color.name}
                          className={`color-btn ${selectedColor === color.name ? 'active' : ''}`}
                          onClick={() => setSelectedColor(color.name)}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                          aria-label={`Select ${color.name} color`}
                        >
                          {color.value === '#FFFFFF' && <span className="white-border"></span>}
                        </button>
                      ))}
                    </div>
                    {selectedColor && (
                      <div className="selected-color-display">
                        Selected: <span className="color-name">{selectedColor}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="quantity-selector">
                  <label>{t('quantity')}:</label>
                  <div className="quantity-controls-modal">
                    <button onClick={decreaseQuantity} aria-label="Decrease quantity">
                      <Minus size={18} />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={increaseQuantity} aria-label="Increase quantity">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="modal-total">
                  <span>{t('total')}:</span>
                  <span className="total-price">₦{(product.price * quantity).toLocaleString()}</span>
                </div>

                <button className="btn btn-primary btn-block btn-large" onClick={handleAddToCart}>
                  <ShoppingCart size={20} />
                  {t('addToCart')}
                </button>
              </>
            )}

            <div className="product-info-note">
              <p><strong>Note:</strong> Contact us on WhatsApp for bulk orders or special requests.</p>
            </div>

            {/* Product Reviews Section */}
            <div className="product-reviews-section">
              <ProductReviews product={product} />
            </div>
          </div>
        </div>
      </div>

      {showGallery && product.images && (
        <ImageGallery 
          images={product.images} 
          onClose={() => setShowGallery(true)} 
        />
      )}
    </div>
  );
}

export default ProductModal;
