import React from 'react';
import styles from './EditorialHero.module.css';

export default function EditorialHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>PREMIUM EXPERIENCE</span>
        <h1 className={styles.title}>Crafting the<br/>future of<br/>mobility.</h1>
      </div>
      <div className={styles.overlay}></div>
    </section>
  );
}
