import React from 'react';
import styles from './StatsBanner.module.css';
import { useLanguage } from '../../i18n';

const StatsBanner: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: '🏢',
      val: t.companyStats.clientsVal,
      label: t.companyStats.clientsLabel,
      sub: 'Empresas y despachos contables activos en toda España',
    },
    {
      icon: '👥',
      val: t.companyStats.teamVal,
      label: t.companyStats.teamLabel,
      sub: 'Ingenieros de IA, fiscalistas PGC y soporte dedicado',
    },
    {
      icon: '🛡️',
      val: t.companyStats.securityVal,
      label: t.companyStats.securityLabel,
      sub: 'Cifrado militar AES-256 en reposo y TLS 1.3 en tránsito',
    },
    {
      icon: '🌐',
      val: t.companyStats.uptimeVal,
      label: t.companyStats.uptimeLabel,
      sub: 'Infraestructura redundante en la Unión Europea (Tier-IV)',
    },
  ];

  return (
    <section className={styles.section} aria-label="Métricas de Escala y Seguridad">
      <div className="container">
        <div className={styles.grid}>
          {stats.map((s, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.iconBox} aria-hidden="true">
                {s.icon}
              </div>
              <div className={styles.content}>
                <span className={styles.value}>{s.val}</span>
                <span className={styles.label}>{s.label}</span>
                <span className={styles.subLabel}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
