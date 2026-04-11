import React from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onLeadCapture: (serviceInfo?: string) => void;
}

export default function HeroSection({ onLeadCapture }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.badge}>THE GRAND VITARA</div>
        <h1 className={styles.title}>
          REDEFINING<br />
          <span className={styles.titleHighlight}>DOMINANCE</span>
        </h1>
        
        {/* Mobile subtitle */}
        <p className={`${styles.subtitle} ${styles.mobileSub}`}>
          Experience the sophisticated world<br/>
          technology wrapped in a bold,<br/>
          muscular silhouette.
        </p>

        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => onLeadCapture('Explore Excellence')}
          >
            Explore Excellence
          </button>
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => onLeadCapture('Book Trial')}
          >
            Book Trial
          </button>
        </div>
      </div>
    </section>
  );
}
