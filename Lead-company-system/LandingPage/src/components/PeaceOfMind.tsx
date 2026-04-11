import React from 'react';
import { CheckCircle, Headphones, Award } from 'lucide-react';
import styles from './PeaceOfMind.module.css';

export default function PeaceOfMind() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Peace of Mind</h2>
          <p className={styles.subtitle}>
            Beyond the purchase, we offer an ecosystem of trust. Our commitment to 
            precision ensures you never have to worry about the road ahead.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <CheckCircle size={20} color="var(--bg-white)" strokeWidth={2.5} />
            </div>
            <h4 className={styles.featureTitle}>Certified Precision</h4>
            <p className={styles.featureDesc}>
              Every spare part and service technique undergoes rigorous 150-point precision checks to meet Suzuki Global Standards.
            </p>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <Headphones size={20} color="var(--bg-white)" strokeWidth={2.5} />
            </div>
            <h4 className={styles.featureTitle}>24/7 Roadside Concierge</h4>
            <p className={styles.featureDesc}>
              Our dedicated response teams are on standby across 1,500+ cities to ensure you are never stranded, no matter the hour.
            </p>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <Award size={20} color="var(--bg-white)" strokeWidth={2.5} />
            </div>
            <h4 className={styles.featureTitle}>Suzuki Loyalty Rewards</h4>
            <p className={styles.featureDesc}>
              Earn points on every ride, service, and referral. Redeem for premium accessories and exclusive lifestyle experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
