import React from 'react';
import { Phone, MapPin, Navigation } from 'lucide-react';
import styles from './DealerCard.module.css';

interface DealerCardProps {
  type: 'NEXA' | 'ARENA' | 'COMMERCIAL';
  name: string;
  address: string;
  distance: string;
  status: string;
  hours: string;
}

export default function DealerCard({ type, name, address, distance, status, hours }: DealerCardProps) {
  const typeClass = type.toLowerCase();
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.infoLeft}>
           <span className={`${styles.typeBadge} ${styles[typeClass]}`}>{type}</span>
           <h3 className={styles.dealerName}>{name}</h3>
           <div className={styles.addressRow}>
             <MapPin size={14} className={styles.addressIcon} />
             <p className={styles.address}>{address}</p>
           </div>
        </div>
        <div className={styles.infoRight}>
           <span className={styles.distanceValue}>{distance}</span>
           <span className={styles.distanceLabel}>DISTANCE</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>STATUS</span>
          <span className={styles.statusValue}>{status}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>HOURS</span>
          <span className={styles.hoursValue}>{hours}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.callBtn}>
          <Phone size={18} />
          CALL DEALER
        </button>
        <button className={styles.directionsBtn}>
          <Navigation size={18} />
          DIRECTIONS
        </button>
      </div>
    </div>
  );
}
