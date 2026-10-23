import React, { useState } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../i18n';
import {
  Inbox,
  SlidersHorizontal,
  Scale,
  Send,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  FileCode2,
  Lock,
  ArrowRight,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

const PIPELINE_STEPS = [
  { label: 'Recepción', tag: 'Buzón / PWA / Web', icon: Inbox },
  { label: 'Triaje IA', tag: 'Extracción & Semáforo', icon: SlidersHorizontal },
  { label: 'Asiento PGC', tag: 'Partida doble sugerida', icon: Scale },
  { label: 'Enlace ERP', tag: 'A3, Sage, Contasol', icon: Send },
];

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datos' | 'asiento'>('datos');
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.ambientGlow} aria-hidden="true"></div>

      <div className="container">
        <div className={styles.grid}>
          {/* ── Left Column: Value Proposition & CTAs ── */}
          <div className={styles.copy}>
            {/* Pill Indicador de Beta Cerrada */}
            <div className={`hero-enter ${styles.pill}`}>
              <span className={styles.pillPulse} aria-hidden="true"></span>
              <span className={styles.pillText}>{t.hero.badge}</span>
              <span className={styles.pillBadge}>{t.hero.version}</span>
            </div>

            <h1 className={`hero-enter hero-enter--d1 ${styles.title}`}>
              {t.hero.titleStart}
              <span className={styles.titleHighlight}>{t.hero.titleHighlight}</span>
              {t.hero.titleEnd}
            </h1>

            <p className={`hero-enter hero-enter--d2 ${styles.sub}`}>
              {t.hero.subtitle}
            </p>

            {/* ── Demo Spotlight: Acceso a Beta & Contacto Directo ── */}
            <div className={`hero-enter hero-enter--d3 ${styles.demoSpotlight}`}>
              <div className={styles.spotlightHeader}>
                <span className={styles.spotlightBadge}>
                  <Sparkles size={13} className={styles.badgeSparkle} />
                  SESIÓN TÉCNICA 1 A 1 EN DIRECTO (20 MIN)
                </span>
                <span className={styles.spotlightTag}>Con las facturas de tu despacho</span>
              </div>

              <div className={styles.spotlightActionRow}>
                <a href="#demo" className={`btn btn--primary ${styles.spotlightMainBtn}`}>
                  <span className={styles.btnShimmer} aria-hidden="true"></span>
                  <span className={styles.spotlightBtnText}>{t.hero.ctaPrimary}</span>
                  <ArrowRight size={18} className={styles.btnArrow} />
                </a>

                <a
                  href="tel:+34686766266"
                  className={styles.spotlightPhoneBtn}
                  title="Contactar directamente con el equipo técnico de KontaPro"
                >
                  <div className={styles.phoneIconBox}>
                    <PhoneCall size={18} className={styles.phoneIcon} />
                  </div>
                  <div className={styles.phoneBtnTexts}>
                    <span className={styles.phoneBtnSub}>Soporte directo</span>
                    <strong className={styles.phoneBtnNum}>+34 686 766 266</strong>
                  </div>
                </a>
              </div>

              <div className={styles.spotlightPerks}>
                <span className={styles.perkItem}>
                  <CheckCircle2 size={14} className={styles.perkCheck} /> Sesión personalizada
                </span>
                <span className={styles.perkItem}>
                  <CheckCircle2 size={14} className={styles.perkCheck} /> Enlace con tu software contable
                </span>
                <span className={styles.perkItem}>
                  <CheckCircle2 size={14} className={styles.perkCheck} /> Sin compromiso
                </span>
              </div>
            </div>

            <div className={`hero-enter hero-enter--d4 ${styles.secondaryActions}`}>
              <a href="#showcase" className={styles.exploreLink}>
                <span>Explorar consola operativa y simulación interactiva</span>
                <ArrowDown size={15} />
              </a>
            </div>

            {/* Badges de Confianza y Cumplimiento Normativo (Sin afirmaciones no acreditadas) */}
            <div className={`hero-enter hero-enter--d4 ${styles.trustGrid}`}>
              <div className={styles.trustBadge}>
                <ShieldCheck size={16} className={styles.trustIcon} />
                <span>{t.hero.trust1}</span>
              </div>
              <div className={styles.trustBadge}>
                <FileCode2 size={16} className={styles.trustIcon} />
                <span>{t.hero.trust2}</span>
              </div>
              <div className={styles.trustBadge}>
                <FileCode2 size={16} className={styles.trustIcon} />
                <span>{t.hero.trust3}</span>
              </div>
              <div className={styles.trustBadge}>
                <Lock size={16} className={styles.trustIcon} />
                <span>{t.hero.trust4}</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive SaaS Preview Mockup ── */}
          <div className={`hero-enter hero-enter--d2 ${styles.visualContainer}`}>
            <div className={styles.window}>
              {/* Top macOS-style bar con etiqueta obligatoria de simulación */}
              <div className="mac-bar">
                <span className="mac-bar__dot mac-bar__dot--r"></span>
                <span className="mac-bar__dot mac-bar__dot--y"></span>
                <span className="mac-bar__dot mac-bar__dot--g"></span>
                <span className="mac-bar__title">KONTAPRO SUITE // GESTIÓN CONTABLE DESPACHO</span>
                
                {/* ETIQUETA OBLIGATORIA DE SIMULACIÓN */}
                <div className={styles.simulatedTag}>
                  DEMO · DATOS SIMULADOS
                </div>
              </div>

              {/* Pipeline Flow Bar */}
              <div className={styles.pipelineBar}>
                {PIPELINE_STEPS.map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx} className={styles.pipelineStep}>
                      <div className={styles.stepCircle}>
                        <IconComp size={15} />
                      </div>
                      <div className={styles.stepTexts}>
                        <span className={styles.stepLabel}>{s.label}</span>
                        <span className={styles.stepTag}>{s.tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Window Content */}
              <div className={styles.windowContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.tabs} role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'datos'}
                      className={`${styles.tabBtn} ${activeTab === 'datos' ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab('datos')}
                    >
                      Factura extraída (OCR/IA)
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'asiento'}
                      className={`${styles.tabBtn} ${activeTab === 'asiento' ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab('asiento')}
                    >
                      Propuesta de asiento PGC
                    </button>
                  </div>
                  <span className="badge badge--green">✓ Semáforo Verde (Fiabilidad 99.8%)</span>
                </div>

                {activeTab === 'datos' ? (
                  <div className={styles.dataCard}>
                    <div className={styles.providerRow}>
                      <div>
                        <span className={styles.providerLabel}>EMISOR / PROVEEDOR</span>
                        <span className={styles.providerName}>Suministros Industriales Ibérica S.L.</span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaChip}>CIF: <strong>B-84920183</strong></span>
                        <span className={styles.metaChip}>Fecha: <strong>14/05/2026</strong></span>
                        <span className={styles.metaChip}>Doc: <strong>FAC-2026-089</strong></span>
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
                      <div className={styles.suggestText}>
                        <span className={styles.suggestTitle}>Subcuenta PGC propuesta por histórico:</span>
                        <span className={styles.suggestAccount}>628.0001 — Suministros de energía y consumos</span>
                      </div>
                      <span className={styles.suggestMatch}>100% Coincidencia</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.asientoCard}>
                    <div className={styles.asientoTitle}>Borrador en Partida Doble (Cuadre verificado):</div>
                    <div className={styles.tableScrollWrapper}>
                      <table className={styles.asientoTable}>
                        <thead>
                          <tr>
                            <th>Subcuenta PGC</th>
                            <th>Descripción</th>
                            <th>Debe</th>
                            <th>Haber</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>628.0001</strong></td>
                            <td>Suministros de energía</td>
                            <td className={styles.amountCol}>1.250,00 €</td>
                            <td>—</td>
                          </tr>
                          <tr>
                            <td><strong>472.0021</strong></td>
                            <td>H.P. IVA Soportado (21%)</td>
                            <td className={styles.amountCol}>262,50 €</td>
                            <td>—</td>
                          </tr>
                          <tr>
                            <td><strong>410.0849</strong></td>
                            <td>Suministros Industriales Ibérica</td>
                            <td>—</td>
                            <td className={styles.amountTotalCol}>1.512,50 €</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.asientoFooter}>
                      <span className="badge badge--green">✓ Debe = Haber = 1.512,50 €</span>
                      <span className={styles.asientoSync}>Listo para exportar a A3 (SUENLACE) / Sage / Contasol</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Badges Flotantes de Verificación Técnica */}
            <div className={styles.floatBadge}>
              <div className={styles.floatBadgeIcon}>✓</div>
              <div>
                <div className={styles.floatBadgeTitle}>Lectura multimodal completada</div>
                <div className={styles.floatBadgeSub}>Validación matemática: 0 descuadres</div>
              </div>
            </div>

            <div className={styles.floatBadgeSecondary}>
              <div className={styles.floatBadgeDot}></div>
              <span>Sincronización ERP: Conexión simulada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
