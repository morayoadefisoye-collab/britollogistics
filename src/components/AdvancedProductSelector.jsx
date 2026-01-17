import { useState, useEffect } from 'react';
import { Check, Info, Star, Shield, Heart, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

function AdvancedProductSelector({ product, onAddToCart, selectedSize, selectedColor, onSizeChange, onColorChange }) {
  const { t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [hoveredSize, setHoveredSize] = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
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

  // Expanded color map to cover all products
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
    'Sage Green': '#84CC16',
    'Multi-color': 'linear-gradient(45deg, red, blue, green, yellow)',
    'Leopard Print': 'repeating-linear-gradient(45deg, #C4A484 0, #C4A484 10px, #000 10px, #000 12px)',
    'Printed': 'repeating-linear-gradient(135deg, #fff 0, #fff 10px, #333 10px, #333 12px)',
    'Solid': '#555555',
    'Neutral': '#D4D4D4',
    'Burgundy': '#800020',
    'Gold': '#FFD700',
    'Berry': '#8A2BE2',
    'Floral Print': 'radial-gradient(circle, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'Burberry Check': 'repeating-linear-gradient(90deg, #f5f5dc 0, #f5f5dc 20px, #000 20px, #000 22px, #f00 22px, #f00 24px)',
    'Various Colors': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
  };

  // Helper to get color value
  const getColorValue = (name) => {
    return colorMap[name] || '#CCCCCC'; // Default to gray if unknown
  };

  // Helper to check if color is a gradient
  const isGradient = (value) => {
    return value && value.includes('gradient');
  };

  // Stock simulation - defaulting to available for all valid options
  // In a real app, this would come from the backend
  const getStockForOption = (size, color) => {
    // For now, assume everything listed in the product data is in stock
    // You can add specific logic here if needed
    return 10; 
  };

  const currentStock = 10; // Default stock
  const stockStatus = { status: 'in-stock', text: t('inStock'), color: '#10b981' };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
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

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="advanced-selector-section">
          <div className="selector-header">
            <label>{t('selectSize')}</label>
            <button 
              className="size-guide-btn"
              onClick={() => setShowSizeGuide(true)}
            >
              <Info size={14} />
              {t('sizeGuide')}
            </button>
          </div>
          
          <div className="advanced-size-options">
            {product.sizes.map(size => {
              const isSelected = selectedSize === size;
              return (
                <div key={size} className="size-option-container">
                  <button
                    className={`advanced-size-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSizeChange(size)}
                  >
                    <span className="size-label">{size}</span>
                    {isSelected && <Check size={14} className="check-icon" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="advanced-selector-section">
          <div className="selector-header">
            <label>{t('selectColor')}</label>
            {selectedColor && (
              <span className="selected-color-name">{selectedColor}</span>
            )}
          </div>
          
          <div className="advanced-color-options">
            {product.colors.map(colorName => {
              const colorValue = getColorValue(colorName);
              const isSelected = selectedColor === colorName;
              const isHovered = hoveredColor === colorName;
              
              return (
                <div key={colorName} className="color-option-container">
                  <button
                    className={`advanced-color-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onColorChange(colorName)}
                    onMouseEnter={() => setHoveredColor(colorName)}
                    onMouseLeave={() => setHoveredColor(null)}
                    style={{ background: colorValue }}
                    title={colorName}
                  >
                    {colorValue === '#FFFFFF' && <span className="white-border"></span>}
                    {isSelected && <Check size={16} className="color-check" style={{ color: isGradient(colorValue) || colorValue === '#000000' ? '#fff' : '#000' }} />}
                  </button>
                  
                  {(isHovered || isSelected) && (
                    <div className="color-tooltip">
                      <div className="color-name">{colorName}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Status */}
      <div className="stock-status" style={{ color: stockStatus.color }}>
        <div className="stock-indicator">
          <span className="stock-dot" style={{ backgroundColor: stockStatus.color }}></span>
          {stockStatus.text}
        </div>
      </div>

      {/* Quantity Selection */}
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
        className={`advanced-add-to-cart ${(!selectedSize && product.sizes?.length > 0) || (!selectedColor && product.colors?.length > 0) ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={(!selectedSize && product.sizes?.length > 0) || (!selectedColor && product.colors?.length > 0)}
      >
        {(!selectedSize && product.sizes?.length > 0) || (!selectedColor && product.colors?.length > 0) ? t('selectSizeColor') : 
         `${t('addToCart')} - ₦${(product.price * selectedQuantity).toLocaleString()}`}
      </button>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="size-guide-modal" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t('sizeGuide')}</h3>
            <table className="size-chart">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>{t('bust')}</th>
                  <th>{t('waist')}</th>
                  <th>{t('hips')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS</td>
                  <td>32-34</td>
                  <td>24-26</td>
                  <td>34-36</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>34-36</td>
                  <td>26-28</td>
                  <td>36-38</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>36-38</td>
                  <td>28-30</td>
                  <td>38-40</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>38-40</td>
                  <td>30-32</td>
                  <td>40-42</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>40-42</td>
                  <td>32-34</td>
                  <td>42-44</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>42-44</td>
                  <td>34-36</td>
                  <td>44-46</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setShowSizeGuide(false)}>{t('close')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvancedProductSelector;