import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Play, RefreshCw, ShieldCheck } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const entries = [
  { acc: "628.0001", name: "Suministros", debe: "1.000,00", haber: "" },
  { acc: "472.0021", name: "H.P. IVA soportado 21%", debe: "210,00", haber: "" },
  { acc: "410.0089", name: "Acreedor · Iberdrola S.A.", debe: "", haber: "1.210,00" },
];
const erps = ["A3", "Sage", "Contasol", "Holded"];
const phaseLabels = ["Recepción", "Escaneo IA", "Asiento PGC", "Sincronización"];

function Simulation() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);
  const hl = (on: boolean) =>
    `rounded px-1 transition-all duration-500 ${on ? "bg-primary/15 text-primary ring-1 ring-primary/40" : ""}`;

  return (
    <div className="relative h-[480px] w-full">
      <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex h-full flex-col rounded-3xl border border-border bg-card/80 p-5 shadow-elegant backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          {phaseLabels.map((l, i) => (
            <div key={l} className="flex-1">
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={false}
                  animate={{ width: i < phase ? "100%" : i === phase ? "100%" : "0%" }}
                  transition={{ duration: i === phase ? 2.4 : 0.3, ease: "linear" }}
                />
              </div>
              <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider ${i === phase ? "text-primary" : "text-muted-foreground"}`}>{l}</p>
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.div
                key="invoice"
                initial={{ x: 80, opacity: 0, rotate: 4 }}
                animate={{ x: 0, opacity: 1, rotate: phase === 0 ? -2 : 0, y: [0, -6, 0] }}
                exit={{ scale: 0.9, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease, y: { repeat: Infinity, duration: 3 } }}
                className="absolute inset-x-2 sm:inset-x-6 top-2 overflow-hidden rounded-xl border border-border bg-background p-4 sm:p-5 shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-danger" />
                    <span className="text-xs sm:text-sm font-semibold text-navy truncate max-w-[180px] sm:max-w-none">factura_F2026-0412.pdf</span>
                  </div>
                  <span className="num text-xs text-muted-foreground">27/10/2026</span>
                </div>
                <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Emisor</span><span className="font-medium text-navy">Iberdrola Clientes S.A.U.</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">NIF</span><span className={`num ${hl(phase === 1)}`}>A95758389</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Base imponible</span><span className={`num ${hl(phase === 1)}`}>1.000,00 €</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">IVA 21%</span><span className={`num ${hl(phase === 1)}`}>210,00 €</span></div>
                  <div className="flex justify-between border-t border-dashed border-border pt-3"><span className="font-semibold text-navy">Total</span><span className="num font-bold text-navy">1.210,00 €</span></div>
                </div>
                {phase === 1 && (
                  <motion.div
                    className="laser absolute inset-x-0 h-0.5"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.4, ease: "easeInOut" }}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="entry"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease }}
                className="absolute inset-x-2 top-2"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-elegant">
                  <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                    <span>Asiento nº 4.812 · Partida doble</span><span>PGC 2007</span>
                  </div>
                  <div className="grid grid-cols-[65px_1fr_60px_60px] sm:grid-cols-[80px_1fr_80px_80px] gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Cuenta</span><span>Concepto</span><span className="text-right">Debe</span><span className="text-right">Haber</span>
                  </div>
                  {entries.map((e, i) => (
                    <motion.div
                      key={e.acc}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.15 }}
                      className="grid grid-cols-[65px_1fr_60px_60px] sm:grid-cols-[80px_1fr_80px_80px] gap-1.5 sm:gap-2 border-t border-border px-2.5 sm:px-4 py-2.5 text-[11px] sm:text-xs"
                    >
                      <span className="num font-medium text-primary">{e.acc}</span>
                      <span className="truncate text-navy">{e.name}</span>
                      <span className="num text-right text-navy">{e.debe}</span>
                      <span className="num text-right text-navy">{e.haber}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ backgroundColor: "color-mix(in oklab, var(--success) 40%, transparent)" }}
                    animate={{ backgroundColor: "color-mix(in oklab, var(--success) 10%, transparent)" }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="flex items-center justify-between border-t border-success/30 px-3 sm:px-4 py-2.5 sm:py-3"
                  >
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-success"><CheckCircle2 className="h-4 w-4 shrink-0" /> Cuadre Exacto</span>
                    <span className="num text-xs sm:text-sm font-bold text-success">0,00 €</span>
                  </motion.div>
                </div>
                {phase === 3 && (
                  <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {erps.map((erp, i) => (
                      <motion.div
                        key={erp}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.18 }}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background py-2.5 sm:py-3 shadow-xs"
                      >
                        <motion.span initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ delay: i * 0.18, duration: 0.8 }}>
                          <RefreshCw className="h-4 w-4 text-primary" />
                        </motion.span>
                        <span className="text-xs font-semibold text-navy">{erp}</span>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.18 }} className="text-[10px] font-medium text-success">
                          Sincronizado
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="flujo" className="relative overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-24">
      <div className="grid-pattern pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Homologado Veri*factu & Ley Antifraude
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }}
            className="mt-6 text-3xl sm:text-5xl font-extrabold leading-[1.05] text-navy md:text-6xl lg:text-[4.2rem]"
          >
            El copiloto contable IA que cuadra cada factura <span className="text-primary">al céntimo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            KontaPro extrae, clasifica y contabiliza tus facturas según el Plan General Contable y las envía a tu ERP. Tu equipo supervisa; la IA hace el resto.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }}
            className="mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3"
          >
            <a href="#calculadora" className="shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-center font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary-hover">
              <span>Calcular mi ahorro</span> <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-center font-semibold text-navy transition-colors hover:bg-muted">
              <Play className="h-4 w-4" /> <span>Ver demo en vivo</span>
            </a>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
            {[["99,7%", "precisión OCR"], ["-81,4%", "tiempo manual"]].map(([v, l]) => (
              <div key={l}><p className="num text-2xl font-bold text-navy">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9, ease }}>
          <Simulation />
        </motion.div>
      </div>
    </section>
  );
}
