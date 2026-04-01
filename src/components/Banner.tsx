import Link from "next/link";
import styles from "./Banner.module.scss";

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.bgOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>
      <div className={`container ${styles.content}`}>
        <span className={styles.badge}>New Collection 2026</span>
        <h1 className={styles.title}>Discover Products<br />You&apos;ll Love</h1>
        <p className={styles.subtitle}>
          Explore thousands of amazing products at unbeatable prices
        </p>
        <Link href="/products" className={styles.cta}>
          Shop Now
        </Link>
      </div>
    </section>
  );
}