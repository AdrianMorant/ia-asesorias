import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  ["Flujo IA", "#flujo"],
  ["Calculadora de Ahorro", "#calculadora"],
  ["Demo Interactiva", "#demo"],
  ["Integraciones ERP", "#integraciones"],
  ["Precios", "#precios"],
];

export function Logo({ dark = false }: { dark?: boolean }) {
  const navyColor = dark ? "#FFFFFF" : "#0B2046";
  const blueColor = "#0A78FC";

  return (
    <a href="#" className="flex items-center gap-2.5 shrink-0 select-none" aria-label="KontaPro">
      {/* Isotipo Oficial KontaPro con proporciones exactas */}
      <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-navy shadow-glow p-1.5 shrink-0 transition-transform hover:scale-105">
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full object-contain" aria-hidden="true">
          <rect x="18" y="12" width="22" height="76" rx="5" fill="#FFFFFF" />
          <path d="M40 50 L75 88 H96 L53 38 Z" fill="#FFFFFF" />
          <path d="M22 66 L68 25 L79 34 L94 8 L54 13 L63 21 L16 62 Z" fill={blueColor} />
        </svg>
      </span>
      {/* Logotipo Tipográfico Oficial KontaPro */}
      <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight whitespace-nowrap">
        <span style={{ color: navyColor }}>Konta</span>
        <span style={{ color: blueColor }}>Pro</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(1180px,calc(100%-2rem))]"
    >
      <nav className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-2.5 shadow-elegant backdrop-blur-xl">
        <Logo />

        {/* Enlaces Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <a
                href={h}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-navy whitespace-nowrap"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-xs font-medium text-muted-foreground md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Sistemas operativos
          </span>

          <a
            href="#precios"
            className="shimmer inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover whitespace-nowrap"
          >
            <span>Probar gratis</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Botón Hamburger Móvil */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/80 bg-background/80 text-navy lg:hidden hover:bg-muted transition-colors cursor-pointer"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-3 shadow-elegant backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-1">
              {links.map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy hover:bg-muted transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
