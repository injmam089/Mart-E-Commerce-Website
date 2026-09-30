# 🛒 NovaMart --- E-Commerce Website

> A modern, responsive e-commerce storefront built with React, Vite,
> Tailwind CSS, and client-side state management.

NovaMart is a frontend-focused e-commerce web application that provides
a complete shopping experience---from browsing products and searching
categories to managing a wishlist, cart, coupons, checkout, and order
history.

The project focuses on reusable React components, responsive UI design,
smooth animations, theme support, and client-side persistence using
Local Storage.

------------------------------------------------------------------------

## ✨ Features

### 🛍️ Shopping Experience

-   🏠 Modern e-commerce homepage
-   🔍 Product search
-   🎯 Product filtering and sorting
-   🗂️ Category browsing
-   📦 Product detail pages
-   🖼️ Product image galleries
-   ⚡ Product quick-view modal
-   ❤️ Wishlist management
-   🛒 Shopping cart management
-   🎟️ Coupon code support
-   💳 Multi-step checkout flow
-   ✅ Order confirmation
-   ⭐ Product reviews and ratings
-   📱 Responsive mobile shopping experience

### 🏷️ Storefront Features

-   ⚡ Flash sale section
-   🔥 Best-selling products
-   ✨ Featured products
-   🆕 New arrivals
-   🗂️ Eight product categories
-   🎁 Promotional sections
-   📧 Newsletter section
-   💬 Customer testimonials
-   🔔 Toast notifications

### 🌙 UI / UX

-   Light and dark themes
-   Responsive layouts
-   Mobile navigation
-   Smooth page transitions
-   Hover interactions
-   Glassmorphism-inspired elements
-   Gradients and soft shadows
-   Rounded product cards
-   Skeleton loading components
-   Accessible reusable UI components

------------------------------------------------------------------------

## 📄 Pages

  ------------------------------------------------------------------------
  \#                Page              Route              Description
  ----------------- ----------------- ------------------ -----------------
  1                 Home              `/`                Hero, categories,
                                                         featured
                                                         products, flash
                                                         sale,
                                                         testimonials

  2                 Products          `/products`        Product grid with
                                                         filtering and
                                                         sorting

  3                 Product Details   `/product/:id`     Product gallery,
                                                         information,
                                                         reviews, related
                                                         products

  4                 Categories        `/categories`      Category browser

  5                 Search Results    `/search`          Search results
                                                         with filtering

  6                 Wishlist          `/wishlist`        Saved products

  7                 Cart              `/cart`            Cart items,
                                                         quantities,
                                                         totals, coupons

  8                 Checkout          `/checkout`        Multi-step
                                                         checkout

  9                 Order Success     `/order-success`   Order
                                                         confirmation

  10                Profile           `/profile`         User profile and
                                                         order history

  11                Login             `/login`           Demo
                                                         authentication

  12                Register          `/register`        Client-side
                                                         registration

  13                Contact           `/contact`         Contact form

  14                About             `/about`           Store information

  15                FAQ               `/faq`             Frequently asked
                                                         questions

  16                404               `*`                Not-found page
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 🗂️ Product Categories

NovaMart includes sample products across eight categories:

-   📱 Electronics
-   👕 Fashion
-   🏠 Home & Living
-   💄 Beauty
-   🏋️ Sports
-   📚 Books
-   🎮 Toys & Games
-   🛒 Groceries

The project includes a catalog of sample products with pricing,
discounts, ratings, stock information, images, tags, colors, sizes, and
product features.

------------------------------------------------------------------------

## 🎟️ Coupon System

The application includes predefined demo coupons such as:

  Coupon       Type         Benefit
  ------------ ------------ -------------------
  `SAVE10`     Percentage   10% off
  `SAVE20`     Percentage   20% off
  `FLAT15`     Fixed        \$15 off
  `WELCOME`    Percentage   15% off
  `FREESHIP`   Fixed        Shipping discount

Coupon eligibility can depend on the configured minimum order amount.

------------------------------------------------------------------------

## 👤 Authentication

NovaMart uses a client-side demo authentication system.

Features include:

-   Demo login
-   User registration
-   Logout
-   Profile updates
-   Client-side user persistence
-   Order history associated with the current user

### Demo Account

``` text
Email:    demo@novamart.com
Password: password123
```

> This is a frontend demo account. The project does not implement a
> production backend authentication system.

------------------------------------------------------------------------

## 💾 Client-Side Persistence

NovaMart uses the browser's **Local Storage** for persistence.

Stored application data includes:

-   User session
-   Registered demo users
-   Shopping cart
-   Wishlist
-   Theme preference
-   Orders
-   Search-related state

