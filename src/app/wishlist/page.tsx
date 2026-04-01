// This component runs on the client side (browser), not the server
// We need this to use React hooks (useState, useEffect, etc.) and Redux hooks (useSelector, useDispatch)
"use client";

// Used for client-side navigation (no page reload)
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
// Custom Redux hook → used to read global state
import { useAppSelector } from "@/hooks/useredux";
import styles from "./page.module.scss";

export default function WishlistPage() {
    // Get wishlist items from Redux store
  const { items } = useAppSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <main className="container">
        <div className={styles.empty}>
          <h1>Your Wishlist is Empty</h1>
          <p>Save products you love for later.</p>
          <Link href="/" className={styles.shopLink}>
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={styles.wishlistPage}>
        <h1 className={styles.heading}>My Wishlist ({items.length})</h1>
        <div className={styles.grid}>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
