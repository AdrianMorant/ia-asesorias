import React from 'react';
import styles from './Security.module.css';
import { useLanguage } from '../../i18n';

const SECURITY_POINTS = [
  {
    icon: '🛡️',
    title: 'Certificación ISO/IEC 27001',
    desc: 'Auditoría anual independiente de nuestro Sistema de Gestión de Seguridad de la Información (SGSI). Controles estrictos en software y personal.',
  },
  {
    icon: '🔐',
    title: 'Cifrado Bancario AES-256 & TLS 1.3',
    desc: 'Cifrado de grado militar para datos fiscales en reposo y en tránsito. Copias de seguridad automáticas cada 6 horas distribuidas en la UE.',
  },
  {
    icon: '🏛️',
    title: 'Reglamento Veri*factu & Ley Antifraude',
    desc: 'Encadenamiento criptográfico con huella SHA-256 inalterable y códigos QR obligatorios conforme a la normativa de la AEAT.',
  },
  {
    icon: '🇪🇺',
    title: 'Blindaje RGPD & Contrato DPA (Art. 28)',
    desc: 'Centros de datos ubicados exclusivamente en la Unión Europea. Los datos de tus clientes nunca se emplean para entrenar modelos públicos.',
  },
  {
    icon: '📱',
    title: 'Digitalización Homologada AEAT',
    desc: 'Firma electrónica cualificada de facturas y tickets desde la app móvil PWA con validez probatoria para destruir el papel físico.',
  },
  {
    icon: '🌐',
    title: 'Disponibilidad 99.99% por SLA',
    desc: 'Infraestructura redundante en clústeres de alta disponibilidad Tier-IV con monitorización continua 24/7 de caídas de servicio.',
  },
];

const Security: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="seguridad">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.header}>
            <span className="badge badge--green">Garantía Jurídica y Técnica</span>
            <h2 className={styles.title}>{t.compliance.title}</h2>
            <p className={styles.subtitle}>{t.compliance.subtitle}</p>
          </div>

          <div className={styles.grid}>
            {SECURITY_POINTS.map((pt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.icon} aria-hidden="true">{pt.icon}</div>
                <h3 className={styles.cardTitle}>{pt.title}</h3>
                <p className={styles.cardDesc}>{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.bannerRow}>
            <div className={styles.bannerIcon} aria-hidden="true">📝</div>
            <div className={styles.bannerText}>
              <strong>Compromiso contractual por escrito para despachos:</strong>
              <span>
                Formalizamos acuerdos de confidencialidad (NDA) y Contratos de Encargo de Tratamiento de Datos (DPA) antes de procesar cualquier factura real de tu despacho.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
