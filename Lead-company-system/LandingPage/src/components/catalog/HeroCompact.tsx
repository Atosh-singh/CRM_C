import React from 'react';
import styles from './HeroCompact.module.css';

export default function HeroCompact() {
  return (
    <section className={styles.heroCompact}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.badge}>THE NEXA COLLECTION</div>
        <h1 className={styles.title}>Precision Engineering.</h1>
        <p className={styles.subtitle}>
          Experience the pinnacle of Japanese craftsmanship and Indian innovation. Your journey redefined.
        </p>
      </div>
    </section>
  );
}
