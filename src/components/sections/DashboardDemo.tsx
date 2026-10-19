import React, { useState } from 'react';
import styles from './DashboardDemo.module.css';
import { useLanguage } from '../../i18n';

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
    cuenta: '600.0001 (Compras mercaderías)',
    estado: 'Validada',
    confianza: '98.5%',
  },
  {
    id: 'FAC-2026-903',
    cliente: 'Talleres Mecánicos del Sur',
    proveedor: 'AutoRepuestos Express S.L.',
    fecha: '14/05/2026',
    importe: '950,00 €',
    cuenta: '622.0002 (Reparaciones)',
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

const JOURNAL_DATA = [
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '628.0001', concepto: 'Fra. Iberdrola May-26', debe: '354,13 €', haber: '—', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '472.0021', concepto: 'IVA Soportado 21%', debe: '74,37 €', haber: '—', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '410.0381', concepto: 'Iberdrola Clientes SAU', debe: '—', haber: '428,50 €', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '600.0001', concepto: 'Fra. Makro Alimentación', debe: '1.522,40 €', haber: '—', cliente: 'Restauración Med.' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '472.0021', concepto: 'IVA Soportado 21%', debe: '319,70 €', haber: '—', cliente: 'Restauración Med.' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '400.0102', concepto: 'Makro Autoservicio', debe: '—', haber: '1.842,10 €', cliente: 'Restauración Med.' },
];

