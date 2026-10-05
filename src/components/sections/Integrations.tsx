import React from 'react';
import styles from './Integrations.module.css';

const INTEGRATION_BLOCKS = [
  {
    icon: '⚡',
    badge: 'Conexión Nube',
    title: 'APIs y Webhooks',
    desc: 'Para ERPs modernos que disponen de interfaz programable. Sincronización bidireccional en tiempo real de facturas, clientes y apuntes contables.',
    features: [
      'Conexión con Holded, Anfix y plataformas cloud',
      'Actualización instantánea en menos de 2 segundos',
      'Notificaciones y webhooks de confirmación',
    ],
  },
  {
    icon: '📑',
    badge: 'Compatibilidad Universal',
    title: 'Ficheros de enlace contable',
    desc: 'Generamos automáticamente los ficheros estándar con los que los programas de escritorio de toda la vida importan los asientos sin teclear.',
    features: [
      'Ficheros SUENLACE y enlaces de diario contable',
      'Formatos específicos para A3 (A3innuva / A3Eco / A3Con)',
      'Plantillas y ficheros para Sage 50 / Despachos y Contasol',
    ],
  },
  {
    icon: '📥',
    badge: 'Ingesta Flexible',
    title: 'Canales de entrada desatendidos',
    desc: 'Los clientes no tienen que aprender nada nuevo. Siguen enviando las facturas como siempre o se sincronizan desde vuestro almacenamiento en la nube.',
    features: [
      'Buzones de correo dedicados por asesoría o cliente',
      'Sincronización de Google Drive, OneDrive o Dropbox',
      'Monitorización de carpetas locales o unidades de red seguras',
    ],
  },
];

const SOFTWARE_TAGS = [
  'A3innuva / Wolters Kluwer',
  'Sage 50 & Despachos',
  'Contasol / DELSOL',
  'Holded',
  'Cegid / Diez Software',
  'Anfix',
  'Ficheros SUENLACE',
  'CSV / Excel estructurado',
];

const Integrations: React.FC = () => {
  return (
    <section className={styles.section} id="conectividad">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Compatibilidad Total</span>
          <h2 className={styles.title}>Conectividad real con tus herramientas actuales</h2>
          <p className={styles.subtitle}>
            No dependemos de que tu programa tenga APIs modernas o costosas. Nos adaptamos a cómo funciona tu asesoría hoy.
          </p>
        </div>

        <div className={styles.grid}>
          {INTEGRATION_BLOCKS.map((block, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon}>{block.icon}</span>
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

        {/* Software support ticker/tags */}
        <div className={styles.softwareBanner}>
          <span className={styles.softwareTitle}>Ecosistema contable soportado:</span>
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
