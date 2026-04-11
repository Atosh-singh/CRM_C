import React from 'react';
import { Eye, Monitor, Smartphone, Volume2 } from 'lucide-react';
import styles from './TechSmartCabin.module.css';

export default function TechSmartCabin() {
  const techs = [
    { icon: <Monitor />, title: "Head-up Display", desc: "Keep your eyes on the road with critical info projected right in your line of sight." },
    { icon: <Eye />, title: "360 View Camera", desc: "Manoeuvring in tight spaces is effortless with an all-around bird's-eye view." },
    { icon: <Smartphone />, title: "Wireless Charger", desc: "Clutter-free charging for your compatible devices on the go." },
    { icon: <Volume2 />, title: "Surround Sense", desc: "Experience immersive audio with a sound system powered by Arkamys." }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.label}>CONNECTED TECH</span>
          <h2 className={styles.title}>The Smart Tech Cabin</h2>
          <p className={styles.description}>
            The Fronx cabin is a sanctuary of technology. From advanced infotainment to intelligent drive assistants, everything is designed to keep you connected and in control.
          </p>
        </div>

        <div className={styles.techGrid}>
          {techs.map((t, i) => (
            <div key={i} className={styles.techItem}>
              <div className={styles.iconWrapper}>{t.icon}</div>
              <div className={styles.info}>
                <h4 className={styles.techTitle}>{t.title}</h4>
                <p className={styles.techDesc}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
