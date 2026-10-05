import React from 'react';
import styles from './Solution.module.css';

const CAPABILITIES = [
  {
    icon: '📥',
    title: 'Recepción multicanal desatendida',
    desc: 'Buzón de correo electrónico dedicado o sincronización con Google Drive, OneDrive o carpetas locales.',
  },
  {
    icon: '⚡',
    title: 'Extracción por IA Multimodal',
    desc: 'Lectura completa: Proveedor, CIF/NIF, fecha, N.º factura, bases, tipos de IVA (4%, 10%, 21%), retenciones IRPF y total.',
  },
  {
    icon: '⚖️',
    title: 'Validación aritmética estricta',
    desc: 'Comprobación matemática de cuadre de importes y verificación de formato fiscal español antes de procesar.',
  },
  {
    icon: '🛡️',
    title: 'Detección de duplicados',
    desc: 'Alerta automática si una factura ya fue registrada por el mismo emisor, importe o número.',
  },
  {
    icon: '💡',
    title: 'Mapeo PGC con aprendizaje',
    desc: 'Propone subcuenta contable del Plan General Contable y memoriza los criterios y correcciones de tu despacho.',
  },
  {
    icon: '🔌',
    title: 'Conexión sin fricción',
    desc: 'Vía API directa o mediante generación automática de ficheros de enlace contable estándar (SUENLACE, CSV estructurado).',
  },
  {
    icon: '🚦',
    title: 'Bandeja de triaje supervisada',
    desc: 'Tu equipo solo revisa excepciones o incidencias; las facturas de alta confianza se procesan limpias.',
  },
  {
    icon: '📈',
    title: 'Escalable a futuro',
    desc: 'Arquitectura preparada para ampliar a conciliación bancaria inteligente y gestión documental avanzada.',
  },
];

const Solution: React.FC = () => {
  return (
    <section className={styles.section} id="propuesta">
      <div className="container">
        {/* Main Headline */}
        <div className={styles.top}>
          <span className="badge badge--blue">Propuesta de Valor</span>
          <h2 className={styles.headline}>
            “No cambies de software.<br />
            <span className={styles.highlight}>Automatiza lo que ocurre alrededor de él.”</span>
          </h2>
          <p className={styles.subheadline}>
            No te obligamos a sustituir herramientas como Holded, Sage, A3 o Contasol. Construimos una capa de Inteligencia Artificial que se conecta a ellas para que tu equipo trabaje más rápido, sin estrés ni errores.
          </p>
        </div>

        {/* Las dos opciones de implantación */}
        <div className={styles.optionsGrid}>
          {/* Opción A */}
          <div className={styles.optionCard}>
            <div className={styles.optionTag}>Opción A • Invisible</div>
            <h3 className={styles.optionTitle}>Integración directa en tu software actual</h3>
            <p className={styles.optionDesc}>
              Conectamos los flujos de IA directamente con tu ERP contable (Sage, A3, Holded, Contasol, etc.) mediante API o generación desatendida de ficheros de enlace.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Tu equipo no abre ninguna herramienta nueva</li>
              <li>✓ Los asientos aparecen directamente en los diarios de tu ERP</li>
              <li>✓ Factura en PDF adjuntada al apunte contable</li>
              <li>✓ Máxima comodidad sin curva de aprendizaje</li>
            </ul>
          </div>

          {/* Opción B */}
          <div className={`${styles.optionCard} ${styles.optionCardB}`}>
            <div className={`${styles.optionTag} ${styles.optionTagB}`}>Opción B • Centralizada</div>
            <h3 className={styles.optionTitle}>Plataforma propia a medida para tu despacho</h3>
            <p className={styles.optionDesc}>
              Si prefieres un panel propio para supervisar la facturación de todos tus clientes, gestionar bandejas de entrada, validar en lote y exportar a demanda.
            </p>
            <ul className={styles.optionList}>
              <li>✓ Panel de control web privado con roles para el equipo</li>
              <li>✓ Visor interactivo lado a lado (PDF vs Datos extraídos)</li>
              <li>✓ Métricas de horas ahorradas y estado de cada cliente</li>
              <li>✓ Exportación con un solo clic en el momento que tú elijas</li>
            </ul>
          </div>
        </div>

        {/* Capacidades Core Grid */}
        <div className={styles.capabilitiesWrapper}>
          <div className={styles.capHeader}>
            <h3 className={styles.capTitle}>Capacidades de la capa de automatización</h3>
            <span className={styles.capSub}>Diseñado con rigor financiero para despachos profesionales</span>
          </div>

          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, idx) => (
              <div key={idx} className={styles.capCard}>
                <div className={styles.capIcon}>{cap.icon}</div>
                <h4 className={styles.capItemTitle}>{cap.title}</h4>
                <p className={styles.capItemDesc}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
