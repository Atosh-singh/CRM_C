'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Scale, CalendarDays } from 'lucide-react';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
        <Home size={22} className={styles.icon} />
        <span className={styles.label}>HOME</span>
      </Link>
      <Link href="/catalog" className={`${styles.navItem} ${pathname === '/catalog' ? styles.active : ''}`}>
        <Car size={22} className={styles.icon} />
        <span className={styles.label}>CATALOG</span>
      </Link>
      <Link href="/compare" className={`${styles.navItem} ${pathname === '/compare' ? styles.active : ''}`}>
        <Scale size={22} className={styles.icon} />
        <span className={styles.label}>COMPARE</span>
      </Link>
      <Link href="/bookings" className={`${styles.navItem} ${pathname === '/bookings' ? styles.active : ''}`}>
        <CalendarDays size={22} className={styles.icon} />
        <span className={styles.label}>BOOKINGS</span>
      </Link>
    </nav>
  );
}