This allows the demo application to retain user data between browser
sessions without requiring a backend database.

------------------------------------------------------------------------

## 🏗️ Application Architecture

``` text
                         NovaMart
                            │
                            ▼
                  ┌───────────────────┐
                  │     React App     │
                  │       + Vite      │
                  └─────────┬─────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    React Router       Context API       Components
          │                 │                 │
          │          ┌──────┼──────┐           │
          │          │      │      │           │
          │        Cart  Wishlist Theme        │
          │          │      │      │           │
          └──────────┴──────┴──────┴───────────┘
                            │
                            ▼
                     Local Storage
                            │
                            ▼
                       Mock Data
```

------------------------------------------------------------------------

## 🧰 Tech Stack

  Technology             Purpose
  ---------------------- --------------------------------------
  **React 18**           Component-based UI development
  **Vite 5**             Development server and build tooling
  **Tailwind CSS 3**     Utility-first styling
  **React Router 6**     Client-side routing
  **Framer Motion**      Animations and transitions
  **Lucide React**       Icon library
  **Swiper**             Carousels and product sliders
  **React Hot Toast**    Toast notifications
  **Context API**        Global state management
  **Local Storage**      Client-side persistence
  **JavaScript / JSX**   Application development

------------------------------------------------------------------------

## 📂 Project Structure

``` text
Mart-E-Commerce-Website/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CouponInput.jsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   └── PaymentForm.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Badge.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── BestSellers.jsx
│   │   │   ├── CategoryGrid.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── FlashSale.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── NewArrivals.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   └── Testimonials.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── product/
│   │       ├── ProductCard.jsx
│   │       ├── ProductFilters.jsx
│   │       ├── ProductGrid.jsx
│   │       ├── ProductImageGallery.jsx
│   │       ├── ProductQuickView.jsx
│   │       ├── ProductSort.jsx
│   │       └── ReviewSection.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── SearchContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useScrollToTop.js
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── SearchResults.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── mockData.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

------------------------------------------------------------------------

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

-   Node.js 18+
-   npm 9+

### 1. Clone the Repository

``` bash
git clone https://github.com/injmam089/Mart-E-Commerce-Website.git
cd Mart-E-Commerce-Website
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Start Development Server

``` bash
npm run dev
```

Open the application at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 📦 Production Build

Create an optimized production build:

``` bash
npm run build
```

Preview the production build locally:

``` bash
npm run preview
```

------------------------------------------------------------------------

## 📜 Available Scripts

  Command             Description
  ------------------- --------------------------------------
  `npm run dev`       Start the Vite development server
  `npm run build`     Build the application for production
  `npm run preview`   Preview the production build

------------------------------------------------------------------------

## 🎨 Design System

NovaMart uses a modern visual design system featuring:

-   **Primary palette:** Indigo
-   **Accent palette:** Amber
-   **Typography:** Inter
-   **Dark theme:** Slate-based colors
-   **Components:** Rounded cards and controls
-   **Effects:** Gradients, soft shadows, glassmorphism-inspired
    surfaces
-   **Animations:** Framer Motion transitions and hover effects

------------------------------------------------------------------------

## 📱 Responsive Design

The interface is designed to adapt to:

-   📱 Mobile devices
-   📲 Tablets
-   💻 Laptops
-   🖥️ Desktop screens

The layout includes responsive navigation, product grids, shopping cart
views, checkout forms, and mobile-friendly controls.

------------------------------------------------------------------------

## 🔮 Future Improvements

Possible future enhancements include:

-   Backend API integration
-   PostgreSQL or MongoDB database
-   Secure server-side authentication
-   Real payment gateway integration
-   Product administration dashboard
-   Real-time order tracking
-   Inventory management
-   Cloud image storage
-   Server-side order processing
-   Automated testing
-   CI/CD pipeline
-   Production deployment

------------------------------------------------------------------------

## 🎯 Project Goals

NovaMart was developed to demonstrate practical frontend and React
development concepts, including:

-   Component-based architecture
-   React state management
-   Context API
-   Client-side routing
-   Reusable UI components
-   Responsive web design
-   Product filtering and sorting
-   Shopping cart logic
-   Wishlist functionality
-   Client-side authentication
-   Local Storage persistence
-   Form handling
-   UI animations
-   Modern e-commerce UX

------------------------------------------------------------------------

## 👨‍💻 Author

**Injmam**

BCA Student \| Cybersecurity & Software Development

GitHub: https://github.com/injmam089

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.

------------------------------------------------------------------------

⭐ If you find NovaMart interesting, consider giving the repository a
star.
