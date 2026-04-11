import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <span className={styles.logoText}>MARUTI SUZUKI Precision</span>
          <p className={styles.tagline}>
            Leading the automotive evolution with surgical precision and innovative design since 1983.
          </p>
          <div className={styles.socials}>
             {/* Icons would go here */}
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Explore</span>
            <a href="#" className={styles.link}>Inventory</a>
            <a href="#" className={styles.link}>New Launches</a>
            <a href="/showroom" className={styles.link}>Digital Showroom</a>
            <a href="/bookings" className={styles.link}>Book Test Drive</a>
          </div>
          
          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Ownership</span>
            <a href="#" className={styles.link}>Service Booking</a>
            <a href="/showroom" className={styles.link}>Dealer Locator</a>
            <a href="#" className={styles.link}>Suzuki Connect</a>
            <a href="#" className={styles.link}>Genuine Parts</a>
          </div>

          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Legal & Contact</span>
            <a href="#" className={styles.link}>Privacy Policy</a>
            <a href="#" className={styles.link}>Terms of Service</a>
            <a href="#" className={styles.link}>Compliance</a>
            <a href="#" className={styles.link}>Contact Us</a>
          </div>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <span>© 2026 Maruti Suzuki India Limited. All Rights Reserved.</span>
        <div className={styles.copyrightLinks}>
          <a href="#" className={styles.link}>Sitemap</a>
          <a href="#" className={styles.link}>Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
