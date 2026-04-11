import React from 'react';
import { ArrowRight, Mountain } from 'lucide-react';
import styles from './VitaraHero.module.css';

interface VitaraHeroProps {
  onLeadCapture?: (serviceInfo?: string) => void;
}

export default function VitaraHero({ onLeadCapture }: VitaraHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Mountain size={14} className={styles.icon} />
          <span>RULE EVERY ROAD</span>
        </div>
        <h1 className={styles.title}>Grand Vitara</h1>
        <div className={styles.hybridTag}>
          <span className={styles.hybridHighlight}>INTELLIGENT ELECTRIC HYBRID</span>
        </div>
        <p className={styles.subtitle}>
          The SUV that represents a paradigm shift. Experience the future of mobility with silent EV mode and unrivaled AWD capability.
        </p>
        <div className={styles.ctaGroup}>
          <button 
            className={styles.primaryBtn}
            onClick={() => onLeadCapture && onLeadCapture('Grand Vitara: Specialized Test Drive')}
          >
            BOOK SPECIALIZED TEST DRIVE <ArrowRight size={18} />
          </button>
          <button className={styles.secondaryBtn}>
            EXPLORE VARIANTS
          </button>
        </div>
      </div>
    </section>
  );
}
