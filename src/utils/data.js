import { productsData } from '../data/productsData';

// Transform productsData to match the expected format for Products.jsx
export const products = productsData.map(product => ({
  ...product,
  image: product.images[0], // Use first image as main image
  rating: product.rating, // Use fixed rating from productsData
  inStock: true,
  featured: product.hasGallery || product.id <= 10 // Featured products are those with galleries or first 10
}));

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: "Ladies' Fashion", name: "Ladies' Fashion", count: products.filter(p => p.category === "Ladies' Fashion").length },
  { id: "Ladies' Accessories", name: "Ladies' Accessories", count: products.filter(p => p.category === "Ladies' Accessories").length },
  { id: 'Perfumes', name: 'Perfumes', count: products.filter(p => p.category === 'Perfumes').length }
];

export const featuredProducts = products.filter(product => product.featured);