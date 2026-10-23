import React, { useState, useEffect } from 'react';
import styles from './DashboardDemo.module.css';
import { useLanguage } from '../../i18n';
import {
  FileText,
  BookOpen,
  Landmark,
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Scan,
  Send,
  SlidersHorizontal,
  Check,
  Building2,
} from 'lucide-react';

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
    proveedor: 'Suministros Energéticos Ibéricos',
    fecha: '15/05/2026',
    importe: '428,50 €',
    cuenta: '628.0001 (Electricidad)',
    estado: 'Validada',
    confianza: '99.8%',
  },
  {
    id: 'FAC-2026-902',
    cliente: 'Restauración Mediterránea',
    proveedor: 'Distribuciones de Hostelería S.A.',
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
    proveedor: 'Telecomunicaciones y Redes S.A.',
    fecha: '14/05/2026',
    importe: '189,40 €',
    cuenta: '629.0004 (Comunicaciones)',
    estado: 'Validada',
    confianza: '99.5%',
  },
  {
    id: 'FAC-2026-905',
    cliente: 'Consultoría Tecnológica 4.0',
    proveedor: 'Servicios Cloud EMEA',
    fecha: 'Hoy 14:22',
    importe: '312,20 €',
    cuenta: '629.0008 (Servicios Cloud)',
    estado: 'Procesando',
    confianza: 'En curso...',
  },
];

const JOURNAL_DATA = [
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '628.0001', concepto: 'Fra. Suministros May-26', debe: '354,13 €', haber: '—', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '472.0021', concepto: 'IVA Soportado 21%', debe: '74,37 €', haber: '—', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0841', fecha: '15/05/2026', cuenta: '410.0381', concepto: 'Acreedor Suministros', debe: '—', haber: '428,50 €', cliente: 'Gómez & Asociados' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '600.0001', concepto: 'Fra. Hostelería Alimentación', debe: '1.522,40 €', haber: '—', cliente: 'Restauración Med.' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '472.0021', concepto: 'IVA Soportado 21%', debe: '319,70 €', haber: '—', cliente: 'Restauración Med.' },
  { asiento: 'AST-0842', fecha: '15/05/2026', cuenta: '400.0102', concepto: 'Proveedor Alimentación', debe: '—', haber: '1.842,10 €', cliente: 'Restauración Med.' },
];

const RECON_DATA = [
  { ref: 'CSB43-9821', entidad: 'Entidad Bancaria A', fecha: '15/05/2026', concepto: 'REC. SUMINISTROS ENERGIA', importe: '-428,50 €', match: 'FAC-2026-901', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9822', entidad: 'Entidad Bancaria B', fecha: '15/05/2026', concepto: 'TRANSF. DISTRIB. HOSTELERIA', importe: '-1.842,10 €', match: 'FAC-2026-902', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9823', entidad: 'Entidad Bancaria C', fecha: '14/05/2026', concepto: 'REC. TELECOMUNICACIONES', importe: '-189,40 €', match: 'FAC-2026-904', estado: 'Conciliado 100%' },
  { ref: 'CSB43-9824', entidad: 'Entidad Bancaria D', fecha: '14/05/2026', concepto: 'COBRO TPV RESTAURANTE', importe: '+3.410,00 €', match: 'Vtas Diarias Z-1405', estado: 'Conciliado 100%' },
];

const TAX_DATA = [
  { modelo: 'Modelo 303', desc: 'IVA Autoliquidación Trimestral (Borrador)', periodo: '2T 2026', resultado: '6.480,20 € a ingresar', estado: 'Borrador Cuadrado' },
  { modelo: 'Modelo 111', desc: 'Retenciones del Trabajo y Profesionales', periodo: '2T 2026', resultado: '2.840,00 € a ingresar', estado: 'Borrador Cuadrado' },
  { modelo: 'Modelo 115', desc: 'Retenciones sobre Arrendamientos Urbanos', periodo: '2T 2026', resultado: '950,00 € a ingresar', estado: 'Borrador Cuadrado' },
  { modelo: 'Modelo 130', desc: 'Pago Fraccionado IRPF Estimación Directa', periodo: '2T 2026', resultado: '1.740,50 € a ingresar', estado: 'Borrador Cuadrado' },
];

