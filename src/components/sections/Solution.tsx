import React from 'react';
import styles from './Solution.module.css';
import { useLanguage } from '../../i18n';

const CAPABILITIES = [
  {
    icon: '📥',
    title: 'Ingesta Multicanal Unificada',
    desc: 'Buzón corporativo por empresa, portal web para clientes y app PWA para tickets en movilidad.',
  },
  {
    icon: '🎯',
    title: 'Extracción Multimodal 99.8%',
    desc: 'Lectura estructurada de emisor, CIF, fechas, bases, tipos de IVA (4%, 10%, 21%) y retenciones.',
  },
  {
    icon: '⚖️',
    title: 'Cuadre Aritmético Estricto',
    desc: 'Verificación algorítmica al céntimo con bloqueo preventivo ante discrepancias matemáticas.',
  },
  {
    icon: '🛡️',
    title: 'Filtro Anti-Duplicados',
    desc: 'Detección proactiva de coincidencias en emisor, número de serie o importe en el histórico contable.',
  },
  {
    icon: '💡',
    title: 'Asignación PGC Inteligente',
    desc: 'Propuesta automática de subcuentas del Plan General Contable aprendiendo del histórico del despacho.',
  },
  {
    icon: '🔌',
    title: 'Enlace Nativo Multi-ERP',
    desc: 'Generación directa de ficheros oficiales: SUENLACE para A3, diarios Sage, CSV Contasol y API Holded.',
  },
  {
    icon: '🚦',
    title: 'Triaje por Semáforo',
    desc: 'Operativa por excepción: el 94% se valida en automático y el despacho solo confirma dudas en 1 clic.',
  },
  {
    icon: '🏛️',
    title: 'Homologación Veri*factu & AEAT',
    desc: 'Encadenamiento SHA-256, códigos QR obligatorios y digitalización certificada con plena validez jurídica.',
  },
];

const Solution: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="soluciones">
      <div className="container">
        {/* Main Headline */}
        <div className={styles.top}>
          <span className="badge badge--blue">{t.solution.badge}</span>
          <h2 className={styles.headline}>
            “No cambies de software.<br />
            <span className={styles.highlight}>Automatiza lo que ocurre alrededor de él.”</span>
          </h2>
          <p className={styles.subheadline}>
            {t.solution.subtitle}
          </p>
        </div>

        {/* Las dos opciones de implantación para asesorías */}
        <div className={styles.optionsGrid}>
          {/* Opción A */}
          <div className={styles.optionCard}>
            <div className={styles.optionTag}>Opción A • Invisible</div>
            <h3 className={styles.optionTitle}>Integración desatendida en tu ERP</h3>
            <p className={styles.optionDesc}>
              Conexión directa con tu programa habitual (A3, Sage, Contasol, Holded). Los asientos se generan automáticamente en tus diarios contables sin alterar la operativa de tu equipo.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Cero curva de aprendizaje para el equipo</li>
              <li>✓ Apuntes cuadrados en el libro diario de tu ERP</li>
              <li>✓ Archivo PDF original adjunto a cada registro</li>
              <li>✓ Máxima agilidad sin cambiar de plataforma</li>
            </ul>
          </div>

          {/* Opción B */}
          <div className={`${styles.optionCard} ${styles.optionCardB}`}>
            <div className={`${styles.optionTag} ${styles.optionTagB}`}>Opción B • Centralizada</div>
            <h3 className={styles.optionTitle}>Consola web de supervisión para el despacho</h3>
            <p className={styles.optionDesc}>
              Panel unificado para controlar la facturación de toda tu cartera de clientes, bandejas de entrada inteligentes, validación en bloque y exportación a demanda.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Control multitenant con roles y permisos de equipo</li>
              <li>✓ Visor dividido interactivo (factura vs asiento PGC)</li>
              <li>✓ Métricas de rendimiento y estado de liquidaciones</li>
              <li>✓ Exportación en bloque con un solo clic</li>
            </ul>
          </div>
        </div>

        {/* Capacidades Core Grid */}
        <div className={styles.capabilitiesWrapper}>
          <div className={styles.capHeader}>
            <h3 className={styles.capTitle}>Capacidades tecnológicas de KontaPro</h3>
            <span className={styles.capSub}>Diseñado con rigor financiero para despachos y asesorías profesionales</span>
          </div>

          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, idx) => (
              <div key={idx} className={styles.capCard}>
                <div className={styles.capIcon} aria-hidden="true">{cap.icon}</div>
                <h4 className={styles.capItemTitle}>{cap.title}</h4>
                <p className={styles.capItemDesc}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
