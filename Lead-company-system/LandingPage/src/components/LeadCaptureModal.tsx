'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './LeadCaptureModal.module.css';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceInfo?: string;
}

export default function LeadCaptureModal({ isOpen, onClose, serviceInfo = '' }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: serviceInfo || 'General Inquiry'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(prev => ({ ...prev, inquiryType: serviceInfo || 'General Inquiry' }));
      setSubmitStatus('idle');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, serviceInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // ✅ Using the Public Route for Landing Page captures
      const response = await fetch('http://localhost:5000/api/public/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          interest: formData.inquiryType,
          source: 'Landing Page Modal'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className={styles.title}>Connect With Us</h2>
        <p className={styles.subtitle}>
          Please provide your details for <strong>{serviceInfo}</strong>. Our team will get back to you shortly.
        </p>

        {submitStatus === 'success' ? (
          <div className={styles.successMessage}>
            Thank you! Your information has been securely sent to our team.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 99999 99999" pattern="[0-9]{10}" title="Ten digit mobile number" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="inquiryType">Inquiry Type</label>
              <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Explore Excellence">Explore Excellence</option>
                <option value="Book Trial">Book Trial</option>
                <option value="Book Service">Book Service</option>
                <option value="Corporate Inquiry">Corporate Inquiry</option>
                <option value="Finance Inquiry">Finance Inquiry</option>
              </select>
            </div>

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>Failed to submit! Make sure the backend CRM is running on port 5000.</div>
            )}

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Details'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
