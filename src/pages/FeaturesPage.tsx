import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardDemo from '../components/sections/DashboardDemo';
import {
  FileText,
  Scale,
  Paperclip,
  Share2,
  Landmark,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import styles from './Pages.module.css';

const DETAILED_FEATURES = [
  {
    icon: FileText,
    badge: 'Ingesta & OCR',
    title: 'Extracción Multimodal de Facturas',
    desc: 'Lectura estructurada instantánea de documentos PDF, escaneos y fotografías. Identifica de forma precisa CIF emisor y receptor, fechas, números de factura, bases imponibles y tipos de IVA desglosados (4%, 10%, 21%), recargos de equivalencia y retenciones profesionales de IRPF (15%, 7%).',
    perks: [
      'Procesamiento multicanal: buzón de correo dedicado, portal web y app PWA',
      'Extracción de tablas con múltiples tipos impositivos en una misma factura',
      'Filtro de seguridad contra documentos maliciosos o corruptos',
    ],
  },
  {
    icon: Scale,
    badge: 'Lógica PGC',
    title: 'Propuesta de Asientos en Partida Doble',
    desc: 'Generación algorítmica de apuntes contables conforme al Plan General Contable español (PYMES y General). Asigna inteligentemente las subcuentas de proveedores (400), acreedores (410), IVA soportado/repercutido (472/477), retenciones (4751) y cuentas de gasto (grupo 6) aprendiendo del histórico contable.',
    perks: [
      'Cuadre aritmético estricto verificado al céntimo (Debe = Haber)',
      'Subcuentas parametrizables a 8, 9 o 10 dígitos según el ERP de tu despacho',
      'Tratamiento de operaciones con inversión del sujeto pasivo y regímenes especiales',
    ],
  },
  {
    icon: Paperclip,
    badge: 'Trazabilidad',
    title: 'Gestión Documental Vinculada',
    desc: 'Cada apunte contable generado conserva el documento PDF original enlazado permanentemente. Permite a los contables y auditores inspeccionar el justificante con un solo clic, eliminando carpetas físicas extraviadas y simplificando requerimientos de la Agencia Tributaria.',
    perks: [
      'Visor dividido interactivo con documento y asiento contable en paralelo',
      'Archivo indexado por ejercicio fiscal, trimestre y CIF de cliente',
      'Cifrado en reposo AES-256 para máxima confidencialidad',
    ],
  },
  {
    icon: Share2,
    badge: 'Integración',
    title: 'Exportación a Ficheros Nativos de Enlace',
    desc: 'KontaPro genera directamente los archivos estándar que los programas contables tradicionales de escritorio importan de forma limpia, sin necesidad de teclear ningún campo ni modificar las bases de datos locales del despacho.',
    perks: [
      'Ficheros SUENLACE.DAT oficiales para Wolters Kluwer A3 (a3innuva / A3ASESOR)',
      'Plantillas estructuradas de diario para Sage Despachos Connected, Sage 50 y 200',
      'Ficheros de enlace para Software DELSOL (Contasol CSV estructurado) y Holded',
    ],
  },
  {
    icon: Landmark,
    badge: 'Fintech',
    title: 'Conciliación Bancaria Norma 43',
    desc: 'Lectura y procesamiento de extractos bancarios estandarizados en formato CSB 43 / Norma 43 de las principales entidades bancarias españolas. Casación automática de movimientos con facturas de clientes y proveedores.',
    perks: [
      'Asociación automática de cobros y pagos con cuentas 572 y 430/400',
      'Detección de comisiones bancarias y desglose contable en subcuentas 626',
      'Historial de casación con trazabilidad de fecha de operación y valor',
    ],
  },
  {
    icon: Calculator,
    badge: 'Fiscalidad',
    title: 'Borradores de Modelos Tributarios',
    desc: 'Cálculo previo y agregación de bases para la preparación de los modelos trimestrales de la AEAT. Facilita la comprobación rápida antes de la presentación oficial de liquidaciones.',
    perks: [
      'Borradores de Modelo 303 (IVA trimestral) con control de cuotas a compensar',
      'Modelos 111 y 115 (retenciones del trabajo, profesionales y arrendamientos)',
      'Alerta preventiva de operaciones anuales superiores a 3.000 € para el Modelo 347',
    ],
  },
];

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Funcionalidades y Capacidades Técnicas | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--blue">
              <Sparkles size={13} />
              Rigor Contable & Precisión Algorítmica
            </div>
            <h1 className={styles.pageTitle}>
              Capacidades técnicas diseñadas para <br />
              <span className={styles.highlightText}>la operativa real de una asesoría.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Sin características superfluas ni promesas comerciales vacías. Cada módulo de KontaPro 
              está concebido para resolver una tarea contable concreta con cuadre matemático estricto.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="btn btn--primary">
                <span>Solicitar Demostración Técnica</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/como-funciona" className="btn btn--outline">
                <span>Ver Flujo Paso a Paso</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de 6 Capacidades Detalladas */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {DETAILED_FEATURES.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className={styles.featureCard}>
                  <div className={styles.featureCardTop}>
                    <div className={styles.featureIconBox}>
                      <IconComp size={22} className={styles.featureIconSvg} />
                    </div>
                    <span className={styles.featureBadge}>{feat.badge}</span>
                  </div>
                  <h3 className={styles.featureTitle}>{feat.title}</h3>
                  <p className={styles.featureDesc}>{feat.desc}</p>
                  <ul className={styles.perkList}>
                    {feat.perks.map((p, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} className={styles.perkCheckIcon} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consola Demo Interactiva en Vivo */}
      <DashboardDemo />

      {/* Cierre Comercial */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Compatibilidad Garantizada</span>
              <h2 className={styles.ctaBannerTitle}>
                Integra KontaPro con tu software habitual <br />
                sin migrar bases de datos.
              </h2>
              <p className={styles.ctaBannerDesc}>
                Generamos ficheros de enlace nativos para A3, Sage, Contasol y Holded. 
                Tu equipo no tiene que reaprender sus programas diarios.
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

export default FeaturesPage;
