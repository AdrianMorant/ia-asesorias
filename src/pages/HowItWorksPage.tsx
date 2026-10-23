import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HowItWorks from '../components/sections/HowItWorks';
import Triage from '../components/sections/Triage';
import DashboardDemo from '../components/sections/DashboardDemo';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Pages.module.css';

const HowItWorksPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cómo Funciona KontaPro | Recorrido Operativo & Triaje Semafórico';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Operativa Contable Paso a Paso
            </div>
            <h1 className={styles.pageTitle}>
              De la factura física o PDF al asiento <br />
              <span className={styles.highlightText}>en tu ERP en cuatro etapas.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              KontaPro actúa como un filtro inteligente: procesa el volumen repetitivo de forma desatendida 
              y sitúa en bandeja de revisión rápida únicamente las operaciones que requieren criterio profesional.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="btn btn--primary">
                <span>Solicitar Sesión Técnica (20 min)</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/simulador" className="btn btn--outline">
                <span>Simular Impacto en Horas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo en 4 Pasos Detallados */}
      <HowItWorks />

      {/* Motor Semafórico Verde / Amarillo / Rojo */}
      <Triage />

      {/* Consola Operativa en Demostración */}
      <DashboardDemo />

      {/* Cierre Editorial */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Supervisión Profesional</span>
              <h2 className={styles.ctaBannerTitle}>
                La IA propone los asientos. <br />
                Tu despacho mantiene el control total.
              </h2>
              <p className={styles.ctaBannerDesc}>
                Sin cajas negras ni automatizaciones ciegas. Cada apunte cuenta con comprobación matemática 
                y el documento original asociado para auditoría inmediata.
              </p>
            </div>
            <div className={styles.ctaBannerAction}>
              <Link to="/demo" className="btn btn--primary btn--lg">
                <span>Solicitar Acceso a la Beta</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
