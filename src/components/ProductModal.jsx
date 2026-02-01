import { X, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from './ImageGallery';
import AdvancedProductSelector from './AdvancedProductSelector';
import { useLanguage } from '../contexts/LanguageContext';
import ModalPortal from './modalPortal';

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

  // Normalize images
  const productImages = Array.isArray(product.images)
    ? product.images
    : (product.images || product.image ? [product.images || product.image] : []);

  const hasMultipleImages = productImages.length > 1;

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
      image: productImages[0], // Ensure cart item has an image
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
    <ModalPortal>
      <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'white' }}>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>

          <div className="modal-body">
            <div className="modal-image">
              {productImages.length > 0 ? (
                <div className="product-gallery-container">
                  <img
                    src={productImages[0]}
                    alt={product.name}
                    className="modal-main-image"
                    onClick={() => hasMultipleImages && setShowGallery(true)}
                    style={{ cursor: hasMultipleImages ? 'pointer' : 'default' }}
                  />
                  {hasMultipleImages && (
                    <button
                      className="view-gallery-btn"
                      onClick={() => setShowGallery(true)}
                    >
                      <Eye size={16} />
                      {t('viewGallery')} ({productImages.length} {t('photos')})
                    </button>
                  )}
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
                    <div className="product-selection">
                      <label htmlFor="size-select">{t('selectSize')}:</label>
                      <select
                        id="size-select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <option value="">Choose a size</option>
                        {availableSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {needsColors && (
                    <div className="product-selection">
                      <label htmlFor="color-select">{t('selectColor')}:</label>
                      <div className="color-palette">
                        {availableColors.map(color => (
                          <button
                            key={color.name}
                            className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setSelectedColor(color.name)}
                            title={color.name}
                            aria-label={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="product-quantity">
                    <label htmlFor="quantity-input">{t('quantity')}:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={decreaseQuantity}
                        aria-label="Decrease quantity"
                        className="quantity-btn"
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        id="quantity-input"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="quantity-input"
                      />
                      <button
                        onClick={increaseQuantity}
                        aria-label="Increase quantity"
                        className="quantity-btn"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="add-to-cart-btn modal-add-to-cart-btn"
                  >
                    <ShoppingCart size={18} />
                    {t('addToCart')}
                  </button>
                </>
              )}

              <div className="product-info-note">
                <p><strong>Note:</strong> Contact us on WhatsApp for bulk orders or special requests.</p>
              </div>

              <div className="product-rating-section">
                <div className="rating-display">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <span className="rating-text">{product.rating}/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showGallery && productImages.length > 0 && (
          <ImageGallery
            images={productImages}
            onClose={() => setShowGallery(false)}
          />
        )}
      </div>
    </ModalPortal>
  );
}

export default ProductModal;
