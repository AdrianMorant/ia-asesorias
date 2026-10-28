import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Cookie, X, Check, Sliders, Lock, Phone } from "lucide-react";

export type LegalTab = "privacy" | "legal" | "cookies" | "preferences" | "security";

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = "privacy",
  onClose,
}) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  // Sincronizar tab si cambia el prop initialTab
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Preferencias de Cookies guardadas en localStorage
  const [analyticsConsent, setAnalyticsConsent] = useState(() => {
    return localStorage.getItem("kontapro_cookie_analytics") === "true";
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSaveCookiePreferences = () => {
    localStorage.setItem("kontapro_cookie_analytics", analyticsConsent ? "true" : "false");
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  const navItems = [
    { id: "privacy", label: "Privacidad", icon: Shield },
    { id: "legal", label: "Aviso Legal", icon: FileText },
    { id: "cookies", label: "Cookies", icon: Cookie },
    { id: "security", label: "Seguridad & Veri*factu", icon: Lock },
    { id: "preferences", label: "Configurar", icon: Sliders },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-3xl border border-border bg-card shadow-elegant overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4.5 bg-surface">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 id="legal-modal-title" className="text-base sm:text-lg font-bold text-navy">
                    Información Legal & Transparencia Normativa
                  </h3>
                  <p className="text-xs text-muted-foreground">KontaPro Suite · RGPD, LSSI-CE & Veri*factu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-muted-foreground hover:text-navy hover:bg-muted transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border bg-background px-4 overflow-x-auto scrollbar-none gap-1 py-1.5 shrink-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id as LegalTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                    tab === item.id
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-navy hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 text-sm text-foreground/90 space-y-5 leading-relaxed">
              {tab === "privacy" && (
                <>
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-primary leading-relaxed">
                    <strong>Cumplimiento RGPD (UE 2016/679) y LOPDGDD 3/2018:</strong> KontaPro garantiza el tratamiento confidencial y la máxima seguridad en todos los datos de contacto y facturación recopilados.
                  </div>

                  <h4 className="text-base font-bold text-navy pt-1">1. Responsable del Tratamiento de Datos</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    <li><strong className="text-navy">Razón Social:</strong> KontaPro Suite S.L.</li>
                    <li><strong className="text-navy">Actividad:</strong> Desarrollo y explotación de soluciones software de copiloto fiscal y automatización contable con IA para asesorías.</li>
                    <li><strong className="text-navy">Email de Contacto Oficial:</strong> <a href="mailto:adriantrabajo005@gmail.com" className="text-primary underline">adriantrabajo005@gmail.com</a></li>
                    <li><strong className="text-navy">Teléfono Oficial de Soporte y Privacidad:</strong> <a href="tel:+34686766266" className="text-primary underline">+34 686 76 62 66</a></li>
                    <li><strong className="text-navy">Ámbito Geográfico:</strong> Servidores e infraestructura alojados exclusivamente dentro de la Unión Europea.</li>
                  </ul>

                  <h4 className="text-base font-bold text-navy pt-2">2. Finalidad del Tratamiento y Legitimación</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Los datos facilitados a través del formulario de contacto (nombre, email profesional, nombre del despacho, teléfono y volumen de clientes) se tratan con las siguientes finalidades legítimas:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>Elaborar y remitir una propuesta comercial personalizada a medida de su volumen de facturas.</li>
                    <li>Coordinar demostraciones técnicas interactivas y atender consultas previas de enlace con su ERP.</li>
                    <li>Gestión de la relación precontractual a petición expresa del interesado (Art. 6.1.b RGPD).</li>
                  </ul>

                  <h4 className="text-base font-bold text-navy pt-2">3. No Cesión a Terceros ni Entrenamiento de Modelos</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    KontaPro no vende, cede ni transfiere datos de usuarios o despachos a terceros bajo ninguna circunstancia. Los datos contables procesados durante las demostraciones o la actividad del software <strong className="text-navy">jamás se utilizan para entrenar modelos públicos de inteligencia artificial</strong> ni abandonan los entornos de procesamiento seguro de la Unión Europea.
                  </p>

                  <h4 className="text-base font-bold text-navy pt-2">4. Ejercicio de Derechos ARCO</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Usted puede ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Supresión, Limitación, Oposición y Portabilidad</strong> enviando una solicitud formal por escrito junto con copia de su documento de identidad a <a href="mailto:adriantrabajo005@gmail.com" className="text-primary underline">adriantrabajo005@gmail.com</a> o contactando al <a href="tel:+34686766266" className="text-primary underline">+34 686 76 62 66</a>. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en caso de estimarlo oportuno.
                  </p>
                </>
              )}

              {tab === "legal" && (
                <>
                  <h4 className="text-base font-bold text-navy">1. Información General (LSSI-CE Ley 34/2002)</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es propiedad y está operado por <strong>KontaPro Suite S.L.</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li><strong className="text-navy">Titular del servicio:</strong> KontaPro Suite S.L.</li>
                    <li><strong className="text-navy">Email de contacto:</strong> adriantrabajo005@gmail.com</li>
                    <li><strong className="text-navy">Atención directa:</strong> 686 76 62 66</li>
                  </ul>

                  <h4 className="text-base font-bold text-navy pt-2">2. Propiedad Intelectual e Industrial</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Todos los derechos de propiedad intelectual e industrial sobre el diseño web, logotipos corporativos, marcas registradas, código fuente, algoritmos de cuadre en partida doble y módulos de triaje de KontaPro son titularidad exclusiva de KontaPro Suite S.L. Queda prohibida la reproducción, distribución o comunicación pública sin autorización previa por escrito.
                  </p>

                  <h4 className="text-base font-bold text-navy pt-2">3. Entorno de Demostración y Simulación</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    La consola de triaje y la calculadora de ahorro presentes en la web son herramientas demostrativas e interactivas calculadas sobre estimaciones estándar (reducción del 81,4% del tiempo manual). Los nombres de facturas mostrados en la demo (Iberdrola, Telefónica) corresponden a datos simulados con fines pedagógicos.
                  </p>
                </>
              )}

              {tab === "cookies" && (
                <>
                  <h4 className="text-base font-bold text-navy">1. ¿Qué son las cookies?</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Una cookie es un pequeño archivo técnico que se almacena en su navegador al visitar este sitio web para garantizar el funcionamiento fluido, recordar preferencias de navegación y permitir una experiencia interactiva segura.
                  </p>

                  <h4 className="text-base font-bold text-navy pt-2">2. Clasificación de Cookies en KontaPro</h4>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-surface p-3.5">
                      <strong className="block text-navy text-xs sm:text-sm font-bold">Cookies Técnicas (Estrictamente Necesarias)</strong>
                      <span className="text-xs text-muted-foreground">
                        Permiten la navegación segura, el funcionamiento del formulario contra ataques CSRF/spam y el almacenamiento temporal de datos para la simulación. No requieren consentimiento y están siempre activas.
                      </span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface p-3.5">
                      <strong className="block text-navy text-xs sm:text-sm font-bold">Cookies de Análisis y Métricas Agregadas</strong>
                      <span className="text-xs text-muted-foreground">
                        Miden de forma totalmente anonimizada la estabilidad de carga de los componentes interactivos. Se activan únicamente si usted lo autoriza en el panel de configuración.
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    KontaPro <strong>no utiliza cookies de publicidad comportamental de terceros</strong> ni comercializa con redes de rastreo publicitario.
                  </p>
                </>
              )}

              {tab === "security" && (
                <>
                  <div className="rounded-2xl border border-success/30 bg-success/10 p-4 text-xs text-success leading-relaxed flex items-start gap-3">
                    <Lock className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-sm block">Seguridad Blindada & Homologación Veri*factu</strong>
                      <span>Cumplimiento del Real Decreto 1007/2023 y la Ley 11/2021 de Medidas de Prevención y Lucha contra el Fraude Fiscal.</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-navy pt-1">1. Registro de Asientos Inalterables y Hash SHA-256</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Cada asiento y factura procesada a través de KontaPro genera una huella digital criptográfica encadenada (SHA-256) garantizando la inalterabilidad, trazabilidad e integridad de los registros contables, en plena concordancia con las especificaciones técnicas publicadas por la Agencia Estatal de Administración Tributaria (AEAT).
                  </p>

                  <h4 className="text-base font-bold text-navy pt-2">2. Cifrado y Alojamiento en la Unión Europea</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    <li><strong className="text-navy">Cifrado en tránsito:</strong> Conexiones protegidas mediante TLS 1.3 con certificados SSL de alta seguridad y cabeceras estrictas HSTS.</li>
                    <li><strong className="text-navy">Cifrado en reposo:</strong> Bases de datos cifradas mediante el estándar bancario AES-256.</li>
                    <li><strong className="text-navy">Aislamiento por Despacho:</strong> Particionamiento lógico estricto para que la contabilidad de cada cliente permanezca completamente aislada e inaccesible para otros usuarios.</li>
                  </ul>

                  <h4 className="text-base font-bold text-navy pt-2">3. Enlace con ERPs Tradicionales</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    La sincronización con A3, Sage, Contasol u Holded se efectúa mediante conectores certificados y ficheros estándar (SUENLACE, ficheros ASCII/XML oficiales) sin exponer credenciales críticas de bases de datos locales.
                  </p>
                </>
              )}

              {tab === "preferences" && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-navy">Panel de Configuración de Privacidad</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Ajuste sus preferencias de almacenamiento local. Puede modificarlas en cualquier momento.
                  </p>

                  <div className="rounded-2xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
                    <div>
                      <strong className="text-navy text-xs sm:text-sm block">Cookies Técnicas Obligatorias</strong>
                      <span className="text-xs text-muted-foreground">Necesarias para la navegación y envío seguro de formularios.</span>
                    </div>
                    <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shrink-0">Siempre activas</span>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
                    <div>
                      <strong className="text-navy text-xs sm:text-sm block">Telemetría y Rendimiento Técnico</strong>
                      <span className="text-xs text-muted-foreground">Métricas anónimas para evaluar el rendimiento de la demo en vivo.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsConsent}
                        onChange={(e) => setAnalyticsConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {savedNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-success/15 px-4 py-2.5 text-xs font-semibold text-success flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" /> Preferencias guardadas correctamente.
                    </motion.div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveCookiePreferences}
                      className="rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary-hover shadow-glow transition-colors cursor-pointer"
                    >
                      Guardar Preferencias
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-surface px-6 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-navy font-semibold">Atención telefónica:</span>
                <a href="tel:+34686766266" className="inline-flex items-center gap-1 font-bold text-primary hover:text-primary-hover transition-colors">
                  <Phone className="h-3.5 w-3.5" /> 686 76 62 66
                </a>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border bg-background px-4 py-2 text-xs sm:text-sm font-semibold text-navy hover:bg-muted transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
