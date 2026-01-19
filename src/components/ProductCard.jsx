import { ShoppingCart, Plus, Minus, Images, Star } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useReviews } from '../contexts/ReviewsContext';

function ProductCard({ product, onQuickAdd, onViewDetails }) {
  const { t } = useLanguage();
  const { getProductRating } = useReviews();
  const [quantity, setQuantity] = useState(1);

  const productRating = getProductRating(product.id);

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
  };

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="product-image-placeholder">
          {(product.images || product.image) ? (
            <div className="product-gallery-preview">
              <img
                src={Array.isArray(product.images) ? product.images[0] : (product.images || product.image)}
                alt={product.name}
                className="product-preview-image"
              />
              {Array.isArray(product.images) && product.images.length > 1 && (
                <div className="gallery-indicator">
                  <Images size={16} />
                  <span>{product.images.length} {t('photos')}</span>
                </div>
              )}
            </div>
          ) : (
            <span>Image Coming Soon</span>
          )}
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>

          {/* Product Rating */}
          {productRating.count > 0 && (
            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={14}
                    fill={star <= Math.round(productRating.average) ? '#fbbf24' : 'none'}
                    color={star <= Math.round(productRating.average) ? '#fbbf24' : '#d1d5db'}
                  />
                ))}
              </div>
              <span className="rating-text">
                {productRating.average} ({productRating.count})
              </span>
            </div>
          )}

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
    </>
  );
}

export default ProductCard;
