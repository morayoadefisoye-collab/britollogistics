import { ShoppingCart } from 'lucide-react';

function ProductCard({ product, onQuickAdd, onViewDetails }) {
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
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }} 
            className="btn btn-primary"
          >
            <ShoppingCart size={18} />
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
