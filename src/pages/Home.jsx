import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SocialLinks from '../components/SocialLinks';
import { Search, Filter } from 'lucide-react';

const products = [
  // Ladies' Wears
  { id: 1, name: 'Luxury Two-Piece Set', price: 15000, category: "Ladies' Fashion", description: 'Elegant two-piece outfit perfect for any occasion' },
  { id: 2, name: 'Turkey Maxi Dress', price: 12500, category: "Ladies' Fashion", description: 'Premium quality imported maxi dress' },
  { id: 3, name: 'Corporate Blazer Set', price: 18000, category: "Ladies' Fashion", description: 'Professional blazer and trouser set for office wear' },
  { id: 4, name: 'Stylish Handbag', price: 8500, category: "Ladies' Accessories", description: 'Trendy handbag with multiple compartments' },
  { id: 5, name: "Ladies' Heels", price: 9500, category: "Ladies' Accessories", description: 'Comfortable and stylish heels for any event' },
  { id: 6, name: 'Mikkaye Casual Top', price: 7500, category: "Ladies' Fashion", description: 'Comfortable casual top for everyday wear' },
  
  // Men's Fashion
  { id: 7, name: 'Corporate Shirt', price: 8000, category: "Men's Fashion", description: 'Quality corporate shirt for professional look' },
  { id: 8, name: "Men's Luxury Jalamia", price: 22000, category: "Men's Fashion", description: 'Premium traditional wear with modern touch' },
  { id: 9, name: 'Designer Sneakers', price: 12000, category: "Men's Accessories", description: 'Trendy sneakers for casual and sport wear' },
  { id: 10, name: 'Polo T-Shirt', price: 5500, category: "Men's Fashion", description: 'Classic polo shirt in various colors' },
  { id: 11, name: 'Denim Jeans', price: 9000, category: "Men's Fashion", description: 'Durable and stylish denim jeans' },
  { id: 12, name: "Men's Leather Belt", price: 4500, category: "Men's Accessories", description: 'Quality leather belt for formal and casual wear' },
  
  // Children's Clothing
  { id: 13, name: "Boys' Casual Set", price: 6500, category: "Children's Wear", description: 'Comfortable and cute outfit for boys' },
  { id: 14, name: "Girls' Party Dress", price: 7500, category: "Children's Wear", description: 'Beautiful dress perfect for special occasions' },
  { id: 15, name: "Kids' Sneakers", price: 5000, category: "Children's Wear", description: 'Durable sneakers for active kids' },
  
  // Household Items
  { id: 16, name: 'Premium Bedding Set', price: 15000, category: 'Household', description: 'Luxury bedding set with duvet and pillowcases' },
  { id: 17, name: 'Bath Towel Set', price: 8000, category: 'Household', description: 'Soft and absorbent towel set' },
  { id: 18, name: 'Kitchen Utensils Set', price: 6500, category: 'Household', description: 'Complete kitchen essentials set' },
  
  // Gold Accessories
  { id: 19, name: 'Gold Chain Necklace', price: 25000, category: 'Gold Accessories', description: 'Elegant gold chain for men and women' },
  { id: 20, name: 'Gold Earrings', price: 18000, category: 'Gold Accessories', description: 'Beautiful gold earrings' },
  { id: 21, name: 'Gold Bracelet', price: 22000, category: 'Gold Accessories', description: 'Stylish gold wrist bracelet' },
];

const categories = ['All', "Ladies' Fashion", "Men's Fashion", "Children's Wear", "Ladies' Accessories", "Men's Accessories", 'Household', 'Gold Accessories'];

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickAdd = (product) => {
    addToCart(product);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = (product, quantity) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
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
        <h2>Everything You'll Ever Need</h2>
        <p>Quality products, trusted service, unbeatable prices</p>
      </section>

      <SocialLinks />

      <div className="search-filter-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="category-filter">
            <Filter size={18} />
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
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
          <p>No products found matching your criteria</p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </div>
  );
}

export default Home;
