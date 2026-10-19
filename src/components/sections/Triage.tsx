import React from 'react';
import styles from './Triage.module.css';
import { useLanguage } from '../../i18n';

const LEVELS = [
  {
    level: 'Nivel Verde',
    title: 'Alta Confianza (95% - 99.9%)',
    badge: 'Procesamiento Directo',
    colorClass: 'green',
    icon: '🟢',
    condition: 'Datos nítidos, proveedor recurrente identificado y cuadre aritmético 100% verificado.',
    action: 'Generación directa del borrador o apunte cuadrado en el diario contable de tu ERP sin intervención manual.',
    stats: '~94% del volumen mensual',
    example: 'Factura mensual de suministros o acreedor habitual con desglose de IVA estándar.',
  },
  {
    level: 'Nivel Amarillo',
    title: 'Revisión en 1 Clic',
    badge: 'Verificación Humana',
    colorClass: 'yellow',
    icon: '🟡',
    condition: 'Proveedor nuevo, concepto atípico o posible retención de IRPF profesional que requiere confirmar.',
    action: 'Se deriva a la bandeja de triaje: visor dividido de factura junto a la propuesta para validar con un solo clic.',
    stats: '~4% del volumen mensual',
    example: 'Primera factura de un proveedor o factura con tipos mixtos de IVA.',
  },
  {
    level: 'Nivel Rojo',
    title: 'Incidencia Bloqueada',
    badge: 'Bloqueo Preventivo',
    colorClass: 'red',
    icon: '🔴',
    condition: 'Duplicado detectado, descuadre matemático de base + IVA o NIF erróneo / no censado.',
    action: 'Bloqueo inmediato para impedir que un dato defectuoso contamine los balances o las declaraciones fiscales.',
    stats: '~2% del volumen mensual',
    example: 'Factura ya registrada el mes anterior o suma de bases que no coincide con el total.',
  },
];

const Triage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="triage">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Seguridad Operativa</span>
          <h2 className={styles.title}>“La IA propone. Tu despacho mantiene el control.”</h2>
          <p className={styles.subtitle}>
            {t.solution.s1Desc}
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
