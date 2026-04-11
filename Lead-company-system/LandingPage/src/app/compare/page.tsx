'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import CompareHero from '../../components/compare/CompareHero';
import VehicleSelector from '../../components/compare/VehicleSelector';
import ComparisonGrid from '../../components/compare/ComparisonGrid';
import Footer from '../../components/Footer';
import BottomNavigation from '../../components/BottomNavigation';
import LeadCaptureModal from '../../components/LeadCaptureModal';
import { Vehicle } from '../../data/vehicles';

import styles from './page.module.css';

export default function ComparePage() {
  const [vehicleA, setVehicleA] = useState<Vehicle | null>(null);
  const [vehicleB, setVehicleB] = useState<Vehicle | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.container}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <CompareHero />

      <section className={styles.selectionSection}>
        <div className={styles.selectors}>
           <VehicleSelector 
              label="Vehicle A" 
              selectedVehicle={vehicleA} 
              onSelect={setVehicleA} 
           />
           <div className={styles.vsBadge}>VS</div>
           <VehicleSelector 
              label="Vehicle B" 
              selectedVehicle={vehicleB} 
              onSelect={setVehicleB} 
           />
        </div>
      </section>

      <ComparisonGrid vehicleA={vehicleA} vehicleB={vehicleB} />

      {/* Spacing for bottom navigation on mobile */}
      <div style={{ height: '80px' }} className={styles.mobileOnly}></div>
      
      <Footer />
      <BottomNavigation />

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceInfo={activeServiceInfo} 
      />
    </main>
  );
}
