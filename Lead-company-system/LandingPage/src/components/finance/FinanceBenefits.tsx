import React from 'react';
import { BadgeCheck, Zap, HeartHandshake, FileText } from 'lucide-react';
import styles from './FinanceBenefits.module.css';

export default function FinanceBenefits() {
  const benefits = [
    {
      icon: <BadgeCheck size={32} />,
      title: "Lowest Interest Rates",
      desc: "Starting at 8.75% for salary-backed loan applications."
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Approval",
      desc: "Get your in-principle sanction in less than 30 minutes."
    },
    {
      icon: <HeartHandshake size={32} />,
      title: "Flexible Tenures",
      desc: "Choose from 12 to 84 months based on your convenience."
    },
    {
      icon: <FileText size={32} />,
      title: "Minimum Documentation",
      desc: "Hassle-free digital processing with minimal physical paperwork."
    }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Why Choose Precision Finance?</h2>
      <div className={styles.grid}>
        {benefits.map((b, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{b.icon}</div>
            <h3 className={styles.cardTitle}>{b.title}</h3>
            <p className={styles.cardDesc}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
