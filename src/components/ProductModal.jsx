import { X, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from './ImageGallery';
import AdvancedProductSelector from './AdvancedProductSelector';
import { useLanguage } from '../contexts/LanguageContext';
import ModalPortal from './modalPortal';

function ProductModal({ product, onClose, onAddToCart, openGalleryOnLoad = false }) {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [showGallery, setShowGallery] = useState(openGalleryOnLoad && product.images && product.images.length > 0);

  // Normalize images
  const productImages = Array.isArray(product.images)
    ? product.images
    : (product.images || product.image ? [product.images || product.image] : []);

  const hasMultipleImages = productImages.length > 1;

  const handleAddToCart = (productToAdd = product, quantityToAdd = quantity) => {
    if (product.isSoldOut) {
      return;
    }

    if (product.hasGallery && productToAdd !== product) {
      onAddToCart(productToAdd, quantityToAdd);
      setQuantity(1);
      onClose();
      return;
    }

    const finalProduct = {
      ...product,
      image: productImages[0], // Ensure cart item has an image
      size: 'N/A',
      color: 'N/A',
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
                />
              ) : (
                <>
                  {!product.isSoldOut && (
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
                  )}

                  <button
                    onClick={product.isSoldOut ? undefined : handleAddToCart}
                    disabled={product.isSoldOut}
                    className="add-to-cart-btn modal-add-to-cart-btn"
                    style={product.isSoldOut ? { opacity: 0.7, cursor: 'not-allowed', backgroundColor: 'red' } : {}}
                  >
                    {product.isSoldOut ? null : <ShoppingCart size={18} />}
                    {product.isSoldOut ? 'Sold Out' : t('addToCart')}
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
