'use client';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BottomNavigation from '../../../components/BottomNavigation';
import LeadCaptureModal from '../../../components/LeadCaptureModal';
import JourneyForm from '../../../components/shared/JourneyForm';

import CiazHero from '../../../components/catalog/ciaz/CiazHero';
import EleganceRedefined from '../../../components/catalog/ciaz/EleganceRedefined';
import SmartHybridTech from '../../../components/catalog/ciaz/SmartHybridTech';
import SafetyShield from '../../../components/catalog/ciaz/SafetyShield';

import styles from '../../page.module.css';

export default function CiazPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <CiazHero onLeadCapture={handleLeadCapture} />
      <EleganceRedefined />
      <SmartHybridTech />
      <SafetyShield />
      <JourneyForm source="Ciaz Detail Page" />
      
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
