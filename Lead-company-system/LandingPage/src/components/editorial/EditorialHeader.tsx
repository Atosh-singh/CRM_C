import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './EditorialHeader.module.css';

export default function EditorialHeader() {
  return (
    <nav className={styles.header}>
      <Link href="/" className={styles.backButton}>
        <ArrowLeft size={20} color="var(--primary-blue)" />
      </Link>
      <span className={styles.title}>PRECISION EDITORIAL</span>
    </nav>
  );
}
