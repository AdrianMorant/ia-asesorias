import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';
import DashboardDemo from '../components/sections/DashboardDemo';
import Faq from '../components/sections/Faq';
import { Sparkles } from 'lucide-react';
import styles from './Pages.module.css';

const DemoPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Solicitar Demostración Técnica & Acceso Beta | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial de la Demo */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Demostración Personalizada (20 min)
            </div>
            <h1 className={styles.pageTitle}>
              Prueba KontaPro en directo con <br />
              <span className={styles.highlightText}>las facturas reales de tu despacho.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Sin presentaciones genéricas ni diapositivas teóricas. En una sesión ejecutiva de 20 minutos 
              comprobamos la velocidad de extracción, la lógica del asiento PGC y el enlace con tu software contable actual.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario Oficial de Solicitud de Beta con Web3Forms y Protección Anti-Spam */}
      <Contact />

      {/* Previsualización de la Consola Operativa */}
      <section className={styles.demoPreviewSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className="badge badge--navy">Entorno de Prueba</span>
            <h2 className={styles.sectionTitle}>Qué verás en la sesión de demostración</h2>
            <p className={styles.sectionSubtitle}>
              Navegaremos por la consola operativa con datos reales o simulados para evaluar la compatibilidad con tu operativa.
            </p>
          </div>
        </div>
        <DashboardDemo />
      </section>

      {/* Preguntas Frecuentes sobre la Beta y la Puesta en Marcha */}
      <Faq />
    </div>
  );
};

export default DemoPage;
