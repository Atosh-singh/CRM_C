import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import styles from './FronxHero.module.css';

interface FronxHeroProps {
  onLeadCapture?: (serviceInfo?: string) => void;
}

export default function FronxHero({ onLeadCapture }: FronxHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Zap size={14} className={styles.icon} />
          <span>SHAPE OF NEW</span>
        </div>
        <h1 className={styles.title}>FRONX</h1>
        <p className={styles.subtitle}>
          The SUV Crossover that defies conventions. Experience the raw power of Turbo performance wrapped in a radical geometric design.
        </p>
        <div className={styles.ctaGroup}>
          <button 
            className={styles.primaryBtn}
            onClick={() => onLeadCapture && onLeadCapture('Fronx: Performance Consultation')}
          >
            EXPERIENCE THE TURBO THRILL <ArrowRight size={18} />
          </button>
          <button className={styles.secondaryBtn}>
            VIEW CONFIGURATIONS
          </button>
        </div>
      </div>
    </section>
  );
}
