import React from 'react';
import styles from './Problem.module.css';
import { useLanguage } from '../../i18n';
import { XCircle, CheckCircle2, Clock, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

const TRADITIONAL_STEPS = [
  'Ingesta dispersa: descarga manual de PDFs, WhatsApp y tickets físicos.',
  'Revisión secuencial: apertura de documentos uno a uno en pantalla.',
  'Picado manual: tecleo reiterado de CIF, bases imponibles, IVA e IRPF.',
  'Cuadre aritmético: comprobación manual de redondeos de céntimos.',
  'Mapeo PGC: búsqueda manual de subcuentas en históricos antiguos.',
  'Sobrecarga trimestral: jornadas saturadas y riesgo de sanciones por plazos.',
];

const AUTOMATED_STEPS = [
  'Ingesta unificada: buzón corporativo, portal de clientes y app móvil.',
  'Extracción estructurada: lectura instantánea de CIF, bases e IVA con IA.',
  'Semáforo fiscal: verificación matemática y filtro anti-duplicados.',
  'Partida doble PGC: propuesta de asiento cuadrado (Debe = Haber).',
  'Supervisión ágil: validación en un solo clic de las excepciones.',
  'Enlace nativo ERP: exportación limpia a A3, Sage, Contasol o Holded.',
];

const Problem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="problema">
      <div className="container">
        {/* Header de Sección */}
        <div className={styles.header}>
          <span className="badge badge--amber">{t.problem.badge}</span>
          <h2 className={styles.title}>{t.problem.title}</h2>
          <p className={styles.subtitle}>{t.problem.subtitle}</p>
        </div>

        {/* Bloque Editorial con Fotografía Real */}
        <div className={styles.visualStory}>
          <div className={styles.photoWrapper}>
            <img
              src="/images/contabilidad-calculadora.jpg"
              alt="Contable profesional tecleando en calculadora tradicional y portátil"
              className={styles.photo}
              loading="lazy"
              width={600}
              height={400}
            />
            <div className={styles.photoOverlay} aria-hidden="true"></div>

            {/* Tarjeta Flotante 1: Carga Horaria */}
            <div className={styles.floatCardTime}>
              <div className={styles.floatIconBoxTime}>
                <Clock className={styles.floatIcon} size={20} />
              </div>
              <div>
                <span className={styles.floatNumber}>Hasta 60%</span>
                <span className={styles.floatLabel}>de la jornada en transcripción mecánica</span>
              </div>
            </div>

            {/* Tarjeta Flotante 2: Riesgo Fiscal */}
            <div className={styles.floatCardRisk}>
              <div className={styles.floatIconBoxRisk}>
                <AlertTriangle className={styles.floatIconRisk} size={20} />
              </div>
              <div>
                <span className={styles.floatRiskTitle}>Riesgo de Descuadre</span>
                <span className={styles.floatRiskSub}>Errores involuntarios en retenciones y bases</span>
              </div>
            </div>
          </div>

          <div className={styles.storyContent}>
            <span className={styles.storyTag}>El cuello de botella contable</span>
            <h3 className={styles.storyTitle}>
              “El talento de tu despacho no debería malgastarse picando datos línea por línea.”
            </h3>
            <p className={styles.storyDesc}>
              En la mayoría de asesorías, los profesionales cualificados dedican más de la mitad de su jornada a tareas mecánicas de baja rentabilidad: abrir facturas, transcribir CIFs y comprobar con calculadora sumas de bases e impuestos.
            </p>
            <div className={styles.storyPointers}>
              <div className={styles.pointerItem}>
                <div className={styles.pointerBullet}></div>
                <div>
                  <strong>Jornadas maratonianas en cierres trimestrales</strong>
                  <p>Semanas de máxima tensión para cumplir con los modelos 303, 111 y 115.</p>
                </div>
              </div>
              <div className={styles.pointerItem}>
                <div className={styles.pointerBullet}></div>
                <div>
                  <strong>Límite artificial de crecimiento</strong>
                  <p>Cada nuevo cliente requiere más horas de picado manual en lugar de asesoramiento de valor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparativa en dos columnas: Flujo Tradicional vs Con KontaPro */}
        <div className={styles.comparisonGrid}>
          {/* Columna 1: Flujo Tradicional */}
          <div className={styles.colTraditional}>
            <div className={styles.colHeaderTrad}>
              <span className={styles.tagTraditional}>Flujo Tradicional Manual</span>
              <h3 className={styles.colTitleTrad}>Fricción operativa y riesgo fiscal</h3>
            </div>

            <ol className={styles.stepsList}>
              {TRADITIONAL_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemTrad}>
                  <XCircle className={styles.iconTrad} size={18} />
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxTrad}>
              <span className={styles.resultLabel}>Consecuencia para el despacho:</span>
              <p className={styles.resultText}>
                Sobrecarga laboral continua, riesgo de sanciones tributarias por errores humanos y dificultad para escalar la cartera de clientes.
              </p>
            </div>
          </div>

          {/* Columna 2: Con KontaPro */}
          <div className={styles.colAutomated}>
            <div className={styles.colHeaderAuto}>
              <div className={styles.tagAutoRow}>
                <span className={styles.tagAutomated}>Con KontaPro</span>
                <span className={styles.liveTagAuto}>
                  <Sparkles size={12} className={styles.sparkleIcon} />
                  Copiloto Fiscal Activo
                </span>
              </div>
              <h3 className={styles.colTitleAuto}>Automatización con rigor contable</h3>
            </div>

            <ol className={styles.stepsList}>
              {AUTOMATED_STEPS.map((step, idx) => (
                <li key={idx} className={styles.stepItemAuto}>
                  <CheckCircle2 className={styles.iconAuto} size={18} />
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.resultBoxAuto}>
              <div className={styles.resultHeaderAuto}>
                <span className={styles.resultLabelAuto}>Garantía operativa:</span>
                <ArrowRight size={16} className={styles.arrowIcon} />
              </div>
              <p className={styles.resultTextAuto}>
                Procesamiento masivo en segundos, cuadre aritmético garantizado y capacidad para asumir el doble de volumen sin saturar al equipo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
