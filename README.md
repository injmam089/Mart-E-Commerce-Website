# 🛒 NovaMart — Premium E-Commerce Website

A production-ready, modern, responsive e-commerce storefront built with React, Vite, and Tailwind CSS. Inspired by the design aesthetics of Apple, Nike, Amazon, and Shopify.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🎨 **Premium UI** — Glassmorphism, smooth gradients, rounded cards with soft shadows
- 🌙 **Dark/Light Mode** — System-aware toggle with smooth transitions
- 📱 **Fully Responsive** — Mobile, Tablet, and Desktop optimized
- 🛍️ **16 Pages** — Complete e-commerce experience from browse to checkout
- 🔍 **Smart Search** — Product search with filters, sorting, and category browsing
- 🛒 **Shopping Cart** — Add, update, remove items with Local Storage persistence
- ❤️ **Wishlist** — Save favorites with toggle functionality
- 💳 **Checkout Flow** — Multi-step checkout with form validation
- ⭐ **Reviews & Ratings** — Product reviews with star rating input
- 🏷️ **Flash Sales** — Countdown timer with discounted products
- 🎫 **Coupon System** — Apply/remove discount codes
- 🎬 **Smooth Animations** — Framer Motion page transitions, scroll reveals, hover effects
- 🔔 **Toast Notifications** — User feedback for cart/wishlist actions
- 📦 **40+ Sample Products** — Realistic mock data across 8 categories

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn/pnpm)

### Installation

```bash
# Navigate to project directory
cd novamart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:5173**

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/               # Static assets
├── components/
│   ├── common/           # Button, Input, Modal, Skeleton, Rating, Badge, Breadcrumb, ThemeToggle
│   ├── layout/           # Navbar, Footer, MobileMenu, Layout
│   ├── home/             # HeroBanner, CategoryGrid, Featured, NewArrivals, FlashSale, etc.
│   ├── product/          # ProductCard, ProductGrid, QuickView, Filters, Sort, Reviews
│   ├── cart/             # CartItem, CartSummary, CouponInput
│   └── checkout/         # CheckoutForm, OrderSummary, PaymentForm
├── context/              # ThemeContext, CartContext, WishlistContext, AuthContext, SearchContext
├── hooks/                # useLocalStorage, useDebounce, useScrollToTop
├── pages/                # 16 page components
├── services/             # productService (data access layer)
├── styles/               # index.css (Tailwind + custom styles)
├── utils/                # mockData, constants, helpers
├── App.jsx               # Root with routing + context providers
└── main.jsx              # Entry point
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **Vite 5** | Build Tool & Dev Server |
| **Tailwind CSS 3** | Utility-First Styling |
| **React Router 6** | Client-Side Routing |
| **Framer Motion** | Animations & Transitions |
| **Lucide React** | Modern Icon Set |
| **Swiper** | Carousels & Galleries |
| **React Hot Toast** | Toast Notifications |
| **Context API** | Global State Management |
| **Local Storage** | Data Persistence |

---

## 📄 Pages

| # | Page | Route | Description |
|---|---|---|---|
| 1 | Home | `/` | Hero, categories, featured, flash sale, testimonials |
| 2 | Products | `/products` | Grid with filters and sorting |
| 3 | Product Details | `/product/:id` | Gallery, reviews, related items |
| 4 | Categories | `/categories` | Visual category browser |
| 5 | Search Results | `/search` | Search with filters |
| 6 | Wishlist | `/wishlist` | Saved items management |
| 7 | Cart | `/cart` | Cart with coupon codes |
| 8 | Checkout | `/checkout` | Multi-step checkout |
| 9 | Order Success | `/order-success` | Animated confirmation |
| 10 | Profile | `/profile` | Dashboard & order history |
| 11 | Login | `/login` | Authentication |
| 12 | Register | `/register` | Registration |
| 13 | Contact | `/contact` | Contact form |
| 14 | About | `/about` | Company info |
| 15 | FAQ | `/faq` | Accordion FAQ |
| 16 | 404 | `*` | Not found |

---

## 🎨 Design System

- **Primary Color**: Indigo (`#6366f1`)
- **Secondary Color**: Amber (`#f59e0b`)
- **Font**: Inter (Google Fonts)
- **Dark Mode**: Slate-based (`#0f172a`)
- **Effects**: Glassmorphism, soft shadows, gradients
- **Border Radius**: Rounded (2xl default)

---

## 🔐 Demo Credentials

For the login page, use these demo credentials:

- **Email**: `demo@novamart.com`
- **Password**: `password123`

---

## 📜 License

This project is licensed under the MIT License.

---

Built with ❤️ using React, Vite, and Tailwind CSS.
