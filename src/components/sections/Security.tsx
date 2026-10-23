import React from 'react';
import styles from './Security.module.css';
import { useLanguage } from '../../i18n';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  FileText,
  Server,
  FileSignature,
  Scale,
} from 'lucide-react';

const SECURITY_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Diseñado bajo Controles ISO 27001',
    desc: 'Arquitectura concebida siguiendo los controles de referencia del estándar ISO/IEC 27001: gestión estricta de accesos, registros de auditoría y políticas de confidencialidad.',
  },
  {
    icon: Lock,
    title: 'Cifrado Bancario AES-256 & TLS 1.3',
    desc: 'Cifrado de alto nivel para datos contables en reposo y en tránsito. Copias de seguridad automáticas y aislamiento riguroso entre despachos.',
  },
  {
    icon: FileCheck2,
    title: 'Preparado para Veri*factu & Ley Antifraude',
    desc: 'Estructuración inalterable con encadenamiento criptográfico mediante huella SHA-256 y preparación técnica para los requisitos de facturación electrónica.',
  },
  {
    icon: Scale,
    title: 'Blindaje RGPD & Contrato DPA (Art. 28)',
    desc: 'Centros de datos ubicados en la Unión Europea. Los datos de tus clientes nunca se emplean para entrenar modelos públicos de inteligencia artificial.',
  },
  {
    icon: FileText,
    title: 'Trazabilidad y Gestión Documental',
    desc: 'Asociación directa del documento PDF original a cada apunte contable generado, permitiendo auditorías inmediatas y evitando extravíos.',
  },
  {
    icon: Server,
    title: 'Infraestructura Cloud Segura en la UE',
    desc: 'Alojamiento en centros de datos europeos de alta disponibilidad con monitorización proactiva y redundancia de servicios.',
  },
];

const Security: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="seguridad">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.header}>
            <span className="badge badge--green">Rigor Jurídico y Técnico</span>
            <h2 className={styles.title}>{t.compliance.title}</h2>
            <p className={styles.subtitle}>{t.compliance.subtitle}</p>
          </div>

          <div className={styles.grid}>
            {SECURITY_POINTS.map((pt, i) => {
              const IconComp = pt.icon;
              return (
                <div key={i} className={styles.card}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <IconComp size={22} className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.cardTitle}>{pt.title}</h3>
                  <p className={styles.cardDesc}>{pt.desc}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.bannerRow}>
            <div className={styles.bannerIconBox} aria-hidden="true">
              <FileSignature size={24} className={styles.bannerIconSvg} />
            </div>
            <div className={styles.bannerText}>
              <strong>Compromiso contractual por escrito para despachos:</strong>
              <span>
                Formalizamos acuerdos de confidencialidad (NDA) y Contratos de Encargo de Tratamiento de Datos (DPA Art. 28) antes de incorporar la documentación contable de tu asesoría.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
