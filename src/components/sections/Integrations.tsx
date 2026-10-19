import React from 'react';
import styles from './Integrations.module.css';
import { useLanguage } from '../../i18n';

const INTEGRATION_BLOCKS = [
  {
    icon: '🔗',
    badge: 'Conexión Cloud',
    title: 'APIs y Sincronización Nube',
    desc: 'Para ERPs modernos que disponen de interfaz programable. Sincronización bidireccional en tiempo real de facturas, clientes y apuntes contables.',
    features: [
      'Conexión directa con Holded, Anfix y plataformas en la nube',
      'Actualización instantánea y confirmación de recepción',
      'Webhooks de notificación para control del despacho',
    ],
  },
  {
    icon: '📑',
    badge: 'Ficheros Nativos',
    title: 'Enlaces Contables Tradicionales',
    desc: 'Generamos automáticamente los ficheros estándar con los que los programas de escritorio de referencia importan los asientos sin teclear.',
    features: [
      'Ficheros SUENLACE.DAT para Wolters Kluwer A3 (a3innuva / A3ASESOR)',
      'Plantillas y ficheros de diario estructurado para Sage Despachos y Sage 50',
      'Compatibilidad nativa con Software DELSOL (Contasol CSV)',
    ],
  },
  {
    icon: '🏦',
    badge: 'Fintech & Bancos',
    title: 'Banca Española y Norma 43',
    desc: 'Casación automática de movimientos bancarios oficiales con las facturas emitidas y recibidas de tus clientes.',
    features: [
      'Lectura de extractos estandarizados Norma 43 (CSB 43)',
      'Compatible con Santander, BBVA, CaixaBank, Sabadell y banca europea',
      'Reglas inteligentes de conciliación con cuentas 572 y 430/410',
    ],
  },
];

const SOFTWARE_TAGS = [
  'Wolters Kluwer A3 (SUENLACE)',
  'Sage Despachos Connected',
  'Sage 50 & 200',
  'Contasol (Software DELSOL)',
  'Holded ERP',
  'Cegid / Diez Software',
  'Norma 43 Bancaria',
  'Facturae & PEPPOL BIS 3.0',
];

const Integrations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="integraciones">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">{t.integrations.badge}</span>
          <h2 className={styles.title}>{t.integrations.title}</h2>
          <p className={styles.subtitle}>{t.integrations.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {INTEGRATION_BLOCKS.map((block, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">{block.icon}</span>
                <span className={styles.badge}>{block.badge}</span>
              </div>
              <h3 className={styles.cardTitle}>{block.title}</h3>
              <p className={styles.cardDesc}>{block.desc}</p>
              <ul className={styles.featureList}>
                {block.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Software support tags */}
        <div className={styles.softwareBanner}>
          <span className={styles.softwareTitle}>Ecosistema de Software Contable Soportado:</span>
          <div className={styles.tagsRow}>
            {SOFTWARE_TAGS.map((tag, i) => (
              <span key={i} className={styles.softwareChip}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
