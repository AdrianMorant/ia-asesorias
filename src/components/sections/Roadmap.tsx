import React from 'react';
import styles from './Roadmap.module.css';

const PHASES = [
  {
    phase: 'Fase 01',
    timeframe: 'Semanas 1 - 2',
    title: 'Extracción Inteligente y Auditoría',
    desc: 'Comprobamos el comportamiento del motor con tus facturas reales más complejas antes de tocar nada en tu software definitivo.',
    deliverables: [
      'Configuración del canal de ingesta (email dedicado o carpeta)',
      'Ajuste del modelo a los formatos de proveedores habituales',
      'Validación de precisión de lectura y cuadre (Base + IVA = Total)',
      'Exportación en formato de prueba para cotejar con tu equipo',
    ],
    status: 'Validación inmediata',
  },
  {
    phase: 'Fase 02',
    timeframe: 'Semanas 3 - 4',
    title: 'Reglas Contables y Aprendizaje',
    desc: 'Adaptamos el sistema a los criterios del PGC y las particularidades contables de cada uno de los clientes de tu despacho.',
    deliverables: [
      'Mapeo de cuentas de gastos (grupo 6) e ingresos (grupo 7)',
      'Manejo de reglas fiscales especiales (recargo, retenciones, no deducibles)',
      'Activación del aprendizaje supervisado: correcciones = reglas automáticas',
      'Configuración del umbral de confianza (Human-in-the-loop)',
    ],
    status: 'Personalización',
  },
  {
    phase: 'Fase 03',
    timeframe: 'A partir del mes 2',
    title: 'Integración Directa y Automatización',
    desc: 'Conexión total con tu ERP contable o despliegue de tu panel privado de despacho para funcionamiento continuo.',
    deliverables: [
      'Conexión API o conector con tu programa de contabilidad',
      'Generación automática de asientos y vinculación del PDF original',
      'Monitorización de rendimiento y soporte técnico continuo',
      'Acompañamiento a tu equipo contable para resolver dudas',
    ],
    status: 'Producción',
  },
];

const Roadmap: React.FC = () => {
  return (
    <section className={styles.section} id="roadmap">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Hoja de Ruta Clara</span>
          <h2 className={styles.title}>Cómo implantamos la solución en tu despacho</h2>
          <p className={styles.subtitle}>
            Sin saltos al vacío ni experimentos arriesgados. Un proceso por fases donde validas los resultados con datos reales desde el primer día.
          </p>
        </div>

        <div className={styles.timeline}>
          {PHASES.map((p, idx) => (
            <div key={idx} className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseNumber}>{p.phase}</span>
                <span className={styles.timeframe}>{p.timeframe}</span>
                <span className={styles.statusBadge}>{p.status}</span>
              </div>
              <h3 className={styles.phaseTitle}>{p.title}</h3>
              <p className={styles.phaseDesc}>{p.desc}</p>
              <div className={styles.deliverables}>
                <span className={styles.delivTitle}>Hitos de la fase:</span>
                <ul>
                  {p.deliverables.map((item, i) => (
                    <li key={i}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
