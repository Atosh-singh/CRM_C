'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import HeroCompact from '../../components/catalog/HeroCompact';
import FleetSection from '../../components/catalog/FleetSection';
import WhyPrecision from '../../components/catalog/WhyPrecision';
import JourneyForm from '../../components/shared/JourneyForm';
import Footer from '../../components/Footer';
import BottomNavigation from '../../components/BottomNavigation';
import LeadCaptureModal from '../../components/LeadCaptureModal';
import styles from '../page.module.css';

export default function Catalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      <HeroCompact />
      <FleetSection onLeadCapture={handleLeadCapture} />
      <WhyPrecision onLeadCapture={handleLeadCapture} />
      <JourneyForm source="Catalog Page" />
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
