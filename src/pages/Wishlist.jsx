import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Wishlist({ addToCart }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    if (window.confirm(t('confirmClearWishlist'))) {
      clearWishlist();
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="container">
        <div className="wishlist-empty">
          <div className="empty-wishlist-icon">
            <Heart size={80} />
          </div>
          <h2>{t('emptyWishlist')}</h2>
          <p>{t('emptyWishlistMessage')}</p>
          <Link to="/" className="btn btn-primary">
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wishlist-header">
        <div className="wishlist-title">
          <Heart size={24} />
          <h1>{t('myWishlist')}</h1>
          <span className="wishlist-count">({wishlist.length} {t('items')})</span>
        </div>
        {wishlist.length > 0 && (
          <button 
            onClick={handleClearWishlist}
            className="btn btn-outline clear-wishlist-btn"
          >
            <Trash2 size={18} />
            {t('clearWishlist')}
          </button>
        )}
      </div>

      {user && (
        <div className="wishlist-user-info">
          <p>{t('wishlistFor')} <strong>{user.firstName} {user.lastName}</strong></p>
        </div>
      )}

      <div className="wishlist-grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-item">
            <div className="wishlist-item-image">
              {product.hasGallery && product.images ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">
                  <span>Image Coming Soon</span>
                </div>
              )}
              <button 
                className="remove-from-wishlist"
                onClick={() => handleRemoveFromWishlist(product.id)}
                title={t('removeFromWishlist')}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="wishlist-item-details">
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-price">
                <span className="price">₦{product.price.toLocaleString()}</span>
              </div>

              {product.addedAt && (
                <div className="added-date">
                  {t('addedOn')} {new Date(product.addedAt).toLocaleDateString()}
                </div>
              )}

              <div className="wishlist-item-actions">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary add-to-cart-btn"
                >
                  <ShoppingCart size={18} />
                  {t('addToCart')}
                </button>
                
                <button 
                  className="btn btn-outline share-btn"
                  title={t('shareProduct')}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-actions">
        <Link to="/" className="btn btn-outline">
          {t('continueShopping')}
        </Link>
        
        {wishlist.length > 0 && (
          <button 
            onClick={() => {
              wishlist.forEach(product => handleAddToCart(product));
              if (window.confirm(t('confirmAddAllToCart'))) {
                clearWishlist();
              }
            }}
            className="btn btn-primary add-all-to-cart"
          >
            <ShoppingCart size={18} />
            {t('addAllToCart')}
          </button>
        )}
      </div>
    </div>
  );
}

export default Wishlist;