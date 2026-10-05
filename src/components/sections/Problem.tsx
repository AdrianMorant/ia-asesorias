import React from 'react';
import styles from './Problem.module.css';

const TRADITIONAL_STEPS = [
  '1. Abrir correo o escanear papel.',
  '2. Descargar y abrir el PDF.',
  '3. Picar datos manualmente en el teclado.',
  '4. Revisar si cuadran base e IVA.',
  '5. Asignar subcuenta contable de memoria.',
  '6. Repetir 500 veces al mes.',
];

const AUTOMATED_STEPS = [
  '1. La factura entra directamente al sistema.',
  '2. La IA extrae y desglosa los impuestos.',
  '3. Validación matemática automática.',
  '4. Asignación contable por histórico.',
  '5. El equipo solo valida excepciones complejas.',
  '6. Integración directa o descarga de enlace contable.',
];

const Problem: React.FC = () => {
  return (
    <section className={styles.section} id="problema">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--amber">La realidad operativa del despacho</span>
          <h2 className={styles.title}>Tu equipo no debería perder horas picando facturas.</h2>
          <p className={styles.subtitle}>
            En pleno 2026, profesionales cualificados siguen dedicando más del 40% de su jornada a transcribir datos de facturas en PDF a su programa contable.
          </p>
        </div>

        {/* Comparativa en dos columnas */}
        <div className={styles.comparisonGrid}>
          {/* Columna 1: Flujo Tradicional */}
          <div className={styles.colTraditional}>
            <div className={styles.colHeader}>
              <span className={styles.tagTraditional}>Flujo Tradicional</span>
              <h3 className={styles.colTitle}>Lento, manual y propenso a errores</h3>
            </div>

            <ol className={styles.stepsList}>
              {TRADITIONAL_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemTrad}>
                  <span className={styles.iconTrad}>❌</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxTrad}>
              <span className={styles.resultLabel}>Resultado:</span>
              <p className={styles.resultText}>
                Cuello de botella insostenible en cierres trimestrales, horas extras forzadas y riesgo continuo de error humano en importes y NIFs.
              </p>
            </div>
          </div>

          {/* Columna 2: Con Automatización Inteligente */}
          <div className={styles.colAutomated}>
            <div className={styles.colHeader}>
              <span className={styles.tagAutomated}>Con Automatización Inteligente</span>
              <h3 className={styles.colTitle}>Inmediato, auditado y supervisado</h3>
            </div>

            <ol className={styles.stepsList}>
              {AUTOMATED_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemAuto}>
                  <span className={styles.iconAuto}>✅</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxAuto}>
              <span className={styles.resultLabelAuto}>Resultado:</span>
              <p className={styles.resultTextAuto}>
                Cierres en minutos, cero datos picados manualmente, facturas cuadradas al céntimo y control total en manos del equipo contable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
