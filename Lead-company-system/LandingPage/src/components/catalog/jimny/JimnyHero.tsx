import React from 'react';
import { Download } from 'lucide-react';
import styles from './JimnyHero.module.css';

interface JimnyHeroProps {
  onLeadCapture: (info: string) => void;
}

export default function JimnyHero({ onLeadCapture }: JimnyHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>THE LEGENDARY 4X4</span>
        <h1 className={styles.title}>JIMNY</h1>
        
        <div className={styles.actions}>
          <button 
            className={styles.primaryBtn}
            onClick={() => onLeadCapture('Book Test Drive: Jimny')}
          >
            <span>Book a Test Drive</span>
            <span className={styles.steeringIcon}>&#x2388;</span> {/* Fallback icon */}
          </button>
          
          <button 
            className={styles.secondaryBtn}
            onClick={() => onLeadCapture('Download Brochure: Jimny')}
          >
            <span>Download Brochure</span>
            <Download size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
