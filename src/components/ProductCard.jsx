import { ShoppingCart, Plus, Minus, Images, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

function ProductCard({ product, onQuickAdd, onViewDetails }) {
  const { t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const increaseQuantity = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();

    if(onViewDetails){
      onViewDetails(product)
    }
  }

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onQuickAdd(product, quantity);
    setQuantity(1);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    toggleWishlist(product);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    onViewDetails(product, true);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-image-placeholder">
        <button 
          className={`product-wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        {(product.images || product.image) ? (
          <div className="product-gallery-preview" onClick={handleImageClick} style={{ cursor: 'zoom-in' }}>
            <img 
              src={Array.isArray(product.images) ? product.images[0] : (product.images || product.image)}
              alt={product.name}
              className="product-preview-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/></svg>';
              }}
            />
            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="gallery-indicator">
                <Images size={16} />
                <span>{product.images.length} {t('photos')}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="product-image-placeholder-empty">
            <Images size={32} />
            <span>Image Coming Soon</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        {/* Product Rating */}
        <div className="product-rating">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={14}
                fill={star <= Math.round(product.rating) ? '#fbbf24' : 'none'}
                color={star <= Math.round(product.rating) ? '#fbbf24' : '#d1d5db'}
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating}/5.0
          </span>
        </div>

        <div className="product-footer">
          <span className="price">₦{product.price.toLocaleString()}</span>
          <div className="product-actions">
            <div className="quantity-controls">
              <button
                onClick={decreaseQuantity}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleQuickAdd}
              className="btn btn-primary"
            >
              <ShoppingCart size={18} />
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
