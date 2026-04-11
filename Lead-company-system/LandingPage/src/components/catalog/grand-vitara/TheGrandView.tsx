import React from 'react';
import styles from './TheGrandView.module.css';

export default function TheGrandView() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.visualColumn}>
           {/* Placeholder for the panoramic sunroof interior shot */}
           <div className={styles.sunroofVisual}></div>
        </div>
        <div className={styles.contentColumn}>
          <span className={styles.label}>PREMIUM LUXURY</span>
          <h2 className={styles.title}>The Grand View</h2>
          <p className={styles.description}>
            Elevate your perspective with the dual-pane Panoramic Sunroof. It provides a breezy and expansive feeling throughout the cabin, ensuring every journey is shared with the sky.
          </p>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h4 className={styles.featureTitle}>Ventilated Seats</h4>
              <p className={styles.featureText}>Stay cool in any climate with three-stage ventilated front seats.</p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.featureTitle}>Ambience Lighting</h4>
              <p className={styles.featureText}>Set the mood with subtle and sophisticated cabin lighting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
