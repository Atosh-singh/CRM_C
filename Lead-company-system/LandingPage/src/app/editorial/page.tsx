import React from 'react';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialHero from '../../components/editorial/EditorialHero';
import ValueCards from '../../components/editorial/ValueCards';
import JourneyForm from '../../components/shared/JourneyForm';
import Footer from '../../components/Footer';

import styles from '../page.module.css';

export default function EditorialPage() {
  return (
    <main className={styles.main} style={{ backgroundColor: '#fafafa' }}>
      <EditorialHeader />
      
      <EditorialHero />
      <ValueCards />
      <JourneyForm source="Editorial Page" />

      <Footer />
    </main>
  );
}
