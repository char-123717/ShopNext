// This component runs on the client side (browser), not the server
// We need this to use React hooks (useState, useEffect, etc.) and Redux hooks (useSelector, useDispatch)
"use client";

// Used for client-side navigation
import Link from "next/link";
// Custom hook to access Redux state and dispatch actions
import { useAppSelector } from "@/hooks/useredux";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    // useAppSelector → get data from Redux store
    // state.cart.items → array of cart items
    // Each item = { product, quantity }
    // .reduce(...) → loops through all items and accumulates total quantity
    // sum → accumulator (total count so far)
    // item → current cart item
    // sum + item.quantity → add each item's quantity
    // 0 → initial value of sum
    const cartCount = useAppSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.logo}>SHOPNEXT</Link>

                <div className={styles.navLinks}>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/cart">Cart{cartCount > 0 && ` (${cartCount})`}</Link>
                    <Link href="/wishlist">Wishlist{wishlistCount > 0 && ` (${wishlistCount})`}</Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}