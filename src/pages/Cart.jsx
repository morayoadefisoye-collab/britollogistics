import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Shopping Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item, index) => {
            // Determine the best image to display
            const itemImage = item.image || 
                            (Array.isArray(item.images) ? item.images[0] : item.images) || 
                            '/placeholder.jpg';
            
            // Create a safe key that handles undefined values
            const safeSize = item.size || 'N/A';
            const safeColor = item.color || 'N/A';
            const uniqueKey = `cart-${item.id}-${safeSize}-${safeColor}-${index}`;
            
            return (
              <div key={uniqueKey} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={itemImage} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>';
                    }}
                  />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <div className="item-details">
                    {item.size && item.size !== 'N/A' && (
                      <span className="item-size">Size: {item.size}</span>
                    )}
                    {item.color && item.color !== 'N/A' && (
                      <span className="item-color">Color: {item.color}</span>
                    )}
                  </div>
                  <p className="price">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, safeSize, safeColor)}
                    aria-label="Decrease quantity"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, safeSize, safeColor)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="cart-item-total">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, safeSize, safeColor)} 
                  className="btn-icon" 
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
