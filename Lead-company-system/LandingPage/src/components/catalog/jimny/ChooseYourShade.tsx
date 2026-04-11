'use client';
import React, { useState } from 'react';
import styles from './ChooseYourShade.module.css';

const SHADES = [
  { id: 'yellow', name: 'Kinetic Yellow + Bluish Black', type: 'Dual Tone', colorCode: '#d5e237' },
  { id: 'red', name: 'Sizzling Red', type: 'Dual Tone', colorCode: '#c21e2f' },
  { id: 'black', name: 'Bluish Black', type: 'Single Tone', colorCode: '#222222' },
  { id: 'grey', name: 'Granite Grey', type: 'Single Tone', colorCode: '#878787' },
  { id: 'white', name: 'Pearl Arctic White', type: 'Single Tone', colorCode: '#f4f4f4' }
];

export default function ChooseYourShade() {
  const [activeShade, setActiveShade] = useState(SHADES[0]);

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h3 className={styles.title}>Choose Your Shade</h3>
        
        <div className={styles.carDisplay}>
          {/* We use a CSS filter or just the base image if real assets aren't available */}
          <img src="/jimny_car.png" alt="Jimny" className={styles.carImage} />
        </div>

        <div className={styles.swatchContainer}>
          {SHADES.map(shade => (
            <button
              key={shade.id}
              className={`${styles.swatch} ${activeShade.id === shade.id ? styles.activeSwatch : ''}`}
              style={{ backgroundColor: shade.colorCode }}
              onClick={() => setActiveShade(shade)}
              aria-label={`Select ${shade.name}`}
            />
          ))}
        </div>

        <div className={styles.infoRow}>
          <div className={styles.colorNameWrapper}>
            <span className={styles.colorName}>{activeShade.name}</span>
          </div>
          <span className={styles.toneBadge}>{activeShade.type}</span>
        </div>

        <p className={styles.description}>
          A signature off-road identity, designed for high-visibility in wilderness environments.
        </p>
      </div>
    </section>
  );
}
