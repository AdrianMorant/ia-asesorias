import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Security from '../components/sections/Security';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import styles from './Pages.module.css';

const SECURITY_FRAMEWORK = [
  {
    title: 'Blindaje Jurídico RGPD (Art. 28)',
    desc: 'Actuamos como Encargado del Tratamiento formalizando por escrito el Contrato DPA (Data Processing Agreement) con cada despacho antes de iniciar cualquier prueba o procesado documental.',
    badge: 'Contrato Obligatorio',
    points: [
      'Servidores e infraestructura física ubicados íntegramente en la Unión Europea',
      'Tus datos y los de tus clientes nunca se emplean para entrenar modelos públicos de IA',
      'Derecho de supresión y portabilidad total de la información contable a demanda',
    ],
  },
  {
    title: 'Trazabilidad Veri*factu & Ley Antifraude',
    desc: 'Arquitectura concebida con registro inalterable mediante encadenamiento criptográfico con huella hash SHA-256 de cada apunte contable y su documento asociado.',
    badge: 'Preparado Técnicamente',
    points: [
      'Encadenamiento correlativo de registros inalterables para prevenir borrados no auditados',
      'Preparación técnica para los requisitos de facturación electrónica B2B y Facturae',
      'Sellado de tiempo en cada validación de factura para auditorías ante la AEAT',
    ],
  },
  {
    title: 'Arquitectura Diseñada bajo Controles ISO 27001',
    desc: 'Implementación técnica alineada con los controles de referencia del estándar ISO/IEC 27001 en seguridad de la información, gestión de accesos y monitorización de eventos.',
    badge: 'Controles de Referencia',
    points: [
      'Cifrado bancario AES-256-GCM para documentos en reposo y TLS 1.3 para comunicaciones',
      'Aislamiento lógico estricto entre despachos (arquitectura multi-inquilino segura)',
      'Copias de seguridad automáticas y redundancia de datos en centros de alta disponibilidad',
    ],
  },
];

const SecurityPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Seguridad, RGPD & Veri*factu | KontaPro Suite';
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Editorial */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <div className="badge badge--green">
              <ShieldCheck size={13} />
              Rigor Técnico y Protección Jurídica
            </div>
            <h1 className={styles.pageTitle}>
              La información fiscal de tus clientes, <br />
              <span className={styles.highlightText}>blindada con los mayores estándares.</span>
            </h1>
            <p className={styles.pageSubtitle}>
              En una asesoría, la confidencialidad documental no es negociable. KontaPro está diseñado 
              bajo las exigencias más estrictas del RGPD europeo y la normativa tributaria española.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="btn btn--primary">
                <span>Solicitar DPA y Acceso Beta</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rejilla de Marco Normativo y Jurídico */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.securityGrid}>
            {SECURITY_FRAMEWORK.map((item, idx) => (
              <div key={idx} className={styles.securityCard}>
                <div className={styles.securityCardHeader}>
                  <span className={styles.featureBadge}>{item.badge}</span>
                  <h3 className={styles.securityCardTitle}>{item.title}</h3>
                </div>
                <p className={styles.securityCardDesc}>{item.desc}</p>
                <ul className={styles.perkList}>
                  {item.points.map((pt, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className={styles.perkCheckIcon} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Componente Security Detallado */}
      <Security />

      {/* Compromiso Contractual */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBannerContent}>
              <span className="badge badge--navy">Compromiso por Escrito</span>
              <h2 className={styles.ctaBannerTitle}>
                Formalizamos el Contrato DPA Art. 28 <br />
                antes de incorporar cualquier documento.
              </h2>
              <p className={styles.ctaBannerDesc}>
                Máxima tranquilidad jurídica para tu despacho y para las empresas que confían en tus servicios.
              </p>
            </div>
            <div className={styles.ctaBannerAction}>
              <Link to="/demo" className="btn btn--primary btn--lg">
                <span>Solicitar Acceso a la Beta Segura</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
