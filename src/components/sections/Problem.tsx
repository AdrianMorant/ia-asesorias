import React from 'react';
import styles from './Problem.module.css';
import { useLanguage } from '../../i18n';

const TRADITIONAL_STEPS = [
  'Ingesta dispersa: descarga manual de PDFs y escaneo de tickets.',
  'Revisión individual: apertura secuencial documento a documento.',
  'Picado manual: tecleo de CIF, bases imponibles, IVA e IRPF.',
  'Cuadre aritmético: comprobación manual de redondeos de céntimos.',
  'Mapeo PGC: búsqueda manual de subcuentas en históricos.',
  'Sobrecarga trimestral: jornadas saturadas en cierres fiscales.',
];

const AUTOMATED_STEPS = [
  'Ingesta unificada: buzón directo, portal cliente y app PWA.',
  'Extracción multimodal: lectura instantánea de CIF, bases e IVA.',
  'Semáforo fiscal: validación matemática y filtro anti-duplicados.',
  'Partida doble PGC: propuesta de asiento cuadrado (Debe = Haber).',
  'Supervisión ágil: validación de incidencias en 1 solo clic.',
  'Enlace nativo ERP: exportación directa a A3, Sage, Contasol y Holded.',
];

const Problem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="problema">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--amber">{t.problem.badge}</span>
          <h2 className={styles.title}>{t.problem.title}</h2>
          <p className={styles.subtitle}>{t.problem.subtitle}</p>
        </div>

        {/* Comparativa en dos columnas */}
        <div className={styles.comparisonGrid}>
          {/* Columna 1: Flujo Tradicional */}
          <div className={styles.colTraditional}>
            <span className={styles.tagTraditional}>Flujo Tradicional Manual</span>
            <h3 className={styles.colTitleTrad}>Fricción operativa y riesgo fiscal</h3>

            <ol className={styles.stepsList}>
              {TRADITIONAL_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemTrad}>
                  <span className={styles.iconTrad} aria-hidden="true">❌</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxTrad}>
              <span className={styles.resultLabel}>Impacto en el despacho:</span>
              <p className={styles.resultText}>
                Hasta un 60% de la jornada consumida en transcripción mecánica, riesgo de sanciones tributarias y saturación en cierres trimestrales.
              </p>
            </div>
          </div>

          {/* Columna 2: Con KontaPro */}
          <div className={styles.colAutomated}>
            <span className={styles.tagAutomated}>Con KontaPro Suite</span>
            <h3 className={styles.colTitleAuto}>Automatización con rigor contable</h3>

            <ol className={styles.stepsList}>
              {AUTOMATED_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemAuto}>
                  <span className={styles.iconAuto} aria-hidden="true">✅</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxAuto}>
              <span className={styles.resultLabelAuto}>Garantía técnica:</span>
              <p className={styles.resultTextAuto}>
                Procesamiento masivo en segundos, trazabilidad inalterable SHA-256 y capacidad para duplicar clientes sin incrementar costes estructurales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
