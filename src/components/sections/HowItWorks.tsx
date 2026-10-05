import React, { useState } from 'react';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    badge: 'Paso 01 — Recibe',
    title: 'Captura desatendida y centralizada',
    desc: 'El sistema ingiere las facturas entrantes de forma continua sin que nadie tenga que descargarlas a mano.',
    details: [
      'Buzones de correo electrónico dedicados por cliente o despacho',
      'Sincronización automática de Google Drive, OneDrive o carpetas en red',
      'Soporte completo para facturas electrónicas, PDFs nativos, escaneos y fotos de tickets',
    ],
    consoleOutput: `[09:14:02] NUEVA ENTRADA DETECTADA\n• Origen: Buzón facturas@asesoria-ejemplo.es\n• Cliente: Grupo Metálicas del Norte S.L.\n• Archivo: Factura_Proveedor_2026_05.pdf (1.4 MB)\n• Estado: Ingesta completada con éxito.`,
  },
  {
    num: '02',
    badge: 'Paso 02 — Analiza',
    title: 'Lectura precisa con IA Multimodal',
    desc: 'Modelos avanzados de visión y lenguaje leen la estructura completa del documento sin depender de plantillas rígidas.',
    details: [
      'Extracción de Proveedor, CIF/NIF, fecha de devengo y número de factura',
      'Desglose en tablas de múltiples tipos de IVA (4%, 10%, 21%) y recargos',
      'Detección de retenciones de IRPF profesional y conceptos facturados',
    ],
    consoleOutput: `[09:14:04] EXTRACCIÓN MULTIMODAL\n• Emisor: "Distribuciones Comerciales S.A." (A-28491029)\n• N.º Factura: D-2026/894 | Fecha: 12/05/2026\n• Base 21%: 800,00 € (IVA: 168,00 €)\n• Base 10%: 350,00 € (IVA: 35,00 €)\n• Total Factura: 1.353,00 €`,
  },
  {
    num: '03',
    badge: 'Paso 03 — Valida',
    title: 'Comprobación aritmética y anti-duplicados',
    desc: 'Auditoría automática de cada dato para garantizar que ningún descuadre o duplicado llegue a la contabilidad.',
    details: [
      'Verificación matemática: Suma de Bases + Cuotas IVA - IRPF = Total al céntimo',
      'Validación de algoritmos de CIF/NIF español',
      'Búsqueda de duplicados en el histórico de facturas del cliente',
    ],
    consoleOutput: `[09:14:05] CONTROL DE INTEGRIDAD\n✓ Cuadre matemático: 800 + 168 + 350 + 35 = 1.353,00 € (Correcto)\n✓ Algoritmo NIF: Válido\n✓ Chequeo anti-duplicados: 0 coincidencias en histórico\n✓ Nivel de confianza: 99.6% (VERDE)`,
  },
  {
    num: '04',
    badge: 'Paso 04 — Integra',
    title: 'Asiento contable directo en tu software',
    desc: 'El apunte contable queda registrado en tu programa habitual sin que nadie haya tenido que picar un solo dígito.',
    details: [
      'Propuesta de subcuenta del PGC según histórico contable del cliente',
      'Conexión vía API directa o generación de ficheros SUENLACE / CSV',
      'PDF original vinculado al registro para auditorías fiscales',
    ],
    consoleOutput: `[09:14:07] GENERACIÓN CONTABLE\n• Cuenta Debe: (600.0001) Compras de mercaderías (1.150,00 €)\n• Cuenta Debe: (472.0000) H.P. IVA Soportado (203,00 €)\n• Cuenta Haber: (400.0284) Proveedor habitual (1.353,00 €)\n🚀 Asiento volcado a Holded / Sage / A3 con PDF adjunto.`,
  },
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={styles.section} id="como-funciona">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Flujo de Automatización</span>
          <h2 className={styles.title}>Cómo funciona paso a paso</h2>
          <p className={styles.subtitle}>
            De la recepción del archivo al asiento contable en 4 etapas transparentes, verificadas y bajo supervisión humana.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Step Cards */}
          <div className={styles.stepsCol}>
            {STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
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
              </div>

              <div className={styles.consoleBody}>
                <div className={styles.consoleHeader}>
                  <span className="badge badge--blue">Registro en tiempo real</span>
                  <span className={styles.pulseActive}>● Monitor activo</span>
                </div>

                <div className={styles.codeBox}>
                  <pre>{STEPS[activeStep].consoleOutput}</pre>
                </div>

                <div className={styles.navRow}>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnPrev}`}
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  >
                    ← Anterior
                  </button>
                  <span className={styles.navTracker}>
                    Paso {activeStep + 1} de {STEPS.length}
                  </span>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnNext}`}
                    disabled={activeStep === STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nota destacada obligatoria */}
        <div className={styles.featuredNote}>
          <div className={styles.noteIcon}>⚖️</div>
          <div className={styles.noteText}>
            <strong>Criterio y supervisión humana:</strong>
            <p>
              “La IA no sustituye el criterio contable de tu despacho; elimina el trabajo mecánico para que tu equipo supervise solo lo necesario.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
