<<<<<<< HEAD
# ShopNext — E-Commerce Web App

Modern e-commerce web application built with **Next.js 16 (App Router)**, featuring hybrid SSR/CSR rendering, Redux state management, and a fully responsive dark/light theme.

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.95-FF4154)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router, Turbopack) | Framework — file-based routing, SSR/SSG, image optimization |
| **React 19** | UI library — component-based architecture |
| **TypeScript** | Type safety — interfaces for API responses, props, Redux state |
| **Redux Toolkit** | Global state management — cart & wishlist |
| **TanStack Query (React Query)** | Server state management — CSR data fetching with caching |
| **Axios** | HTTP client — API requests to DummyJSON |
| **Sass (SCSS Modules)** | Styling — scoped component styles + global design tokens |
| **CSS Custom Properties** | Theming — light/dark mode toggle |

---

## Rendering Techniques

This project uses **hybrid rendering** — combining Server-Side Rendering (SSR) and Client-Side Rendering (CSR) based on each page's requirements.

### Server-Side Rendering (SSR)

Pages where data is critical for SEO and needs to be rendered on the server before being sent to the browser:

- **Homepage (`/`)** — `async` Server Component, fetches 8 popular products directly on the server. HTML is fully populated when it reaches the browser.
- **Product Detail (`/products/[id]`)** — Server Component with `generateMetadata()` for dynamic SEO (title, description, Open Graph). Product data is fetched on the server.

```tsx
// Server Component — no "use client" directive
export default async function Home() {
  const res = await fetch("https://dummyjson.com/products?limit=8");
  const data: ProductResponse = await res.json();
  // HTML rendered on server with full product data
}
```

**SSR Benefits:**
- Optimal SEO — crawlers receive fully rendered HTML
- Faster First Contentful Paint
- Dynamic meta tags per page

### Client-Side Rendering (CSR)

Pages that require high interactivity and state management:

- **Product Listing (`/products`)** — search (debounced), category filter, pagination. Data is fetched in the browser using TanStack Query.
- **Cart (`/cart`)** — update quantity, remove item, clear cart. State from Redux store.
- **Wishlist (`/wishlist`)** — toggle items from Redux store.

```tsx
"use client"; // Directive to enable hooks & interactivity

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, search, category],
    queryFn: () => fetchProducts(...)
  });
}
```

**CSR Benefits:**
- Real-time interactivity without page reloads
- TanStack Query provides caching (staleTime: 5 minutes) and automatic refetching
- Redux persists cart/wishlist state in client memory

---

## State Management

### Redux Toolkit (Client State)

Manages data that lives in the browser and doesn't need to be fetched from an API:

- **Cart Slice** — `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- **Wishlist Slice** — `toggleWishlist` (add/remove toggle)
- **Custom Hooks** — `useAppDispatch()` and `useAppSelector()` with TypeScript typing

### TanStack Query (Server State)

Manages API data with caching and background refetching:

- **staleTime: 5 minutes** — data is not refetched while still fresh
- **Query Keys** — `["products", page, search, category]` for granular cache control
- **Loading/Error states** — automatically handled by the `useQuery()` hook

---

## Styling Architecture

### SCSS Modules

Each component has its own `.module.scss` file — class names are automatically scoped to prevent conflicts between components.

```
src/styles/
├── _variables.scss    → Design tokens (colors, spacing, radius, shadows, breakpoints)
├── _mixins.scss       → Reusable patterns (flex-centre, card, btn-primary, responsive breakpoints)
└── globals.scss       → CSS reset, CSS custom properties, .container utility
```

### Design System

- **Design Tokens** — all colors, spacing, shadows, border radii, and transitions are defined as SCSS variables in `_variables.scss`
- **Mixins** — frequently used patterns are wrapped into mixins: `card()`, `btn-primary()`, `gradient-text()`, `flex-centre()`, `truncate()`, and responsive breakpoints (`sm`, `md`, `lg`, `xl`)
- **Mobile-First Responsive** — styles start from mobile, then add overrides for larger screens via breakpoint mixins

### Dark / Light Theme

Implemented using **CSS Custom Properties** toggled via the `data-theme` attribute on `<html>`:

```scss
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #111827;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
}
```

- **ThemeToggle component** — sun/moon icon button, persists choice to `localStorage`, detects `prefers-color-scheme` on first visit
- **Smooth transition** — `transition: background-color 0.3s ease, color 0.3s ease` on body

---

## API Layer

Uses **DummyJSON** as a fake REST API:

| Endpoint | Purpose |
|---|---|
| `GET /products?limit=N&skip=N` | List products with pagination |
| `GET /products/{id}` | Product detail |
| `GET /products/search?q=keyword` | Search products |
| `GET /products/category/{name}` | Filter by category |
| `GET /products/categories` | List all categories |

The API service layer (`src/services/`) wraps an Axios instance with a base URL and typed responses.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, Providers, Navbar)
│   ├── page.tsx                  # Homepage (SSR)
│   ├── page.module.scss
│   ├── products/
│   │   ├── page.tsx              # Product listing (CSR)
│   │   ├── page.module.scss
│   │   └── [id]/
│   │       ├── page.tsx          # Product detail (SSR + generateMetadata)
│   │       └── page.module.scss
│   ├── cart/
│   │   ├── page.tsx              # Cart page (CSR + Redux)
│   │   └── page.module.scss
│   └── wishlist/
│       ├── page.tsx              # Wishlist page (CSR + Redux)
│       └── page.module.scss
├── components/
│   ├── Navbar.tsx                # Sticky nav with cart/wishlist count badges
│   ├── Banner.tsx                # Hero banner with gradient + decorative orbs
│   ├── ProductCard.tsx           # Reusable product card
│   ├── AddToCartButton.tsx       # Client component — dispatch addToCart
│   ├── AddToWishlistButton.tsx   # Client component — dispatch toggleWishlist
│   ├── ThemeToggle.tsx           # Dark/light mode switch
│   ├── Toast.tsx                 # Toast notification (2s, centered)
│   ├── ScrollToTop.tsx           # Auto scroll to top on page render
│   └── *.module.scss             # Component-scoped styles
├── features/
│   ├── cart/cartSlice.ts         # Redux slice — cart actions & reducer
│   └── wishlist/wishlistSlice.ts # Redux slice — wishlist actions & reducer
├── hooks/
│   ├── useredux.ts               # Typed useAppDispatch & useAppSelector
│   └── useDebounce.ts            # Generic debounce hook (500ms default)
├── services/
│   ├── api.ts                    # Axios instance (baseURL: dummyjson.com)
│   └── productService.ts         # Product API functions
├── store/
│   ├── store.ts                  # Redux store configuration
│   └── Providers.tsx             # Redux + TanStack Query provider wrapper
├── styles/
│   ├── _variables.scss           # Design tokens
│   ├── _mixins.scss              # Reusable SCSS mixins
│   └── globals.scss              # Global styles + CSS custom properties
└── types/
    └── product.ts                # Product & ProductResponse interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone <repo-url>
cd e-commerce
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Features

- Homepage with popular products (SSR)
- Product listing with search, category filter, and pagination (CSR)
- Product detail with image gallery and SEO metadata (SSR)
- Shopping cart — add, remove, update quantity, clear
- Wishlist — toggle add/remove
- Dark / Light mode with localStorage persistence
- Toast notifications for user action feedback
- Responsive design (mobile-first)
- Back button di halaman product detail

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# ShopNext
>>>>>>> 59d1926a214f08ed68065b252645139730e6df09
