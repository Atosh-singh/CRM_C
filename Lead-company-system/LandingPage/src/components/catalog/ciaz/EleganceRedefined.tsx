import React from 'react';
import styles from './EleganceRedefined.module.css';

export default function EleganceRedefined() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.label}>INTERIOR LUXURY</span>
          <h2 className={styles.title}>Elegance Redefined</h2>
          <p className={styles.description}>
            Step into a world of refined comfort. The Ciaz features a spacious cabin with premium dual-tone interiors, designed to provide a breezy and luxurious experience for every passenger.
          </p>
          <ul className={styles.features}>
            <li>
              <strong>Breezy Dual-Tone Interiors:</strong> High-quality birch blonde wood finish.
            </li>
            <li>
              <strong>Premium Leather Upholstery:</strong> Handcrafted to provide maximum support and comfort.
            </li>
            <li>
              <strong>Spacious Rear Bench:</strong> Class-leading legroom to let you unwind in luxury.
            </li>
          </ul>
        </div>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
             <img src="/showroom_car_1775210856843.png" alt="Ciaz Interior Placeholder" />
          </div>
          <div className={styles.subGrid}>
             <div className={styles.subItem}></div>
             <div className={styles.subItem}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
