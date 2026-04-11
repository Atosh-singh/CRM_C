import React from 'react';
import Header from '../../components/Header';
import ShowroomHero from '../../components/showroom/ShowroomHero';
import ShowroomMap from '../../components/showroom/ShowroomMap';
import DealerList from '../../components/showroom/DealerList';
import Footer from '../../components/Footer';
import BottomNavigation from '../../components/BottomNavigation';

import styles from '../page.module.css';

export default function ShowroomPage() {
  return (
    <main className={styles.main}>
      <Header />
      
      <ShowroomHero />
      <ShowroomMap />
      <DealerList />

      {/* Spacing for bottom navigation on mobile */}
      <div style={{ height: '80px' }} className={styles.mobileOnly}></div>
      
      <Footer />
      <BottomNavigation />
    </main>
  );
}
