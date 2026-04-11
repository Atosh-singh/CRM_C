import React from 'react';
import { ShieldCheck, Headphones } from 'lucide-react';
import styles from './ValueCards.module.css';

export default function ValueCards() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <ShieldCheck size={24} className={styles.icon} />
        <h3 className={styles.title}>SECURE</h3>
        <p className={styles.text}>
          Your data is protected with industry-standard encryption.
        </p>
      </div>
      <div className={styles.card}>
        <Headphones size={24} className={styles.icon} />
        <h3 className={styles.title}>24/7 SUPPORT</h3>
        <p className={styles.text}>
          Our concierge team is available around the clock.
        </p>
      </div>
    </section>
  );
}
