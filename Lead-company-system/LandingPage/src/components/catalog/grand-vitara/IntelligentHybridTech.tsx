import React from 'react';
import { BatteryCharging, VolumeX, Leaf, Zap } from 'lucide-react';
import styles from './IntelligentHybridTech.module.css';

export default function IntelligentHybridTech() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.label}>NEXA TECH</span>
          <h2 className={styles.title}>Intelligent Electric Hybrid</h2>
          <p className={styles.description}>
            Experience a silent, self-charging powertrain that effortlessly switches between gasoline and pure electric mode. No plug needed—just pure intelligence at work.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <VolumeX size={32} className={styles.statIcon} />
            <h3 className={styles.statTitle}>Silent EV Mode</h3>
            <p className={styles.statText}>Start and drive in pure electric mode for a quiet and eco-friendly city commute.</p>
          </div>
          <div className={styles.statCard}>
            <BatteryCharging size={32} className={styles.statIcon} />
            <h3 className={styles.statTitle}>Self-Charging</h3>
            <p className={styles.statText}>The system recharges itself using the engine and regenerative braking during deceleration.</p>
          </div>
          <div className={styles.statCard}>
            <Zap size={32} className={styles.statIcon} />
            <h3 className={styles.statTitle}>Power Assist</h3>
            <p className={styles.statText}>Both the engine and motor work together to provide instant torque and effortless acceleration.</p>
          </div>
          <div className={styles.statCard}>
            <Leaf size={32} className={styles.statIcon} />
            <h3 className={styles.statTitle}>Max Efficiency</h3>
            <p className={styles.statText}>Achieve an incredible mileage of up to 27.97 km/l, re-defining SUV fuel economy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
