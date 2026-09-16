export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: '#', icon: 'Facebook' },
  { name: 'Twitter', url: '#', icon: 'Twitter' },
  { name: 'Instagram', url: '#', icon: 'Instagram' },
  { name: 'YouTube', url: '#', icon: 'Youtube' },
  { name: 'LinkedIn', url: '#', icon: 'Linkedin' },
];

export const FOOTER_LINKS = {
  company: ['About Us', 'Careers', 'Press', 'Blog'],
  support: ['Help Center', 'Contact Us', 'Returns', 'FAQ'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name-asc', label: 'Name: A-Z' },
];

export const COUPON_CODES = [
  { code: 'SAVE10', type: 'percentage', value: 10, minOrder: 50, description: '10% off on orders over $50' },
  { code: 'SAVE20', type: 'percentage', value: 20, minOrder: 100, description: '20% off on orders over $100' },
  { code: 'FLAT15', type: 'fixed', value: 15, minOrder: 75, description: '$15 off on orders over $75' },
  { code: 'WELCOME', type: 'percentage', value: 15, minOrder: 0, description: '15% off for new users' },
  { code: 'FREESHIP', type: 'fixed', value: 10, minOrder: 30, description: 'Free shipping ($10 off) on orders over $30' },
];

export const FAQ_DATA = [
  { question: 'What are your shipping options?', answer: 'We offer Standard (3-5 business days) and Express (1-2 business days) shipping options.' },
  { question: 'What is your return policy?', answer: 'You can return most items within 30 days of delivery for a full refund.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and Apple Pay.' },
  { question: 'How can I track my order?', answer: 'Once your order ships, you will receive an email with tracking information.' },
  { question: 'How do I create an account?', answer: 'Click the "Sign Up" button in the top right corner and follow the prompts.' },
  { question: 'Do you offer student discounts?', answer: 'Yes! Students get 10% off with a valid .edu email address.' },
  { question: 'Do you ship internationally?', answer: 'Currently, we only ship within the United States and Canada.' },
  { question: 'How can I contact customer support?', answer: 'You can reach us via our Contact page, or email support@novamart.com.' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends',
    description: 'Upgrade your wardrobe with our fresh summer arrivals. Vibrant colors and lightweight fabrics for the perfect seasonal look.',
    ctaText: 'Shop Now',
    ctaLink: '/products?category=fashion',
    bgGradient: 'bg-gradient-to-r from-blue-500 to-teal-400',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=800&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Next-Gen Electronics',
    subtitle: 'Tech for everyday life',
    description: 'Experience innovation with our new range of smart devices designed to make your life easier and more connected.',
    ctaText: 'Explore Tech',
    ctaLink: '/products?category=electronics',
    bgGradient: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1920&h=800&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Premium Home Decor',
    subtitle: 'Elevate your living space',
    description: 'Create a home you love with our curated collection of elegant furniture and decorative accents.',
    ctaText: 'View Collection',
    ctaLink: '/products?category=home-living',
    bgGradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=800&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Fitness Essentials',
    subtitle: 'Gear up for your goals',
    description: 'Achieve your best with top-quality sportswear and equipment built for performance and durability.',
    ctaText: 'Get Active',
    ctaLink: '/products?category=sports',
    bgGradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1920&h=800&fit=crop&q=80',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    avatar: 'https://picsum.photos/seed/Sarah/100/100',
    rating: 5,
    comment: 'Absolutely love the quality of the products. Shipping was incredibly fast, and customer service was very helpful when I had a question about sizing.',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Enthusiast',
    avatar: 'https://picsum.photos/seed/Michael/100/100',
    rating: 5,
    comment: 'The electronics selection is fantastic. I bought a smartwatch and it works perfectly. Will definitely be shopping here again for my tech needs.',
    date: '2024-02-03',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Interior Designer',
    avatar: 'https://picsum.photos/seed/Emily/100/100',
    rating: 4,
    comment: 'Great selection of home decor items. The ceramic vase set I ordered looks beautiful in my living room. Only giving 4 stars because one box arrived slightly dented, but the product was safe.',
    date: '2024-02-18',
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Fitness Coach',
    avatar: 'https://picsum.photos/seed/David/100/100',
    rating: 5,
    comment: 'The sports equipment is top-notch. I recommend NovaMart to all my clients for reliable and affordable workout gear.',
    date: '2024-03-01',
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    role: 'Verified Buyer',
    avatar: 'https://picsum.photos/seed/Jessica/100/100',
    rating: 5,
    comment: 'I was hesitant to buy skincare online, but the luxury set exceeded my expectations. My skin has never looked better!',
    date: '2024-03-12',
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'Avid Reader',
    avatar: 'https://picsum.photos/seed/Robert/100/100',
    rating: 4,
    comment: 'Excellent book selection and competitive prices. Shipping took a little longer than expected, but overall a great experience.',
    date: '2024-03-25',
  },
];
