import React from 'react';
import { Calendar, ChevronRight, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';
import styles from './InquiryHistory.module.css';

interface BookingRecord {
  id: string;
  model: string;
  type: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const MOCK_HISTORY: BookingRecord[] = [
  { id: 'MS-82910', model: 'Jimny', type: 'Off-Road Test Drive', date: '02 Apr 2026', status: 'confirmed' },
  { id: 'MS-82855', model: 'Grand Vitara', type: 'Intelligent Hybrid Inquiry', date: '30 Mar 2026', status: 'completed' },
  { id: 'MS-82711', model: 'Ciaz', type: 'Price Quote', date: '25 Mar 2026', status: 'pending' }
];

export default function InquiryHistory() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Recent Inquiries</h2>
      <div className={styles.list}>
        {MOCK_HISTORY.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.refId}>{item.id}</span>
              <span className={`${styles.status} ${styles[item.status]}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.modelInfo}>
                <h3 className={styles.modelName}>{item.model}</h3>
                <p className={styles.typeText}>{item.type}</p>
              </div>
              <div className={styles.dateInfo}>
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.viewBtn}>
                VIEW DETAILS <ChevronRight size={16} />
              </button>
              <button className={styles.moreBtn}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.assistance}>
        <Clock size={20} className={styles.assistIcon} />
        <p>Most inquiries are processed within 24 business hours.</p>
      </div>
    </div>
  );
}
