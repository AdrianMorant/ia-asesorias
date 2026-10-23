import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import Integrations from '../components/sections/Integrations';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Pages.module.css';

const SolutionsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Soluciones para Asesorías | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial de la Página Soluciones */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Enfoque Operativo para Asesorías
            </div>
            <h1 className={styles.pageTitle}>
              Diseñado para resolver el colapso contable <br />
              <span className={styles.highlightText}>en los cierres de trimestre.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              KontaPro elimina el trabajo mecánico de transcripción de facturas y cuadre de asientos, 
              permitiendo que tu equipo mantenga su software habitual y se concentre en el asesoramiento de valor.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="btn btn--primary">
                <span>Solicitar Acceso a la Beta</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/simulador" className="btn btn--outline">
                <span>Calcular Ahorro en tu Cartera</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección El Reto del Despacho con Fotografía Real 1 */}
      <Problem />

      {/* Sección La Solución y las Dos Modalidades con Fotografía Real 2 */}
      <Solution />

      {/* Sección de Ecosistema e Integraciones */}
      <Integrations />

      {/* Banner de Cierre Editorial de Conversión */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Sesión Técnica 1 a 1</span>
              <h2 className={styles.ctaBannerTitle}>
                Comprueba cómo procesa KontaPro <br />
                las facturas reales de tu despacho.
              </h2>
              <p className={styles.ctaBannerDesc}>
                En 20 minutos y con una muestra de tus documentos: verificamos la extracción, el cuadre aritmético 
                y la exportación hacia tu programa contable habitual.
              </p>
            </div>
            <div className={styles.ctaBannerAction}>
              <Link to="/demo" className="btn btn--primary btn--lg">
                <span>Solicitar Demostración Guiada</span>
                <ArrowRight size={18} />
              </Link>
              <span className={styles.ctaHint}>Sin compromiso · Acompañamiento directo de ingenieros</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
