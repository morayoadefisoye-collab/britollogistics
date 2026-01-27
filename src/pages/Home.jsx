import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { productsData } from '../data/productsData';

function Home({ addToCart }) {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);

  // Handle URL search parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  // Update URL when search term changes
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim()) {
      setSearchParams({ search: newSearchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const categories = [
    { key: 'All', label: t('allCategories') },
    { key: "Ladies' Fashion", label: t('ladiesFashion') },
    { key: "Men's Fashion", label: t('mensFashion') },
    { key: "Children's Wear", label: t('childrensWear') },
    { key: "Ladies' Accessories", label: t('ladiesAccessories') },
    { key: "Men's Accessories", label: t('mensAccessories') },
    { key: 'Perfumes', label: t('perfumes') },
    { key: 'Household', label: t('household') },
    { key: 'Gold Accessories', label: t('goldAccessories') },
    { key: 'Featured Collection', label: t('featuredCollection') }
  ];

  const handleQuickAdd = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleViewDetails = (product, openGalleryDirectly = false) => {
    setSelectedProduct(product);
    setOpenGallery(openGalleryDirectly);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenGallery(false);
  };

  const handleAddToCartFromModal = (product, quantity) => {
    addToCart(product, quantity);
  };

  let filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      <section className="hero">
        <h1 className="sr-only">Everything By Britol - Online Shopping</h1>
        <h2>{t('heroTitle')}</h2>
        <p>{t('heroSubtitle')}</p>
      </section>

      <div className="search-filter-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder={t('searchProducts')}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="category-filter">
            <Filter size={18} />
            <span className="filter-label">{t('category')}:</span>
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`filter-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="featured">{t('featured')}</option>
            <option value="price-low">{t('priceLowToHigh')}</option>
            <option value="price-high">{t('priceHighToLow')}</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickAdd={handleQuickAdd}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>{t('noResults')}</p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCartFromModal}
          openGalleryOnLoad={openGallery}
        />
      )}
    </div>
  );
}

export default Home;