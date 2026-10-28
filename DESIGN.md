# Design System: KontaPro Commercial Experience

**Brand:** KontaPro Technologies S.L.  
**Audience:** Titulares de asesorías fiscales, despachos contables y directores financieros.  
**Design Reference:** High-end SaaS (Stripe, Linear, Mercury).

---

## 1. Visual Theme & Atmosphere
- **Atmósfera:** Quirúrgica, deliberada y cinemática. Combina la severidad matemática del rigor contable español con la ligereza espacial, profundidad y dinamismo de un SaaS Tier-1 moderno.
- **Densidad:** 5/10 en zonas editoriales y narrativa; 8/10 en el cockpit interactivo, tablas de doble partida y simulador financiero.
- **Varianza:** 7/10 (Distribución asimétrica con cortes audaces; rechazo absoluto a la plantilla simétrica de 3 tarjetas idénticas).
- **Movimiento:** 8/10 (Coreografía continua con física de resortes elásticos, micro-interacciones táctiles, loops perpetuos de interfaz y contadores numéricos suaves a 60fps).

---

## 2. Color Palette & Functional Roles
- **Corporate Deep Navy (`#0B2046`)**: Color primario oficial de KontaPro. Autoridad corporativa, títulos principales, estructura de contraste.
- **Midnight Navy Background (`#07152B`)**: Fondo ultra-oscuro para la consola del Hero, terminales de código y módulos técnicos.
- **Electric Precision Blue (`#0A78FC`)**: Color secundario interactivo oficial. Acciones primarias, focus rings, sliders de la calculadora, puntos focales de conversión.
- **Interactive Blue (`#0062D6`)**: Estado activo y hover de alta respuesta táctil.
- **Blue Tint Glow (`rgba(10, 120, 252, 0.12)`)**: Resplandores direccionales, spotlights de tarjeta y ambient lighting.
- **Pure Canvas Surface (`#FFFFFF`) / Architectural Subtle (`#F8FAFC`)**: Fondos pulidos de sección. Prohibido el negro puro (`#000000`).
- **Whisper Border (`#E2E8F0` / `rgba(226, 232, 240, 0.8)`)**: Delimitación estructural de 1px con sutil gradiente.
- **Deep Slate Text (`#0F172A`) & Muted Slate (`#334155`)**: Texto primario y secundario con contraste WCAG AAA superior a 7:1.
- **Semáforo Fiscal:**
  - **Fiscal Emerald (`#10B981`)**: Validación Veri*factu, conciliación al 100%, cuadre exacto de asientos y métricas de ahorro.
  - **Supervision Amber (`#F59E0B`)**: Documentos pendientes de validación o revisión de criterio fiscal.
  - **Critical Crimson (`#EF4444`)**: Errores aritméticos, descuadres de libro mayor o alertas de factura duplicada.

---

## 3. Typography Architecture
- **Display & Headings:** `Plus Jakarta Sans` — Geometría limpia, tracking negativo estricto (`-0.03em`), jerarquía por peso (600 SemiBold / 700 Bold / 800 ExtraBold). Sin escalados titánicos desproporcionados.
- **Body & Storytelling:** `Inter` — Interlineado holgado (`line-height: 1.65`), longitud máxima de línea de 65 caracteres (`65ch`).
- **Data, Tablas & Calculadora:** `JetBrains Mono` y `Inter` con `font-feature-settings: "tnum" 1, "cv05" 1` (tabular lining figures). Obligatorio para que los números nunca vibren o cambien de ancho al deslizar valores.

---

## 4. Component Stylings & Interaction
- **Header Glassmorphic Flotante:** Barra flotante con `backdrop-filter: blur(16px)`, isotipo geométrico "K" exclusivo (sin texto secundario), navegación de enlace suave y botón primario táctil.
- **Hero Simulation Loop (Remotion principles):**
  - Consola técnica con marco tipo macOS/browser.
  - Escáner láser azul animado recorriendo la factura digital.
  - Iluminación sincronizada de campos extraídos (NIF, Base imponible, Tipo IVA, Retención IRPF, Total).
  - Aparición del asiento contable cuadrado con subcuentas oficiales PGC (400, 600, 472, etc.) y sello verde Veri*factu.
- **Sliders Hápticos de la Calculadora:**
  - Pista de gradiente progresivo `#0A78FC`.
  - Pulgar deslizante con anillo de foco dinámico y tooltip con el valor actual.
  - Contadores `RollingNumber` con interpolación de resorte (`stiffness: 100, damping: 20`).
- **Bento Grid Cards con Spotlight:**
  - Cada tarjeta detecta la posición del ratón `(mouseX, mouseY)` y proyecta un resplandor radial suave en el borde de 1px.
- **Botones de Alta Gama:**
  - Primario: Azul eléctrico con sombra direccional suave (`0 8px 24px -4px rgba(10, 120, 252, 0.28)`), respuesta táctil `transform: translateY(1px) scale(0.99)`.
  - Secundario: Superficie blanca con borde estructural y texto Navy.

---

## 5. Motion & Physics
- **Interpolación de Resorte:** `cubic-bezier(0.16, 1, 0.3, 1)` para transiciones de estado.
- **Duración de Micro-interacción:** 180ms – 240ms para respuesta inmediata.
- **Cascada de Revelado:** `stagger: 60ms` entre elementos adyacentes al entrar en viewport.
- **Reducción de Movimiento:** Respeto estricto a `@media (prefers-reduced-motion: reduce)` desactivando animaciones continuas.

---

## 6. Anti-Patterns Banned (Reglas de Oro Anti-Generic)
- ❌ **Cero Emojis:** Todos los iconos deben ser vectores SVG Lucide precisos.
- ❌ **Cero Fuentes Genéricas o Negros Puros:** Prohibido `#000000`.
- ❌ **Cero Luces Neón Moradas:** Nada de estética "AI Purple Glow". Todo en Navy y Azul Eléctrico corporativo.
- ❌ **Cero Cuadrículas Simétricas de 3 Tarjetas Idénticas:** Estructura en Bento asimétrico con jerarquía clara.
- ❌ **Cero Clientes o Estadísticas Inventadas:** Sin falsos testimonios ni "99.999% SLA".
- ❌ **Cero Textos de Relleno:** Prohibido "Scroll to explore" o flechas botando hacia abajo.
