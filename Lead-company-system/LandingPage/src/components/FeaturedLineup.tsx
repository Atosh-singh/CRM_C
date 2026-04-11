import React from 'react';
import { ChevronLeft, ChevronRight, Shield, Activity, ArrowRight } from 'lucide-react';
import styles from './FeaturedLineup.module.css';

export default function FeaturedLineup() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Featured Lineup</h2>
          <p className={styles.subtitle}>Engineered for every path you choose.</p>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlButton} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button className={styles.controlButton} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        {/* Main large card (Dzire) */}
        <div className={`${styles.card} ${styles.mainCard}`}>
          <div className={styles.mainCardContent}>
            <span className={styles.trendingBadge}>TRENDING</span>
            <h3 className={styles.mainCarName}>Dzire</h3>
            <p className={styles.mainCarDesc}>
              The pinnacle of premium sedans. Redefined comfort meets timeless elegance.
            </p>
            <div className={styles.mainStats}>
              <div className={styles.mainStatRow}>
                <Activity size={16} className={styles.statIcon} />
                <span>31.12 km/kg Efficiency</span>
              </div>
              <div className={styles.mainStatRow}>
                <Shield size={16} className={styles.statIcon} />
                <span>6 Airbags Standard</span>
              </div>
            </div>
            <button className={styles.configureButton}>
              Configure Design <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.mainImageContainer}>
            <img src="/dzire_car.png" alt="DZIRE" className={styles.carImageLarge} />
          </div>
        </div>

        {/* Small Stacked Cards for Desktop */}
        <div className={styles.smallCardsContainer}>
          <div className={`${styles.card} ${styles.smallCard}`}>
            <div className={styles.smallImageContainer}>
              <img src="/baleno_car.png" alt="Baleno" className={styles.carImageSmall} />
            </div>
            <div className={styles.smallCardContent}>
              <h3 className={styles.carName}>Baleno</h3>
              <p className={styles.carDesc}>The New Age Baleno. Bolder than ever.</p>
              <div className={styles.priceContainer}>
                Starts ₹6.66L*
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.smallCard}`}>
            <div className={styles.smallImageContainer}>
              <img src="/jimny_car.png" alt="Jimny" className={styles.carImageSmall} />
            </div>
            <div className={styles.smallCardContent}>
              <h3 className={styles.carName}>Jimny</h3>
              <p className={styles.carDesc}>True 4x4 heritage, Built for the wild.</p>
              <div className={styles.priceContainer}>
                Starts ₹12.74L*
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
