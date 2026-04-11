import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import { VEHICLES } from '../../data/vehicles';
import styles from './FleetSection.module.css';

interface FleetSectionProps {
  onLeadCapture: (serviceInfo?: string) => void;
}

export default function FleetSection({ onLeadCapture }: FleetSectionProps) {
  const [activeCategory, setActiveCategory] = useState('SUV');

  const categories = ['HATCHBACK', 'SUV', 'SEDAN'];

  const filteredVehicles = VEHICLES.filter(v => v.category === activeCategory);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>The <span className={styles.titleBold}>Fleet</span></h2>
        
        <div className={styles.filters}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredVehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.name}
            name={vehicle.name}
            priceRaw={vehicle.priceRaw}
            mileage={vehicle.mileage}
            fuelType={vehicle.fuelType}
            imageSrc={vehicle.imageSrc}
            isPremium={vehicle.isPremium}
            onExplore={() => {
              if (vehicle.link) {
                window.location.href = vehicle.link;
              } else {
                onLeadCapture(`Explore ${vehicle.name}`);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
