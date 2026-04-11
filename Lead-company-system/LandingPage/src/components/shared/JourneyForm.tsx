'use client';
import React, { useState } from 'react';
import { Car, Package, ChevronDown, ArrowRight } from 'lucide-react';
import styles from './JourneyForm.module.css';

interface JourneyFormProps {
  source?: string;
}

export default function JourneyForm({ source = 'General Inquiry' }: JourneyFormProps) {
  const [productSelection, setProductSelection] = useState<'cars' | 'accessories'>('cars');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedModel: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interest: `Form ${productSelection.toUpperCase()}: ${formData.selectedModel}`,
      source: source
    };

    try {
      const response = await fetch('http://localhost:5000/api/public/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      
      if (response.ok) {
        alert('Enquiry submitted successfully!');
        setFormData({ name: '', email: '', phone: '', selectedModel: '' });
      } else {
        alert('Submission failed. Make sure the backend is running on port 5000.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error.');
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Begin Your Journey</h2>
        <p className={styles.subtitle}>
          Share your details with us and our precision team will reach out to curate your specific experience.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input 
              required 
              type="text" 
              name="name" 
              placeholder="FULL NAME" 
              className={styles.input} 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              required 
              type="email" 
              name="email" 
              placeholder="EMAIL ADDRESS" 
              className={styles.input} 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              required 
              type="tel" 
              name="phone" 
              placeholder="MOBILE NUMBER" 
              className={styles.input} 
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.productSelection}>
            <span className={styles.sectionLabel}>PRODUCT SELECTION</span>
            <div className={styles.toggleRow}>
              <button 
                type="button"
                className={`${styles.toggleItem} ${productSelection === 'cars' ? styles.activeToggle : ''}`}
                onClick={() => setProductSelection('cars')}
              >
                <Car size={18} />
                <span>CARS</span>
              </button>
              <button 
                type="button"
                className={`${styles.toggleItem} ${productSelection === 'accessories' ? styles.activeToggle : ''}`}
                onClick={() => setProductSelection('accessories')}
              >
                <Package size={18} />
                <span>ACCESSORIES</span>
              </button>
            </div>
          </div>

          <div className={styles.interestSection}>
            <span className={styles.sectionLabel}>SPECIFIC INTEREST</span>
            <div className={styles.selectWrapper}>
              <select 
                name="selectedModel" 
                className={styles.select}
                value={formData.selectedModel}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select a Model</option>
                <option value="Jimny">Jimny</option>
                <option value="Grand Vitara">Grand Vitara</option>
                <option value="Ciaz">Ciaz</option>
                <option value="Baleno">Baleno</option>
                <option value="Swift">Swift</option>
              </select>
              <ChevronDown size={18} className={styles.selectIcon} />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            CONFIRM ENQUIRY <ArrowRight size={18} />
          </button>
        </form>

        <p className={styles.privacyNote}>
          BY CLICKING CONFIRM, YOU AGREE TO OUR <a href="#">PRIVACY POLICY</a>
        </p>
      </div>
    </section>
  );
}
