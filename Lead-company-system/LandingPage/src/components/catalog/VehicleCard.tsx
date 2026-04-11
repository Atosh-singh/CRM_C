import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  name: string;
  priceRaw: string;
  mileage: string;
  fuelType: string;
  imageSrc: string;
  isPremium?: boolean;
  onExplore: () => void;
}

export default function VehicleCard({ 
  name, 
  priceRaw, 
  mileage, 
  fuelType, 
  imageSrc, 
  isPremium = false,
  onExplore 
}: VehicleCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageContainer} ${isPremium ? styles.premiumBg : styles.standardBg}`}>
        {isPremium && <span className={styles.premiumBadge}>PREMIUM NEXA</span>}
        <img src={imageSrc} alt={name} className={styles.carImage} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.price}>Starting at {priceRaw}*</p>
          </div>
          <button className={styles.favoriteBtn}>
            <Heart size={20} color="var(--text-light)" />
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>MILEAGE</span>
            <span className={styles.statValue}>{mileage}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>FUEL TYPE</span>
            <span className={styles.statValue}>{fuelType}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.exploreBtn} onClick={onExplore}>
            EXPLORE
          </button>
          <button className={styles.iconBtn}>
            <ArrowUpRight size={18} color="var(--text-dark)" />
          </button>
        </div>
      </div>
    </div>
  );
}
