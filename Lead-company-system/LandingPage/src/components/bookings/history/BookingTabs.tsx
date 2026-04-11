import React from 'react';
import styles from './BookingTabs.module.css';

interface BookingTabsProps {
  activeTab: 'new' | 'history';
  onTabChange: (tab: 'new' | 'history') => void;
}

export default function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <button 
          className={`${styles.tab} ${activeTab === 'new' ? styles.active : ''}`}
          onClick={() => onTabChange('new')}
        >
          NEW INQUIRY
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => onTabChange('history')}
        >
          MY HISTORY
        </button>
        <div className={`${styles.slider} ${activeTab === 'history' ? styles.slideRight : ''}`}></div>
      </div>
    </div>
  );
}
