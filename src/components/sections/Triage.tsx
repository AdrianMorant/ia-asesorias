import React from 'react';
import styles from './Triage.module.css';
import { useLanguage } from '../../i18n';
import { CheckCircle2, AlertTriangle, ShieldBan, Sparkles } from 'lucide-react';

const LEVELS = [
  {
    level: 'Nivel Verde',
    title: 'Alta Confianza Algorítmica',
    badge: 'Procesamiento Directo',
    colorClass: 'green',
    icon: CheckCircle2,
    condition: 'Datos nítidos, proveedor recurrente identificado y cuadre aritmético verificado al céntimo.',
    action: 'Generación directa del borrador de apunte cuadrado en el libro diario de tu ERP sin intervención manual.',
    scope: 'Operativa recurrente del despacho',
    example: 'Factura mensual de suministros o acreedor habitual con desglose de IVA estándar.',
  },
  {
    level: 'Nivel Amarillo',
    title: 'Supervisión en 1 Clic',
    badge: 'Verificación Humana',
    colorClass: 'yellow',
    icon: AlertTriangle,
    condition: 'Proveedor nuevo, concepto atípico, retención de IRPF profesional o importe relevante para el Modelo 347.',
    action: 'Se deriva a la bandeja de triaje: visor dividido de factura junto a la propuesta para validar con un solo clic.',
    scope: 'Revisión asistida por excepción',
    example: 'Primera factura de un proveedor o factura con tipos mixtos de IVA.',
  },
  {
    level: 'Nivel Rojo',
    title: 'Incidencia Bloqueada',
    badge: 'Bloqueo Preventivo',
    colorClass: 'red',
    icon: ShieldBan,
    condition: 'Duplicado detectado, descuadre matemático de base + IVA o NIF erróneo / no censado.',
    action: 'Bloqueo inmediato para impedir que un dato defectuoso contamine los balances o las declaraciones fiscales.',
    scope: 'Protección y parada de seguridad',
    example: 'Factura ya registrada el mes anterior o suma de bases que no coincide con el total.',
  },
];

const Triage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="triage">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">
            <Sparkles size={12} className={styles.headerIcon} />
            Seguridad Operativa KontaPro
          </span>
          <h2 className={styles.title}>“La IA propone. Tu despacho mantiene el control.”</h2>
          <p className={styles.subtitle}>
            {t.solution.s1Desc}
          </p>
        </div>

        <div className={styles.grid}>
          {LEVELS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className={`${styles.card} ${styles[item.colorClass]}`}>
                <div className={styles.cardTop}>
                  <div className={styles.levelRow}>
                    <div className={styles.trafficLight}>
                      <IconComponent size={20} className={styles.trafficIcon} />
                    </div>
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
                    <span className={styles.statsLabel}>Tipo de operativa:</span>
                    <span className={styles.statsVal}>{item.scope}</span>
                  </div>
                  <div className={styles.exampleText}>
                    <em>Ejemplo: {item.example}</em>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Triage;
