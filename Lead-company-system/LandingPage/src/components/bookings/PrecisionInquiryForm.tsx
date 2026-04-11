'use client';
import React, { useState } from 'react';
import { Car, User, MapPin, Search, Store } from 'lucide-react';
import styles from './PrecisionInquiryForm.module.css';

export default function PrecisionInquiryForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('ciaz');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locationQuery: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure phone is exactly 10 digits for the backend validation
    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    
    const leadPayload = {
      name: formData.name,
      email: formData.email,
      phone: cleanPhone,
      interest: `Inquiry: ${selectedVehicle.toUpperCase()}`,
      locationData: formData.locationQuery,
      source: 'Bookings Page'
    };

    try {
      const response = await fetch('http://localhost:5000/api/public/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      
      if (response.ok) {
        alert('Thank you! Your precision inquiry has been submitted.');
        setFormData({ name: '', phone: '', email: '', locationQuery: '' });
      } else {
        alert('Error submitting inquiry. Make sure the backend is running on port 5000.');
      }
    } catch (error) {
      console.error('Lead submission failed:', error);
      alert('Network error. Check if the Node server is running.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Precision Inquiry</h1>
        <p className={styles.pageSubtitle}>
          Begin your journey toward owning a masterpiece of engineering. Complete the details below to receive a personalized quote and showroom consultation.
        </p>
      </div>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${activeStep >= 1 ? styles.activeStep : ''}`}>
          <span className={styles.stepLabel}>STEP 01</span>
          <span className={styles.stepName}>Select Model</span>
        </div>
        <div className={`${styles.step} ${activeStep >= 2 ? styles.activeStep : ''}`}>
          <span className={styles.stepLabel}>STEP 02</span>
          <span className={styles.stepName}>Details</span>
        </div>
        <div className={`${styles.step} ${activeStep >= 3 ? styles.activeStep : ''}`}>
          <span className={styles.stepLabel}>STEP 03</span>
          <span className={styles.stepName}>Location</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formArea}>
        
        {/* Step 1: Vehicle Selection */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Car size={18} className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Choose Your Vessel</h3>
          </div>
          
          <div className={styles.vehicleGrid}>
            <div 
              className={`${styles.vehicleCard} ${selectedVehicle === 'ciaz' ? styles.activeVehicle : ''}`}
              onClick={() => { setSelectedVehicle('ciaz'); setActiveStep(Math.max(activeStep, 2)); }}
            >
              <div className={styles.vehicleImageContainer}>
                 <img src="/hero_car_bg.png" alt="Ciaz Placeholder" className={styles.vehicleImage} style={{ filter: 'grayscale(0.5)' }} />
              </div>
              <div className={styles.vehicleInfo}>
                <span className={styles.vehicleType}>PREMIUM SEDAN</span>
                <span className={styles.vehicleName}>Ciaz</span>
              </div>
            </div>

            <div 
              className={`${styles.vehicleCard} ${selectedVehicle === 'grand_vitara' ? styles.activeVehicle : ''}`}
              onClick={() => { setSelectedVehicle('grand_vitara'); setActiveStep(Math.max(activeStep, 2)); }}
            >
              <div className={styles.vehicleImageContainer}>
                 <img src="/media__1775211163306.png" alt="Grand Vitara Placeholder" className={styles.vehicleImage} style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.vehicleInfo}>
                <span className={styles.vehicleType}>DYNAMIC SUV</span>
                <span className={styles.vehicleName}>Grand Vitara</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Personal Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <User size={18} className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Personal Information</h3>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>FULL NAME</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g. John Doe" 
              className={styles.inputField} 
              value={formData.name}
              onChange={(e) => { handleInputChange(e); setActiveStep(3); }}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>PHONE NUMBER</label>
            <input 
              type="tel" 
              name="phone"
              placeholder="+91 00000 00000" 
              className={styles.inputField} 
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              name="email"
              placeholder="john.doe@example.com" 
              className={styles.inputField} 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Step 3: Dealer Selection */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <MapPin size={18} className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Preferred Dealer</h3>
          </div>

          <div className={styles.mapContainer}>
             {/* Fake map background */}
            <div className={styles.mapPlaceholder}></div>
            <div className={styles.searchOverlay}>
              <Search size={16} className={styles.searchIcon} />
              <input 
                type="text" 
                name="locationQuery"
                placeholder="Enter city or pincode"
                className={styles.searchInput}
                value={formData.locationQuery}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.dealerCard}>
            <Store size={18} className={styles.dealerIcon} />
            <div className={styles.dealerInfo}>
              <span className={styles.dealerName}>Maruti Suzuki NEXA, South Ext.</span>
              <span className={styles.dealerAddr}>E-12, Part II, Ring Rd, New Delhi</span>
            </div>
            <div className={styles.radioSelected}>
              <div className={styles.radioInner}></div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          SUBMIT INQUIRY <span>&rarr;</span>
        </button>
      </form>
    </div>
  );
}
