// This component runs on the client side (browser), not the server
// We need this to use React hooks (useState, useEffect, etc.) and Redux hooks (useSelector, useDispatch)
"use client";

import { Product } from "@/types/product";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/hooks/useredux";
import { toast } from "@/components/Toast";
import styles from "./AddToCartButton.module.scss";

// Receive product as prop
export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch(); // Get Redux dispatch function

  const handleClick = () => {
    dispatch(addToCart(product)); // Send action to Redux → add product to cart
    toast(`${product.title} added to cart!`);
  };

  return (
    <button className={styles.button} onClick={handleClick} aria-label="Add to cart">
      Add to Cart
    </button>
  );
}
