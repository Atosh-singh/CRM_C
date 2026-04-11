'use client';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BottomNavigation from '../../../components/BottomNavigation';
import LeadCaptureModal from '../../../components/LeadCaptureModal';
import JourneyForm from '../../../components/shared/JourneyForm';

import FronxHero from '../../../components/catalog/fronx/FronxHero';
import BoosterJetTurbo from '../../../components/catalog/fronx/BoosterJetTurbo';
import GeometricDesign from '../../../components/catalog/fronx/GeometricDesign';
import TechSmartCabin from '../../../components/catalog/fronx/TechSmartCabin';

import styles from '../../page.module.css';

export default function FronxPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <FronxHero onLeadCapture={handleLeadCapture} />
      <BoosterJetTurbo />
      <GeometricDesign />
      <TechSmartCabin />
      <JourneyForm source="Fronx Detail Page" />
      
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
