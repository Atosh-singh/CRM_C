import React from 'react';
import { Menu, UserCircle, Search } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  onLeadCapture?: (serviceInfo?: string) => void;
}

export default function Header({ onLeadCapture }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.mobileLeft}>
        <button className={styles.iconButtonMobile} aria-label="Menu">
          <Menu size={24} color="var(--primary-blue)" />
        </button>
      </div>

      <div className={styles.logoContainer}>
        <span className={styles.logoText}>Maruti Suzuki Precision</span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className={styles.desktopNav}>
        <a href="#" className={styles.navLink}>Inventory</a>
        <a href="/showroom" className={styles.navLink}>Showroom</a>
        <a href="#" className={styles.navLink}>Services</a>
        <a href="/finance" className={styles.navLink}>Finance</a>
        <a href="#" className={styles.navLink}>Pre-Owned</a>
        <a href="/editorial" className={styles.navLink}>Editorial</a>
      </nav>

      {/* Desktop Right Actions */}
      <div className={styles.desktopActions}>
        <button className={styles.searchButton} aria-label="Search">
          <Search size={18} color="var(--text-dark)" />
        </button>
        <button 
          className={styles.desktopBookButton}
          onClick={() => onLeadCapture && onLeadCapture('Book Test Drive')}
        >
          Book Test Drive
        </button>
      </div>

      <div className={styles.mobileRight}>
        <button className={styles.iconButtonMobile} aria-label="Profile">
          <UserCircle size={24} color="var(--primary-blue)" />
        </button>
      </div>
    </header>
  );
}
