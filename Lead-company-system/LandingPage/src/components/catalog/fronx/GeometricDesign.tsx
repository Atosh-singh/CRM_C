import React from 'react';
import styles from './GeometricDesign.module.css';

export default function GeometricDesign() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.label}>NEXCRAFTED EXTERIORS</span>
          <h2 className={styles.title}>The Shape of New</h2>
          <p className={styles.description}>
            A radical crossover silhouette that combines the muscle of an SUV with the grace of a coupe. Every crease, every line, and every geometric element is designed to command attention.
          </p>
        </div>

        <div className={styles.visualGrid}>
          <div className={styles.designCard}>
            <div className={styles.cardVisual}></div>
            <h3 className={styles.cardTitle}>NEXWave Grille</h3>
            <p className={styles.cardText}>A bold, chrome-finished grille with integrated DRLs for a striking face.</p>
          </div>
          <div className={styles.designCard}>
            <div className={styles.cardVisual}></div>
            <h3 className={styles.cardTitle}>Geometric Alloy Wheels</h3>
            <p className={styles.cardText}>16-inch precision-engineered wheels that complement the futuristic look.</p>
          </div>
          <div className={styles.designCard}>
            <div className={styles.cardVisual}></div>
            <h3 className={styles.cardTitle}>Sloping Roofline</h3>
            <p className={styles.cardText}>A coupe-like profile that enhances both aerodynamics and visual flair.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
