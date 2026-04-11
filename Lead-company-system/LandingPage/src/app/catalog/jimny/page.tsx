'use client';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BottomNavigation from '../../../components/BottomNavigation';
import LeadCaptureModal from '../../../components/LeadCaptureModal';
import JourneyForm from '../../../components/shared/JourneyForm';

import JimnyHero from '../../../components/catalog/jimny/JimnyHero';
import PurityOfFunction from '../../../components/catalog/jimny/PurityOfFunction';
import ChooseYourShade from '../../../components/catalog/jimny/ChooseYourShade';
import JimnyEngineering from '../../../components/catalog/jimny/JimnyEngineering';

import styles from '../../page.module.css';

export default function JimnyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <JimnyHero onLeadCapture={handleLeadCapture} />
      <PurityOfFunction />
      <ChooseYourShade />
      <JimnyEngineering />
      <JourneyForm source="Jimny Detail Page" />
      
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
