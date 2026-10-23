import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import styles from './Pages.module.css';

const BETA_CONDITIONS = [
  {
    step: '01',
    title: 'Evaluación Técnica Inicial (20 min)',
    desc: 'Sesión remota personalizada donde verificamos con un lote de facturas de tu despacho la velocidad de extracción y la exactitud en la propuesta de asientos.',
  },
  {
    step: '02',
    title: 'Validación del Enlace con tu ERP',
    desc: 'Comprobamos la compatibilidad y la importación limpia de los ficheros generados en tu programa contable habitual (Wolters Kluwer A3, Sage, Contasol o Holded).',
  },
  {
    step: '03',
    title: 'Periodo de Prueba Guiado',
    desc: 'Acceso a la plataforma para procesar empresas piloto de tu cartera con acompañamiento e interlocución directa de nuestros ingenieros de software.',
  },
];

const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Condiciones de Acceso & Beta Cerrada | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial de Precios y Condiciones */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Acceso Comercial Controlado
            </div>
            <h1 className={styles.pageTitle}>
              Beta Cerrada con plazas limitadas <br />
              <span className={styles.highlightText}>para asesorías y despachos.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Priorizamos la calidad del acompañamiento técnico frente al volumen masivo. 
              Por ello, no publicamos tarifas genéricas automáticas: adaptamos las condiciones al volumen 
              documental y al software contable de tu cartera.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="btn btn--primary">
                <span>Solicitar Plaza en la Beta</span>
                <ArrowRight size={16} />
              </Link>
              <a href="tel:+34686766266" className="btn btn--outline">
                <PhoneCall size={16} />
                <span>Hablar con el Equipo Técnico</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tarjeta Destacada de Compromiso de Beta */}
      <section className={styles.pricingCardSection}>
        <div className="container">
          <div className={styles.betaCard}>
            <div className={styles.betaCardTop}>
              <div className={styles.betaStatusPill}>
                <span className={styles.pulseDot}></span>
                BETA CERRADA 2026 · PLAZAS SELECCIONADAS
              </div>
              <h2 className={styles.betaCardTitle}>Plan de Incorporación Asistida para Despachos</h2>
              <p className={styles.betaCardSubtitle}>
                Diseñado para directores de asesoría y responsables de departamento contable que buscan 
                automatizar la carga mecánica de trabajo manteniendo el control y la supervisión del equipo.
              </p>
            </div>

            <div className={styles.betaPerksGrid}>
              <div className={styles.betaPerkItem}>
                <CheckCircle2 size={18} className={styles.betaPerkIcon} />
                <div>
                  <strong>Sin compromiso de permanencia</strong>
                  <span>Evalúa el funcionamiento real en tu entorno antes de tomar cualquier decisión de contratación.</span>
                </div>
              </div>

              <div className={styles.betaPerkItem}>
                <CheckCircle2 size={18} className={styles.betaPerkIcon} />
                <div>
                  <strong>Soporte 1 a 1 directo con ingenieros</strong>
                  <span>Sin intermediarios ni bots genéricos. Interlocución directa con los desarrolladores del producto.</span>
                </div>
              </div>

              <div className={styles.betaPerkItem}>
                <CheckCircle2 size={18} className={styles.betaPerkIcon} />
                <div>
                  <strong>Configuración de subcuentas a medida</strong>
                  <span>Adaptamos las longitudes del plan contable (8, 9 o 10 dígitos) según la estructura de tus clientes.</span>
                </div>
              </div>

              <div className={styles.betaPerkItem}>
                <CheckCircle2 size={18} className={styles.betaPerkIcon} />
                <div>
                  <strong>Formalización legal previa (DPA Art. 28)</strong>
                  <span>Garantía de confidencialidad y cumplimiento riguroso del RGPD antes de procesar documentos.</span>
                </div>
              </div>
            </div>

            <div className={styles.betaCardFooter}>
              <div className={styles.betaFooterTexts}>
                <span className={styles.betaPriceNote}>Condiciones comerciales transparentes</span>
                <span className={styles.betaPriceSub}>Tarifas adaptadas al volumen de facturas de tu cartera tras la sesión técnica.</span>
              </div>
              <Link to="/demo" className="btn btn--primary btn--lg">
                <span>Solicitar Estudio de Cartera</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso en 3 Pasos */}
      <section className={styles.stepsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className="badge badge--navy">El Proceso de Entrada</span>
            <h2 className={styles.sectionTitle}>Cómo incorporamos tu despacho a KontaPro</h2>
            <p className={styles.sectionSubtitle}>
              Tres pasos ágiles y transparentes para validar la viabilidad técnica sin alterar tu día a día.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {BETA_CONDITIONS.map((c, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{c.step}</span>
                <h3 className={styles.stepTitle}>{c.title}</h3>
                <p className={styles.stepDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Atención Telefónica Directa</span>
              <h2 className={styles.ctaBannerTitle}>
                ¿Prefieres consultar las condiciones por teléfono?
              </h2>
              <p className={styles.ctaBannerDesc}>
                Nuestro equipo técnico está disponible para resolver dudas sobre compatibilidad con tu ERP o volumen de clientes.
              </p>
            </div>
            <div className={styles.ctaBannerAction}>
              <a href="tel:+34686766266" className="btn btn--primary btn--lg">
                <PhoneCall size={18} />
                <span>Llamar al +34 686 766 266</span>
              </a>
              <span className={styles.ctaHint}>Lunes a Viernes · 9:00 a 19:00</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
