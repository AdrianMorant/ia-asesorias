import React, { useState } from 'react';
import styles from './DashboardDemo.module.css';

interface InvoiceRow {
  id: string;
  cliente: string;
  proveedor: string;
  fecha: string;
  importe: string;
  cuenta: string;
  estado: 'Validada' | 'Revisar' | 'Procesando';
  confianza: string;
}

const INVOICE_DATA: InvoiceRow[] = [
  {
    id: 'FAC-2026-901',
    cliente: 'Gómez & Asociados S.L.',
    proveedor: 'Iberdrola Clientes S.A.U.',
    fecha: '15/05/2026',
    importe: '428,50 €',
    cuenta: '628.0001 (Electricidad)',
    estado: 'Validada',
    confianza: '99.8%',
  },
  {
    id: 'FAC-2026-902',
    cliente: 'Restauración Mediterránea',
    proveedor: 'Makro Autoservicio Mayorista',
    fecha: '15/05/2026',
    importe: '1.842,10 €',
    cuenta: '600.0001 (Compras)',
    estado: 'Validada',
    confianza: '98.5%',
  },
  {
    id: 'FAC-2026-903',
    cliente: 'Talleres Mecánicos del Sur',
    proveedor: 'AutoRepuestos Express S.L.',
    fecha: '14/05/2026',
    importe: '950,00 €',
    cuenta: '622.0002 (Mantenimiento)',
    estado: 'Revisar',
    confianza: '84.2%',
  },
  {
    id: 'FAC-2026-904',
    cliente: 'Inmobiliaria Costa Blanca',
    proveedor: 'Telefonica de España S.A.',
    fecha: '14/05/2026',
    importe: '189,40 €',
    cuenta: '629.0004 (Comunicaciones)',
    estado: 'Validada',
    confianza: '99.5%',
  },
  {
    id: 'FAC-2026-905',
    cliente: 'Consultoría Tecnológica 4.0',
    proveedor: 'Amazon Web Services EMEA',
    fecha: 'Hoy 14:22',
    importe: '312,20 €',
    cuenta: '629.0008 (Servicios Cloud)',
    estado: 'Procesando',
    confianza: 'En curso...',
  },
];

const DashboardDemo: React.FC = () => {
  const [filter, setFilter] = useState<'Todos' | 'Validada' | 'Revisar' | 'Procesando'>('Todos');

  const filteredInvoices =
    filter === 'Todos' ? INVOICE_DATA : INVOICE_DATA.filter((i) => i.estado === filter);

  return (
    <section className={styles.section} id="dashboard">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Supervisión en Tiempo Real</span>
          <h2 className={styles.title}>Panel de control y métricas del despacho</h2>
          <p className={styles.subtitle}>
            Una visión clara de la operativa mensual: facturas ingeridas, nivel de automatización y horas recuperadas por el equipo.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className={styles.dashboardFrame}>
          {/* Top Bar */}
          <div className={styles.frameHeader}>
            <div className={styles.leftBrand}>
              <span className={styles.dotLive}></span>
              <span className={styles.brandTitle}>Panel de Control Contable — Mayo 2026</span>
            </div>
            <div className={styles.syncStatus}>
              <span>✓ Conectado a ERP Contable</span>
              <span className={styles.lastUpdate}>Última sincronización: hace 1 minuto</span>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Facturas procesadas este mes</span>
              <span className={styles.kpiVal}>1.420</span>
              <span className={styles.kpiSub}>Ingesta 100% desatendida</span>
            </div>

            <div className={`${styles.kpiCard} ${styles.kpiCardHighlight}`}>
              <span className={styles.kpiLabel}>Asientos validados automáticamente</span>
              <span className={styles.kpiValHighlight}>1.345</span>
              <span className={styles.kpiSubHighlight}>94,7% de automatización directa</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Facturas en revisión</span>
              <span className={`${styles.kpiVal} ${styles.kpiValWarning}`}>48</span>
              <span className={styles.kpiSub}>Verificación visual en 1 clic</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Incidencias bloqueadas</span>
              <span className={`${styles.kpiVal} ${styles.kpiValDanger}`}>27</span>
              <span className={styles.kpiSub}>Duplicados o descuadres prevenidos</span>
            </div>

            <div className={`${styles.kpiCard} ${styles.kpiCardSaved}`}>
              <span className={styles.kpiLabel}>Tiempo manual ahorrado</span>
              <span className={styles.kpiValSaved}>142 h</span>
              <span className={styles.kpiSubSaved}>~17,7 jornadas de trabajo liberadas</span>
            </div>
          </div>

          {/* Table Container */}
          <div className={styles.tableWrapper}>
            <div className={styles.tableToolbar}>
              <div className={styles.tableTitleGroup}>
                <h4 className={styles.tableTitle}>Facturas Recientes en Proceso</h4>
                <span className={styles.tableCount}>Mostrando 5 de 1.420 registros</span>
              </div>

              {/* Filter Tabs */}
              <div className={styles.filterTabs}>
                {(['Todos', 'Validada', 'Revisar', 'Procesando'] as const).map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.filterBtn} ${filter === cat ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ref. Factura</th>
                    <th>Cliente del Despacho</th>
                    <th>Proveedor / Emisor</th>
                    <th>Fecha</th>
                    <th>Importe Total</th>
                    <th>Cuenta Propuesta PGC</th>
                    <th>Estado</th>
                    <th>Confianza</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.cellId}>{row.id}</td>
                      <td className={styles.cellClient}>{row.cliente}</td>
                      <td className={styles.cellProvider}>{row.proveedor}</td>
                      <td>{row.fecha}</td>
                      <td className={styles.cellAmount}>{row.importe}</td>
                      <td>
                        <span className={styles.accountBadge}>{row.cuenta}</span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusPill} ${
                            row.estado === 'Validada'
                              ? styles.statusGreen
                              : row.estado === 'Revisar'
                              ? styles.statusYellow
                              : styles.statusBlue
                          }`}
                        >
                          {row.estado === 'Validada' && '✓ '}
                          {row.estado === 'Revisar' && '⚠️ '}
                          {row.estado === 'Procesando' && '⏳ '}
                          {row.estado}
                        </span>
                      </td>
                      <td className={styles.cellConfidence}>{row.confianza}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.tableFooter}>
              <span className={styles.tableFootNote}>
                🔒 Registro cifrado e inmutable conforme al estándar de auditoría fiscal española.
              </span>
              <a href="#contacto" className={styles.tableCta}>
                Ver demo con facturas de tu despacho →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
