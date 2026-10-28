import { z } from "zod";

// Función de sanitización anti-XSS estricta
function sanitizeInput(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Eliminar etiquetas HTML
    .replace(/javascript:/gi, "") // Prevenir pseudo-protocolos
    .trim();
}

export const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Indica tu nombre y apellidos (mínimo 2 letras)").max(100, "Nombre demasiado largo")),
  email: z
    .string()
    .trim()
    .email("Indica un correo electrónico profesional válido")
    .max(255, "Email demasiado largo"),
  company: z
    .string()
    .optional()
    .transform(sanitizeInput)
    .pipe(z.string().max(150, "Nombre de despacho demasiado largo")),
  phone: z
    .string()
    .optional()
    .transform(sanitizeInput)
    .pipe(
      z
        .string()
        .max(30, "Teléfono demasiado largo")
        .refine(
          (val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(val),
          "Indica un número de teléfono válido (ej. 686 76 62 66 o +34 686 76 62 66)"
        )
    ),
  clients: z
    .string()
    .optional()
    .transform(sanitizeInput)
    .pipe(z.string().max(50)),
  message: z
    .string()
    .optional()
    .transform(sanitizeInput)
    .pipe(z.string().max(1000, "Mensaje demasiado largo (máximo 1000 caracteres)")),
  _honey: z.string().optional().default(""), // Trampa anti-bot
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la Política de Privacidad para continuar",
  }),
});

export type ContactData = z.infer<typeof contactSchema>;

const RECIPIENT_EMAIL = "adriantrabajo005@gmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export async function submitContact({ data }: { data: ContactData }): Promise<{ ok: boolean; usedFallback?: boolean }> {
  // 1. Verificación Honeypot (Anti-Bot silencioso)
  if (data._honey && data._honey.trim().length > 0) {
    // Si el bot rellenó el campo oculto, simular éxito sin enviar correo
    return { ok: true };
  }

  // 2. Envío real mediante FormSubmit AJAX Endpoint
  try {
    const payload = {
      _subject: `Nueva Solicitud de Propuesta KontaPro - ${data.name}${data.company ? ` (${data.company})` : ""}`,
      _template: "table",
      _captcha: "false",
      Nombre: data.name,
      Email: data.email,
      Despacho_Empresa: data.company || "No especificado",
      Telefono: data.phone || "No especificado",
      Clientes_Gestionados: data.clients || "No especificado",
      Mensaje: data.message || "Solicitud de contacto y propuesta inicial",
      Consentimiento_RGPD: data.privacyConsent ? "Aceptado explícitamente" : "No",
      Fecha: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
    };

    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { ok: true };
    }
  } catch (error) {
    // Silenciosamente capturamos el fallo de red para disparar fallback automático
  }

  // 3. Fallback automático por Mailto en caso de bloqueo de red o fallo de endpoint
  try {
    const subject = encodeURIComponent(`Solicitud de Propuesta KontaPro - ${data.name}`);
    const body = encodeURIComponent(
      `Hola equipo de KontaPro,\n\nQuisiera solicitar información y propuesta para mi despacho:\n\n` +
      `- Nombre: ${data.name}\n` +
      `- Email: ${data.email}\n` +
      `- Despacho: ${data.company || "No indicado"}\n` +
      `- Teléfono: ${data.phone || "No indicado"}\n` +
      `- Clientes aproximados: ${data.clients || "No indicado"}\n` +
      `- Mensaje: ${data.message || "Solicitud de contacto directo"}\n\n` +
      `He aceptado la política de privacidad.\nFecha: ${new Date().toLocaleString("es-ES")}`
    );
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    return { ok: true, usedFallback: true };
  } catch {
    throw new Error("No se pudo procesar el envío. Por favor escríbenos directamente a " + RECIPIENT_EMAIL);
  }
}
