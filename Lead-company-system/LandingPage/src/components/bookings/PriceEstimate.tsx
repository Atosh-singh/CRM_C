import React from 'react';
import styles from './PriceEstimate.module.css';

export default function PriceEstimate() {
  return (
    <div className={styles.container}>
      <span className={styles.label}>ESTIMATED BASE PRICE</span>
      <h2 className={styles.price}>₹ 9,40,000*</h2>

      <div className={styles.stats}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>FUEL ECONOMY</span>
          <span className={styles.statValue}>20.82 km/l</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>TRANSMISSION</span>
          <span className={styles.statValue}>Automatic</span>
        </div>
      </div>

      <p className={styles.disclaimer}>
        *Prices may vary based on chosen variant, dealer location, and applicable taxes at the time of purchase.
      </p>
    </div>
  );
}
