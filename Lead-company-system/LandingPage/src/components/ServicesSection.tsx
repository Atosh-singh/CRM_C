import React from 'react';
import { PenTool, Briefcase, CreditCard, ArrowRight } from 'lucide-react';
import styles from './ServicesSection.module.css';

interface ServicesSectionProps {
  onLeadCapture: (serviceInfo?: string) => void;
}

export default function ServicesSection({ onLeadCapture }: ServicesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <PenTool size={24} color="var(--primary-blue)" />
        </div>
        <h3 className={styles.cardTitle}>Precise Servicing</h3>
        <p className={styles.cardDescription}>
          Next-generation diagnostics and surgical precision for your vehicle's longevity.
        </p>
        <button 
          className={styles.linkButton}
          onClick={() => onLeadCapture('Book Service')}
        >
          Schedule Now <ArrowRight size={16} />
        </button>
      </div>

      <div className={styles.darkCard}>
        <div className={styles.iconWrapperDark}>
          <Briefcase size={24} color="white" />
        </div>
        <h3 className={styles.cardTitleDark}>Corporate Sales</h3>
        <p className={styles.cardDescriptionDark}>
          Exclusive fleet management solutions tailored for modern business ecosystems.
        </p>
        <button 
          className={styles.buttonDark}
          onClick={() => onLeadCapture('Corporate Inquiry')}
        >
          <span className={styles.linkButton}>View Portfolio <ArrowRight size={16} /></span>
        </button>
      </div>

      <div className={styles.cardLight}>
        <div className={styles.iconWrapper}>
          <CreditCard size={24} color="var(--primary-blue)" />
        </div>
        <h3 className={styles.cardTitle}>Finance Portal</h3>
        <p className={styles.cardDescription}>
          Seamless credit approval and customized EMI plans with zero documentation limits.
        </p>
        <button 
          className={styles.linkButton}
          onClick={() => onLeadCapture('Finance Inquiry')}
          aria-label="Finance Portal"
        >
          Calculate EMI <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
