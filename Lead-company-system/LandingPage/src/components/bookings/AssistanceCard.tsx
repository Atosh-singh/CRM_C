import React from 'react';
import { Headset } from 'lucide-react';
import styles from './AssistanceCard.module.css';

export default function AssistanceCard() {
  return (
    <div className={styles.container}>
      <Headset size={24} className={styles.icon} />
      <h3 className={styles.title}>Need Assistance?</h3>
      <p className={styles.description}>
        Our precision experts are available to guide you through every feature and specification.
      </p>
      <button className={styles.linkBtn}>
        TALK TO EXPERT
      </button>
    </div>
  );
}
