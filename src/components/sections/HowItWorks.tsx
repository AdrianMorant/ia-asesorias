import React, { useState } from 'react';
import styles from './HowItWorks.module.css';
import { useLanguage } from '../../i18n';
import {
  Inbox,
  ScanText,
  CheckCircle2,
  Send,
  Scale,
  ArrowLeft,
  ArrowRight,
  Terminal,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    badge: 'Paso 01 — Captura',
    title: 'Recepción multicanal desatendida',
    desc: 'El sistema ingiere las facturas y tickets entrantes de forma continua sin que nadie tenga que descargarlas a mano.',
    icon: Inbox,
    details: [
      'Buzones de correo dedicados por empresa o despacho',
      'Sincronización de Google Drive, OneDrive o carpetas en red',
      'App móvil PWA para captura ágil de tickets y gastos en movilidad',
    ],
    consoleOutput: `[09:14:02] NUEVA ENTRADA DETECTADA EN KONTAPRO (DEMO)
• Canal: Buzón facturas@asesoria-demo.es
• Cliente: Grupo Metálicas del Norte S.L.
• Archivo: Factura_Proveedor_2026_05.pdf (1.4 MB)
• Hash SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
• Estado: Documento indexado y en cola de triaje.`,
  },
  {
    num: '02',
    badge: 'Paso 02 — Extracción',
    title: 'Lectura multimodal & Semáforo Fiscal',
    desc: 'Modelos avanzados de visión y lenguaje leen la estructura completa del documento sin depender de plantillas rígidas.',
    icon: ScanText,
    details: [
      'Extracción de Proveedor, CIF/NIF, fecha de devengo y número de factura',
      'Desglose en tablas de múltiples tipos de IVA (4%, 10%, 21%) y recargos',
      'Detección de retenciones de IRPF profesional y conceptos facturados',
    ],
    consoleOutput: `[09:14:04] EXTRACCIÓN MULTIMODAL VERIFICADA (DEMO)
• Emisor: "Distribuciones Comerciales S.A." (A-28491029)
• N.º Factura: D-2026/894 | Fecha: 12/05/2026
• Base 21%: 800,00 € (IVA: 168,00 €)
• Base 10%: 350,00 € (IVA: 35,00 €)
• Total Factura: 1.353,00 €
• Semáforo Fiscal: VERDE (Fiabilidad 99.7%)`,
  },
  {
    num: '03',
    badge: 'Paso 03 — Validación',
    title: 'Comprobación aritmética y anti-duplicados',
    desc: 'Auditoría automática de cada cifra para garantizar que ningún descuadre o duplicado llegue a la contabilidad.',
    icon: CheckCircle2,
    details: [
      'Verificación matemática: Bases + Cuotas IVA - IRPF = Total al céntimo',
      'Comprobación de formato fiscal de NIF español',
      'Búsqueda de duplicados en el histórico de facturas del cliente',
    ],
    consoleOutput: `[09:14:05] CONTROL DE INTEGRIDAD & TRAZABILIDAD (DEMO)
✓ Cuadre matemático: 800 + 168 + 350 + 35 = 1.353,00 € (Exacto)
✓ Algoritmo NIF: Formato válido verificado
✓ Chequeo anti-duplicados: 0 coincidencias en histórico
✓ Registro trazable: Preparado para encadenamiento Veri*factu`,
  },
  {
    num: '04',
    badge: 'Paso 04 — Asiento',
    title: 'Asiento contable directo en tu ERP',
    desc: 'El apunte contable queda preparado para exportarse a tu software habitual sin picar datos.',
    icon: Send,
    details: [
      'Propuesta de subcuenta del PGC según histórico contable del cliente',
      'Generación de ficheros de intercambio nativos (SUENLACE para A3, CSV para Contasol)',
      'PDF original vinculado al registro para auditorías fiscales',
    ],
    consoleOutput: `[09:14:07] GENERACIÓN DEL ASIENTO CONTABLE (DEMO)
• Subcuenta Debe: (600.0001) Compras de mercaderías (1.150,00 €)
• Subcuenta Debe: (472.0000) H.P. IVA Soportado (203,00 €)
• Subcuenta Haber: (400.0284) Proveedor habitual (1.353,00 €)
✓ Asiento estructurado para A3 (SUENLACE.DAT) / Sage / Contasol con PDF vinculado.`,
  },
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="como-funciona">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">{t.workflow.badge}</span>
          <h2 className={styles.title}>{t.workflow.title}</h2>
          <p className={styles.subtitle}>{t.workflow.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {/* Left: Step Cards */}
          <div className={styles.stepsCol}>
            {STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
              const IconComp = s.icon;
              return (
                <div
                  key={s.num}
                  className={`${styles.stepCard} ${isActive ? styles.stepCardActive : ''}`}
                  onClick={() => setActiveStep(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveStep(idx)}
                >
                  <div className={styles.stepNumCol}>
                    <div className={styles.iconCircle}>
                      <IconComp size={18} />
                    </div>
                    <span className={styles.stepNum}>{s.num}</span>
                  </div>
                  <div className={styles.stepBody}>
                    <span className={styles.stepBadge}>{s.badge}</span>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepDesc}>{s.desc}</p>
                    {isActive && (
                      <ul className={styles.stepDetails}>
                        {s.details.map((d, dIdx) => (
                          <li key={dIdx}>✓ {d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Execution Console */}
          <div className={styles.consoleCol}>
            <div className={styles.consoleCard}>
              <div className="mac-bar">
                <span className="mac-bar__dot mac-bar__dot--r"></span>
                <span className="mac-bar__dot mac-bar__dot--y"></span>
                <span className="mac-bar__dot mac-bar__dot--g"></span>
                <span className="mac-bar__title">Consola de auditoría — {STEPS[activeStep].badge}</span>
                <span className={styles.simBadge}>DEMO · DATOS SIMULADOS</span>
              </div>

              <div className={styles.consoleBody}>
                <div className={styles.consoleHeader}>
                  <div className={styles.consoleLiveBadge}>
                    <Terminal size={14} className={styles.termIcon} />
                    <span>Monitor de proceso demostrativo</span>
                  </div>
                  <span className={styles.pulseActive}>● Simulación activa</span>
                </div>

                <div className={styles.codeBox}>
                  <pre>{STEPS[activeStep].consoleOutput}</pre>
                </div>

                <div className={styles.navRow}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    aria-label="Paso anterior"
                  >
                    <ArrowLeft size={14} /> Anterior
                  </button>
                  <span className={styles.navTracker}>
                    Paso {activeStep + 1} de {STEPS.length}
                  </span>
                  <button
                    type="button"
                    className={styles.navBtn}
                    disabled={activeStep === STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                    aria-label="Paso siguiente"
                  >
                    Siguiente <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Criterio y Supervisión Humana */}
        <div className={styles.featuredNote}>
          <div className={styles.noteIcon} aria-hidden="true">
            <Scale size={24} className={styles.noteIconSvg} />
          </div>
          <div className={styles.noteText}>
            <strong>Criterio profesional y control del despacho:</strong>
            <p>
              “La inteligencia artificial de KontaPro no sustituye el criterio contable de tu equipo; elimina el trabajo mecánico de transcripción para que los contables supervisen con rigor solo las excepciones que lo merecen.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
