import React from 'react';
import styles from './AboutMe.module.css';

const AboutMe: React.FC = () => {
  return (
    <section className={styles.section} id="sobre-mi">
      <div className="container">
        <div className={styles.card}>
          {/* Columna Izquierda: Perfil y contacto */}
          <div className={styles.profileCol}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>AM</div>
              <div className={styles.roleBadge}>Desarrollador & Consultor IA</div>
            </div>

            <div className={styles.directCard}>
              <div className={styles.directTitle}>Contacto directo sin intermediarios:</div>
              <div className={styles.directLinks}>
                <a href="mailto:amorant2005@gmail.com" className={styles.directLink}>
                  ✉️ amorant2005@gmail.com
                </a>
                <a href="tel:+34686766266" className={styles.directLink}>
                  📞 +34 686 766 266
                </a>
              </div>
              <span className={styles.location}>📍 España • Atención a despachos en toda España</span>
            </div>
          </div>

          {/* Columna Derecha: Texto exacto y enfoque */}
          <div className={styles.contentCol}>
            <span className="badge badge--blue">Enfoque Personal y Técnico</span>
            <h2 className={styles.title}>Tecnología pensada para resolver ineficiencias reales</h2>

            <div className={styles.statementBox}>
              <p className={styles.leadParagraph}>
                Soy <strong>Adrián Morant</strong>, desarrollador especializado en Inteligencia Artificial, flujos de automatización e integración de sistemas.
              </p>
              <p className={styles.leadParagraph}>
                Ayudo a asesorías y despachos profesionales a modernizar sus procesos contables sin obligarles a cambiar las herramientas con las que ya funcionan y están cómodos.
              </p>
              <p className={styles.leadParagraph}>
                Desarrollo soluciones directas, medibles, seguras y adaptadas a la realidad diaria de tu despacho.
              </p>
            </div>

            <div className={styles.principlesGrid}>
              <div className={styles.principleItem}>
                <span className={styles.principleIcon}>🎯</span>
                <div>
                  <strong>Honestidad técnica</strong>
                  <p>Sin humo, sin diapositivas vacías y sin inventar métricas. Probamos con tus facturas reales y evaluamos el encaje con rigor.</p>
                </div>
              </div>

              <div className={styles.principleItem}>
                <span className={styles.principleIcon}>🤝</span>
                <div>
                  <strong>Interlocución directa</strong>
                  <p>Hablas y diseñas directamente con el ingeniero responsable del sistema, garantizando soporte técnico y adaptaciones ágiles.</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <a href="#contacto" className="btn btn--primary">
                Hablar directamente conmigo
              </a>
              <a href="tel:+34686766266" className="btn btn--ghost">
                Llamar al +34 686 766 266
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
