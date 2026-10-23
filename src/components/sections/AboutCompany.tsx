import React from 'react';
import styles from './AboutCompany.module.css';
import { useLanguage } from '../../i18n';
import { Sparkles, Code2, ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';

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
            {/* Pilar 1: Beta Cerrada */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <div className={styles.pillarIconBox}>
                  <Sparkles size={22} className={styles.iconGold} />
                </div>
                <span className={styles.pillarBadge}>Acceso Controlado</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar1Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar1Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Acceso prioritario por invitación técnica
              </div>
            </div>

            {/* Pilar 2: Interlocución Directa con Creadores */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <div className={styles.pillarIconBox}>
                  <Code2 size={22} className={styles.iconBlue} />
                </div>
                <span className={styles.pillarBadge}>Ingeniería y Producto</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar2Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar2Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Soporte y formación 1 a 1 sin intermediarios
              </div>
            </div>

            {/* Pilar 3: Seguridad Diseñada bajo Controles ISO 27001 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarTop}>
                <div className={styles.pillarIconBox}>
                  <ShieldCheck size={22} className={styles.iconNavy} />
                </div>
                <span className={styles.pillarBadge}>Seguridad y DPA</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.aboutCompany.pillar3Title}</h3>
              <p className={styles.pillarDesc}>{t.aboutCompany.pillar3Desc}</p>
              <div className={styles.pillarMetric}>
                ✓ Controles ISO 27001 & DPA Art. 28 formalizado
              </div>
            </div>
          </div>

          {/* Banner Institucional con contacto directo */}
          <div className={styles.contactBanner}>
            <div className={styles.bannerInfo}>
              <span className={styles.bannerTitle}>Interlocución técnica y soporte directo a despachos</span>
              <span className={styles.bannerSub}>
                Atención directa para despachos contables y asesorías en España • Periodo de prueba guiado
              </span>
            </div>

            <div className={styles.bannerActions}>
              <a href="tel:+34686766266" className={styles.phoneLink}>
                <PhoneCall size={16} />
                <span>+34 686 766 266</span>
              </a>
              <a href="#demo" className="btn btn--primary">
                <span>{t.aboutCompany.ctaPrimary}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
