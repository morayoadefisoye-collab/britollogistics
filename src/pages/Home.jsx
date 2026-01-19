import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SocialLinks from '../components/SocialLinks';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const products = [
  // Ladies' Wears
  {
    id: 1,
    name: 'Luxury Two-Piece Set',
    price: 15000,
    category: "Ladies' Fashion",
    description: 'Elegant two-piece outfit perfect for any occasion',
    image: '/ladies wear/luxury mikkaye 2pcs top and skirt.jpeg',

    sizes: ['free size'],
    colors: ['pink,wine']

  },
  {
    id: 2,
    name: 'Turkey Maxi Dress',
    price: 12500,
    category: "Ladies' Fashion",
    description: 'Premium quality imported maxi dress',
    image: '/ladies wear/Aso Oke boubou gown.(2).jpeg', // Added placeholder image, user should verify
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Blue', 'Green', 'Purple']
  },
  {
    id: 3,
    name: 'Corporate Blazer Set',
    price: 18000,
    category: "Ladies' Fashion",
    description: 'Professional blazer and trouser set for office wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Blue']
  },
  {
    id: 4,
    name: 'Stylish Handbag',
    price: 8500,
    category: "Ladies' Accessories",
    description: 'Trendy handbag with multiple compartments',
    colors: ['Black', 'Brown', 'Red', 'Pink']
  },
  {
    id: 5,
    name: "Ladies' Heels",
    price: 9500,
    category: "Ladies' Accessories",
    description: 'Comfortable and stylish heels for any event',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: ['Black', 'Brown', 'Red', 'Pink']
  },
  {
    id: 6,
    name: 'Mikkaye Casual Top',
    price: 7500,
    category: "Ladies' Fashion",
    description: 'Comfortable casual top for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Pink', 'Blue', 'Yellow']
  },
  {
    id: 7,
    name: 'Alo comfort set',
    image: '/ladies wear/Alo Comfort Set.jpeg',
    price: 1,
    category: "Ladies' Clothing",
    description: '',
  },
  {
    id: 8,
    name: 'Aso Oke bubu gown',
    images: '/ladies wear/Aso Oke boubou gown.(2).jpeg',
    price: 8500,
    category: "Ladies' Clothing",
    description: '',
  },
  {
    id: 9,
    name: 'Aso Oke bubu gown',
    images: '/ladies wear/Aso Oke bubu gown.jpeg',
    price: 8500,
    category: "Ladies' Clothing",
    description: '',
  },

  // Men's Fashion
  {
    id: 10,
    name: 'Corporate Shirt',
    price: 8000,
    category: "Men's Fashion",
    description: 'Quality corporate shirt for professional look',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Black']
  },
  {
    id: 11,
    name: "Men's Luxury Jalamia",
    price: 22000,
    category: "Men's Fashion",
    description: 'Premium traditional wear with modern touch',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Brown']
  },
  {
    id: 12,
    name: 'Designer Sneakers',
    price: 12000,
    category: "Men's Accessories",
    description: 'Trendy sneakers for casual and sport wear',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black', 'White', 'Gray', 'Blue']
  },
  {
    id: 13,
    name: 'Polo T-Shirt',
    price: 5500,
    category: "Men's Fashion",
    description: 'Classic polo shirt in various colors',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Red', 'Blue', 'Green']
  },
  {
    id: 14,
    name: 'Denim Jeans',
    price: 9000,
    category: "Men's Fashion",
    description: 'Durable and stylish denim jeans',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Blue', 'Black']
  },
  {
    id: 15,
    name: "Men's Leather Belt",
    price: 4500,
    category: "Men's Accessories",
    description: 'Quality leather belt for formal and casual wear',
    sizes: ['32', '34', '36', '38', '40', '42'],
    colors: ['Black', 'Brown']
  },

  // Children's Clothing
  {
    id: 16,
    name: "Boys' Casual Set",
    price: 6500,
    category: "Children's Wear",
    description: 'Comfortable and cute outfit for boys',
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Blue', 'Red', 'Green', 'Black']
  },
  {
    id: 17,
    name: "Girls' Party Dress",
    price: 7500,
    category: "Children's Wear",
    description: 'Beautiful dress perfect for special occasions',
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Pink', 'Purple', 'White', 'Red']
  },
  {
    id: 18,
    name: "Kids' Sneakers",
    price: 5000,
    category: "Children's Wear",
    description: 'Durable sneakers for active kids',
    sizes: ['25', '26', '27', '28', '29', '30', '31', '32'],
    colors: ['Black', 'White', 'Red', 'Blue']
  },

  // Household Items
  {
    id: 19,
    name: 'Premium Bedding Set',
    price: 15000,
    category: 'Household',
    description: 'Luxury bedding set with duvet and pillowcases',
    sizes: ['Single', 'Double', 'Queen', 'King'],
    colors: ['White', 'Blue', 'Gray', 'Pink']
  },
  {
    id: 20,
    name: 'Bath Towel Set',
    price: 8000,
    category: 'Household',
    description: 'Soft and absorbent towel set',
    colors: ['White', 'Blue', 'Pink', 'Gray']
  },
  {
    id: 21,
    name: 'Kitchen Utensils Set',
    price: 6500,
    category: 'Household',
    description: 'Complete kitchen essentials set'
  },

  // Gold Accessories
  {
    id: 22,
    name: 'Gold Chain Necklace',
    price: 25000,
    category: 'Gold Accessories',
    description: 'Elegant gold chain for men and women',
    sizes: ['16 inches', '18 inches', '20 inches', '22 inches']
  },
  {
    id: 23,
    name: 'Gold Earrings',
    price: 18000,
    category: 'Gold Accessories',
    description: 'Beautiful gold earrings'
  },
  {
    id: 24,
    name: 'Gold Bracelet',
    price: 22000,
    category: 'Gold Accessories',
    description: 'Stylish gold wrist bracelet',
    sizes: ['Small', 'Medium', 'Large']
  },

  // Featured Gallery Product

  {
    id: 25,
    name: 'Elegant Feather-Leaf Lace Midi Dress',
    price: 25000,
    category: 'Featured Collection',
    description: 'Chic white dress with 3D leaf details, puff sleeves, and lace waist - perfect for elegant occasions',
    images: [
      "/ladies wear/Feather Lace Midi Dress (2).jpg",
      "/ladies wear/Feather Lace Midi Dress (3).jpg",
      "/ladies wear/Feather Lace Midi Dress (4).jpg",
      "/ladies wear/Feather Lace Midi Dress (5).jpg",
    ],
    hasGallery: true,
    sizes: ['LG', 'XL', '2XL'],
    colors: ['Green', 'Cream', 'White', 'Red', 'Purple']
  },
  {
    id: 26,
    name: 'Luxury Velvet Evening Gown',
    price: 45000,
    category: "Ladies' Fashion",
    description: 'An exquisite velvet evening gown featuring a high slit and off-shoulder design. Perfect for red carpet events.',
    images: [
      "/ladies wear/Aso Oke boubou gown.(2).jpeg",
      "/ladies wear/luxury mikkaye 2pcs top and skirt.jpeg",
      "/ladies wear/Alo Comfort Set.jpeg"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black', 'Emerald Green']
  }
];

function Home({ addToCart }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { key: 'All', label: t('allCategories') },
    { key: "Ladies' Fashion", label: t('ladiesFashion') },
    { key: "Men's Fashion", label: t('mensFashion') },
    { key: "Children's Wear", label: t('childrensWear') },
    { key: "Ladies' Accessories", label: t('ladiesAccessories') },
    { key: "Men's Accessories", label: t('mensAccessories') },
    { key: 'Household', label: t('household') },
    { key: 'Gold Accessories', label: t('goldAccessories') },
    { key: 'Featured Collection', label: t('featuredCollection') }
  ];

  const handleQuickAdd = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = (product, quantity) => {
    addToCart(product, quantity);
  };

  let filteredProducts = products.filter(product => {
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
        />
      )}

      <SocialLinks />
    </div>
  );
}

export default Home;
