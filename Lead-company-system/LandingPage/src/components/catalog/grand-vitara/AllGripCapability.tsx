import React from 'react';
import { Compass, Wind, Snowflake, Lock } from 'lucide-react';
import styles from './AllGripCapability.module.css';

export default function AllGripCapability() {
  const modes = [
    { name: 'AUTO', icon: <Compass size={24} />, desc: 'Prioritizes fuel economy and manages 4WD transitions automatically.' },
    { name: 'SPORT', icon: <Wind size={24} />, desc: 'Enhanced torque delivery to the rear for sporty performance.' },
    { name: 'SNOW', icon: <Snowflake size={24} />, desc: 'Optimized traction for slippery, snowy, or muddy terrains.' },
    { name: 'LOCK', icon: <Lock size={24} />, desc: 'Fixed 4WD ratio for maximum power in extreme off-road conditions.' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.label}>ADVANCED 4x4</span>
          <h2 className={styles.title}>AllGrip Select Capability</h2>
          <p className={styles.description}>
            Rule every road with confidence. The ALLGRIP SELECT system allows you to choose from four driving modes, ensuring optimal traction and performance regardless of the terrain.
          </p>
        </div>

        <div className={styles.modesGrid}>
          {modes.map((mode, idx) => (
            <div key={idx} className={styles.modeCard}>
              <div className={styles.iconWrapper}>{mode.icon}</div>
              <h3 className={styles.modeName}>{mode.name}</h3>
              <p className={styles.modeDesc}>{mode.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
