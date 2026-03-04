import { useState, useEffect } from 'react';
import { Star, Shield, Heart, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

function AdvancedProductSelector({ product, onAddToCart }) {
  const { t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    toggleWishlist(product);
  };

  const stockStatus = product.isSoldOut
    ? { status: 'out-of-stock', text: 'Sold Out', color: '#dc2626' }
    : { status: 'in-stock', text: t('inStock'), color: '#10b981' };

  const handleAddToCart = () => {
    if (product.isSoldOut) {
      return;
    }
    const productToAdd = {
      ...product,
      size: 'N/A',
      color: 'N/A',
      quantity: selectedQuantity
    };
    onAddToCart(productToAdd, selectedQuantity);
  };

  return (
    <div className="advanced-product-selector">
      {/* Product Actions Bar */}
      <div className="product-actions-bar">
        <button 
          className={`action-btn favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={t('addToWishlist')}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button className="action-btn share" title="Share Product">
          <Share2 size={18} />
        </button>
      </div>

      {/* Stock Status */}
      <div className="stock-status" style={{ color: stockStatus.color }}>
        <div className="stock-indicator">
          <span className="stock-dot" style={{ backgroundColor: stockStatus.color }}></span>
          {stockStatus.text}
        </div>
      </div>

      {/* Quantity Selection */}
      {!product.isSoldOut && (
        <div className="quantity-section">
          <label>{t('quantity')}</label>
          <div className="quantity-controls-advanced">
            <button 
              onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              disabled={selectedQuantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{selectedQuantity}</span>
            <button 
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Product Features */}
      <div className="product-features">
        <div className="feature-item">
          <Shield size={16} />
          <span>{t('returnGuarantee')}</span>
        </div>
        <div className="feature-item">
          <Star size={16} />
          <span>{t('premiumQuality')}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`advanced-add-to-cart ${product.isSoldOut ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={product.isSoldOut}
        style={product.isSoldOut ? { opacity: 0.7, cursor: 'not-allowed', backgroundColor: 'red' } : {}}
      >
        {product.isSoldOut 
          ? 'Sold Out' 
          : `${t('addToCart')} - ₦${(product.price * selectedQuantity).toLocaleString()}`}
      </button>
    </div>
  );
}

export default AdvancedProductSelector;