import React from 'react';
import styles from './JimnyEngineering.module.css';

export default function JimnyEngineering() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Precision<br/>Engineering
      </h2>
      <div className={styles.titleUnderline}></div>

      <div className={styles.featuresList}>
        
        <div className={styles.featureCard}>
          <div className={styles.imageContainer}>
             <img src="/media__1775211163306.png" alt="ALLGRIP PRO" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.featureTitle}>ALLGRIP PRO 4WD</h3>
            <p className={styles.featureDesc}>
              Featuring a low-range transfer gear for maximum torque and traction in extreme conditions. Effortlessly shift between 2H, 4H, and 4L.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.imageContainer}>
             <img src="/jimny_car.png" alt="Ladder Frame" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.featureTitle}>Ladder Frame Chassis</h3>
            <p className={styles.featureDesc}>
              The foundation of true off-roading. A robust ladder frame provides the structural rigidity needed to handle punishing uneven terrain.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.imageContainer}>
             <img src="/media__1775209280868.png" alt="Tech Dashboard" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.featureTitle}>Tech-Enabled Comfort</h3>
            <p className={styles.featureDesc}>
              22.86cm SmartPlay Pro+ touchscreen with Wireless Android Auto & Apple CarPlay integration for seamless connectivity.
            </p>
          </div>
        </div>

      </div>
      
      <div className={styles.closingFooter}>
        <span className={styles.closingBrand}>MARUTI SUZUKI</span>
        <p className={styles.closingText}>Experience the pinnacle of automotive precision.</p>
      </div>

    </section>
  );
}
