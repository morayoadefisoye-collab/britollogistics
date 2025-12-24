import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

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
                     product.category.includes('Accessories');

  // Categories that need colors (similar to sizes but could be different)
  const needsColors = product.category.includes('Fashion') || 
                      product.category.includes('Wear') || 
                      product.category.includes('Accessories') ||
                      product.category.includes('Home') ||
                      product.category.includes('Decor');

  const handleAddToCart = () => {
    if (needsSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }

    if (needsColors && !selectedColor) {
      alert('Please select a color');
      return;
    }

    const productToAdd = {
      ...product,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
      quantity: quantity
    };

    onAddToCart(productToAdd, quantity);
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
            <div className="product-image-placeholder">
              <span>Image Coming Soon</span>
            </div>
          </div>

          <div className="modal-details">
            <div className="product-category">{product.category}</div>
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-price">
              <span className="price-label">Price:</span>
              <span className="price-value">₦{product.price.toLocaleString()}</span>
            </div>

            {needsSizes && (
              <div className="size-selector">
                <label>Select Size:</label>
                <div className="size-options">
                  {sizes.map(size => (
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
                <label>Select Color:</label>
                <div className="color-options">
                  {colors.map(color => (
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
              <label>Quantity:</label>
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
              <span>Total:</span>
              <span className="total-price">₦{(product.price * quantity).toLocaleString()}</span>
            </div>

            <button className="btn btn-primary btn-block btn-large" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <div className="product-info-note">
              <p><strong>Note:</strong> Contact us on WhatsApp for bulk orders or special requests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
