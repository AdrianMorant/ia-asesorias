import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Hash, Inbox, Mail, MessageCircle, ShieldCheck } from "lucide-react";

function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
      className={`spotlight-border group rounded-3xl p-px ${className}`}
    >
      <div className="spotlight-fill relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-5 sm:p-7">{children}</div>
    </motion.div>
  );
}

function Funnel() {
  const ch = [{ i: Mail, l: "Email" }, { i: MessageCircle, l: "WhatsApp" }, { i: FolderOpen, l: "Drive" }];
  return (
    <div className="relative mt-6 flex h-44 items-center justify-between gap-2 sm:gap-4">
      <div className="space-y-3 shrink-0">
        {ch.map((c) => (
          <div key={c.l} className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 sm:px-3 py-2 text-xs font-semibold text-navy shadow-xs">
            <c.i className="h-4 w-4 text-primary shrink-0" /> <span className="truncate">{c.l}</span>
          </div>
        ))}
      </div>
      <div className="relative mx-2 sm:mx-4 h-full flex-1 min-w-[30px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary shadow-glow"
            style={{ top: `${18 + i * 32}%` }}
            animate={{ left: ["0%", "100%"], top: [`${18 + i * 32}%`, "50%"], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeIn" }}
          />
        ))}
      </div>
      <div className="grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-2xl bg-primary shadow-glow shrink-0">
        <Inbox className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
      </div>
    </div>
  );
}

const accs = [["628.0001", "Suministros"], ["629.0003", "Comunicaciones"], ["621.0002", "Arrendamientos"], ["623.0001", "Serv. profesionales"]];
function Autocomplete() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const target = accs[i]?.[0] ?? "";
    if (typed.length < target.length) {
      const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 110);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setTyped(""); setI((x) => (x + 1) % accs.length); }, 1600);
    return () => clearTimeout(t);
  }, [typed, i]);
  return (
    <div className="mt-6 rounded-xl border border-border bg-background p-3.5 sm:p-4">
      <div className="num flex items-center gap-1 rounded-lg border border-primary/40 px-3 py-2 text-sm text-navy">
        {typed}<span className="h-4 w-0.5 animate-pulse bg-primary" />
      </div>
      <div className="mt-2 space-y-1">
        {accs.map(([a, n], k) => (
          <div key={a} className={`flex justify-between rounded-md px-2.5 sm:px-3 py-1.5 text-xs transition-colors ${k === i ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <span className="num font-medium">{a}</span><span className="truncate">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HashCard() {
  const [h, setH] = useState("9f2c...");
  useEffect(() => {
    const t = setInterval(() => setH(Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-6 space-y-3">
      <div className="num break-all rounded-xl border border-border bg-background p-3.5 sm:p-4 text-[11px] leading-relaxed text-muted-foreground">
        <span className="flex items-center gap-1.5 pb-2 font-sans text-xs font-semibold text-navy"><Hash className="h-3.5 w-3.5 text-primary shrink-0" /> SHA-256 encadenado</span>
        {h}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3.5 sm:px-4 py-2.5 text-xs font-semibold text-success">
        <ShieldCheck className="h-4 w-4 shrink-0" /> <span className="truncate">Registro Veri*factu válido · AEAT</span>
      </div>
    </div>
  );
}

const erps = ["Wolters Kluwer A3", "Sage 50/200", "Contasol", "Holded"];
function Nodes() {
  return (
    <div className="relative mt-6 h-56 overflow-hidden">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {erps.map((_, i) => {
          const y = 30 + i * 53;
          const d = `M70 110 C 200 110, 200 ${y}, 330 ${y}`;
          return (
            <g key={i}>
              <path d={d} className="stroke-border" strokeWidth="1.5" fill="none" />
              <motion.path d={d} className="stroke-primary" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0.15, pathOffset: 0 }} animate={{ pathOffset: [0, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.4, ease: "easeInOut" }} />
            </g>
          );
        })}
      </svg>
      <div className="absolute left-0 top-1/2 grid h-14 w-14 sm:h-16 sm:w-16 -translate-y-1/2 place-items-center rounded-2xl bg-navy shadow-glow p-2.5 sm:p-3 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full object-contain" aria-label="KontaPro">
          <rect x="18" y="12" width="22" height="76" rx="5" fill="#FFFFFF" />
          <path d="M40 50 L75 88 H96 L53 38 Z" fill="#FFFFFF" />
          <path d="M22 66 L68 25 L79 34 L94 8 L54 13 L63 21 L16 62 Z" fill="#0A78FC" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 flex h-full flex-col justify-between py-1">
        {erps.map((e) => (
          <div key={e} className="rounded-lg border border-border bg-background px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-navy truncate max-w-[150px] sm:max-w-none shadow-xs">{e}</div>
        ))}
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <section id="integraciones" className="relative bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Cómo funciona</p>
          <h2 className="mt-3 sm:mt-4 text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">Del buzón al libro diario sin tocar el teclado</h2>
        </div>
        <div className="mt-10 sm:mt-14 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <Spotlight className="md:col-span-2 lg:col-span-3">
            <h3 className="text-lg sm:text-xl font-bold text-navy">Recepción multicanal</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Tus clientes envían facturas por donde quieran. KontaPro las centraliza en una sola bandeja.</p>
            <Funnel />
          </Spotlight>
          <Spotlight className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-navy">Subcuentas PGC en vivo</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Aprende el plan de cuentas de cada cliente.</p>
            <Autocomplete />
          </Spotlight>
          <Spotlight className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-navy">Veri*factu nativo</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Cada registro firmado y encadenado, listo para la AEAT.</p>
            <HashCard />
          </Spotlight>
          <Spotlight className="md:col-span-2 lg:col-span-3">
            <h3 className="text-lg sm:text-xl font-bold text-navy">Integración con tu ERP</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Asientos sincronizados en tiempo real con el software que ya usas.</p>
            <Nodes />
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