const PIPELINE_FLOW_STEPS = [
  { id: 1, title: '1. Recepción', icon: FileText, desc: 'Ingesta del documento digital' },
  { id: 2, title: '2. Procesamiento OCR', icon: Scan, desc: 'Extracción geométrica y lectura' },
  { id: 3, title: '3. Extracción de Campos', icon: SlidersHorizontal, desc: 'Detección de NIF, bases y cuotas' },
  { id: 4, title: '4. Semáforo Fiscal', icon: Scale, desc: 'Auditoría tributaria automática' },
  { id: 5, title: '5. Asiento & Enlace ERP', icon: Send, desc: 'Cuadre en partida doble verificado' },
];

const DashboardDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'facturas' | 'asientos' | 'conciliacion' | 'modelos'>('facturas');
  const [filter, setFilter] = useState<'Todos' | 'Validada' | 'Revisar' | 'Procesando'>('Todos');
  const { t } = useLanguage();

  // Estado del flujo interactivo animado de demostración
  const [flowStep, setFlowStep] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFlowStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

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

        {/* ETIQUETA VISIBLE OBLIGATORIA DE DEMO CON DATOS SIMULADOS */}
        <div className={styles.demoDisclaimerBanner}>
          <Info size={16} className={styles.disclaimerIcon} />
          <span>
            <strong>DEMO · DATOS SIMULADOS:</strong> Los importes, empresas, facturas y movimientos mostrados a continuación son ficticios con fines estrictamente ilustrativos de la interfaz de KontaPro.
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            MÓDULO ESTELAR: SIMULADOR DE FLUJO DE TRIAJE EN TIEMPO REAL
        ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.pipelineShowcaseCard}>
          <div className={styles.pipelineHeader}>
            <div className={styles.pipelineTitleBlock}>
              <div className={styles.pipelineLiveDot}></div>
              <h3 className={styles.pipelineMainHeading}>Flujo Interactivo de Factura a Asiento Cuadrado</h3>
              <span className={styles.simBadgeSmall}>DEMO · DATOS SIMULADOS</span>
            </div>

            <div className={styles.pipelineControls}>
              <button
                type="button"
                className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pausar simulación' : 'Reproducir simulación en directo'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pausar simulación' : '▶ Simulación en vivo'}</span>
              </button>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setFlowStep(1);
                  setIsApproved(false);
                }}
                title="Reiniciar flujo desde el paso 1"
                aria-label="Reiniciar flujo"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Stepper Navegable */}
          <div className={styles.stepperTrack} role="tablist" aria-label="Pasos del flujo contable">
            {PIPELINE_FLOW_STEPS.map((s) => {
              const StepIcon = s.icon;
              const isActive = flowStep === s.id;
              const isPast = flowStep > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ''} ${isPast ? styles.stepButtonPast : ''}`}
                  onClick={() => setFlowStep(s.id)}
                >
                  <div className={styles.stepIconBubble}>
                    {isPast ? <Check size={14} /> : <StepIcon size={14} />}
                  </div>
                  <div className={styles.stepMetaText}>
                    <span className={styles.stepTitleText}>{s.title}</span>
                    <span className={styles.stepDescText}>{s.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Visual Dual: Documento Ficticio vs. Consola de Extracción */}
          <div className={styles.interactiveStage}>
            {/* LADO IZQUIERDO: Factura Digital Simulada */}
            <div className={styles.docSide}>
              <div className={styles.docHeader}>
                <div className={styles.docHeaderLeft}>
                  <FileText size={15} className={styles.docHeaderIcon} />
                  <span className={styles.docFileName}>FACTURA_SUMINISTROS_MAY26.PDF</span>
                </div>
                <span className={styles.docStatusBadge}>
                  {flowStep === 1 && 'Documento Recibido'}
                  {flowStep === 2 && 'Escaneando OCR...'}
                  {flowStep === 3 && 'Campos Identificados'}
                  {flowStep === 4 && 'Auditoría Fiscal OK'}
                  {flowStep === 5 && 'Asiento Generado'}
                </span>
              </div>

              <div className={styles.mockInvoiceSheet}>
                {flowStep === 2 && <div className={styles.scanBeamLine} aria-hidden="true"></div>}

                <div className={styles.mockInvoiceTop}>
                  <div className={`${styles.fieldBox} ${flowStep >= 3 ? styles.fieldBoxHighlighted : ''}`}>
                    <span className={styles.fieldTag}>PROVEEDOR / EMISOR</span>
                    <strong className={styles.fieldVal}>Suministros Energéticos Ibéricos S.A.</strong>
                    <span className={styles.fieldSub}>NIF: A-84920183 · Reg. Mercantil Madrid</span>
                  </div>
                  <div className={`${styles.fieldBox} ${flowStep >= 3 ? styles.fieldBoxHighlighted : ''}`}>
                    <span className={styles.fieldTag}>CLIENTE DEL DESPACHO</span>
                    <strong className={styles.fieldVal}>Gómez & Asociados Asesores S.L.</strong>
                    <span className={styles.fieldSub}>NIF: B-93821049</span>
                  </div>
                </div>

                <div className={styles.mockInvoiceDetails}>
                  <div className={`${styles.fieldBox} ${flowStep >= 3 ? styles.fieldBoxHighlighted : ''}`}>
                    <span className={styles.fieldTag}>N.º FACTURA</span>
                    <span className={styles.fieldValMono}>FAC-2026-901</span>
                  </div>
                  <div className={`${styles.fieldBox} ${flowStep >= 3 ? styles.fieldBoxHighlighted : ''}`}>
                    <span className={styles.fieldTag}>FECHA EMISIÓN</span>
                    <span className={styles.fieldValMono}>15/05/2026</span>
                  </div>
                  <div className={`${styles.fieldBox} ${flowStep >= 3 ? styles.fieldBoxHighlighted : ''}`}>
                    <span className={styles.fieldTag}>CONCEPTO</span>
                    <span className={styles.fieldVal}>Suministro Eléctrico Sede Mayo 2026</span>
                  </div>
                </div>

                <div className={styles.mockInvoiceTable}>
                  <div className={styles.mockTableHeader}>
                    <span>Concepto Facturado</span>
                    <span>Base</span>
                    <span>% IVA</span>
                    <span>Total</span>
                  </div>
                  <div className={`${styles.mockTableRow} ${flowStep >= 3 ? styles.rowHighlighted : ''}`}>
                    <span>Consumo Eléctrico Tarifa 3.0TD</span>
                    <span className={styles.valMono}>354,13 €</span>
                    <span className={styles.valMono}>21% (74,37 €)</span>
                    <strong className={styles.valMonoHighlight}>428,50 €</strong>
                  </div>
                </div>

                <div className={styles.mockInvoiceFooter}>
                  <div className={styles.vatBreakdown}>
                    <span>Base 21%: <strong>354,13 €</strong></span>
                    <span>Cuota IVA: <strong>74,37 €</strong></span>
                  </div>
                  <div className={`${styles.grandTotalBox} ${flowStep >= 3 ? styles.grandTotalBoxActive : ''}`}>
                    <span className={styles.grandTotalLabel}>TOTAL A PAGAR</span>
                    <span className={styles.grandTotalVal}>428,50 €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: Consola de Inteligencia & Asiento */}
            <div className={styles.consoleSide}>
              <div className={styles.consoleHeader}>
                <span className={styles.consoleStepBadge}>
                  Paso {flowStep} de 5: {PIPELINE_FLOW_STEPS[flowStep - 1]?.desc}
                </span>
                <span className={styles.ocrEngineTag}>Motor Multimodal KontaPro</span>
              </div>

              <div className={styles.consoleBody}>
                {/* Paso 1: Recepción */}
                {flowStep === 1 && (
                  <div className={styles.stepCardContent}>
                    <div className={styles.infoLead}>
                      <Building2 size={24} className={styles.stepHeroIcon} />
                      <div>
                        <h4>Documento ficticio recibido en buzón seguro</h4>
                        <p>Factura indexada en memoria cifrada temporal en centro de datos de la UE.</p>
                      </div>
                    </div>
                    <div className={styles.metricRow}>
                      <div className={styles.metricBox}>
                        <span className={styles.metricLabel}>Canal</span>
                        <strong className={styles.metricVal}>Buzón Email / PWA</strong>
                      </div>
                      <div className={styles.metricBox}>
                        <span className={styles.metricLabel}>Formato</span>
                        <strong className={styles.metricVal}>PDF Nativo Vectorial</strong>
                      </div>
                      <div className={styles.metricBox}>
                        <span className={styles.metricLabel}>Resolución</span>
                        <strong className={styles.metricVal}>300 DPI (Óptima)</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn--primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => setFlowStep(2)}
                    >
                      <span>Continuar: Ejecutar OCR y Extracción</span>
                    </button>
                  </div>
                )}

                {/* Paso 2: Procesamiento OCR */}
                {flowStep === 2 && (
                  <div className={styles.stepCardContent}>
                    <div className={styles.progressContainer}>
                      <div className={styles.progressTop}>
                        <span>Reconocimiento de caracteres y trazado espacial...</span>
                        <strong>100% Completado</strong>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                      </div>
                    </div>
                    <div className={styles.checklistGrid}>
                      <div className={styles.checklistItem}>
                        <CheckCircle2 size={15} className={styles.checkIconOk} />
                        <span>Contraste y orientación verificados</span>
                      </div>
                      <div className={styles.checklistItem}>
                        <CheckCircle2 size={15} className={styles.checkIconOk} />
                        <span>Desglose de tipos impositivos detectado (IVA 21%)</span>
                      </div>
                      <div className={styles.checklistItem}>
                        <CheckCircle2 size={15} className={styles.checkIconOk} />
                        <span>Validación contra censo de proveedores habituales</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn--primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => setFlowStep(3)}
                    >
                      <span>Ver campos extraídos</span>
                    </button>
                  </div>
                )}

                {/* Paso 3: Extracción de Campos */}
                {flowStep === 3 && (
                  <div className={styles.stepCardContent}>
                    <div className={styles.extractedGrid}>
                      <div className={styles.extractedCard}>
                        <span className={styles.extLabel}>Subcuenta de Gasto Sugerida</span>
                        <strong className={styles.extHighlight}>628.0001 (Electricidad)</strong>
                        <span className={styles.extConfidence}>Fiabilidad: 99.8% (Histórico despacho)</span>
                      </div>
                      <div className={styles.extractedCard}>
                        <span className={styles.extLabel}>Cuadre Aritmético</span>
                        <strong className={styles.extVal}>354,13 + 74,37 = 428,50 €</strong>
                        <span className={styles.extOk}>✓ Descuadre 0,00 €</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn--primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => setFlowStep(4)}
                    >
                      <span>Comprobar con Semáforo Fiscal</span>
                    </button>
                  </div>
                )}

                {/* Paso 4: Semáforo Fiscal */}
                {flowStep === 4 && (
                  <div className={styles.stepCardContent}>
                    <div className={styles.triageBannerGreen}>
                      <div className={styles.triageDotGreen}></div>
                      <div>
                        <strong>SEMÁFORO VERDE: GASTO 100% DEDUCIBLE</strong>
                        <p>Correlación directa con la actividad económica del cliente. NIF emisor activo y validado.</p>
                      </div>
                    </div>
                    <div className={styles.ruleChips}>
                      <span className={styles.ruleChip}>✓ Deducible en IRPF / IS</span>
                      <span className={styles.ruleChip}>✓ Cuota IVA deducible al 100%</span>
                      <span className={styles.ruleChip}>✓ Sin alertas de duplicidad</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn--primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => setFlowStep(5)}
                    >
                      <span>Generar Asiento en Partida Doble</span>
                    </button>
                  </div>
                )}

                {/* Paso 5: Asiento PGC & Enlace ERP */}
                {flowStep === 5 && (
                  <div className={styles.stepCardContent}>
                    <div className={styles.asientoBox}>
                      <div className={styles.asientoBoxHeader}>
                        <strong>Asiento Cuadrado #AST-0841</strong>
                        <span className={styles.pgcTag}>Plan General Contable</span>
                      </div>
                      <table className={styles.miniTable}>
                        <thead>
                          <tr>
                            <th>Cuenta</th>
                            <th>Concepto</th>
                            <th>Debe</th>
                            <th>Haber</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>628.0001</strong></td>
                            <td>Consumo eléctrico mayo</td>
                            <td className={styles.amountCol}>354,13 €</td>
                            <td>—</td>
                          </tr>
                          <tr>
                            <td><strong>472.0021</strong></td>
                            <td>H.P. IVA Soportado (21%)</td>
                            <td className={styles.amountCol}>74,37 €</td>
                            <td>—</td>
                          </tr>
                          <tr>
                            <td><strong>410.0381</strong></td>
                            <td>Suministros Energéticos</td>
                            <td>—</td>
                            <td className={styles.amountTotalCol}>428,50 €</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={styles.asientoTotalVerify}>
                        <span>Suma Debe: <strong>428,50 €</strong></span>
                        <span>Suma Haber: <strong>428,50 €</strong></span>
                        <span className={styles.squareStatus}>✓ Cuadre Perfecto</span>
                      </div>
                    </div>

                    <div className={styles.approvalActionRow}>
                      <button
                        type="button"
                        className={`${styles.approveBtn} ${isApproved ? styles.approveBtnSuccess : ''}`}
                        onClick={() => setIsApproved(true)}
                      >
                        {isApproved ? (
                          <>
                            <CheckCircle2 size={16} />
                            <span>¡Asiento Validado y Enlazado a A3/Sage!</span>
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>Validar en 1 Clic (El asesor siempre decide)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CONSOLA OPERATIVA COMPLETA CON VISTAS MASIVAS (TABS)
        ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.dashboardFrame} id="dashboard">
          {/* Top Bar */}
          <div className={styles.frameHeader}>
            <div className={styles.leftBrand}>
              <span className={styles.dotLive} aria-hidden="true"></span>
              <span className={styles.brandTitle}>KontaPro Suite — Consola Operativa del Despacho</span>
              <span className={styles.simBadge}>DEMO · DATOS SIMULADOS</span>
            </div>
            <div className={styles.syncStatus}>
              <span>Formato de enlace compatible con A3 · Sage · Contasol</span>
            </div>
          </div>

          {/* Key Metrics Cards (Métricas ilustrativas de simulación) */}
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}>Facturas procesadas demo</span>
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
              <span className={styles.kpiLabel}>Tiempo recuperado est.</span>
              <span className={styles.kpiValSaved}>142 h</span>
              <span className={styles.kpiSubSaved}>~17,7 jornadas devueltas</span>
            </div>
          </div>

          {/* View Selector Tabs con Iconos Lucide */}
          <div className={styles.viewSelectorBar}>
            <div className={styles.mainTabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'facturas'}
                className={`${styles.mainTabBtn} ${activeView === 'facturas' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('facturas')}
              >
                <FileText size={15} />
                1. Triaje de Facturas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'asientos'}
                className={`${styles.mainTabBtn} ${activeView === 'asientos' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('asientos')}
              >
                <BookOpen size={15} />
                2. Diario & Asientos PGC
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'conciliacion'}
                className={`${styles.mainTabBtn} ${activeView === 'conciliacion' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('conciliacion')}
              >
                <Landmark size={15} />
                3. Conciliación Norma 43
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'modelos'}
                className={`${styles.mainTabBtn} ${activeView === 'modelos' ? styles.mainTabBtnActive : ''}`}
                onClick={() => setActiveView('modelos')}
              >
                <Scale size={15} />
                4. Modelos Fiscales (Borrador)
              </button>
            </div>

            <span className={styles.simFootnote}>
              <Sparkles size={13} className={styles.simSparkle} />
              Entorno Demostrativo · Datos Ficticios
            </span>
          </div>

          {/* Dynamic Content Views */}
          <div className={styles.tableWrapper}>
            {activeView === 'facturas' && (
              <>
                <div className={styles.tableToolbar}>
                  <div>
                    <h4 className={styles.tableTitle}>Bandeja de Facturas y Semáforo Fiscal</h4>
                    <span className={styles.tableCount}>Mostrando 5 facturas simuladas para demostración</span>
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
                        <th>Fiabilidad</th>
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
                              <span className={styles.statusValidada}>
                                <CheckCircle2 size={13} /> Validada
                              </span>
                            )}
                            {inv.estado === 'Revisar' && (
                              <span className={styles.statusRevisar}>
                                <AlertCircle size={13} /> Revisar
                              </span>
                            )}
                            {inv.estado === 'Procesando' && (
                              <span className={styles.statusProcesando}>
                                <Loader2 size={13} className={styles.spinIcon} /> En curso
                              </span>
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
                  <span className="badge badge--green">Compatible con importación a A3 / Sage / Contasol</span>
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
                    <span className={styles.tableCount}>Casación de extractos bancarios estandarizados con facturas</span>
                  </div>
                  <span className="badge badge--blue">CSB 43 / PSD2 Compatible</span>
                </div>

                <div className={styles.scrollContainer}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>Referencia</th>
                        <th>Entidad Emisora</th>
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
                          <td><strong>{row.entidad}</strong></td>
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
                    <h4 className={styles.tableTitle}>Generador de Modelos Oficiales AEAT (Simulación de Borradores)</h4>
                    <span className={styles.tableCount}>Borradores trimestrales calculados a partir de los diarios contables</span>
                  </div>
                  <span className="badge badge--navy">Borrador Tributario</span>
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
