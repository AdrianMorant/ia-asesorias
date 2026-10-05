import React, { useState } from 'react';
import styles from './Hero.module.css';

const PIPELINE_STEPS = [
  { label: 'Factura recibida', tag: 'Email / Cloud', icon: '📥' },
  { label: 'Análisis IA', tag: 'Extracción multimodal', icon: '⚡' },
  { label: 'Validación aritmética', tag: 'Base + IVA = Total', icon: '⚖️' },
  { label: 'Asiento propuesto', tag: 'Subcuenta PGC', icon: '💡' },
  { label: 'Exportación / Integración', tag: 'Software contable', icon: '🚀' },
];

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datos' | 'asiento'>('datos');

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>

          {/* ── Left: Copy & CTAs ── */}
          <div className={styles.copy}>
            <div className={`hero-enter ${styles.pill}`}>
              <span className={styles.pillDot}></span>
              Automatización inteligente para asesorías
            </div>

            <h1 className={`hero-enter hero-enter--d1 ${styles.title}`}>
              Automatiza el trabajo contable que todavía haces a mano.
            </h1>

            <p className={`hero-enter hero-enter--d2 ${styles.sub}`}>
              Integramos Inteligencia Artificial y flujos automáticos en el software de tu asesoría para extraer facturas, cuadrar importes y sugerir asientos contables sin cambiar tu forma de trabajar.
            </p>

            <div className={`hero-enter hero-enter--d3 ${styles.ctas}`}>
              <a href="#contacto" className="btn btn--primary">
                Solicitar demostración
              </a>
              <a href="#como-funciona" className="btn btn--ghost">
                Ver cómo funciona
              </a>
            </div>

            {/* Badges de confianza bajo los CTAs */}
            <div className={`hero-enter hero-enter--d4 ${styles.trustBadges}`}>
              <div className={styles.trustBadge}>
                <span className={styles.trustIcon}>🛡️</span>
                <span>100% Adaptado a normativa RGPD</span>
              </div>
              <div className={styles.trustBadge}>
                <span className={styles.trustIcon}>🔒</span>
                <span>Tus datos nunca entrenan modelos públicos</span>
              </div>
              <div className={styles.trustBadge}>
                <span className={styles.trustIcon}>🔌</span>
                <span>Compatible con A3, Sage, Contasol y Holded</span>
              </div>
            </div>
          </div>

          {/* ── Right: SaaS Financial Visual Mockup ── */}
          <div className={`hero-enter hero-enter--d2 ${styles.visual}`}>
            <div className={styles.window}>
              {/* Window Header */}
              <div className="mac-bar">
                <span className="mac-bar__dot mac-bar__dot--r"></span>
                <span className="mac-bar__dot mac-bar__dot--y"></span>
                <span className="mac-bar__dot mac-bar__dot--g"></span>
                <span className="mac-bar__title">Pipeline de Facturación Inteligente — Asesoría Pro</span>
              </div>

              {/* Pipeline Flow Bar */}
              <div className={styles.pipelineBar}>
                {PIPELINE_STEPS.map((s, idx) => (
                  <div key={idx} className={styles.pipelineStep}>
                    <div className={styles.stepCircle}>
                      <span>{s.icon}</span>
                    </div>
                    <div className={styles.stepTexts}>
                      <span className={styles.stepLabel}>{s.label}</span>
                      <span className={styles.stepTag}>{s.tag}</span>
                    </div>
                    {idx < PIPELINE_STEPS.length - 1 && (
                      <span className={styles.stepArrow}>➔</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Card Demo Content */}
              <div className={styles.windowContent}>
                {/* Tabs for switching preview */}
                <div className={styles.cardHeader}>
                  <div className={styles.tabs}>
                    <button
                      className={`${styles.tabBtn} ${activeTab === 'datos' ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab('datos')}
                    >
                      Factura extraída
                    </button>
                    <button
                      className={`${styles.tabBtn} ${activeTab === 'asiento' ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab('asiento')}
                    >
                      Propuesta de asiento contable
                    </button>
                  </div>
                  <span className="badge badge--green">✓ Validado (Confianza 99.4%)</span>
                </div>

                {activeTab === 'datos' ? (
                  <div className={styles.dataCard}>
                    <div className={styles.providerRow}>
                      <div className={styles.providerInfo}>
                        <span className={styles.providerLabel}>Proveedor / Emisor</span>
                        <span className={styles.providerName}>Suministros Industriales Ibérica S.L.</span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaChip}>CIF: <strong>B-84920183</strong></span>
                        <span className={styles.metaChip}>Fecha: <strong>14/05/2026</strong></span>
                        <span className={styles.metaChip}>Factura: <strong>FAC-2026-089</strong></span>
                      </div>
                    </div>

                    <div className={styles.financeGrid}>
                      <div className={styles.financeItem}>
                        <span className={styles.financeLabel}>Base Imponible</span>
                        <span className={styles.financeVal}>1.250,00 €</span>
                      </div>
                      <div className={styles.financeItem}>
                        <span className={styles.financeLabel}>IVA (21%)</span>
                        <span className={styles.financeVal}>262,50 €</span>
                      </div>
                      <div className={styles.financeItem}>
                        <span className={styles.financeLabel}>Retención IRPF</span>
                        <span className={styles.financeVal}>0,00 €</span>
                      </div>
                      <div className={`${styles.financeItem} ${styles.financeTotal}`}>
                        <span className={styles.financeLabel}>Total Factura</span>
                        <span className={styles.financeTotalVal}>1.512,50 €</span>
                      </div>
                    </div>

                    <div className={styles.accountSuggestion}>
                      <div className={styles.suggestIcon}>💡</div>
                      <div className={styles.suggestText}>
                        <span className={styles.suggestTitle}>Cuenta sugerida según histórico del cliente:</span>
                        <span className={styles.suggestAccount}>628.0001 (Suministros de energía)</span>
                      </div>
                      <span className={styles.suggestMatch}>Coincidencia 100%</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.asientoCard}>
                    <div className={styles.asientoTitle}>Borrador de Asiento en Partida Doble:</div>
                    <table className={styles.asientoTable}>
                      <thead>
                        <tr>
                          <th>Cuenta PGC</th>
                          <th>Descripción</th>
                          <th>Debe</th>
                          <th>Haber</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>628.0001</strong></td>
                          <td>Suministros de energía</td>
                          <td>1.250,00 €</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <td><strong>472.0021</strong></td>
                          <td>H.P. IVA Soportado (21%)</td>
                          <td>262,50 €</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <td><strong>410.0849</strong></td>
                          <td>Suministros Industriales Ibérica</td>
                          <td>—</td>
                          <td><strong>1.512,50 €</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={styles.asientoFooter}>
                      <span className="badge badge--green">✓ Cuadre exacto (Debe = Haber = 1.512,50 €)</span>
                      <span className={styles.asientoSync}>Listo para exportar a Holded / A3 / Sage / Contasol</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating verification badge */}
            <div className={styles.floatBadge}>
              <span className={styles.floatBadgeIcon}>⚡</span>
              <div>
                <div className={styles.floatBadgeTitle}>Lectura multimodal completada</div>
                <div className={styles.floatBadgeSub}>Validación matemática: 0 descuadres</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
