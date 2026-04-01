// Next.js optimized image component
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "./page.module.scss";

// In Next.js (App Router), params contains dynamic route values
// params is asynchronous because we might need to fetch data based on the ID before rendering the page
type Props = { 
    params: Promise<{ id: string }>;
}

// Generate dynamic metadata (SEO)
export async function generateMetadata({ params } : Props){
    const { id } = await params; // Get product ID from URL
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) return { title: "Product Not Found" }; // If API fails → fallback metadata

    const product: Product = await res.json();
    return { 
        title: `${product.title} - ShopNext`,
        description: product.description,
    };
}

// Main product detail page (Server Component)
export default async function ProductDetail({params }: Props) {
    const { id } = await params; // Get ID from route
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) notFound(); // If product not found → show 404 page

    const product: Product = await res.json();
    const discountedPrice = (
        product.price * (1 - product.discountPercentage / 100)
    ).toFixed(2);

    return (
        <main className="container">
            <ScrollToTop />
            <Link href="/products" className={styles.backBtn}>
                Back 
            </Link>
            <div className={styles.detail}>
                {/*Image Gallery*/}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <Image
                            src={product.images[0] || product.thumbnail}
                            alt={product.title}
                            width={500}
                            height={500}
                            priority
                            // priority → loads image faster (important for main image)
                        />
                    </div>
                    <div className={styles.thumbs}>
                        {product.images.map((img,i) => (
                            <div key={i} className={styles.thumb}>
                                <Image
                                    src={img}
                                    alt={`${product.title} - ${i + 1}`}
                                    width={80}
                                    height={80}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/*Product Info*/}
                <div className={styles.info}>
                    <p className={styles.category}>{product.category}</p>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.brand}>Brand: {product.brand}</p>

                    <div className={styles.rating}>Rating: {product.rating} ⭐</div>
                    
                    <div className={styles.priceBlock}>
                        <span className={styles.price}>${discountedPrice}</span>
                        <span className={styles.originalPrice}>${product.price}</span>
                        <span className={styles.discount}>{product.discountPercentage}% OFF</span>
                    </div>
    
                    <p className={styles.description}>{product.description}</p>

                    <p className={styles.stock}>{product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}</p>

                    <div className={styles.actions}>
                        <AddToCartButton product={product} />
                        <AddToWishlistButton product={product} />
                    </div>
                </div>
            </div>
        </main>
    )
}