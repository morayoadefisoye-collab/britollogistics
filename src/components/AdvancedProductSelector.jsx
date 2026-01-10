import { useState } from 'react';
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

  // Stock simulation - in real app this would come from backend
  const stockData = {
    'LG': { 'Green': 5, 'Cream': 8, 'White': 12, 'Red': 3, 'Purple': 7 },
    'XL': { 'Green': 10, 'Cream': 6, 'White': 15, 'Red': 9, 'Purple': 4 },
    '2XL': { 'Green': 7, 'Cream': 11, 'White': 8, 'Red': 6, 'Purple': 12 }
  };

  // Size recommendations based on popularity
  const sizePopularity = { 
    'LG': t('mostPopular'), 
    'XL': t('bestSeller'), 
    '2XL': t('limitedStock') 
  };

  // Color descriptions
  const colorDescriptions = {
    'Green': t('colorDescriptions.green'),
    'Cream': t('colorDescriptions.cream'),
    'White': t('colorDescriptions.white'),
    'Red': t('colorDescriptions.red'),
    'Purple': t('colorDescriptions.purple')
  };

  const getCurrentStock = () => {
    if (selectedSize && selectedColor) {
      return stockData[selectedSize]?.[selectedColor] || 0;
    }
    return null;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'out-of-stock', text: t('outOfStock'), color: '#dc2626' };
    if (stock <= 3) return { status: 'low-stock', text: t('lowStock', { count: stock }), color: '#f59e0b' };
    if (stock <= 7) return { status: 'medium-stock', text: t('available', { count: stock }), color: '#10b981' };
    return { status: 'in-stock', text: t('inStock'), color: '#10b981' };
  };

  const currentStock = getCurrentStock();
  const stockStatus = currentStock !== null ? getStockStatus(currentStock) : null;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
      quantity: selectedQuantity
    };
    onAddToCart(productToAdd, selectedQuantity);
  };

  const maxQuantity = currentStock || 1;

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
          {product.sizes?.map(size => {
            const isSelected = selectedSize === size;
            const isHovered = hoveredSize === size;
            const hasStock = Object.values(stockData[size] || {}).some(stock => stock > 0);
            
            return (
              <div key={size} className="size-option-container">
                <button
                  className={`advanced-size-btn ${isSelected ? 'selected' : ''} ${!hasStock ? 'no-stock' : ''}`}
                  onClick={() => hasStock && onSizeChange(size)}
                  onMouseEnter={() => setHoveredSize(size)}
                  onMouseLeave={() => setHoveredSize(null)}
                  disabled={!hasStock}
                >
                  <span className="size-label">{size}</span>
                  {isSelected && <Check size={14} className="check-icon" />}
                  {sizePopularity[size] && (
                    <span className="size-badge">{sizePopularity[size]}</span>
                  )}
                </button>
                {(isHovered || isSelected) && hasStock && (
                  <div className="size-tooltip">
                    Available in {Object.entries(stockData[size] || {}).filter(([, stock]) => stock > 0).length} colors
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div className="advanced-selector-section">
        <div className="selector-header">
          <label>{t('selectColor')}</label>
          {selectedColor && (
            <span className="selected-color-name">{selectedColor}</span>
          )}
        </div>
        
        <div className="advanced-color-options">
          {product.colors?.map(colorName => {
            const colorMap = {
              'Green': '#16A34A', 'Cream': '#FEF3C7', 'White': '#FFFFFF',
              'Red': '#DC2626', 'Purple': '#9333EA'
            };
            
            const isSelected = selectedColor === colorName;
            const isHovered = hoveredColor === colorName;
            const stock = selectedSize ? stockData[selectedSize]?.[colorName] || 0 : 0;
            const hasStock = stock > 0;
            
            return (
              <div key={colorName} className="color-option-container">
                <button
                  className={`advanced-color-btn ${isSelected ? 'selected' : ''} ${!hasStock && selectedSize ? 'no-stock' : ''}`}
                  onClick={() => hasStock && onColorChange(colorName)}
                  onMouseEnter={() => setHoveredColor(colorName)}
                  onMouseLeave={() => setHoveredColor(null)}
                  style={{ backgroundColor: colorMap[colorName] }}
                  disabled={!hasStock && selectedSize}
                  title={colorName}
                >
                  {colorMap[colorName] === '#FFFFFF' && <span className="white-border"></span>}
                  {isSelected && <Check size={16} className="color-check" />}
                  {!hasStock && selectedSize && <span className="no-stock-overlay">✕</span>}
                </button>
                
                {(isHovered || isSelected) && (
                  <div className="color-tooltip">
                    <div className="color-name">{colorName}</div>
                    <div className="color-description">{colorDescriptions[colorName]}</div>
                    {selectedSize && (
                      <div className="color-stock">
                        {hasStock ? `${stock} ${t('available')}` : t('outOfStock')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stock Status */}
      {stockStatus && (
        <div className="stock-status" style={{ color: stockStatus.color }}>
          <div className="stock-indicator">
            <span className="stock-dot" style={{ backgroundColor: stockStatus.color }}></span>
            {stockStatus.text}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      {selectedSize && selectedColor && currentStock > 0 && (
        <div className="quantity-section">
          <label>{t('quantity')}</label>
          <div className="quantity-controls-advanced">
            <button 
              onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              disabled={selectedQuantity <= 1}
            >
              -
            </button>
            <select 
              value={selectedQuantity} 
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            >
              {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button 
              onClick={() => setSelectedQuantity(Math.min(maxQuantity, selectedQuantity + 1))}
              disabled={selectedQuantity >= maxQuantity}
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
        className={`advanced-add-to-cart ${(!selectedSize || !selectedColor || currentStock === 0) ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={!selectedSize || !selectedColor || currentStock === 0}
      >
        {!selectedSize || !selectedColor ? t('selectSizeColor') : 
         currentStock === 0 ? t('outOfStock') : 
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
                  <td>LG</td>
                  <td>36-38</td>
                  <td>28-30</td>
                  <td>38-40</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>40-42</td>
                  <td>32-34</td>
                  <td>42-44</td>
                </tr>
                <tr>
                  <td>2XL</td>
                  <td>44-46</td>
                  <td>36-38</td>
                  <td>46-48</td>
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