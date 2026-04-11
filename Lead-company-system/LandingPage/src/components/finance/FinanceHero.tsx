import React from 'react';
import { ShieldCheck, TrendingDown, Clock } from 'lucide-react';
import styles from './FinanceHero.module.css';

export default function FinanceHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Seamless Ownership.</h1>
        <h1 className={styles.titleBlue}>Precision Finance.</h1>
        <p className={styles.subtitle}>
          Your dream car is now within reach. Experience transparent processing, competitive interest rates, and flexible repayment options designed for your lifestyle.
        </p>

        <div className={styles.benefits}>
          <div className={styles.benefitItem}>
             <TrendingDown size={20} className={styles.icon} />
             <span>Lowest Interest Rates</span>
          </div>
          <div className={styles.benefitItem}>
             <Clock size={20} className={styles.icon} />
             <span>Instant Approval Mockup</span>
          </div>
          <div className={styles.benefitItem}>
             <ShieldCheck size={20} className={styles.icon} />
             <span>Zero Hidden Charges</span>
          </div>
        </div>
      </div>
    </section>
  );
}
