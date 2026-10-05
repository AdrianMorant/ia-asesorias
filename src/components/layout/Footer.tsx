import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>A</span>
              <span className={styles.logoText}>
                adrián<span className={styles.logoAccent}>morant</span>
              </span>
            </div>
            <p className={styles.tagline}>
              Automatización e Inteligencia Artificial para asesorías y despachos profesionales en España.
            </p>
            <div className={styles.contact}>
              <a href="mailto:amorant2005@gmail.com" className={styles.contactLink}>
                ✉️ amorant2005@gmail.com
              </a>
              <a href="tel:+34686766266" className={styles.contactLink}>
                📞 +34 686 766 266
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Solución</h4>
              <a href="#como-funciona" className={styles.colLink}>Cómo funciona</a>
              <a href="#control-semaforo" className={styles.colLink}>Sistema Semáforo</a>
              <a href="#conectividad" className={styles.colLink}>Conectividad & ERPs</a>
              <a href="#dashboard" className={styles.colLink}>Panel Demo interactivo</a>
              <a href="#calculadora" className={styles.colLink}>Calculadora de ahorro</a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Despacho</h4>
              <a href="#problema" className={styles.colLink}>El problema contable</a>
              <a href="#propuesta" className={styles.colLink}>Propuesta de valor</a>
              <a href="#sobre-mi" className={styles.colLink}>Sobre mí (Adrián Morant)</a>
              <a href="#contacto" className={styles.colLink}>Solicitar demostración</a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Seguridad & Legal</h4>
              <a href="#seguridad" className={styles.colLink}>Normativa RGPD</a>
              <a href="#seguridad" className={styles.colLink}>Contrato DPA</a>
              <a href="#seguridad" className={styles.colLink}>Privacidad empresarial</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Adrián Morant. Desarrollador especializado en IA y automatización contable. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
