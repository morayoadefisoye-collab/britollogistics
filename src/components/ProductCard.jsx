import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

function ProductCard({ product, onQuickAdd, onViewDetails }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onQuickAdd(product, quantity);
  };

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image-placeholder">
        <span>Image Coming Soon</span>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
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
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
