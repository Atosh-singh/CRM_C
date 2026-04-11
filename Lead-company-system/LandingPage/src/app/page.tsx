'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedLineup from '../components/FeaturedLineup';
import PeaceOfMind from '../components/PeaceOfMind';
import JourneyForm from '../components/shared/JourneyForm';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import LeadCaptureModal from '../components/LeadCaptureModal';
import styles from './page.module.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceInfo, setActiveServiceInfo] = useState('');

  const handleLeadCapture = (serviceInfo?: string) => {
    setActiveServiceInfo(serviceInfo || '');
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Header />
      <HeroSection onLeadCapture={handleLeadCapture} />
      <ServicesSection onLeadCapture={handleLeadCapture} />
      <FeaturedLineup />
      <PeaceOfMind />
      <JourneyForm source="Main Landing Page" />
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
