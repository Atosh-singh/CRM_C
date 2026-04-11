import React from 'react';
import styles from './CompareHero.module.css';

export default function CompareHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Compare Vehicles</h1>
        <p className={styles.subtitle}>
          Make an informed choice. Compare technical specifications, features, and performance side-by-side to find the perfect Maruti Suzuki for your lifestyle.
        </p>
      </div>
    </section>
  );
}
