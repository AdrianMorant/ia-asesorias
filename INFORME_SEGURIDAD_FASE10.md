# Auditoría de Seguridad Avanzada y Preparación para Publicación en Producción
**Proyecto:** KontaPro — Web Pública Institucional  
**Fecha de Evaluación:** 19 de Octubre de 2026  
**Entorno Evaluado:** Frontend SPA (React 19 + TypeScript + Vite 8)  
**Alcance:** Auditoría técnica estática, gestión de secretos, protección de formularios, cabeceras HTTP, privacidad (RGPD) y preparación de infraestructura para dominio propio.

---

## 1. Arquitectura y Superficie de Exposición

### 1.1. Arquitectura Técnica Detectada
* **Naturaleza del Sistema:** Aplicación Web de una sola página (SPA) generada mediante Vite 8 con compilación estática a HTML, CSS y JavaScript minificado.
* **Separación de Entornos:**
  * **Web Pública (`web-ia`):** Presentación comercial, calculadora interactiva de ROI, consola de demostración de producto en frontend y captación de clientes potenciales (*leads*).
  * **Plataforma Privada ERP:** Sistema interno contable/facturación independiente alojado en puertos y servicios separados. Se eliminó cualquier enlace directo en el frontend que expusiera URLs internas de desarrollo (`http://localhost:3000`).
* **Superficie Externa Expuesta:**
  * Endpoint de recepción de formularios: `https://api.web3forms.com/submit`.
  * CDN de tipografías: `fonts.googleapis.com` y `fonts.gstatic.com`.
  * Sin base de datos directa ni endpoints de servidor accesibles desde el bundle público.

---

## 2. Matriz de Riesgos Identificados y Estado de Resolución

| Identificador | Categoría | Descripción del Riesgo | Severidad Inicial | Estado | Medida Aplicada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Privacidad / RGPD | Exposición de leads en `localStorage` con botón modal público "Admin". | **ALTA** | **RESUELTO** | Se eliminó el volcado de datos personales en el navegador del visitante y se suprimió el modal administrativo público. |
| **SEC-02** | Abuso de Formularios | Inyección de spam masivo y agotamiento de cuota de API por robots automáticos. | **MEDIA** | **RESUELTO** | Implementación de trampa *Honeypot*, control temporal de envío (<2 s) y limitador de frecuencia (*anti-flood* 45 s). |
| **SEC-03** | Fuga de Información | Ausencia de reglas de exclusión en `.gitignore` para archivos `.env` y volcados de notas internas. | **MEDIA** | **RESUELTO** | Actualización de `.gitignore` excluyendo `.env*`, certificados, volcados de texto y notas internas. |
| **SEC-04** | Ingeniería Inversa | Exposición potencial de código TypeScript y estructura interna mediante *sourcemaps*. | **BAJA** | **RESUELTO** | Configuración de `sourcemap: false` en `vite.config.ts`. |
| **SEC-05** | Integridad y Clickjacking | Ausencia de cabeceras de seguridad HTTP (CSP, HSTS, X-Frame-Options). | **ALTA** | **RESUELTO** | Generación de `vercel.json`, `public/_headers` y plantilla `nginx.conf.example` con CSP estricta. |
| **SEC-06** | Cumplimiento Legal | Enlaces a políticas de privacidad apuntando a anclas vacías sin información RGPD. | **MEDIA** | **RESUELTO** | Implementación del componente accesible `LegalModal.tsx` con Aviso Legal, Política de Privacidad y Cookies. |

---

## 3. Medidas de Seguridad Implementadas

### 3.1. Protección del Formulario de Demostración Comercial
1. **Trampa Honeypot (`_hp_security_check`):**
   - Campo oculto invisible para humanos mediante CSS posicional fuera de pantalla (`left: -9999px; opacity: 0;`).
   - Si un script automatizado rellena este campo, la solicitud se neutraliza inmediatamente simulando una respuesta neutra sin impactar la API de destino.
2. **Control Anti-Bot por Tiempo de Interacción:**
   - Se registra la marca de tiempo de montaje del formulario en el cliente.
   - Envíos completados en menos de 2.000 ms se rechazan preventivamente para evitar ataques automatizados ultrarrápidos.
3. **Limitación de Frecuencia (*Anti-Flood Cooldown*):**
   - Tras un envío exitoso, se impone un bloqueo temporal de 45 segundos para el mismo navegador, previniendo ataques de denegación de servicio (*DoS*) sobre la pasarela de notificaciones.
4. **Sanitización Estricta de Entradas:**
   - Función de limpieza algorítmica que suprime etiquetas HTML (`<script>`, `<iframe>`, etc.), saltos de línea maliciosos (prevención de *HTTP Header Injection*) y aplica límites de longitud estrictos (Nombre: 80 caracteres, Empresa: 100, Email: 120, Teléfono: 25, Notas: 500).
