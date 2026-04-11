import React from 'react';
import { Settings, Maximize, ArrowUpFromLine, ShieldAlert } from 'lucide-react';
import styles from './PurityOfFunction.module.css';

export default function PurityOfFunction() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Purity of Function</h2>
      <p className={styles.description}>
        The Jimny is built to withstand the harshest weather and terrain. Where other vehicles fear to tread, the Jimny feels right at home. Its heritage-inspired design isn't just for looks — every angle and every line is engineered for serious off-roading.
      </p>

      <div className={styles.grid}>
        <div className={styles.statCard}>
          <Settings size={20} className={styles.icon} />
          <span className={styles.label}>ENGINE</span>
          <span className={styles.value}>1.5L K-Series</span>
        </div>

        <div className={styles.statCard}>
          <Maximize size={20} className={styles.icon} />
          <span className={styles.label}>DRIVETRAIN</span>
          <span className={styles.value}>ALLGRIP PRO</span>
        </div>

        <div className={styles.statCard}>
          <ArrowUpFromLine size={20} className={styles.icon} />
          <span className={styles.label}>CLEARANCE</span>
          <span className={styles.value}>210mm</span>
        </div>

        <div className={styles.statCard}>
          <ShieldAlert size={20} className={styles.icon} />
          <span className={styles.label}>SAFETY</span>
          <span className={styles.value}>6 Airbags</span>
        </div>
      </div>
    </section>
  );
}
