import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Check, Landmark, ListChecks, Search } from "lucide-react";

const tabs = [
  { id: "triage", label: "Triaje de Facturas", icon: ListChecks },
  { id: "diary", label: "Libro Diario PGC", icon: BookOpen },
  { id: "bank", label: "Conciliación Norma 43", icon: Landmark },
] as const;

type Status = "ok" | "review" | "alert";
const invoicesSeed: { id: string; prov: string; nif: string; total: string; status: Status; note: string }[] = [
  { id: "F-0412", prov: "Iberdrola Clientes", nif: "A95758389", total: "1.210,00", status: "ok", note: "Cuadre exacto" },
  { id: "F-0413", prov: "Telefónica España", nif: "A82018474", total: "84,70", status: "ok", note: "Cuadre exacto" },
  { id: "F-0414", prov: "Papelería Ruiz S.L.", nif: "B12345678", total: "312,18", status: "review", note: "IVA mixto 10%/21%" },
  { id: "F-0415", prov: "Amazon EU S.à r.l.", nif: "W0184081H", total: "59,99", status: "review", note: "Operación intracomunitaria" },
  { id: "F-0416", prov: "Proveedor desconocido", nif: "B0000000X", total: "2.450,00", status: "alert", note: "NIF no válido en censo AEAT" },
];
const statusStyle: Record<Status, string> = {
  ok: "bg-success/10 text-success",
  review: "bg-warning/15 text-warning",
  alert: "bg-danger/10 text-danger",
};
const statusLabel: Record<Status, string> = { ok: "Validada", review: "Supervisar", alert: "Alerta" };

const diary = [
  ["4.812", "27/10", "628.0001", "Suministros Iberdrola", "1.000,00", ""],
  ["4.812", "27/10", "472.0021", "IVA soportado 21%", "210,00", ""],
  ["4.812", "27/10", "410.0089", "Iberdrola Clientes", "", "1.210,00"],
  ["4.813", "27/10", "629.0003", "Telefonía", "70,00", ""],
  ["4.813", "27/10", "472.0021", "IVA soportado 21%", "14,70", ""],
  ["4.813", "27/10", "410.0102", "Telefónica España", "", "84,70"],
];

const bank = [
  { date: "26/10", concept: "ADEUDO IBERDROLA CLIENTES", amt: "-1.210,00", match: "F-0412" },
  { date: "25/10", concept: "RECIBO TELEFONICA", amt: "-84,70", match: "F-0413" },
  { date: "24/10", concept: "TRANSF. CLIENTE GARCIA S.L.", amt: "+3.630,00", match: "FV-0221" },
  { date: "23/10", concept: "COMISION MANTENIMIENTO", amt: "-12,00", match: "" },
];

