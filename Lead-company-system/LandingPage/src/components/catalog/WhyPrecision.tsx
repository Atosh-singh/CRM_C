import React from 'react';
import { ShieldCheck } from 'lucide-react';
import styles from './WhyPrecision.module.css';

interface WhyPrecisionProps {
  onLeadCapture: (serviceInfo?: string) => void;
}

export default function WhyPrecision({ onLeadCapture }: WhyPrecisionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Why Precision?</h2>
      
      <div className={styles.cards}>
        <div className={styles.blueCard}>
          <div className={styles.blueContent}>
            <h3 className={styles.cardTitle}>S-CNG<br/>Technology</h3>
            <p className={styles.cardDesc}>
              Industry-leading fuel efficiency without compromising on performance. Engineered for the future.
            </p>
            <button 
              className={styles.learnMoreBtn}
              onClick={() => onLeadCapture('Learn More S-CNG')}
            >
              LEARN MORE
            </button>
          </div>
          {/* Faint leaf graphic could be added here as background */}
          <div className={styles.leafDecoration}></div>
        </div>

        <div className={styles.lightCard}>
          <div className={styles.iconWrapper}>
            <ShieldCheck size={24} color="var(--primary-blue)" />
          </div>
          <h3 className={styles.lightTitle}>Safety First</h3>
          <p className={styles.lightDesc}>
            Heartect Platform design for enhanced passenger protection and stability.
          </p>
        </div>
      </div>
    </section>
  );
}
