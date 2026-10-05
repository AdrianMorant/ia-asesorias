# Adrián Morant — Automatización e Inteligencia Artificial para Asesorías y Despachos

> Capa de Inteligencia Artificial y automatización de procesos contables que se conecta al software actual de la asesoría (Holded, Sage, A3, Contasol, etc.) sin cambiar su operativa.

---

## 🚀 Propuesta de Valor

**“No cambies de software. Automatiza lo que ocurre alrededor de él.”**

Esta plataforma web B2B presenta una solución integral para despachos contables y fiscales orientada a eliminar el picado manual de facturas y acelerar los cierres trimestrales mediante IA multimodal.

---

## ✨ Características Principales

- **Ingesta Multicanal Desatendida:** Recepción automática por email dedicado, Google Drive, OneDrive o carpetas en red.
- **Extracción Multimodal con IA:** Lectura de proveedor, CIF/NIF, número de factura, bases imponibles desglosadas (4%, 10%, 21%), retenciones IRPF y total.
- **Validación Aritmética y Anti-duplicados:** Verificación matemática al céntimo y detección de facturas repetidas.
- **Mapeo Contable PGC:** Propuesta automática de subcuentas (grupos 6 y 7) y aprendizaje continuo con cada corrección contable.
- **Sistema Semáforo de Triaje:**
  - 🟢 **Nivel Verde:** Procesamiento directo (~94% volumen).
  - 🟡 **Nivel Amarillo:** Revisión rápida asistida en 1 clic (~4%).
  - 🔴 **Nivel Rojo:** Bloqueo preventivo por duplicado o descuadre (~2%).
- **Compatibilidad con Software Español:** Conexión vía API o generación de ficheros de enlace contable (SUENLACE, CSV estructurado, A3, Sage, Contasol).
- **Cumplimiento RGPD y Servidores UE:** Los datos fiscales nunca se utilizan para entrenar modelos públicos; cifrado AES-256 en reposo y TLS 1.3 en tránsito.
- **Simulador de Rentabilidad (ROI):** Calculadora interactiva de horas y costes ahorrados en tiempo real.
- **Diseño 100% Responsive:** Adaptado a pantallas de escritorio, portátiles, tablets y smartphones.

---

## 🛠️ Stack Tecnológico

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** CSS Modules + Vanilla CSS Tokens
- **Tipografía:** [Inter (Google Fonts)](https://fonts.google.com/specimen/Inter)

---

## 📦 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AdrianMorant/ia-asesorias.git
   cd ia-asesorias
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Accede en tu navegador a `http://localhost:5173/` (o vía red local en la IP mostrada en consola).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 👤 Autor

**Adrián Morant**  
*Desarrollador especializado en Inteligencia Artificial y Automatización de Procesos Contables.*  
- ✉️ Email: [amorant2005@gmail.com](mailto:amorant2005@gmail.com)  
- 📞 Teléfono: [+34 686 766 266](tel:+34686766266)  