function Triage() {
  const [items, setItems] = useState(invoicesSeed);
  const [q, setQ] = useState("");
  const shown = items.filter((i) => (i.prov + i.nif + i.id).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar proveedor, NIF o número" className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted-foreground" />
        </div>
        {(["ok", "review", "alert"] as Status[]).map((s) => (
          <span key={s} className={`num rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[s]}`}>
            {statusLabel[s]} · {items.filter((i) => i.status === s).length}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        {shown.map((i) => (
          <motion.div layout key={i.id} className="grid grid-cols-[70px_1.4fr_1fr_90px_1.3fr_auto] items-center gap-3 border-b border-border px-4 py-3 text-sm last:border-0">
            <span className="num text-xs text-muted-foreground">{i.id}</span>
            <span className="truncate font-medium text-navy">{i.prov}</span>
            <span className="num text-xs text-muted-foreground">{i.nif}</span>
            <span className="num text-right font-semibold text-navy">{i.total} €</span>
            <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[i.status]}`}>{i.note}</span>
            {i.status !== "ok" ? (
              <button onClick={() => setItems((all) => all.map((x) => (x.id === i.id ? { ...x, status: "ok", note: "Aprobada manualmente" } : x)))} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover">
                Aprobar
              </button>
            ) : (
              <Check className="h-4 w-4 justify-self-center text-success" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Diary() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[60px_60px_90px_1fr_100px_100px] gap-3 bg-surface px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Asiento</span><span>Fecha</span><span>Cuenta</span><span>Concepto</span><span className="text-right">Debe</span><span className="text-right">Haber</span>
      </div>
      {diary.map((r, k) => (
        <div key={k} className="grid grid-cols-[60px_60px_90px_1fr_100px_100px] gap-3 border-t border-border px-4 py-2.5 text-sm">
          <span className="num text-muted-foreground">{r[0]}</span><span className="num text-muted-foreground">{r[1]}</span>
          <span className="num font-medium text-primary">{r[2]}</span><span className="truncate text-navy">{r[3]}</span>
          <span className="num text-right text-navy">{r[4]}</span><span className="num text-right text-navy">{r[5]}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_100px_100px] gap-3 border-t border-success/30 bg-success/10 px-4 py-3 text-sm font-bold text-success">
        <span>Sumas iguales · Cuadre 0,00 €</span><span className="num text-right">1.294,70</span><span className="num text-right">1.294,70</span>
      </div>
    </div>
  );
}

function Bank() {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      {bank.map((b) => {
        const ok = done.includes(b.date + b.concept);
        return (
          <div key={b.concept} className="flex items-center gap-4 rounded-xl border border-border px-4 py-3 text-sm">
            <span className="num text-xs text-muted-foreground">{b.date}</span>
            <span className="num flex-1 truncate text-xs text-navy">{b.concept}</span>
            <span className={`num font-semibold ${b.amt.startsWith("+") ? "text-success" : "text-navy"}`}>{b.amt} €</span>
            {b.match ? (
              <button
                onClick={() => setDone((d) => (ok ? d.filter((x) => x !== b.date + b.concept) : [...d, b.date + b.concept]))}
                className={`num w-36 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${ok ? "bg-success/10 text-success" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
              >
                {ok ? `Conciliado · ${b.match}` : `Conciliar con ${b.match}`}
              </button>
            ) : (
              <span className="w-36 rounded-lg bg-warning/15 px-3 py-1.5 text-center text-xs font-semibold text-warning">Sin factura</span>
            )}
          </div>
        );
      })}
      <p className="num pt-2 text-xs text-muted-foreground">Extracto AEB Norma 43 · {done.length}/3 movimientos conciliados</p>
    </div>
  );
}

export function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("triage");

  return (
    <section id="demo" className="relative overflow-hidden bg-midnight py-20 sm:py-28">
      <div className="beam pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Demo interactiva</p>
          <h2 className="mt-3 sm:mt-4 text-3xl font-extrabold text-on-dark sm:text-4xl md:text-5xl">Pruébalo ahora, sin registrarte</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-on-dark-muted">Aprueba facturas, revisa el diario y concilia movimientos bancarios.</p>
        </div>
        <div ref={ref} className="mt-10 sm:mt-14" style={{ perspective: 1400 }}>
          <motion.div style={{ rotateX, scale, transformOrigin: "center top" }} className="glass-panel rounded-3xl p-1.5 sm:p-2 shadow-glow">
            <div className="overflow-hidden rounded-2xl bg-card">
              <div className="flex items-center justify-between border-b border-border px-3 sm:px-4 py-3 bg-muted/40">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-danger" /><span className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-warning" /><span className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-success" />
                  <span className="ml-2 sm:ml-4 text-[11px] sm:text-xs text-muted-foreground truncate">app.kontapro.es / García & Asociados</span>
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">Entorno Demo</span>
              </div>
              <div className="flex items-center gap-1 border-b border-border px-3 sm:px-4 pt-2.5 overflow-x-auto scrollbar-none">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 pb-2.5 sm:pb-3 text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${tab === t.id ? "text-primary" : "text-muted-foreground hover:text-navy"}`}>
                    <t.icon className="h-3.5 sm:h-4 w-3.5 sm:w-4 shrink-0" /> <span className="whitespace-nowrap">{t.label}</span>
                    {tab === t.id && <motion.span layoutId="tab-line" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
              <div className="min-h-[360px] sm:min-h-[380px] overflow-x-auto p-4 sm:p-6">
                <div className="block sm:hidden text-[11px] text-muted-foreground pb-2 px-1 text-right">← Desliza para explorar la consola →</div>
                <AnimatePresence mode="wait">
                  <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="min-w-[620px] sm:min-w-[680px]">
                    {tab === "triage" ? <Triage /> : tab === "diary" ? <Diary /> : <Bank />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
