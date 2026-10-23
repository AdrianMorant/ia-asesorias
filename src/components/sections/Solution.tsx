import React from 'react';
import styles from './Solution.module.css';
import { useLanguage } from '../../i18n';
import {
  Inbox,
  ScanText,
  Calculator,
  ShieldAlert,
  Sparkles,
  Share2,
  Sliders,
  FileCheck2,
  CheckCircle,
  Eye,
  Layers,
} from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Inbox,
    title: 'Ingesta Multicanal Unificada',
    desc: 'Buzón corporativo por empresa, portal web para clientes y app móvil PWA para tickets en movilidad.',
  },
  {
    icon: ScanText,
    title: 'Extracción Multimodal 99.8%',
    desc: 'Lectura estructurada de emisor, CIF, fechas, desglose de bases, tipos de IVA (4%, 10%, 21%) y retenciones.',
  },
  {
    icon: Calculator,
    title: 'Cuadre Aritmético Estricto',
    desc: 'Verificación algorítmica al céntimo con bloqueo preventivo automático ante discrepancias matemáticas.',
  },
  {
    icon: ShieldAlert,
    title: 'Filtro Anti-Duplicados',
    desc: 'Detección proactiva de coincidencias en emisor, número de factura o importe en el histórico contable.',
  },
  {
    icon: Sparkles,
    title: 'Asignación PGC Inteligente',
    desc: 'Propuesta automática de subcuentas del Plan General Contable aprendiendo del histórico del despacho.',
  },
  {
    icon: Share2,
    title: 'Enlace Nativo Multi-ERP',
    desc: 'Generación directa de ficheros oficiales: SUENLACE para A3, diarios Sage, CSV estructurado para Contasol y Holded.',
  },
  {
    icon: Sliders,
    title: 'Triaje por Semáforo',
    desc: 'Operativa por excepción: el volumen recurrente se valida automáticamente y el despacho solo confirma dudas en 1 clic.',
  },
  {
    icon: FileCheck2,
    title: 'Preparado para Veri*factu',
    desc: 'Encadenamiento criptográfico SHA-256 inalterable y preparación técnica para los requisitos de facturación electrónica.',
  },
];

const Solution: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="soluciones">
      <div className="container">
        {/* Main Headline */}
        <div className={styles.top}>
          <span className="badge badge--blue">{t.solution.badge}</span>
          <h2 className={styles.headline}>
            “No cambies de software contable.<br />
            <span className={styles.highlight}>Automatiza lo que ocurre alrededor de él.”</span>
          </h2>
          <p className={styles.subheadline}>
            {t.solution.subtitle}
          </p>
        </div>

        {/* Bloque Editorial con Fotografía Real 2 (Asesora en Despacho con Tablet) */}
        <div className={styles.humanTouchCard}>
          <div className={styles.humanTouchText}>
            <div className={styles.humanBadgeRow}>
              <span className={styles.humanBadge}>
                <Eye size={14} className={styles.humanBadgeIcon} />
                Criterio Contable & Supervisión Humana
              </span>
            </div>
            <h3 className={styles.humanTitle}>
              La inteligencia artificial propone los asientos.<br />
              <span className={styles.humanHighlight}>Tu equipo mantiene el control total.</span>
            </h3>
            <p className={styles.humanDesc}>
              KontaPro no es una caja negra opaca. Está concebido como un copiloto de alta precisión: clasifica las facturas, extrae las tablas de IVA y prepara el borrador del asiento en partida doble para que el contable profesional simplemente revise y valide con un clic.
            </p>

            <div className={styles.humanPerks}>
              <div className={styles.humanPerkItem}>
                <CheckCircle size={18} className={styles.humanPerkIcon} />
                <span>Visor dividido interactivo: documento original frente al asiento contable propuesto.</span>
              </div>
              <div className={styles.humanPerkItem}>
                <CheckCircle size={18} className={styles.humanPerkIcon} />
                <span>Bloqueo preventivo de descuadres antes de que toquen el libro diario de tu ERP.</span>
              </div>
              <div className={styles.humanPerkItem}>
                <CheckCircle size={18} className={styles.humanPerkIcon} />
                <span>Sin alterar la forma de trabajar ni la configuración de cuentas de tus clientes.</span>
              </div>
            </div>
          </div>

          <div className={styles.humanTouchMedia}>
            <div className={styles.humanPhotoWrapper}>
              <img
                src="/images/asesora-supervision.jpg"
                alt="Asesora contable profesional supervisando el panel con tablet y calculadora"
                className={styles.humanPhoto}
                loading="lazy"
                width={580}
                height={400}
              />
              <div className={styles.humanPhotoOverlay} aria-hidden="true"></div>

              {/* Badges Flotantes de Producto */}
              <div className={styles.floatValidationCard}>
                <div className={styles.floatDotGreen}></div>
                <div>
                  <span className={styles.floatValTitle}>Validación en 1 Clic</span>
                  <span className={styles.floatValSub}>Debe = Haber comprobado al céntimo</span>
                </div>
              </div>

              <div className={styles.floatSyncCard}>
                <Layers size={16} className={styles.floatSyncIcon} />
                <span>Enlace nativo con A3 · Sage · Contasol</span>
              </div>
            </div>
          </div>
        </div>

        {/* Las dos opciones de implantación para asesorías */}
        <div className={styles.optionsGrid}>
          {/* Opción A */}
          <div className={styles.optionCard}>
            <div className={styles.optionTag}>Opción A • Invisible</div>
            <h3 className={styles.optionTitle}>Integración desatendida en tu ERP</h3>
            <p className={styles.optionDesc}>
              Conexión directa con tu programa habitual (A3, Sage, Contasol, Holded). Los asientos se generan automáticamente en tus diarios contables sin alterar la operativa de tu equipo.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Cero curva de aprendizaje para el equipo</li>
              <li>✓ Apuntes cuadrados en el libro diario de tu ERP</li>
              <li>✓ Archivo PDF original adjunto a cada registro</li>
              <li>✓ Máxima agilidad sin cambiar de plataforma</li>
            </ul>
          </div>

          {/* Opción B */}
          <div className={`${styles.optionCard} ${styles.optionCardB}`}>
            <div className={`${styles.optionTag} ${styles.optionTagB}`}>Opción B • Centralizada</div>
            <h3 className={styles.optionTitle}>Consola web de supervisión para el despacho</h3>
            <p className={styles.optionDesc}>
              Panel unificado para controlar la facturación de toda tu cartera de clientes, bandejas de entrada inteligentes, validación en bloque y exportación a demanda.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Control multitenant con roles y permisos de equipo</li>
              <li>✓ Visor dividido interactivo (factura vs asiento PGC)</li>
              <li>✓ Métricas de rendimiento y estado de liquidaciones</li>
              <li>✓ Exportación en bloque con un solo clic</li>
            </ul>
          </div>
        </div>

        {/* Capacidades Core Grid con Iconos Vectoriales SVG */}
        <div className={styles.capabilitiesWrapper}>
          <div className={styles.capHeader}>
            <h3 className={styles.capTitle}>Capacidades tecnológicas de KontaPro</h3>
            <span className={styles.capSub}>Diseñado con rigor financiero para despachos y asesorías profesionales</span>
          </div>

          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div key={idx} className={styles.capCard}>
                  <div className={styles.capIconBox}>
                    <IconComponent size={22} className={styles.capIconSvg} />
                  </div>
                  <h4 className={styles.capItemTitle}>{cap.title}</h4>
                  <p className={styles.capItemDesc}>{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
