import React from 'react';
import styles from './Triage.module.css';

const LEVELS = [
  {
    level: 'Nivel Verde',
    title: 'Alta Confianza (95% - 99%)',
    badge: 'Procesamiento Directo',
    colorClass: 'green',
    icon: '🟢',
    condition: 'Datos nítidos, proveedor conocido y cuadre aritmético 100% verificado.',
    action: 'Generación directa del borrador o apunte en el diario contable de tu ERP sin intervención manual.',
    stats: '~94% del volumen mensual',
    example: 'Factura mensual de suministros o proveedor recurrente con desglose habitual.',
  },
  {
    level: 'Nivel Amarillo',
    title: 'Revisión Rápida',
    badge: 'Verificación en 1 Clic',
    colorClass: 'yellow',
    icon: '🟡',
    condition: 'Proveedor nuevo, importe inusualmente alto o subcuenta ambigua.',
    action: 'Se deriva a una bandeja de triaje ágil: visor de factura al lado de la propuesta para validar o ajustar con un solo clic.',
    stats: '~4% del volumen mensual',
    example: 'Primera factura de un acreedor o factura con concepto no habitual.',
  },
  {
    level: 'Nivel Rojo',
    title: 'Incidencia Bloqueada',
    badge: 'Bloqueo Preventivo',
    colorClass: 'red',
    icon: '🔴',
    condition: 'Duplicado detectado, descuadre matemático de base + IVA o NIF erróneo.',
    action: 'Bloqueo inmediato para impedir que un dato defectuoso contamine los balances o las declaraciones fiscales.',
    stats: '~2% del volumen mensual',
    example: 'Factura ya contabilizada el mes anterior o suma de líneas que no coincide con el total.',
  },
];

const Triage: React.FC = () => {
  return (
    <section className={styles.section} id="control-semaforo">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Seguridad Operativa</span>
          <h2 className={styles.title}>“La IA propone. Tu despacho tiene el control.”</h2>
          <p className={styles.subtitle}>
            Para evitar errores a ciegas, implementamos un sistema de triaje por semáforo. Ninguna factura dudosa se asienta sin que el equipo contable dé su visto bueno.
          </p>
        </div>

        <div className={styles.grid}>
          {LEVELS.map((item, idx) => (
            <div key={idx} className={`${styles.card} ${styles[item.colorClass]}`}>
              <div className={styles.cardTop}>
                <div className={styles.levelRow}>
                  <span className={styles.trafficLight}>{item.icon}</span>
                  <span className={styles.levelName}>{item.level}</span>
                </div>
                <span className={styles.actionBadge}>{item.badge}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>

              <div className={styles.sectionBlock}>
                <span className={styles.blockLabel}>Criterio de activación:</span>
                <p className={styles.blockDesc}>{item.condition}</p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.blockLabel}>Acción del sistema:</span>
                <p className={styles.blockDesc}>{item.action}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.footerRow}>
                  <span className={styles.statsLabel}>Frecuencia estimada:</span>
                  <span className={styles.statsVal}>{item.stats}</span>
                </div>
                <div className={styles.exampleText}>
                  <em>Ejemplo: {item.example}</em>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Triage;
