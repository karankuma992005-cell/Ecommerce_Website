# ElectroMart

**Smart Technology. Better Shopping.**

ElectroMart is a production-style electronics e-commerce frontend built with React. Browse, search, filter and sort products, manage a cart and wishlist, apply coupons and complete a demo checkout. Everything runs in the browser using React state, Context API and `localStorage`. There is no backend.

> Product names, prices, specifications and reviews are illustrative demo data. Product images are generated SVG artwork (see `src/data/images.js`), so nothing depends on external image URLs.

## Features

- Sticky responsive navbar with active states, a Categories dropdown, global search, wishlist and cart counts, and a mobile menu
- Home page: hero, 7 clickable category cards, 8 featured and 8 trending products, offer banner, customer reviews and a newsletter form
- Shop page: live search, category, brand, price range and rating filters, 6 sort options, Clear Filters, and URL-driven state (`/shop?category=Laptops`, `/shop?search=iPhone`)
- Product page: image gallery with thumbnails, quantity selector, Add to Cart, Buy Now, wishlist, specifications table and related products
- Cart: quantity controls capped by stock, remove, clear (with confirmation), coupons, dynamic shipping and totals
- Checkout: full validation (Indian phone and pincode, email, UPI ID, card), Cash on Delivery / UPI / Card, order ID generation, saved orders and a confirmation screen
- Wishlist panel with Move to cart
- About + Contact page with a validated contact form, FAQ and policy sections
- Toast notifications, loading spinner, error boundary, 404 and "Product not found" states
- Accessibility basics: semantic HTML, labelled forms, visible focus, skip link, keyboard-friendly dialogs, reduced-motion support

## Tech Stack

React 18, React Router DOM 6, Context API, Lucide React, Vite 5, plain CSS. No other runtime libraries.

## Project Structure

```text
ElectroMart/
├── public/favicon.svg
├── src/
│   ├── components/   Navbar, Footer, ProductCard, ProductGrid, SearchBar, FilterSidebar,
│   │                 CategoryCard, Rating, CartItem, CartSummary, CheckoutForm, ProductGallery,
│   │                 LoadingSpinner, ToastNotification, Modal, ReviewCard, + FormField,
│   │                 Newsletter, WishlistPanel, ErrorState, ErrorBoundary
│   ├── context/StoreContext.jsx   cart, wishlist, orders, coupon, preferences, toasts
│   ├── data/                      products.js, images.js, constants.js
│   ├── hooks/useDocumentTitle.js  page title + meta description
│   ├── pages/                     Home, Shop, ProductDetails, Cart, Checkout, Contact
│   ├── utils/                     storage.js, format.js, validators.js, categoryIcons.js
│   ├── App.jsx, main.jsx, styles.css
├── index.html, package.json, vite.config.js
```

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev       # development server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Available Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop (supports `?category=`, `?search=`, `?sort=`) |
| `/product/:id` | Product details |
| `/cart` | Cart |
| `/checkout` | Checkout (redirects to `/cart` when the cart is empty) |
| `/contact` | About + Contact (anchors: `#about`, `#why-us`, `#contact`, `#support`, `#shipping`, `#returns`, `#faq`, `#careers`) |

Any other URL shows a "Page not found" screen.

## LocalStorage Information

| Key | Contents |
| --- | --- |
| `electromart_cart` | `[{ id, quantity }]` |
| `electromart_wishlist` | Array of product IDs |
| `electromart_orders` | Placed orders (customer, address, payment method label, products, totals, date) |
| `electromart_coupon` | Applied coupon code |
| `electromart_prefs` | Shop sort preference |
| `electromart_newsletter` | Subscribed email and date |

Card numbers, CVV and expiry dates are held only in component state while the form is open and are cleared after the order is placed. They are never written to storage. Corrupted or tampered storage values are validated and ignored on load.

## Demo Coupons

| Code | Discount |
| --- | --- |
| `ELECTRO10` | 10% off |
| `WELCOME20` | 20% off |

Applying a different valid code replaces the current one. Delivery is free for a subtotal of ₹999 or more, otherwise ₹49.

## Demo Checkout Notes

No payment gateway is integrated. Cash on Delivery, UPI and Card are UI flows only. For card testing, any 16-digit number, a future `MM/YY` date and a 3 or 4 digit CVV pass validation. UPI IDs must look like `name@bank`.

## Future Improvements

- Orders history page and order tracking
- User accounts and authentication with a real backend
- Real payment gateway integration
- Product reviews and ratings submitted by customers
- Server-side search, pagination and inventory
- Automated unit and end-to-end tests in the repository
