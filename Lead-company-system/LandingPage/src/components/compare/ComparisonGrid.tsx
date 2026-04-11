import React from 'react';
import { Vehicle } from '../../data/vehicles';
import styles from './ComparisonGrid.module.css';

interface ComparisonGridProps {
  vehicleA: Vehicle | null;
  vehicleB: Vehicle | null;
}

export default function ComparisonGrid({ vehicleA, vehicleB }: ComparisonGridProps) {
  if (!vehicleA || !vehicleB) return null;

  const specs = [
    { label: 'PRICE', keyA: vehicleA.priceRaw, keyB: vehicleB.priceRaw },
    { label: 'ENGINE', keyA: vehicleA.specs?.engine, keyB: vehicleB.specs?.engine },
    { label: 'POWER', keyA: vehicleA.specs?.power, keyB: vehicleB.specs?.power },
    { label: 'TORQUE', keyA: vehicleA.specs?.torque, keyB: vehicleB.specs?.torque },
    { label: 'FUEL ECONOMY', keyA: vehicleA.mileage, keyB: vehicleB.mileage },
    { label: 'TRANSMISSION', keyA: vehicleA.specs?.transmission, keyB: vehicleB.specs?.transmission },
    { label: 'BOOT SPACE', keyA: vehicleA.specs?.bootSpace, keyB: vehicleB.specs?.bootSpace },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Technical Specifications</h2>
      <div className={styles.grid}>
        {specs.map((spec, idx) => (
          <div key={idx} className={styles.row}>
            <div className={styles.specLabel}>{spec.label}</div>
            <div className={styles.specValue}>{spec.keyA || 'N/A'}</div>
            <div className={styles.specValue}>{spec.keyB || 'N/A'}</div>
          </div>
        ))}

        <div className={styles.row}>
            <div className={styles.specLabel}>SAFETY FEATURES</div>
            <div className={styles.specValue}>
                 <ul className={styles.list}>
                    {vehicleA.specs?.safety.map((s, i) => <li key={i}>{s}</li>)}
                 </ul>
            </div>
            <div className={styles.specValue}>
                 <ul className={styles.list}>
                    {vehicleB.specs?.safety.map((s, i) => <li key={i}>{s}</li>)}
                 </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
