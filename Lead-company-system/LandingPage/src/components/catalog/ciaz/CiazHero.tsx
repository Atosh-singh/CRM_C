import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import styles from './CiazHero.module.css';

interface CiazHeroProps {
  onLeadCapture?: (serviceInfo?: string) => void;
}

export default function CiazHero({ onLeadCapture }: CiazHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Star size={14} className={styles.starIcon} />
          <span>PREMIUM URBAN SEDAN</span>
        </div>
        <h1 className={styles.title}>The New Ciaz</h1>
        <p className={styles.subtitle}>
          Elegance is not just a style; it's a way of life. Experience the intersection of sophisticated design and groundbreaking technology.
        </p>
        <div className={styles.ctaGroup}>
          <button 
            className={styles.primaryBtn}
            onClick={() => onLeadCapture && onLeadCapture('Ciaz: Concierge Consultation')}
          >
            BOOK CONCIERGE CONSULTATION <ArrowRight size={18} />
          </button>
          <button className={styles.secondaryBtn}>
            DOWNLOAD BROCHURE
          </button>
        </div>
      </div>
    </section>
  );
}
