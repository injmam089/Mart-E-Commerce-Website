import { products, categories, reviews } from '../utils/mockData';

export const getAllProducts = () => {
  return [...products];
};

export const getProductById = (id) => {
  const parsedId = parseInt(id, 10);
  return products.find((product) => product.id === parsedId) || null;
};

export const getProductsByCategory = (slug) => {
  return products.filter((product) => product.categorySlug === slug);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
  );
};

export const getCategories = () => {
  return [...categories];
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.tags && product.tags.includes('featured')).slice(0, 8);
};

export const getNewArrivals = () => {
  return products
    .filter((product) => product.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
};

export const getBestSellers = () => {
  return products.filter((product) => product.isBestSeller).slice(0, 8);
};

export const getFlashSaleProducts = () => {
  return products.filter((product) => product.isFlashSale);
};

export const getRelatedProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);
};

export const filterProducts = (productsList, filters) => {
  let filtered = [...productsList];

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((p) => filters.categories.includes(p.categorySlug));
  }

  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter((p) => filters.brands.includes(p.brand));
  }

  if (filters.priceRange && filters.priceRange.length === 2) {
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
  }

  if (filters.rating) {
    filtered = filtered.filter((p) => p.rating >= filters.rating);
  }

  return filtered;
};

export const sortProducts = (productsList, sortBy) => {
  const sorted = [...productsList];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted; // Assumes default array order or features are prior
  }
};

export const getProductReviews = (productId) => {
  const parsedId = parseInt(productId, 10);
  return reviews.filter((review) => review.productId === parsedId);
};

export const getBrands = () => {
  const brands = products.map((product) => product.brand);
  return [...new Set(brands)].sort();
};
