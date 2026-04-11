'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import FinanceHero from '../../components/finance/FinanceHero';
import EMICalculator from '../../components/finance/EMICalculator';
import FinanceBenefits from '../../components/finance/FinanceBenefits';
import Footer from '../../components/Footer';
import BottomNavigation from '../../components/BottomNavigation';
import LeadCaptureModal from '../../components/LeadCaptureModal';
import JourneyForm from '../../components/shared/JourneyForm';

import styles from '../page.module.css';

export default function FinancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header onLeadCapture={handleLeadCapture} />
      
      <FinanceHero />
      <EMICalculator />
      <FinanceBenefits />
      <JourneyForm source="Finance Page" />
      
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
