import React from 'react';
import styles from './ShowroomMap.module.css';

export default function ShowroomMap() {
  return (
    <section className={styles.container}>
      <div className={styles.mapArea}>
        {/* Using a placeholder map background */}
        <div className={styles.mapVisual}></div>
        
        <div className={styles.focusOverlay}>
          <span className={styles.label}>CURRENT FOCUS</span>
          <span className={styles.value}>South Delhi Territory</span>
        </div>
      </div>
    </section>
  );
}
