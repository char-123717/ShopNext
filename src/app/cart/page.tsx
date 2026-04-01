// This component runs on the client side (browser), not the server
// We need this to use React hooks (useState, useEffect, etc.) and Redux hooks (useSelector, useDispatch)
"use client";

// Next.js optimized image component
import Image from "next/image";
// Used for client-side navigation (no page reload)
import Link from "next/link";
// Custom Redux hooks → used to read global state and dispatch actions
import { useAppSelector, useAppDispatch } from "@/hooks/useredux";
import { removeFromCart, updateQuantity, clearCart } from "@/features/cart/cartSlice";
import styles from "./page.module.scss";

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);  // Get cart items from Redux store
  const dispatch = useAppDispatch(); // Get dispatch function

  //Reduce: turn an array into a single value
  //Calculate total price of all items in cart
  const total = items.reduce((sum, item) => {
    const price = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + price * item.quantity; // Add (price × quantity) to total
  }, 0);

  if (items.length === 0) {
    return (
      <main className="container">
        <div className={styles.empty}>
          <h1>Your Cart is Empty</h1>
          <p>Start shopping to add items to your cart.</p>
          <Link href="/" className={styles.shopLink}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={styles.cartPage}>
        <h1 className={styles.heading}>Shopping Cart</h1>

        <div className={styles.cartItems}>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </div>

              <div className={styles.itemInfo}>
                <Link href={`/products/${product.id}`} className={styles.itemTitle}>
                  {product.title}
                </Link>
                <p className={styles.itemPrice}>
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </p>
              </div>

              <div className={styles.itemActions}>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                  }
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{quantity}</span> {/* Current quantity */}
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => dispatch(removeFromCart(product.id))}
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <span className={styles.totalPrice}>${total.toFixed(2)}</span>
          </div>
          <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
}
