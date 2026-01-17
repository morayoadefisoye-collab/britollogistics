import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SocialLinks from '../components/SocialLinks';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const products = [
  // Ladies' Wears with Images - Grouped by Similar Names
  // Aso Oke Boubou Gown Group
  { 
    id: 1, 
    name: 'Aso Oke Boubou Gown', 
    price: 16000, 
    category: "Ladies' Fashion", 
    description: 'Premium Aso Oke boubou gown with traditional elegance',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Multi-color'],
    hasGallery: true,
    images: [
      '/ladies wear/Aso Oke boubou gown..jpeg',
      '/ladies wear/Aso Oke boubou gown.(2).jpeg',
      '/ladies wear/Aso Oke boubou gown.(3).jpeg'
    ]
  },

  // Feather Lace Midi Dress Group
  { 
    id: 2, 
    name: 'Feather Lace Midi Dress', 
    price: 14500, 
    category: "Ladies' Fashion", 
    description: 'Elegant feather lace midi dress perfect for special occasions',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    hasGallery: true,
    images: [
      '/ladies wear/Feather Lace Midi Dress.jpg',
      '/ladies wear/Feather Lace Midi Dress (2).jpg',
      '/ladies wear/Feather Lace Midi Dress (3).jpg',
      '/ladies wear/Feather Lace Midi Dress (4).jpg',
      '/ladies wear/Feather Lace Midi Dress (5).jpg'
    ]
  },

  // Luxury Mikkaye 2pcs Top and Skirt Group
  { 
    id: 3, 
    name: 'Luxury Mikkaye 2pcs Top and Skirt', 
    price: 13500, 
    category: "Ladies' Fashion", 
    description: 'Premium luxury two-piece set combining style and comfort',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Cream'],
    hasGallery: true,
    images: [
      '/ladies wear/luxury mikkaye 2pcs top and skirt.jpeg',
      '/ladies wear/luxury mikkaye 2pcs top and skirt .jpeg'
    ]
  },

  // Leopard Print Two-Piece Set Group
  { 
    id: 4, 
    name: 'Leopard Print Two-Piece Set', 
    price: 11000, 
    category: "Ladies' Fashion", 
    description: 'Trendy leopard print top and wide-leg trousers set',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Leopard Print'],
    hasGallery: true,
    images: [
      '/ladies wear/Leopard-print two-piece set (top and wide-leg trousers).jpeg',
      '/ladies wear/Leopard-print two-piece set (top and wide-leg trousers2).jpeg'
    ]
  },

  // Bubu Dress Group
  { 
    id: 5, 
    name: 'Bubu Dress', 
    price: 12000, 
    category: "Ladies' Fashion", 
    description: 'Traditional and stylish bubu dress for everyday elegance',
    sizes: ['Free Size', 'S', 'M', 'L', 'XL'],
    colors: ['Printed', 'Solid'],
    hasGallery: true,
    images: [
      '/ladies wear/bubu dress.jpeg',
      '/ladies wear/bubu dress (2).jpeg'
    ]
  },

  // Comfort and Loungewear Sets
  { 
    id: 6, 
    name: 'Alo Comfort Set', 
    price: 9500, 
    category: "Ladies' Fashion", 
    description: 'Comfortable leisure set for relaxation',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Neutral'],
    hasGallery: false,
    images: ['/ladies wear/Alo Comfort Set.jpeg']
  },

  { 
    id: 7, 
    name: 'Blossom Lounge Set', 
    price: 10500, 
    category: "Ladies' Fashion", 
    description: 'Cozy lounge set with beautiful blossom design',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White'],
    hasGallery: false,
    images: ['/ladies wear/Blossom Lounge Set  .jpeg']
  },

  { 
    id: 8, 
    name: 'Chic Diva Two-Piece Set', 
    price: 11500, 
    category: "Ladies' Fashion", 
    description: 'Bold and stylish two-piece set for confident women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Burgundy'],
    hasGallery: false,
    images: ['/ladies wear/Chic Diva Two-Piece Set  .jpeg']
  },

  { 
    id: 9, 
    name: 'Elegance Luxe Set', 
    price: 15000, 
    category: "Ladies' Fashion", 
    description: 'Premium elegant two-piece set for sophisticated style',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Black'],
    hasGallery: false,
    images: ['/ladies wear/Elegance Luxe Set.jpeg']
  },

  // Dresses
  { 
    id: 10, 
    name: 'Daisy Lace Maxi Dress', 
    price: 13000, 
    category: "Ladies' Fashion", 
    description: 'Elegant daisy lace maxi dress for special occasions',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream'],
    hasGallery: false,
    images: ['/ladies wear/Daisy Lace Maxi Dress.jpeg']
  },

  { 
    id: 11, 
    name: 'Floral Off-Shoulder Bodycon Dress', 
    price: 12500, 
    category: "Ladies' Fashion", 
    description: 'Trendy off-shoulder bodycon dress with floral design',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multi-color'],
    hasGallery: false,
    images: ['/ladies wear/Floral Off-Shoulder Bodycon Dress.jpeg']
  },

  { 
    id: 12, 
    name: 'Berry Gown', 
    price: 14000, 
    category: "Ladies' Fashion", 
    description: 'Beautiful berry-colored gown perfect for evening wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Berry'],
    hasGallery: false,
    images: ['/ladies wear/berry gown .jpeg']
  },

  { 
    id: 13, 
    name: 'Elegant Floral Printed Pleated Maxi Dress', 
    price: 13500, 
    category: "Ladies' Fashion", 
    description: 'Graceful floral printed pleated maxi dress with elegant draping',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Print'],
    hasGallery: false,
    images: ['/ladies wear/elegant, floral-printed pleated maxi dress.jpeg']
  },

  { 
    id: 14, 
    name: 'Rich Aunty Denim Maxi Dress', 
    price: 12000, 
    category: "Ladies' Fashion", 
    description: 'Stylish denim maxi dress with premium finish',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    hasGallery: false,
    images: ['/ladies wear/Rich aunty denim maxi dress.jpeg']
  },

  // Tops and Shirts
  { 
    id: 15, 
    name: 'Black Sheer Long-Sleeved Button-Down Top', 
    price: 8500, 
    category: "Ladies' Fashion", 
    description: 'Sophisticated black sheer top with long sleeves',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    hasGallery: false,
    images: ['/ladies wear/black sheer long-sleeved button-down top.jpeg']
  },

  { 
    id: 16, 
    name: 'Hello Kitty Bling Tee', 
    price: 7000, 
    category: "Ladies' Fashion", 
    description: 'Fun and playful Hello Kitty bling t-shirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White'],
    hasGallery: false,
    images: ['/ladies wear/Hello Kitty Bling Tee.jpeg']
  },

  { 
    id: 17, 
    name: 'Graphic Tee and Shorts Set', 
    price: 9000, 
    category: "Ladies' Fashion", 
    description: 'Casual graphic tee paired with matching shorts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multi-color'],
    hasGallery: false,
    images: ['/ladies wear/Graphic Tee and Shorts Set.jpeg']
  },

  { 
    id: 18, 
    name: 'Rhinestone Bow-Embellished T-Shirt with Matching Jean', 
    price: 10500, 
    category: "Ladies' Fashion", 
    description: 'Stylish rhinestone embellished tee with bow detail jean',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White'],
    hasGallery: false,
    images: ['/ladies wear/Rhinestone bow-embellished T-shirt with matching bow-detail jean.jpeg']
  },

  { 
    id: 19, 
    name: 'Burberry Check Shirt', 
    price: 11000, 
    category: "Ladies' Fashion", 
    description: 'Premium Burberry check pattern shirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burberry Check'],
    hasGallery: false,
    images: ['/ladies wear/Burberry check shirt.jpeg']
  },

  // Athletic and Casual Sets
  { 
    id: 20, 
    name: 'Athleisure Set', 
    price: 10000, 
    category: "Ladies' Fashion", 
    description: 'Comfortable athleisure wear set for active lifestyle',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black'],
    hasGallery: false,
    images: ['/ladies wear/athleisure set..jpeg']
  },

  { 
    id: 21, 
    name: 'Butterfly-Print T-Shirt and Designer Jogger Set', 
    price: 11500, 
    category: "Ladies' Fashion", 
    description: 'Fun butterfly print tee with designer joggers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multi-color'],
    hasGallery: false,
    images: ['/ladies wear/Butterfly-print T-shirt and designer jogger set.jpeg']
  },

  // Traditional and Formal Wear
  { 
    id: 22, 
    name: 'Kaftan', 
    price: 13000, 
    category: "Ladies' Fashion", 
    description: 'Traditional and elegant kaftan for formal occasions',
    sizes: ['Free Size', 'S', 'M', 'L', 'XL'],
    colors: ['Various Colors'],
    hasGallery: false,
    images: ['/ladies wear/Kaftan.jpeg']
  },

  // Accessories
  { 
    id: 23, 
    name: 'Golden Arc Bag', 
    price: 8500, 
    category: "Ladies' Accessories", 
    description: 'Stylish golden arc handbag for everyday use',
    colors: ['Gold', 'Black'],
    hasGallery: false,
    images: ['/ladies wear/Golden Arc Bag.jpeg']
  },
  
  // Men's Fashion
  { 
    id: 24, 
    name: 'Corporate Shirt', 
    price: 8000, 
    category: "Men's Fashion", 
    description: 'Quality corporate shirt for professional look',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Black']
  },
  { 
    id: 25, 
    name: "Men's Luxury Jalamia", 
    price: 22000, 
    category: "Men's Fashion", 
    description: 'Premium traditional wear with modern touch',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Brown']
  },
  { 
    id: 26, 
    name: 'Designer Sneakers', 
    price: 12000, 
    category: "Men's Accessories", 
    description: 'Trendy sneakers for casual and sport wear',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black', 'White', 'Gray', 'Blue']
  },
  { 
    id: 27, 
    name: 'Polo T-Shirt', 
    price: 5500, 
    category: "Men's Fashion", 
    description: 'Classic polo shirt in various colors',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Red', 'Blue', 'Green']
  },
  { 
    id: 28, 
    name: 'Denim Jeans', 
    price: 9000, 
    category: "Men's Fashion", 
    description: 'Durable and stylish denim jeans',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Blue', 'Black']
  },
  { 
    id: 29, 
    name: "Men's Leather Belt", 
    price: 4500, 
    category: "Men's Accessories", 
    description: 'Quality leather belt for formal and casual wear',
    sizes: ['32', '34', '36', '38', '40', '42'],
    colors: ['Black', 'Brown']
  },
  
  // Children's Clothing
  { 
    id: 30, 
    name: "Boys' Casual Set", 
    price: 6500, 
    category: "Children's Wear", 
    description: 'Comfortable and cute outfit for boys',
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Blue', 'Red', 'Green', 'Black']
  },
  { 
    id: 31, 
    name: "Girls' Party Dress", 
    price: 7500, 
    category: "Children's Wear", 
    description: 'Beautiful dress perfect for special occasions',
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Pink', 'Purple', 'White', 'Red']
  },
  { 
    id: 32, 
    name: "Kids' Sneakers", 
    price: 5000, 
    category: "Children's Wear", 
    description: 'Durable sneakers for active kids',
    sizes: ['25', '26', '27', '28', '29', '30', '31', '32'],
    colors: ['Black', 'White', 'Red', 'Blue']
  },
  
  // Household Items
  { 
    id: 33, 
    name: 'Premium Bedding Set', 
    price: 15000, 
    category: 'Household', 
    description: 'Luxury bedding set with duvet and pillowcases',
    sizes: ['Single', 'Double', 'Queen', 'King'],
    colors: ['White', 'Blue', 'Gray', 'Pink']
  },
  { 
    id: 34, 
    name: 'Bath Towel Set', 
    price: 8000, 
    category: 'Household', 
    description: 'Soft and absorbent towel set',
    colors: ['White', 'Blue', 'Pink', 'Gray']
  },
  { 
    id: 35, 
    name: 'Kitchen Utensils Set', 
    price: 6500, 
    category: 'Household', 
    description: 'Complete kitchen essentials set'
  },
  
  // Gold Accessories
  { 
    id: 36, 
    name: 'Gold Chain Necklace', 
    price: 25000, 
    category: 'Gold Accessories', 
    description: 'Elegant gold chain for men and women',
    sizes: ['16 inches', '18 inches', '20 inches', '22 inches']
  },
  { 
    id: 37, 
    name: 'Gold Earrings', 
    price: 18000, 
    category: 'Gold Accessories', 
    description: 'Beautiful gold earrings'
  },
  { 
    id: 38, 
    name: 'Gold Bracelet', 
    price: 22000, 
    category: 'Gold Accessories', 
    description: 'Stylish gold wrist bracelet',
    sizes: ['Small', 'Medium', 'Large']
  },
  
  // Featured Gallery Product
  { 
    id: 39, 
    name: 'Elegant Feather-Leaf Lace Midi Dress', 
    price: 25000, 
    category: 'Featured Collection', 
    description: 'Chic white dress with 3D leaf details, puff sleeves, and lace waist - perfect for elegant occasions',
    images: [
      '/IMG-20260109-WA0081.jpg',
      '/IMG-20260109-WA0082.jpg',
      '/IMG-20260109-WA0083.jpg',
      '/IMG-20260109-WA0084.jpg',
      '/IMG-20260109-WA0085.jpg',
      '/WhatsApp Image 2026-01-09 at 3.41.10 PM.jpeg'
    ],
    hasGallery: true,
    sizes: ['LG', 'XL', '2XL'],
    colors: ['Green', 'Cream', 'White', 'Red', 'Purple']
  },
];

function Home({ addToCart }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);

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

      <SocialLinks />

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
          openGalleryOnLoad={openGallery}
        />
      )}
    </div>
  );
}

export default Home;
