import React from 'react';
import styles from './StatsBanner.module.css';
import { useLanguage } from '../../i18n';
import { Sparkles, Headphones, ShieldCheck, Server } from 'lucide-react';

const StatsBanner: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Sparkles,
      val: t.companyStats.clientsVal,
      label: t.companyStats.clientsLabel,
      sub: 'Despliegues controlados y plazas limitadas para asesorías',
      accentClass: 'accentGold',
    },
    {
      icon: Headphones,
      val: t.companyStats.teamVal,
      label: t.companyStats.teamLabel,
      sub: 'Atención e interlocución técnica sin intermediarios',
      accentClass: 'accentBlue',
    },
    {
      icon: ShieldCheck,
      val: t.companyStats.securityVal,
      label: t.companyStats.securityLabel,
      sub: 'Cifrado de datos en reposo y en tránsito con DPA Art. 28',
      accentClass: 'accentNavy',
    },
    {
      icon: Server,
      val: t.companyStats.uptimeVal,
      label: t.companyStats.uptimeLabel,
      sub: 'Centros de datos en la Unión Europea conforme a RGPD',
      accentClass: 'accentEmerald',
    },
  ];

  return (
    <section className={styles.section} aria-label="Métricas de Escala y Seguridad">
      <div className="container">
        <div className={styles.grid}>
          {stats.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div key={idx} className={`${styles.statCard} ${styles[s.accentClass]}`}>
                <div className={styles.iconBox} aria-hidden="true">
                  <IconComp size={22} className={styles.iconSvg} />
                </div>
                <div className={styles.content}>
                  <span className={styles.value}>{s.val}</span>
                  <span className={styles.label}>{s.label}</span>
                  <span className={styles.subLabel}>{s.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
