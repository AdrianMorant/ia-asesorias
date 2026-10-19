import React from 'react';
import styles from './AboutCompany.module.css';
import { useLanguage } from '../../i18n';

const AboutCompany: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="empresa">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.header}>
            <span className="badge badge--blue">{t.aboutCompany.badge}</span>
            <h2 className={styles.title}>{t.aboutCompany.title}</h2>
            <p className={styles.subtitle}>{t.aboutCompany.subtitle}</p>
          </div>

          <div className={styles.pillarsGrid}>
            {/* Pilar 1: Clientes y Empresas */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <span className={styles.pillarIcon} aria-hidden="true">📈</span>
                <span className={styles.pillarBadge}>Escala Masiva</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar1Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar1Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Más de 100.000 clientes gestionados
              </div>
            </div>

            {/* Pilar 2: Equipo de +75 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <span className={styles.pillarIcon} aria-hidden="true">👥</span>
                <span className={styles.pillarBadge}>Equipo Especializado</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar2Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar2Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Más de 75 empleados y especialistas
              </div>
            </div>

            {/* Pilar 3: Seguridad ISO 27001 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <span className={styles.pillarIcon} aria-hidden="true">🛡️</span>
                <span className={styles.pillarBadge}>Grado Militar</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar3Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar3Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Certificación ISO 27001 & DPA Art. 28
              </div>
            </div>
          </div>

          {/* Banner Institucional con contacto directo */}
          <div className={styles.contactBanner}>
            <div className={styles.bannerInfo}>
              <span className={styles.bannerTitle}>Interlocución técnica y soporte directo a despachos</span>
              <span className={styles.bannerSub}>
                Centro de soporte técnico y fiscal en España • Tiempo medio de resolución &lt; 15 min en periodos de cierre
              </span>
            </div>

            <div className={styles.bannerActions}>
              <a href="tel:+34686766266" className={styles.phoneLink}>
                📞 +34 686 766 266
              </a>
              <a href="#demo" className="btn btn--primary">
                {t.aboutCompany.ctaPrimary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