5. **Validación de Formatos:**
   - Comprobación de correo mediante expresión regular conforme a RFC 5322.
   - Validación de número telefónico con soporte de prefijos internacionales (`+`).

### 3.2. Protección de la Privacidad y RGPD (Art. 13 y 14)
* **Consentimiento Explícito:** Se incorporó una casilla de verificación obligatoria no premarcada para el tratamiento de datos de contacto orientado a coordinar la sesión demostrativa.
* **Componente `LegalModal.tsx`:** Modal interactivo y accesible que despliega:
  * **Política de Privacidad:** Identificación del responsable, base legal (Art. 6.1.a y 6.1.b RGPD), periodo de conservación, ausencia de cesión a terceros para fines publicitarios y canal para el ejercicio de derechos ARSOPOL (`contacto@kontapro.es`).
  * **Aviso Legal:** Cumplimiento de la LSSI-CE (Ley 34/2002) y régimen de propiedad intelectual.
  * **Política de Cookies:** Documentación de uso exclusivo de almacenamiento técnico esencial (`kontapro_language_preference`), sin cookies de rastreo publicitario de terceros.

### 3.3. Cabeceras HTTP de Seguridad
Se configuraron las directivas de seguridad para las principales plataformas de despliegue:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; object-src 'none'; upgrade-insecure-requests;
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

* **Archivos generados:**
  - `vercel.json` (para despliegues en infraestructura Vercel).
  - `public/_headers` (para Cloudflare Pages y Netlify).
  - `nginx.conf.example` (plantilla blindada para servidores dedicados / VPS / Docker con soporte TLS 1.3).

---

## 4. Resultados de las Pruebas Técnicas Realizadas

1. **Auditoría de Vulnerabilidades en Dependencias:**
   - Comando: `npm audit`
   - **Resultado:** `found 0 vulnerabilities` (0 críticas, 0 altas, 0 moderadas, 0 bajas).
2. **Análisis Estático de Código (Linter):**
   - Comando: `npm run lint` (`oxlint`)
   - **Resultado:** **0 errores, 0 advertencias** sobre 36 archivos analizados con 116 reglas activas.
3. **Comprobación de Tipos y Compilación Estricta:**
   - Comando: `npx tsc -b`
   - **Resultado:** Código 0 sin errores de tipos.
4. **Verificación de Empaquetado de Producción:**
   - Comando: `npm run build`
   - **Resultado:** Generación exitosa en 380 ms. Bundle optimizado a 343 kB (103 kB gzipped), con hash criptográfico único por archivo (`index-BYo6wp1g.js`) para garantizar la integridad en caché.

---

## 5. Acciones Requeridas por el Propietario antes de Publicar

Para completar el lanzamiento una vez se adquiera el dominio definitivo (ej. `kontapro.es`):

1. **Configuración de Registros DNS en el Proveedor de Dominio:**
   - **Registro A / CNAME:** Apuntar el dominio raíz y subdominio `www` a la dirección IP o CNAME del proveedor de alojamiento elegido (Cloudflare, Vercel, Netlify o VPS).
   - **Registro SPF (TXT):** Si se utiliza correo corporativo `@kontapro.es`:
     ```text
     v=spf1 include:_spf.google.com ~all
     ```
   - **Registro DMARC (TXT):**
     ```text
     _dmarc.kontapro.es -> v=DMARC1; p=reject; rua=mailto:seguridad@kontapro.es
     ```
2. **Activación y Verificación del Certificado SSL/TLS:**
   - Asegurarse de que la renovación automática de Let's Encrypt o del proveedor de CDN esté habilitada.
   - Forzar la redirección automática de HTTP a HTTPS (`301 Moved Permanently`).
3. **Gestión Segura de Secretos en el Proveedor:**
   - Si se desea rotar la clave pública de Web3Forms, definir la variable de entorno `VITE_WEB3FORMS_ACCESS_KEY` en el panel de configuración del proveedor (ej. Vercel Project Settings > Environment Variables).
4. **Monitorización de Disponibilidad en Producción:**
   - Configurar un servicio de monitorización externo gratuito o de pago (ej. UptimeRobot, Better Uptime) verificando el código de estado `200 OK` en `https://kontapro.es` cada 5 minutos con alertas por correo o Telegram.

---

## 6. Limitaciones de la Evaluación
* La presente auditoría se circunscribe a la web pública estática `web-ia`. No incluye pruebas de penetración sobre la aplicación privada de contabilidad interna ni sobre servicios externos gestionados por terceros (como la infraestructura propia de Web3Forms).
* La seguridad no es un estado estático; se recomienda revisar periódicamente las dependencias (`npm audit`) y auditar las cabeceras tras el despliegue final mediante herramientas como `securityheaders.com` y `ssllabs.com`.

---
*Informe generado por el equipo técnico de arquitectura y seguridad de KontaPro.*
