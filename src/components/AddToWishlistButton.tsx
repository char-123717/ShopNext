"use client";
// Marks this as a Client Component (required for hooks, Redux, and event handlers)

import { Product } from "@/types/product";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useredux";
import { toast } from "@/components/Toast";
import styles from "./AddToWishlistButton.module.scss";

export default function AddToWishlistButton({ product }: { product: Product }) {
  // Redux dispatch function to trigger actions
  const dispatch = useAppDispatch();

  /**
   * Check if the current product already exists in the wishlist
   * - Uses useAppSelector to read from Redux store
   * - Returns true if product.id is found in wishlist items
   */
  const isInWishlist = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  /**
   * Handle button click:
   * - Toggle product in wishlist (add/remove)
   * - Show toast notification based on current state
   */
  const handleClick = () => {
    // Dispatch Redux action to toggle wishlist state
    dispatch(toggleWishlist(product));

    // Show feedback message
    toast(
      isInWishlist
        ? `${product.title} removed from wishlist`
        : `${product.title} added to wishlist!`
    );
  };

  return (
    <button
      // Apply base style + active style if product is in wishlist
      className={`${styles.button} ${isInWishlist ? styles.active : ""}`}
      onClick={handleClick}
      // Accessibility: describe button action for screen readers
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        // Fill heart if in wishlist, otherwise outline
        fill={isInWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Heart icon */}
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Dynamic button text based on wishlist state */}
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
}