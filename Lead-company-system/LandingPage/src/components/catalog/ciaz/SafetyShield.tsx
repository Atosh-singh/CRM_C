import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import styles from './SafetyShield.module.css';

export default function SafetyShield() {
  const safetyFeatures = [
    "Dual Front Airbags",
    "ABS with EBD",
    "ISOFIX Child Seat Anchorages",
    "Pedestrian Protection Compliance",
    "Electronic Stability Program",
    "Hill Hold Assist"
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.visualColumn}>
           <Shield size={120} className={styles.mainShield} />
        </div>
        <div className={styles.contentColumn}>
          <span className={styles.label}>NEXA SAFETY SHIELD</span>
          <h2 className={styles.title}>Your Safety, Our Priority</h2>
          <p className={styles.description}>
            The Ciaz is built on a high-tensile steel body and equipped with the NEXA Safety Shield—a collection of advanced safety features designed to keep you and your loved ones protected.
          </p>
          <div className={styles.grid}>
            {safetyFeatures.map((feature, idx) => (
              <div key={idx} className={styles.featureItem}>
                <CheckCircle size={18} className={styles.checkIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
