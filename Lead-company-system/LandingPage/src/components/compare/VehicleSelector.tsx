import React from 'react';
import { ChevronDown, Car } from 'lucide-react';
import { VEHICLES, Vehicle } from '../../data/vehicles';
import styles from './VehicleSelector.module.css';

interface VehicleSelectorProps {
  label: string;
  selectedVehicle: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
}

export default function VehicleSelector({ label, selectedVehicle, onSelect }: VehicleSelectorProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.selectWrapper}>
        <select 
          className={styles.select}
          value={selectedVehicle?.name || ''}
          onChange={(e) => {
            const vehicle = VEHICLES.find(v => v.name === e.target.value);
            if (vehicle) onSelect(vehicle);
          }}
        >
          <option value="" disabled>Select a vehicle</option>
          {VEHICLES.map(v => (
            <option key={v.name} value={v.name}>{v.name}</option>
          ))}
        </select>
        <ChevronDown size={20} className={styles.icon} />
      </div>

      {selectedVehicle && (
        <div className={styles.preview}>
          <div className={styles.imageContainer}>
             <img src={selectedVehicle.imageSrc} alt={selectedVehicle.name} className={styles.image} />
          </div>
          <div className={styles.info}>
             <h3 className={styles.name}>{selectedVehicle.name}</h3>
             <span className={styles.price}>{selectedVehicle.priceRaw}</span>
          </div>
        </div>
      )}

      {!selectedVehicle && (
        <div className={styles.emptyPreview}>
          <Car size={40} className={styles.emptyIcon} />
          <p>Pick a car to compare</p>
        </div>
      )}
    </div>
  );
}
