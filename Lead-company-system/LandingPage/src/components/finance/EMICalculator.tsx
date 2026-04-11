import React, { useState, useEffect } from 'react';
import { VEHICLES } from '../../data/vehicles';
import styles from './EMICalculator.module.css';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount - downPayment;
    const ratePerMonth = interestRate / (12 * 100);
    const months = tenure * 12;
    
    if (principal <= 0) return 0;
    
    const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
    return Math.round(emiValue);
  };

  useEffect(() => {
    setEmi(calculateEMI());
  }, [loanAmount, downPayment, interestRate, tenure]);

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - (loanAmount - downPayment);

  return (
    <section className={styles.container}>
      <div className={styles.calculatorCard}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label>Loan Amount (₹)</label>
            <input 
              type="range" 
              min="100000" max="5000000" step="10000"
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))} 
            />
            <div className={styles.valueDisplay}>₹ {loanAmount.toLocaleString()}</div>
          </div>

          <div className={styles.inputGroup}>
            <label>Down Payment (₹)</label>
            <input 
              type="range" 
              min="0" max={loanAmount * 0.8} step="10000"
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))} 
            />
            <div className={styles.valueDisplay}>₹ {downPayment.toLocaleString()}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))} 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Tenure (Years)</label>
              <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7].map(y => <option key={y} value={y}>{y} Years</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.emiDisplay}>
            <span className={styles.emiLabel}>MONTHLY EMI</span>
            <span className={styles.emiValue}>₹ {emi.toLocaleString()}</span>
          </div>

          <div className={styles.stats}>
             <div className={styles.statItem}>
               <span className={styles.statLabel}>Principal Amount</span>
               <span className={styles.statValue}>₹ {(loanAmount - downPayment).toLocaleString()}</span>
             </div>
             <div className={styles.statItem}>
               <span className={styles.statLabel}>Total Interest</span>
               <span className={styles.statValue}>₹ {totalInterest > 0 ? totalInterest.toLocaleString() : 0}</span>
             </div>
             <div className={styles.statItem}>
               <span className={styles.statLabel}>Total Payment</span>
               <span className={styles.statValue}>₹ {totalPayment > 0 ? totalPayment.toLocaleString() : 0}</span>
             </div>
          </div>

          <button className={styles.applyBtn}>APPLY FOR FINANCE</button>
        </div>
      </div>
    </section>
  );
}
