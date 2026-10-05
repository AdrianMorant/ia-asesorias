import React from 'react';
import styles from './Security.module.css';

const SECURITY_POINTS = [
  {
    icon: '🇪🇺',
    title: 'Normativa Europea y RGPD',
    desc: 'Servidores e infraestructura alojados exclusivamente dentro del marco de la Unión Europea. Contrato de encargo de tratamiento de datos (DPA) formalizado según el Art. 28 del RGPD.',
  },
  {
    icon: '🔒',
    title: 'Privacidad empresarial absoluta',
    desc: 'Los datos fiscales, CIFs, nombres de clientes y cifras de facturación nunca se utilizan para entrenar modelos públicos ni se comparten con terceros bajo ningún concepto.',
  },
  {
    icon: '🛡️',
    title: 'Trazabilidad y control de borrado',
    desc: 'Control estricto sobre el ciclo de vida de cada documento. Cifrado de nivel bancario AES-256 en reposo y TLS 1.3 en tránsito, con registro de auditoría inmutable de accesos.',
  },
];

const Security: React.FC = () => {
  return (
    <section className={styles.section} id="seguridad">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.header}>
            <span className="badge badge--green">Garantía Jurídica y Técnica</span>
            <h2 className={styles.title}>Privacidad, seguridad y cumplimiento RGPD</h2>
            <p className={styles.subtitle}>
              La información fiscal y contable de los clientes de tu despacho es confidencial. La protegemos con los estándares más exigentes de la Unión Europea.
            </p>
          </div>

          <div className={styles.grid}>
            {SECURITY_POINTS.map((pt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.icon}>{pt.icon}</div>
                <h3 className={styles.cardTitle}>{pt.title}</h3>
                <p className={styles.cardDesc}>{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.bannerRow}>
            <div className={styles.bannerIcon}>📝</div>
            <div className={styles.bannerText}>
              <strong>Compromiso contractual por escrito:</strong>
              <span>Firmamos acuerdos de confidencialidad (NDA) y de tratamiento de datos antes de realizar cualquier prueba con facturas reales de tu despacho.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
