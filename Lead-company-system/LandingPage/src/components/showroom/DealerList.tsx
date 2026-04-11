import React from 'react';
import DealerCard from './DealerCard';
import styles from './DealerList.module.css';

const DEALERS = [
  {
    type: 'NEXA',
    name: 'Prem Motors',
    address: 'Okhla Industrial Estate, Phase III, New Delhi',
    distance: '0.8 km',
    status: 'Open Now',
    hours: '09:00 - 20:00'
  } as const,
  {
    type: 'ARENA',
    name: 'Rohan Motors',
    address: 'Mathura Road, Badarpur, New Delhi',
    distance: '2.4 km',
    status: 'Open Now',
    hours: '10:00 - 19:30'
  } as const,
  {
    type: 'COMMERCIAL',
    name: 'Competent Automobiles',
    address: 'Lajpat Nagar II, Central Market, New Delhi',
    distance: '3.9 km',
    status: 'Open Now',
    hours: '09:30 - 20:30'
  } as const
];

export default function DealerList() {
  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {DEALERS.map((dealer, index) => (
          <DealerCard key={index} {...dealer} />
        ))}
      </div>
    </section>
  );
}
