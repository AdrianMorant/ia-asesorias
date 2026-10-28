import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Phone, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "./Navbar";
import { submitContact, contactSchema } from "@/lib/contact.functions";
import { LegalModal, type LegalTab } from "@/components/common/LegalModal";

const faqs = [
  ["¿KontaPro sustituye a mi programa de contabilidad?", "No. KontaPro trabaja por encima de A3, Sage, Contasol u Holded: lee las facturas, genera los asientos y los sincroniza con tu ERP actual."],
  ["¿Cumple con Veri*factu y la Ley Antifraude?", "Sí. Cada registro se firma y encadena con hash SHA-256 conforme al Real Decreto 1007/2023."],
  ["¿Qué pasa si la IA no está segura de un asiento?", "La factura se marca en ámbar para supervisión. Nada se contabiliza sin cuadrar al céntimo."],
  ["¿Dónde se almacenan los datos?", "En servidores dentro de la Unión Europea, cifrados en reposo y en tránsito, cumpliendo RGPD."],
  ["¿Cuánto tarda la puesta en marcha?", "Menos de un día. Conectamos tu ERP e importamos el plan de cuentas de cada cliente."],
];

export function Pricing() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>("privacy");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Rate Limiting en Cliente (Cooldown de 60 segundos tras envío exitoso)
  useEffect(() => {
    const lastSent = localStorage.getItem("kontapro_form_last_sent");
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
      if (elapsed < 60) {
        setCooldownSeconds(60 - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cooldownSeconds > 0) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const raw = {
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      company: formData.get("company") ?? "",
      phone: formData.get("phone") ?? "",
      clients: formData.get("clients") ?? "",
      message: formData.get("message") ?? "",
      _honey: formData.get("_honey") ?? "",
      privacyConsent: privacyConsent,
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Revisa los campos del formulario");
      return;
    }

    setErr("");
    setStatus("sending");

    try {
      await submitContact({ data: parsed.data });
      setStatus("ok");
      localStorage.setItem("kontapro_form_last_sent", Date.now().toString());
      setCooldownSeconds(60);
      form.reset();
      setPrivacyConsent(false);
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";

  return (
    <section id="precios" className="relative py-20 sm:py-28">
      <div className="grid-pattern pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1180px] gap-10 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Contacto & Propuesta</p>
          <h2 className="mt-3 sm:mt-4 text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">Transparentes. Sin permanencia.</h2>
          <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Cuéntanos sobre tu despacho y te preparamos una propuesta personalizada a medida según tu volumen real de facturación.
          </p>
          
          <ul className="mt-6 sm:mt-8 space-y-3">
            {["Propuesta personalizada en menos de 24 horas", "Sin permanencia ni contratos cerrados", "Prueba gratuita de 14 días con tus clientes"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-navy">
                <Check className="h-4 w-4 text-success shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Atención directa a despachos:</span>
            <div className="flex items-center">
              <a href="tel:+34686766266" className="inline-flex items-center gap-2.5 text-sm font-bold text-navy hover:text-primary transition-colors">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary shadow-xs">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-base font-extrabold tracking-wide">686 76 62 66</span>
              </a>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-elegant relative overflow-hidden">
          
          {status === "ok" ? (
            <div className="py-10 text-center space-y-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy">¡Solicitud recibida con éxito!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Hemos registrado tus datos correctamente. Nuestro equipo se pondrá en contacto con tu despacho en menos de 24 horas.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 rounded-xl border border-border bg-background px-5 py-2.5 text-xs font-semibold text-navy hover:bg-muted transition-colors cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-3.5 sm:gap-4 sm:grid-cols-2" noValidate>
              {/* Campo Honeypot Invisible Anti-Bot */}
              <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div>
                <label className="text-[11px] font-semibold text-navy block mb-1">Nombre y apellidos *</label>
                <input name="name" placeholder="Ej. Carlos Martínez" className={inputStyle} maxLength={100} required />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-navy block mb-1">Email profesional *</label>
                <input name="email" type="email" placeholder="carlos@asesoriageneric.es" className={inputStyle} maxLength={255} required />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-navy block mb-1">Despacho / Empresa</label>
                <input name="company" placeholder="Nombre de tu asesoría" className={inputStyle} maxLength={150} />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-navy block mb-1">Teléfono</label>
                <input name="phone" type="tel" placeholder="686 76 62 66" className={inputStyle} maxLength={30} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-navy block mb-1">Nº aproximado de clientes que gestionas</label>
                <select name="clients" defaultValue="" className={inputStyle}>
                  <option value="">Selecciona tu volumen</option>
                  <option value="Menos de 50">Menos de 50 clientes</option>
                  <option value="50 – 200">50 – 200 clientes</option>
                  <option value="200 – 500">200 – 500 clientes</option>
                  <option value="Más de 500">Más de 500 clientes</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-navy block mb-1">¿Qué ERP o programa contable utilizas?</label>
                <textarea name="message" rows={2} placeholder="Ej. Usamos A3 Asesor y queremos automatizar las facturas de WhatsApp y Drive..." className={`${inputStyle} resize-none`} maxLength={1000} />
              </div>

              {/* Checkbox Obligatorio RGPD */}
              <label className="flex items-start gap-2.5 sm:col-span-2 cursor-pointer text-xs text-muted-foreground select-none">
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer shrink-0"
                  required
                />
                <span>
                  He leído y acepto la{" "}
                  <button
                    type="button"
                    onClick={() => openLegal("privacy")}
                    className="font-medium text-primary underline hover:text-primary-hover cursor-pointer"
                  >
                    Política de Privacidad
                  </button>{" "}
                  y el tratamiento de mis datos para remitirme la propuesta comercial. *
                </span>
              </label>

              {err && (
                <p className="text-xs text-destructive font-medium sm:col-span-2 bg-destructive/10 px-3 py-2 rounded-lg">
                  {err}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !privacyConsent || cooldownSeconds > 0}
                className="shimmer rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed sm:col-span-2 cursor-pointer flex items-center justify-center gap-2 shadow-glow"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando solicitud...</span>
                  </>
                ) : cooldownSeconds > 0 ? (
                  <span>Reintentar en {cooldownSeconds}s</span>
                ) : (
                  <>
                    <span>Solicitar respuesta</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-muted-foreground sm:col-span-2 text-center">
                Tus datos se tratan conforme al RGPD europeo y solo se usan para contactar con tu despacho.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </section>
  );
}

export function Faq() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-10 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Preguntas frecuentes</p>
          <h2 className="mt-3 sm:mt-4 text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">Lo que nos preguntan los despachos</h2>
        </div>
        <Accordion type="single" collapsible defaultValue="0" className="w-full">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={String(i)} className="border-border">
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-navy py-4 hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-4">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>("privacy");

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-midnight py-14 sm:py-16">
      <div className="mx-auto grid max-w-[1180px] gap-8 sm:gap-10 px-4 sm:px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-xs sm:text-sm text-on-dark-muted leading-relaxed">
            El copiloto contable con IA para asesorías fiscales y despachos en España. Automatización de triaje y contabilización conforme a Veri*factu.
          </p>

          <div className="mt-5 space-y-2 text-xs text-on-dark-muted">
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <a href="tel:+34686766266" className="text-on-dark font-semibold hover:text-primary transition-colors">
                686 76 62 66
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-on-dark">Producto</p>
          <ul className="mt-3 sm:mt-4 space-y-2">
            <li><a href="#flujo" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Flujo IA</a></li>
            <li><a href="#calculadora" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Calculadora</a></li>
            <li><a href="#demo" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Demo interactiva</a></li>
            <li><a href="#precios" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Precios</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-on-dark">Integraciones ERP</p>
          <ul className="mt-3 sm:mt-4 space-y-2">
            <li><a href="#integraciones" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Wolters Kluwer A3</a></li>
            <li><a href="#integraciones" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Sage 50 / Despachos</a></li>
            <li><a href="#integraciones" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Software DELSOL Contasol</a></li>
            <li><a href="#integraciones" className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors">Holded</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-on-dark">Legal & Seguridad</p>
          <ul className="mt-3 sm:mt-4 space-y-2">
            <li>
              <button type="button" onClick={() => openLegal("privacy")} className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors text-left cursor-pointer">
                Política de Privacidad
              </button>
            </li>
            <li>
              <button type="button" onClick={() => openLegal("legal")} className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors text-left cursor-pointer">
                Aviso Legal
              </button>
            </li>
            <li>
              <button type="button" onClick={() => openLegal("cookies")} className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors text-left cursor-pointer">
                Política de Cookies
              </button>
            </li>
            <li>
              <button type="button" onClick={() => openLegal("security")} className="text-xs sm:text-sm text-on-dark-muted hover:text-on-dark transition-colors text-left cursor-pointer flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                <span>Seguridad & Veri*factu</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-[1180px] justify-between border-t border-glass-border px-4 sm:px-6 pt-6 text-xs text-on-dark-muted text-center sm:text-left">
        <span>© 2026 KontaPro Suite S.L. Todos los derechos reservados.</span>
        <span>Datos alojados en la Unión Europea · RGPD & Veri*factu</span>
      </div>

      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </footer>
  );
}
