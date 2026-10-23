import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoiCalculator from '../components/sections/RoiCalculator';
import { ArrowRight, Sparkles, Info } from 'lucide-react';
import styles from './Pages.module.css';

const SimulatorPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Simulador de Ahorro e Impacto Operativo | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial del Simulador */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Modelo Predictivo de Ahorro
            </div>
            <h1 className={styles.pageTitle}>
              Calcula cuánto tiempo y dinero ahorra <br />
              <span className={styles.highlightText}>tu despacho al mes.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Selecciona el volumen de facturación de tu cartera de clientes y calibra los costes 
              y horas recuperables para dedicar a asesoramiento fiscal y captación comercial.
            </p>
          </div>
        </div>
      </section>

      {/* Componente Central del Simulador con sus Parámetros y Fórmulas Exactas */}
      <RoiCalculator />

      {/* Sección Explicativa de Metodología y Transparencia Matemática */}
      <section className={styles.methodologySection}>
        <div className="container">
          <div className={styles.methodologyBox}>
            <div className={styles.methodologyHeader}>
              <Info size={20} className={styles.methodologyIcon} />
              <h2 className={styles.methodologyTitle}>Metodología y Transparencia del Cálculo</h2>
            </div>

            <div className={styles.methodologyGrid}>
              <div className={styles.methodCard}>
                <span className={styles.methodStep}>01. Tiempo Manual Estimado</span>
                <p>
                  Calculamos las horas de tecleo manual multiplicando el volumen de facturas gestionadas al mes 
                  por el tiempo medio de procesado manual (apertura de PDF, transcripción de bases, cálculo de IVA y comprobación de descuadres).
                </p>
                <div className={styles.formulaPill}>
                  Fórmula: (Facturas × Minutos) / 60 = Horas manuales brutas
                </div>
              </div>

              <div className={styles.methodCard}>
                <span className={styles.methodStep}>02. Tiempo Neto Recuperable (~82%)</span>
                <p>
                  El ~82% representa el volumen de facturas estándar y recurrentes procesadas de forma desatendida 
                  por el motor semafórico (Nivel Verde), dejando solo las excepciones para revisión asistida en 1 clic.
                </p>
                <div className={styles.formulaPill}>
                  Referencia inicial: 70 h manuales $\to$ 57 h recuperables
                </div>
              </div>

              <div className={styles.methodCard}>
                <span className={styles.methodStep}>03. Valor Económico Recuperado</span>
                <p>
                  Multiplicamos las horas devueltas al despacho por el coste medio por hora contable del sector, 
                  proyectando el impacto mensual y la rentabilidad acumulada al año.
                </p>
                <div className={styles.formulaPill}>
                  Referencia inicial: 57 h × 24 €/h = 1.368 €/mes (16.416 €/año)
                </div>
              </div>
            </div>

            <div className={styles.methodologyNotice}>
              <strong>Nota técnica aclaratoria:</strong> Cálculo ilustrativo basado en parámetros medios del sector. 
              Los resultados varían según la complejidad documental, la recurrencia de los proveedores y la calidad de los escaneos de cada cartera.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final hacia la Demo */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Comprobación Real</span>
              <h2 className={styles.ctaBannerTitle}>
                Comprueba las estimaciones con un lote <br />
                de prueba en una sesión guiada.
              </h2>
              <p className={styles.ctaBannerDesc}>
                Sin compromiso ni costes ocultos. Te mostramos el rendimiento exacto de KontaPro con tus propios documentos.
              </p>
            </div>
            <div className={styles.ctaBannerAction}>
              <Link to="/demo" className="btn btn--primary btn--lg">
                <span>Solicitar Acceso Beta para Comprobarlo</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulatorPage;
