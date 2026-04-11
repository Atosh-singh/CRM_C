'use client';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BottomNavigation from '../../../components/BottomNavigation';
import LeadCaptureModal from '../../../components/LeadCaptureModal';
import JourneyForm from '../../../components/shared/JourneyForm';

import VitaraHero from '../../../components/catalog/grand-vitara/VitaraHero';
import AllGripCapability from '../../../components/catalog/grand-vitara/AllGripCapability';
import IntelligentHybridTech from '../../../components/catalog/grand-vitara/IntelligentHybridTech';
import TheGrandView from '../../../components/catalog/grand-vitara/TheGrandView';

import styles from '../../page.module.css';

export default function GrandVitaraPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <VitaraHero onLeadCapture={handleLeadCapture} />
      <IntelligentHybridTech />
      <AllGripCapability />
      <TheGrandView />
      <JourneyForm source="Grand Vitara Detail Page" />
      
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
