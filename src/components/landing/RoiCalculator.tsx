import { useEffect, useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { CalendarCheck, Clock, Euro, TrendingUp } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { PRESETS, DEFAULT_INPUT, computeRoi } from "@/lib/roi";

function AnimatedNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const spring = useSpring(value, { stiffness: 120, damping: 14, mass: 0.8 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const text = useTransform(spring, (v) =>
    new Intl.NumberFormat("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: "always" } as unknown as Intl.NumberFormatOptions).format(v) + suffix,
  );
  return <motion.span className="num">{text}</motion.span>;
}

function BrandSlider(props: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <span className="text-xs sm:text-sm font-medium text-on-dark-muted">{props.label}</span>
        <span className="num text-base sm:text-lg font-bold text-on-dark shrink-0">{props.display}</span>
      </div>
      <SliderPrimitive.Root
        value={[props.value]} min={props.min} max={props.max} step={props.step}
        onValueChange={([v]) => props.onChange(v ?? props.value)}
        className="relative flex h-7 w-full touch-none select-none items-center cursor-pointer py-2"
      >
        <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-glass-border">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={props.label}
          className="block h-6 w-6 cursor-grab rounded-full border-4 border-primary bg-on-dark shadow-glow transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 active:cursor-grabbing"
        />
      </SliderPrimitive.Root>
      <div className="num mt-2 flex justify-between text-[11px] text-on-dark-muted/70">
        <span>{props.min}</span><span>{props.max}</span>
      </div>
    </div>
  );
}

export function RoiCalculator() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const r = useMemo(() => computeRoi(input), [input]);
  const activePreset = PRESETS.find(
    (p) => p.invoices === input.invoices && p.minutesPerInvoice === input.minutesPerInvoice && p.hourlyRate === input.hourlyRate,
  )?.id;
  const kontaHours = r.totalHoursManual - r.rawHoursSaved;
  const fmt = (n: number, d = 0) => n.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" } as unknown as Intl.NumberFormatOptions);

  return (
    <section id="calculadora" className="relative overflow-hidden bg-midnight py-20 sm:py-28">
      <div className="beam pointer-events-none absolute inset-0" />
      <div className="grid-pattern-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Calculadora de ahorro</p>
          <h2 className="mt-3 sm:mt-4 text-3xl font-extrabold text-on-dark sm:text-4xl md:text-5xl">Cuánto le devuelve KontaPro a tu despacho</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-on-dark-muted">Ajusta tu volumen real. El cálculo se basa en una reducción del 81,4% del tiempo de grabación manual.</p>
        </div>

        <div className="glass-panel relative mx-auto mt-8 sm:mt-10 flex max-w-full flex-wrap justify-center gap-1.5 rounded-2xl p-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setInput({ invoices: p.invoices, minutesPerInvoice: p.minutesPerInvoice, hourlyRate: p.hourlyRate })}
              className={`relative rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${activePreset === p.id ? "text-primary-foreground" : "text-on-dark-muted hover:text-on-dark"}`}
            >
              {activePreset === p.id && (
                <motion.span layoutId="preset-pill" className="absolute inset-0 rounded-xl bg-primary shadow-glow" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
          <div className="glass-panel space-y-7 sm:space-y-9 rounded-3xl p-6 sm:p-8">
            <BrandSlider label="Facturas gestionadas al mes" value={input.invoices} min={200} max={8000} step={100} display={fmt(input.invoices)} onChange={(v) => setInput((s) => ({ ...s, invoices: v }))} />
            <BrandSlider label="Minutos dedicados por factura" value={input.minutesPerInvoice} min={1.5} max={6} step={0.5} display={`${fmt(input.minutesPerInvoice, 1)} min`} onChange={(v) => setInput((s) => ({ ...s, minutesPerInvoice: v }))} />
            <BrandSlider label="Coste por hora del trabajador" value={input.hourlyRate} min={16} max={45} step={1} display={`${input.hourlyRate} €/h`} onChange={(v) => setInput((s) => ({ ...s, hourlyRate: v }))} />

            <div className="space-y-4 border-t border-glass-border pt-6 sm:pt-7">
              <div>
                <div className="mb-2 flex justify-between text-xs font-medium"><span className="text-on-dark-muted">Tiempo manual</span><span className="num text-danger">{fmt(r.totalHoursManual)} h/mes</span></div>
                <div className="h-2.5 sm:h-3 overflow-hidden rounded-full bg-glass"><motion.div className="h-full rounded-full bg-danger" animate={{ width: "100%" }} /></div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-xs font-medium"><span className="text-on-dark-muted">Tiempo con KontaPro (-81,4%)</span><span className="num text-success">{fmt(kontaHours)} h/mes</span></div>
                <div className="h-2.5 sm:h-3 overflow-hidden rounded-full bg-glass">
                  <motion.div className="h-full rounded-full bg-success" animate={{ width: `${r.totalHoursManual ? (kontaHours / r.totalHoursManual) * 100 : 0}%` }} transition={{ type: "spring", stiffness: 120, damping: 14 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-success/20 blur-3xl pointer-events-none" />
              <p className="flex items-center gap-2 text-xs sm:text-sm font-medium text-on-dark-muted"><TrendingUp className="h-4 w-4 text-success" /> Ahorro anual estimado</p>
              <p className="mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-success tracking-tight break-words"><AnimatedNumber value={r.rawAnnualSavings} suffix=" €" /></p>
              <p className="mt-2 text-xs sm:text-sm text-on-dark-muted">Recuperado en coste de personal cada año</p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {[
                { icon: Euro, label: "Ahorro mensual", value: r.rawMonthlySavings, suffix: " €", d: 0 },
                { icon: Clock, label: "Horas recuperadas", value: r.rawHoursSaved, suffix: " h", d: 0 },
                { icon: CalendarCheck, label: "Jornadas devueltas", value: r.rawDaysSaved, suffix: "", d: 1 },
              ].map((k) => (
                <div key={k.label} className="glass-panel rounded-2xl p-4 sm:p-5">
                  <k.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-on-dark"><AnimatedNumber value={k.value} decimals={k.d} suffix={k.suffix} /></p>
                  <p className="mt-1 text-xs text-on-dark-muted">{k.label}{k.d ? " (8h/mes)" : "/mes"}</p>
                </div>
              ))}
            </div>
            <a href="#precios" className="shimmer flex items-center justify-center rounded-2xl bg-primary py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary-hover">
              Empezar a ahorrar desde este mes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
