import React from 'react';
import { LocateFixed, Search } from 'lucide-react';
import styles from './ShowroomHero.module.css';

export default function ShowroomHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find Your Nearest Showroom</h1>
        <p className={styles.subtitle}>
          Experience luxury and performance at our authorized Maruti Suzuki Arena and NEXA outlets.
        </p>

        <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
             <Search size={20} className={styles.searchIcon} />
             <input type="text" placeholder="Enter City or Pincode" className={styles.searchInput} />
          </div>
          <button className={styles.locateBtn} aria-label="Locate me">
            <LocateFixed size={20} color="white" />
          </button>
        </div>
      </div>
    </section>
  );
}
