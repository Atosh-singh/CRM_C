import React from 'react';
import { Zap, RotateCcw, PlayCircle } from 'lucide-react';
import styles from './SmartHybridTech.module.css';

export default function SmartHybridTech() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>SMART HYBRID</span>
          <h2 className={styles.title}>Efficiency that Inspires</h2>
          <p className={styles.subtitle}>
            Intelligence is the driver. Experience the K15 Smart Hybrid Petrol Engine that redefines performance and fuel economy.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Zap size={32} className={styles.icon} />
            <h3 className={styles.cardTitle}>Torque Assist</h3>
            <p className={styles.cardText}>
              The dual-battery setup provides a torque assist that lightens the load on the engine during acceleration.
            </p>
          </div>
          <div className={styles.card}>
            <RotateCcw size={32} className={styles.icon} />
            <h3 className={styles.cardTitle}>Energy Regeneration</h3>
            <p className={styles.cardText}>
              Deceleration charges the batteries, ensuring that every drop of fuel is maximized to the fullest.
            </p>
          </div>
          <div className={styles.card}>
            <PlayCircle size={32} className={styles.icon} />
            <h3 className={styles.cardTitle}>Idle Start-Stop</h3>
            <p className={styles.cardText}>
              The engine shuts down automatically during traffic to save fuel and restarts smoothly when you're ready to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
