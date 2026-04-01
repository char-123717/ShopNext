// This component runs on the client side (browser), not the server
// We need this to use React hooks (useState, useEffect, etc.) and Redux hooks (useSelector, useDispatch)
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// API service functions to fetch products and categories
import { getProducts, searchProducts, getProductsByCategory, getCategories } from "@/services/productService";
// Custom hook to delay search input (avoid too many API calls)
import { useDebounce } from "@/hooks/useDebounce";
import { Product, ProductResponse } from "@/types/product";
// Component to display a single product
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.scss";

const LIMIT = 12;

export default function ProductsPage() {
  const [search, setSearch] = useState(""); // search keyword
  const [category, setCategory] = useState(""); // selected category
  const [page, setPage] = useState(1); // current page

  const debouncedSearch = useDebounce(search, 500); // Debounce search input (wait 500ms before triggering API)
  const skip = (page - 1) * LIMIT;  // Calculate how many items to skip (for pagination)

  // Fetch categories
  const { data: categories = [] } = useQuery<{ slug: string; name: string }[]>({
    queryKey: ["categories"], // cache key
    queryFn: getCategories, // fetch function
  });

  // Fetch products based on search / category / default
  const { data, isLoading, isError } = useQuery<ProductResponse>({
    // This query will re-run whenever search, category, or page changes
    queryKey: ["products", debouncedSearch, category, page],
    // Decide which API to call
    queryFn: () => {
      if (debouncedSearch) { // If user is searching → use search API
        return searchProducts(debouncedSearch);
      }
      if (category) { // If category is selected → filter by category
        return getProductsByCategory(category);
      }
      return getProducts(LIMIT, skip); // Default → fetch paginated products
    },
  });

  const products = data?.products ?? []; // fallback to empty array
  const total = data?.total ?? 0; // total number of products
  const totalPages = Math.ceil(total / LIMIT); // calculate total pages

  // Reset page when search or category changes
  // search and category → cannot be active together
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCategory("");
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSearch("");
    setPage(1);
  };

  return (
    <main className="container">
      <div className={styles.productsPage}>
        <h1 className={styles.heading}>All Products</h1>

        {/* Search & Filter */}
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={styles.categorySelect}
            aria-label="Filter by category"
          >
            {/* Render category options */}
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading & Error states */}
        {isLoading && <p className={styles.status}>Loading products...</p>}
        {isError && <p className={styles.status}>Failed to load products.</p>}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <>
            {products.length === 0 ? (
              <p className={styles.status}>No products found.</p>
            ) : (
              <div className={styles.grid}>
                {/* Render product list */}
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination — only show when no search/category filter */}
            {!debouncedSearch && !category && totalPages > 1 && (
              <div className={styles.pagination}>
                {/* Previous button */}
                <button 
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  aria-label="Previous page"
                >
                  Previous
                </button>

                <span className={styles.pageInfo}>
                  Page {page} of {totalPages}
                </span>

                {/* Next button */}
                <button 
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
