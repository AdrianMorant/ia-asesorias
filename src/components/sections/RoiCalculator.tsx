import React, { useState } from 'react';
import styles from './RoiCalculator.module.css';
import { useLanguage } from '../../i18n';
import { FileText, Clock, Coins, ArrowRight, Info } from 'lucide-react';

const PRESETS = [
  { label: 'Despacho Pequeño', invoices: 200, time: 2.5, rate: 20 },
  { label: 'Despacho Medio', invoices: 1200, time: 3.5, rate: 24 },
  { label: 'Gran Asesoría', invoices: 4000, time: 4.0, rate: 28 },
  { label: 'Corporativo', invoices: 8000, time: 4.5, rate: 32 },
];

const RoiCalculator: React.FC = () => {
  const [invoices, setInvoices] = useState(1200);
  const [minutesPerInvoice, setMinutesPerInvoice] = useState(3.5);
  const [hourlyRate, setHourlyRate] = useState(24);
  const { t } = useLanguage();

  // Cálculos matemáticos transparentes y coherentes con los datos de referencia
  const totalHoursManual = Math.round((invoices * minutesPerInvoice) / 60);
  // Relación de referencia: 70h manuales -> 57h recuperables (~82% de tiempo recuperable)
  const hoursSaved = Math.round(totalHoursManual * (57 / 70));
  const daysSaved = Math.round((hoursSaved / 8) * 10) / 10;
  const monthlySavings = Math.round(hoursSaved * hourlyRate);
  const annualSavings = monthlySavings * 12;

  const invoicesPct = ((invoices - 200) / (8000 - 200)) * 100;
  const minutesPct = ((minutesPerInvoice - 1.5) / (6 - 1.5)) * 100;
  const ratePct = ((hourlyRate - 16) / (45 - 16)) * 100;

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setInvoices(preset.invoices);
    setMinutesPerInvoice(preset.time);
    setHourlyRate(preset.rate);
  };

  return (
    <section className={styles.section} id="calculadora">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">{t.calculator.badge}</span>
          <h2 className={styles.title}>
            Calcula cuánto tiempo y dinero ahorra{' '}
            <span className={styles.titleHighlight}>tu despacho al mes</span>
          </h2>
          <p className={styles.subtitle}>{t.calculator.subtitle}</p>

          {/* Quick Preset Selector Buttons */}
          <div className={styles.presetRow}>
            <span className={styles.presetLabel}>Configuración rápida:</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.presetBtn} ${invoices === p.invoices ? styles.presetBtnActive : ''}`}
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cockpit Card */}
        <div className={styles.cockpitCard}>
          <div className="mac-bar">
            <span className="mac-bar__dot mac-bar__dot--r"></span>
            <span className="mac-bar__dot mac-bar__dot--y"></span>
            <span className="mac-bar__dot mac-bar__dot--g"></span>
            <span className="mac-bar__title">KONTAPRO SUITE // SIMULADOR DE IMPACTO OPERATIVO</span>
            
            <div className={styles.simBadge}>
              SIMULACIÓN ORIENTATIVA · DATOS ESTIMADOS
            </div>
          </div>

          <div className={styles.cockpitGrid}>
            {/* Sliders Column */}
            <div className={styles.slidersCol}>
              <div className={styles.slidersHeader}>
                <span className={styles.sectionPill}>Parámetros de tu despacho</span>
                <span className={styles.sectionHint}>Ajusta los parámetros para calibrar tus estimaciones</span>
              </div>

              {/* Slider 1: Invoices */}
              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabelRow}>
                  <div className={styles.labelWithIcon}>
                    <div className={styles.sliderIconBox}>
                      <FileText size={16} />
                    </div>
                    <label htmlFor="invoices-input" className={styles.sliderLabel}>
                      Facturas gestionadas al mes:
                    </label>
                  </div>
                  <div className={styles.sliderValueBox}>
                    <span className={styles.sliderValue}>{invoices.toLocaleString()}</span>
                    <span className={styles.sliderUnit}>doc / mes</span>
                  </div>
                </div>
                <div className={styles.rangeWrapper}>
                  <input
                    id="invoices-input"
                    type="range"
                    min="200"
                    max="8000"
                    step="100"
                    value={invoices}
                    onChange={(e) => setInvoices(Number(e.target.value))}
                    className={styles.rangeInput}
                    style={{
                      background: `linear-gradient(to right, #0A78FC 0%, #0A78FC ${invoicesPct}%, #E2E8F0 ${invoicesPct}%, #E2E8F0 100%)`,
                    }}
                  />
                </div>
                <div className={styles.rangeTicks}>
                  <span>200 facturas</span>
                  <span>4.000 habitual</span>
                  <span>8.000+ gran volumen</span>
                </div>
              </div>

              {/* Slider 2: Time per invoice */}
              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabelRow}>
                  <div className={styles.labelWithIcon}>
                    <div className={styles.sliderIconBox}>
                      <Clock size={16} />
                    </div>
                    <label htmlFor="minutes-input" className={styles.sliderLabel}>
                      Tiempo medio por factura (manual):
                    </label>
                  </div>
                  <div className={styles.sliderValueBox}>
                    <span className={styles.sliderValue}>{minutesPerInvoice}</span>
                    <span className={styles.sliderUnit}>min / doc</span>
                  </div>
                </div>
                <div className={styles.rangeWrapper}>
                  <input
                    id="minutes-input"
                    type="range"
                    min="1.5"
                    max="6"
                    step="0.5"
                    value={minutesPerInvoice}
                    onChange={(e) => setMinutesPerInvoice(Number(e.target.value))}
                    className={styles.rangeInput}
                    style={{
                      background: `linear-gradient(to right, #0A78FC 0%, #0A78FC ${minutesPct}%, #E2E8F0 ${minutesPct}%, #E2E8F0 100%)`,
                    }}
                  />
                </div>
                <div className={styles.rangeTicks}>
                  <span>1.5 min (simple)</span>
                  <span>3.5 min (estándar)</span>
                  <span>6 min (complejo)</span>
                </div>
              </div>

              {/* Slider 3: Hourly rate */}
              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabelRow}>
                  <div className={styles.labelWithIcon}>
                    <div className={styles.sliderIconBox}>
                      <Coins size={16} />
                    </div>
                    <label htmlFor="rate-input" className={styles.sliderLabel}>
                      Coste medio por hora contable:
                    </label>
                  </div>
                  <div className={styles.sliderValueBox}>
                    <span className={styles.sliderValue}>{hourlyRate}</span>
                    <span className={styles.sliderUnit}>€ / hora</span>
                  </div>
                </div>
                <div className={styles.rangeWrapper}>
                  <input
                    id="rate-input"
                    type="range"
                    min="16"
                    max="45"
                    step="1"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className={styles.rangeInput}
                    style={{
                      background: `linear-gradient(to right, #0A78FC 0%, #0A78FC ${ratePct}%, #E2E8F0 ${ratePct}%, #E2E8F0 100%)`,
                    }}
                  />
                </div>
                <div className={styles.rangeTicks}>
                  <span>16 €/h</span>
                  <span>24 €/h (sector medio)</span>
                  <span>45 €/h</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className={styles.resultsCol}>
              <div className={styles.resultsHeader}>
                <div className={styles.efficiencyBadge}>
                  <div className={styles.efficiencyDot}></div>
                  <span>~82 % de tiempo recuperable</span>
                </div>
                <span className={styles.resultsSubtitle}>Impacto proyectado</span>
              </div>

              {/* Metric Cards */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricTop}>
                    <span className={styles.metricLabel}>{t.calculator.hoursSavedMonth}</span>
                    <span className={styles.metricBadge}>-82%</span>
                  </div>
                  <div className={styles.metricBigWrapper}>
                    <span className={styles.metricBig}>{hoursSaved}</span>
                    <span className={styles.metricBigUnit}>horas</span>
                  </div>
                  <div className={styles.metricProgressBar}>
                    <div
                      className={styles.metricProgressFill}
                      style={{ width: `${Math.min(100, (hoursSaved / (totalHoursManual || 1)) * 100)}%` }}
                    ></div>
                  </div>
                  <span className={styles.metricSub}>
                    De <strong>{totalHoursManual} h</strong> de trabajo manual mensual estimado
                  </span>
                </div>

                <div className={styles.metricCard}>
                  <div className={styles.metricTop}>
                    <span className={styles.metricLabel}>Jornadas devueltas</span>
                    <span className={styles.metricBadgeEmerald}>Tiempo neto</span>
                  </div>
                  <div className={styles.metricBigWrapper}>
                    <span className={`${styles.metricBig} ${styles.metricBigEmerald}`}>{daysSaved}</span>
                    <span className={styles.metricBigUnit}>días</span>
                  </div>
                  <div className={styles.metricProgressBar}>
                    <div
                      className={styles.metricProgressFillEmerald}
                      style={{ width: `${Math.min(100, (daysSaved / 22) * 100)}%` }}
                    ></div>
                  </div>
                  <span className={styles.metricSub}>
                    Tiempo potencialmente disponible para asesoramiento fiscal y captación
                  </span>
                </div>
              </div>

              {/* Main Annual Savings Showcase */}
              <div className={styles.savingsBox}>
                <div className={styles.savingsTopRow}>
                  <span className={styles.savingsLabel}>Ahorro económico anual estimado</span>
                  <span className={styles.verifiedTag}>ESTIMACIÓN</span>
                </div>
                <div className={styles.savingsValue}>
                  {annualSavings.toLocaleString()} <span className={styles.savingsCurrency}>€ / año</span>
                </div>
                <div className={styles.savingsNote}>
                  Equivale a unos <strong className={styles.savingsMonthAmount}>{monthlySavings.toLocaleString()} €</strong> en horas recuperadas al mes
                </div>
              </div>

              {/* Call to action */}
              <a href="https://www.kontaprosuite.com/#demo" className={`btn btn--primary ${styles.submitBtn}`}>
                <span>{t.calculator.cta}</span>
                <ArrowRight size={16} className={styles.btnArrow} />
              </a>

              <div className={styles.disclaimerNote}>
                <Info size={13} className={styles.discIcon} />
                <span>Cálculo ilustrativo basado en parámetros medios del sector. Los resultados varían según la complejidad documental de cada cartera.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
