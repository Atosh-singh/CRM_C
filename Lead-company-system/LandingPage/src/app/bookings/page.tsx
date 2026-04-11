'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BottomNavigation from '../../components/BottomNavigation';

import PrecisionInquiryForm from '../../components/bookings/PrecisionInquiryForm';
import PriceEstimate from '../../components/bookings/PriceEstimate';
import AssistanceCard from '../../components/bookings/AssistanceCard';
import BookingTabs from '../../components/bookings/history/BookingTabs';
import InquiryHistory from '../../components/bookings/InquiryHistory';

import styles from '../page.module.css';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  
  const handleNoOp = () => {};

  return (
    <main className={styles.main} style={{ backgroundColor: 'var(--bg-white)' }}>
      <Header onLeadCapture={handleNoOp} />
      
      <div style={{ paddingTop: '2rem' }}>
        <h1 className={styles.pageTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Management Center
        </h1>
        
        <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'new' ? (
          <>
            <PrecisionInquiryForm />
            <PriceEstimate />
            <AssistanceCard />
          </>
        ) : (
          <InquiryHistory />
        )}
      </div>

      <Footer />
      <BottomNavigation />
    </main>
  );
}
