import React, { useState } from 'react';
import styles from './RoiCalculator.module.css';

const RoiCalculator: React.FC = () => {
  const [invoices, setInvoices] = useState(1200);
  const [minutesPerInvoice, setMinutesPerInvoice] = useState(3.5);
  const [hourlyRate, setHourlyRate] = useState(24);

  // Cálculos
  const totalHoursManual = Math.round((invoices * minutesPerInvoice) / 60);
  const hoursSaved = Math.round(totalHoursManual * 0.82); // 82% de ahorro realista
  const daysSaved = Math.round((hoursSaved / 8) * 10) / 10;
  const monthlySavings = Math.round(hoursSaved * hourlyRate);
  const annualSavings = monthlySavings * 12;

  return (
    <section className={styles.section} id="calculadora">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Simulador de Rentabilidad</span>
          <h2 className={styles.title}>Calcula cuánto tiempo y dinero pierde tu despacho al mes</h2>
          <p className={styles.subtitle}>
            Ajusta los parámetros según el volumen de facturas de tu asesoría y comprueba el impacto inmediato de automatizar.
          </p>
        </div>

        <div className={styles.card}>
          {/* Sliders col */}
          <div className={styles.slidersCol}>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <label htmlFor="invoices-input" className={styles.sliderLabel}>Facturas gestionadas al mes:</label>
                <span className={styles.sliderValue}>{invoices.toLocaleString()} facturas</span>
              </div>
              <input
                id="invoices-input"
                type="range"
                min="200"
                max="8000"
                step="100"
                value={invoices}
                onChange={(e) => setInvoices(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeTicks}>
                <span>200</span>
                <span>4.000</span>
                <span>8.000+</span>
              </div>
            </div>

            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <label htmlFor="minutes-input" className={styles.sliderLabel}>Tiempo medio por factura (manual):</label>
                <span className={styles.sliderValue}>{minutesPerInvoice} min / factura</span>
              </div>
              <input
                id="minutes-input"
                type="range"
                min="1.5"
                max="6"
                step="0.5"
                value={minutesPerInvoice}
                onChange={(e) => setMinutesPerInvoice(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeTicks}>
                <span>1.5 min (fácil)</span>
                <span>3.5 min (típico)</span>
                <span>6 min (complejo)</span>
              </div>
            </div>

            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <label htmlFor="rate-input" className={styles.sliderLabel}>Coste medio por hora contable:</label>
                <span className={styles.sliderValue}>{hourlyRate} € / hora</span>
              </div>
              <input
                id="rate-input"
                type="range"
                min="16"
                max="45"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeTicks}>
                <span>16 €/h</span>
                <span>28 €/h</span>
                <span>45 €/h</span>
              </div>
            </div>
          </div>

          {/* Results col */}
          <div className={styles.resultsCol}>
            <div className={styles.resultsTitle}>Impacto estimado en tu despacho</div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Horas ahorradas al mes</span>
                <span className={styles.metricBig}>{hoursSaved} h</span>
                <span className={styles.metricSub}>De {totalHoursManual}h de picado manual</span>
              </div>

              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Jornadas laborales liberadas</span>
                <span className={styles.metricBig}>{daysSaved} días</span>
                <span className={styles.metricSub}>Tiempo recuperado para asesorar</span>
              </div>
            </div>

            <div className={styles.savingsBox}>
              <div className={styles.savingsLabel}>Ahorro estimado anual en costes de gestión:</div>
              <div className={styles.savingsValue}>{annualSavings.toLocaleString()} € / año</div>
              <div className={styles.savingsNote}>Equivale a unos {monthlySavings.toLocaleString()} € cada mes</div>
            </div>

            <a href="#contacto" className="btn btn--primary" style={{ width: '100%', textAlign: 'center' }}>
              Solicitar estudio para mi despacho →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
