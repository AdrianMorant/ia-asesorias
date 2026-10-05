import React from 'react';
import styles from './Modalities.module.css';

const Modalities: React.FC = () => {
  return (
    <section className={styles.section} id="modalidades">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Flexibilidad Total</span>
          <h2 className={styles.title}>Dos formas de implantación según la necesidad de tu despacho</h2>
          <p className={styles.subtitle}>
            Cada asesoría tiene su ritmo y organización interna. Adaptamos la tecnología al flujo que te resulte más cómodo.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Modalidad 1: Integración directa */}
          <div className={styles.card}>
            <div className={styles.cardBadge}>Opción 1 • Máxima automatización</div>
            <h3 className={styles.cardTitle}>Integración directa con tu software</h3>
            <p className={styles.cardDesc}>
              Conectamos el motor de IA a tu ERP contable actual (Holded, Sage, a3innuva, etc.) mediante API o sincronizadores automáticos.
            </p>
            <div className={styles.pillContainer}>
              <span className={styles.pill}>✓ Sin cambiar de programa</span>
              <span className={styles.pill}>✓ Los asientos aparecen en tu software</span>
              <span className={styles.pill}>✓ El PDF queda adjuntado al apunte</span>
              <span className={styles.pill}>✓ Mínima fricción para tu equipo</span>
            </div>
            <div className={styles.idealFor}>
              <strong>Ideal para:</strong> Despachos que buscan un flujo 100% invisible y quieren seguir trabajando exclusivamente dentro de su herramienta de siempre.
            </div>
          </div>

          {/* Modalidad 2: Plataforma propia */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={`${styles.cardBadge} ${styles.cardBadgeFeatured}`}>Opción 2 • Control y visualización</div>
            <h3 className={styles.cardTitle}>Plataforma propia para tu despacho</h3>
            <p className={styles.cardDesc}>
              Te facilitamos una interfaz web privada y segura para tu despacho donde gestionar clientes, revisar facturas dudosas en lote y exportar cuando decidas.
            </p>
            <div className={styles.pillContainer}>
              <span className={styles.pill}>✓ Panel visual con visor de PDFs lado a lado</span>
              <span className={styles.pill}>✓ Gestión organizada por clientes de la asesoría</span>
              <span className={styles.pill}>✓ Exportación flexible a Excel, CSV o software contable</span>
              <span className={styles.pill}>✓ Estadísticas de facturas procesadas y tiempos</span>
            </div>
            <div className={styles.idealFor}>
              <strong>Ideal para:</strong> Despachos que prefieren tener un panel intermedio de validación y control antes de volcar la información a la contabilidad definitiva.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modalities;
