// Next.js optimized image component
import Image from "next/image";
// Used for client-side navigation (faster than <a>)
import Link from "next/link";
import { Product } from "@/types/product";
import styles from "./ProductCard.module.scss";

// Component receives a product as prop 
export default function ProductCard({ product }: { product: Product }) {
    const discountedPrice = (
        product.price * (1 - product.discountPercentage / 100)
    ).toFixed(2);

    return (
        <Link href={`/products/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                    className={styles.image}
                />  
            </div>

            <div className={styles.info}>
                <p className={styles.category}>{product.category}</p>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.priceRow}>
                    <span className={styles.price}>${discountedPrice}</span>
                    <span className={styles.originalPrice}>${product.price}</span>
                </div>
                <div className={styles.rating}>Rating: {product.rating} ⭐</div>
            </div>
        </Link>
    );
}