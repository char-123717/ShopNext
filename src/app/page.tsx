import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { Product, ProductResponse } from "@/types/product";
import styles from "./page.module.scss";

// Server Component → runs on server (can use async/await directly)
export default async function Home() {
  const res = await fetch("https://dummyjson.com/products?limit=8");
  const data: ProductResponse = await res.json(); // Convert response to JSON and type it

  return (
    <main>
      <Banner />

      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Popular Products</h2>
        <p className={styles.sectionSubtitle}>Handpicked items just for you</p>

        {/* Render each product using ProductCard component*/}
        <div className={styles.grid}>
          {data.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}