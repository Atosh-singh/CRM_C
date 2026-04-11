import React from 'react';
import { Gauge, Zap, Wind } from 'lucide-react';
import styles from './BoosterJetTurbo.module.css';

export default function BoosterJetTurbo() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.visualColumn}>
           <div className={styles.engineCard}>
              <Zap size={48} className={styles.zapIcon} />
              <div className={styles.stats}>
                 <div className={styles.stat}>
                    <span className={styles.statValue}>147.6<small>Nm</small></span>
                    <span className={styles.statLabel}>INSTANT TORQUE</span>
                 </div>
                 <div className={styles.statBorder}></div>
                 <div className={styles.stat}>
                    <span className={styles.statValue}>1.0<small>L</small></span>
                    <span className={styles.statLabel}>BOOSTERJET TURBO</span>
                 </div>
              </div>
           </div>
        </div>
        <div className={styles.contentColumn}>
          <span className={styles.label}>PERFORMANCE UNLEASHED</span>
          <h2 className={styles.title}>BoosterJet Engine</h2>
          <p className={styles.description}>
            Feel the adrenaline with the 1.0L Turbo BoosterJet engine. Engineered for instant power and exhilarating acceleration, it turns every road into a racetrack.
          </p>
          <ul className={styles.featureList}>
            <li>
               <Gauge size={20} />
               <span>6-Speed Automatic with Paddle Shifters</span>
            </li>
            <li>
               <Wind size={20} />
               <span>Fuel Efficient yet Powerful</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