const RECON_DATA = [
  { ref: 'CSB43-9821', banco: 'Banco Santander', fecha: '15/05/2026', concepto: 'REC. IBERDROLA CLIENTES', importe: '-428,50 €', match: 'FAC-2026-901', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9822', banco: 'BBVA Empresas', fecha: '15/05/2026', concepto: 'TRANSF. MAKRO AUTOSERV', importe: '-1.842,10 €', match: 'FAC-2026-902', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9823', banco: 'CaixaBank Day', fecha: '14/05/2026', concepto: 'REC. TELEFONICA ESPAÑA', importe: '-189,40 €', match: 'FAC-2026-904', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9824', banco: 'Banco Sabadell', fecha: '14/05/2026', concepto: 'COBRO TPV RESTAURANTE', importe: '+3.410,00 €', match: 'Vtas Diarias Z-1405', estado: 'Conciliado 100%' },
];

const TAX_DATA = [
  { modelo: 'Modelo 303', desc: 'IVA Autoliquidación Trimestral', periodo: '2T 2026', resultado: '6.480,20 € a ingresar', estado: 'Borrador Cuadrado' },
  { modelo: 'Modelo 111', desc: 'Retenciones del Trabajo y Profesionales', periodo: '2T 2026', resultado: '2.840,00 € a ingresar', estado: 'Listo para Exportación' },
  { modelo: 'Modelo 115', desc: 'Retenciones sobre Arrendamientos', periodo: '2T 2026', resultado: '950,00 € a ingresar', estado: 'Listo para Exportación' },
  { modelo: 'Modelo 130', desc: 'Pago Fraccionado IRPF Estimación Directa', periodo: '2T 2026', resultado: '1.740,50 € a ingresar', estado: 'Borrador Cuadrado' },
];

const DashboardDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'facturas' | 'asientos' | 'conciliacion' | 'modelos'>('facturas');
  const [filter, setFilter] = useState<'Todos' | 'Validada' | 'Revisar' | 'Procesando'>('Todos');
  const { t } = useLanguage();

  const filteredInvoices =
    filter === 'Todos' ? INVOICE_DATA : INVOICE_DATA.filter((i) => i.estado === filter);

  return (
    <section className={styles.section} id="showcase">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">{t.showcase.badge}</span>
          <h2 className={styles.title}>{t.showcase.title}</h2>
          <p className={styles.subtitle}>{t.showcase.subtitle}</p>
        </div>

        {/* Dashboard Frame */}
        <div className={styles.dashboardFrame} id="dashboard">
          {/* Top Bar */}
          <div className={styles.frameHeader}>
            <div className={styles.leftBrand}>
              <span className={styles.dotLive} aria-hidden="true"></span>
              <span className={styles.brandTitle}>KontaPro Suite — Consola Operativa del Despacho</span>
            </div>
            <div className={styles.syncStatus}>
              <span>✓ Conectado a ERP Contable (A3 / Sage / Contasol)</span>
              <span className={styles.lastUpdate}>Sincronizado hace 1 min</span>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Facturas procesadas mes</span>
              <span className={styles.kpiVal}>1.420</span>
              <span className={styles.kpiSub}>Ingesta multicanal activa</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Asientos validados</span>
              <span className={styles.kpiValHighlight}>1.345</span>
              <span className={styles.kpiSubHighlight}>94,7% automatización</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Facturas en revisión</span>
              <span className={`${styles.kpiVal} ${styles.kpiValWarning}`}>48</span>
              <span className={styles.kpiSub}>Validación en 1 clic</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Incidencias bloqueadas</span>
              <span className={`${styles.kpiVal} ${styles.kpiValDanger}`}>27</span>
              <span className={styles.kpiSub}>Descuadres prevenidos</span>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Tiempo recuperado</span>
              <span className={styles.kpiValSaved}>142 h</span>
              <span className={styles.kpiSubSaved}>~17,7 jornadas devueltas</span>
            </div>
          </div>

          {/* View Selector Tabs */}
          <div className={styles.viewSelectorBar}>
            <div className={styles.mainTabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'facturas'}
                className={`${styles.mainTabBtn} ${activeView === 'facturas' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('facturas')}
              >
                1. Triaje de Facturas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'asientos'}
                className={`${styles.mainTabBtn} ${activeView === 'asientos' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('asientos')}
              >
                2. Diario & Asientos PGC
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'conciliacion'}
                className={`${styles.mainTabBtn} ${activeView === 'conciliacion' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('conciliacion')}
              >
                3. Conciliación Norma 43
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'modelos'}
                className={`${styles.mainTabBtn} ${activeView === 'modelos' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('modelos')}
              >
                4. Modelos Fiscales AEAT
              </button>
            </div>

            <span className="badge badge--green">✓ Certificación Inmutabilidad SHA-256</span>
          </div>

          {/* Dynamic Content Views */}
          <div className={styles.tableWrapper}>
            {activeView === 'facturas' && (
              <>
                <div className={styles.tableToolbar}>
                  <div>
                    <h4 className={styles.tableTitle}>Bandeja de Facturas y Semáforo Fiscal</h4>
                    <span className={styles.tableCount}>Mostrando 5 de 1.420 facturas procesadas</span>
                  </div>

                  <div className={styles.filterTabs} role="group" aria-label="Filtro de facturas">
                    {(['Todos', 'Validada', 'Revisar', 'Procesando'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        className={`${styles.filterBtn} ${filter === st ? styles.filterBtnActive : ''}`}
                        onClick={() => setFilter(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.scrollContainer}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>N.º Factura</th>
                        <th>Empresa Cliente</th>
                        <th>Proveedor / Emisor</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Subcuenta PGC</th>
                        <th>Semáforo</th>
                        <th>Fiabilidad IA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map((inv) => (
                        <tr key={inv.id}>
                          <td className={styles.docId}>{inv.id}</td>
                          <td><strong>{inv.cliente}</strong></td>
                          <td>{inv.proveedor}</td>
                          <td>{inv.fecha}</td>
                          <td className={styles.amount}>{inv.importe}</td>
                          <td className={styles.accountCode}>{inv.cuenta}</td>
                          <td>
                            {inv.estado === 'Validada' && (
                              <span className={styles.statusValidada}>● Validada</span>
                            )}
                            {inv.estado === 'Revisar' && (
                              <span className={styles.statusRevisar}>● Revisar</span>
                            )}
                            {inv.estado === 'Procesando' && (
                              <span className={styles.statusProcesando}>● En curso</span>
                            )}
                          </td>
                          <td><strong>{inv.confianza}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeView === 'asientos' && (
              <>
                <div className={styles.tableToolbar}>
                  <div>
                    <h4 className={styles.tableTitle}>Libro Diario — Asientos Contables en Partida Doble</h4>
                    <span className={styles.tableCount}>Cuadre verificado: Debe = Haber garantizado</span>
                  </div>
                  <span className="badge badge--green">Listo para exportar a A3 (SUENLACE.DAT) / Sage / Contasol</span>
                </div>

                <div className={styles.scrollContainer}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>N.º Asiento</th>
                        <th>Fecha</th>
                        <th>Empresa Cliente</th>
                        <th>Subcuenta PGC</th>
                        <th>Concepto Asiento</th>
                        <th>Debe</th>
                        <th>Haber</th>
                      </tr>
                    </thead>
                    <tbody>
                      {JOURNAL_DATA.map((row, idx) => (
                        <tr key={idx}>
                          <td className={styles.docId}>{row.asiento}</td>
                          <td>{row.fecha}</td>
                          <td><strong>{row.cliente}</strong></td>
                          <td className={styles.accountCode}>{row.cuenta}</td>
                          <td>{row.concepto}</td>
                          <td className={styles.amount}>{row.debe}</td>
                          <td className={styles.amount}>{row.haber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeView === 'conciliacion' && (
              <>
                <div className={styles.tableToolbar}>
                  <div>
                    <h4 className={styles.tableTitle}>Conciliación Bancaria Automática — Cuaderno Norma 43</h4>
                    <span className={styles.tableCount}>Casación directa de extractos bancarios oficiales con facturas</span>
                  </div>
                  <span className="badge badge--blue">CSB 43 / PSD2 Compatible</span>
                </div>

                <div className={styles.scrollContainer}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>Referencia</th>
                        <th>Entidad Bancaria</th>
                        <th>Fecha Valor</th>
                        <th>Concepto Bancario</th>
                        <th>Importe</th>
                        <th>Factura Vinculada</th>
                        <th>Estado de Casación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECON_DATA.map((row, idx) => (
                        <tr key={idx}>
                          <td className={styles.docId}>{row.ref}</td>
                          <td><strong>{row.banco}</strong></td>
                          <td>{row.fecha}</td>
                          <td>{row.concepto}</td>
                          <td className={styles.amount}>{row.importe}</td>
                          <td><span className={styles.accountCode}>{row.match}</span></td>
                          <td><span className={styles.statusValidada}>✓ {row.estado}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeView === 'modelos' && (
              <>
                <div className={styles.tableToolbar}>
                  <div>
                    <h4 className={styles.tableTitle}>Generador de Modelos Oficiales AEAT</h4>
                    <span className={styles.tableCount}>Liquidaciones trimestrales generadas directamente a partir del diario</span>
                  </div>
                  <span className="badge badge--navy">Ficheros BOE Listos</span>
                </div>

                <div className={styles.scrollContainer}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>Modelo Tributario</th>
                        <th>Descripción Oficial</th>
                        <th>Periodo Impositivo</th>
                        <th>Resultado Liquidación</th>
                        <th>Estado Técnico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TAX_DATA.map((row, idx) => (
                        <tr key={idx}>
                          <td className={styles.docId}>{row.modelo}</td>
                          <td><strong>{row.desc}</strong></td>
                          <td>{row.periodo}</td>
                          <td className={styles.amount}>{row.resultado}</td>
                          <td><span className={styles.statusValidada}>✓ {row.estado}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
