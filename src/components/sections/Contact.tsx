import React, { useState, useRef } from 'react';
import styles from './Contact.module.css';
import { useLanguage } from '../../i18n';
import LegalModal from '../common/LegalModal';

const DEFAULT_WEB3FORMS_KEY = '0415647e-e22b-4ed5-a00d-8bd10604a02f';

// Utilidad estricta para desinfección contextual de entradas (prevención XSS e inyecciones de cabeceras)
const sanitizeText = (input: string, maxLen = 200): string => {
  if (!input) return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Elimina etiquetas HTML
    .replace(/[\r\n\t]+/g, ' ') // Evita HTTP header injection
    .trim()
    .slice(0, maxLen);
};

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    software: '',
    volumen: '500 a 2.000 facturas/mes',
    notas: '',
  });

  // Campo señuelo honeypot para trampas automáticas contra bots
  const [honeypot, setHoneypot] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  // Registro de tiempo de renderizado para control de spam algorítmico (< 2.5s = bot)
  const mountTimeRef = useRef<number>(0);
  const lastSubmitRef = useRef<number>(0);

  React.useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Control Anti-Bot: Trampa Honeypot
    if (honeypot) {
      // Si el campo invisible fue rellenado por un bot, se finge éxito para descartar el payload sin sobrecargar la API
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    // 2. Control Anti-Bot: Envío instantáneo inhumano (< 2000 ms desde renderizado)
    const timeSinceMount = Date.now() - mountTimeRef.current;
    if (timeSinceMount < 2000) {
      setErrorMessage('Por motivos de seguridad, por favor verifica tus datos antes de enviar.');
      return;
    }

    // 3. Limitación de frecuencia (Anti-Flood / Cooldown de 45 segundos)
    const timeSinceLast = Date.now() - lastSubmitRef.current;
    if (lastSubmitRef.current > 0 && timeSinceLast < 45000) {
      setErrorMessage('Ya se ha enviado una solicitud recientemente. Por favor, espera un minuto antes de enviar otra.');
      return;
    }

    // 4. Validación de consentimiento RGPD
    if (!privacyAccepted) {
      setErrorMessage('Debes aceptar la Política de Privacidad para que podamos coordinar la demostración.');
      return;
    }

    // 5. Validación y sanitización estricta de campos
    const cleanNombre = sanitizeText(formData.nombre, 80);
    const cleanEmpresa = sanitizeText(formData.empresa, 100);
    const cleanEmail = sanitizeText(formData.email, 120).toLowerCase();
    const cleanTelefono = sanitizeText(formData.telefono, 25);
    const cleanSoftware = sanitizeText(formData.software, 60);
    const cleanNotas = formData.notas ? formData.notas.replace(/<[^>]*>?/gm, '').trim().slice(0, 500) : '';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Por favor, introduce una dirección de correo corporativo válida.');
      return;
    }

    const phoneRegex = /^[+]?[\d\s\-().]{8,20}$/;
    if (!phoneRegex.test(cleanTelefono)) {
      setErrorMessage('Por favor, introduce un número de teléfono de contacto válido.');
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = Date.now();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🚀 Solicitud Demo KontaPro - ${cleanEmpresa || cleanNombre}`,
          from_name: 'KontaPro Web Segura',
          responsable: cleanNombre,
          empresa: cleanEmpresa,
          email: cleanEmail,
          telefono: cleanTelefono,
          software_contable: cleanSoftware || 'No especificado',
          volumen_facturas: formData.volumen,
          notas: cleanNotas,
          mensaje: `Solicitud de demostración técnica recibida para el despacho ${cleanEmpresa} (${cleanNombre}). Tel: ${cleanTelefono} | Email: ${cleanEmail} | ERP: ${cleanSoftware} | Volumen: ${formData.volumen}. Notas: ${cleanNotas}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Respuesta no exitosa del servicio');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('Incidencia temporal en la pasarela de envío:', err);
      // Mensaje de contingencia profesional sin revelar trazas internas
      setErrorMessage('No ha sido posible procesar la solicitud en este momento. Puedes llamarnos directamente al teléfono +34 686 766 266.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="demo">
      <div id="contacto" aria-hidden="true" style={{ position: 'absolute', top: 0 }}></div>
      <div className="container">
        <div className={styles.grid}>
          {/* Columna Izquierda: Información de Valor */}
          <div className={styles.infoCol}>
            <span className="badge badge--blue">{t.demoForm.badge}</span>
            <h2 className={styles.title}>{t.demoForm.title}</h2>
            <p className={styles.subtitle}>{t.demoForm.subtitle}</p>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>⏱️</div>
                <div>
                  <strong>Sesión ejecutiva de 20 minutos</strong>
                  <span>Sin rodeos ni presentaciones genéricas. Vamos directos a la operativa contable de tu despacho.</span>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>📑</div>
                <div>
                  <strong>Prueba con tus facturas reales</strong>
                  <span>Puedes traer un lote de facturas complejas de tus clientes para comprobar la extracción y cuadre en vivo.</span>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔌</div>
                <div>
                  <strong>Validación de enlace con tu ERP</strong>
                  <span>Comprobamos la generación de enlaces contables para A3, Sage, Contasol o Holded sin compromiso.</span>
                </div>
              </div>
            </div>

            <div className={styles.directCard}>
              <span className={styles.directLabel}>Atención telefónica directa para despachos:</span>
              <div className={styles.directLinks}>
                <a href="tel:+34686766266" className={styles.directPhoneLink}>
                  <span className={styles.directPhoneIcon} aria-hidden="true">📞</span>
                  <div className={styles.directPhoneInfo}>
                    <strong className={styles.directPhoneNumber}>+34 686 766 266</strong>
                    <span className={styles.directPhoneHours}>Lunes a Viernes · 9:00 a 19:00</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario o Confirmación */}
          <div>
            {!submitted ? (
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Solicitar sesión personalizada</h3>
                  <p className={styles.formSub}>Completa tus datos y coordinaremos la fecha de la demostración.</p>
                </div>

                {errorMessage && (
                  <div className={styles.errorMessage} role="alert">
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  {/* Trampa Honeypot para detección de robots */}
                  <input
                    type="text"
                    name="_hp_security_check"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className={styles.honeypot}
                    aria-hidden="true"
                  />

                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="nombre" className={styles.fieldLabel}>
                        {t.demoForm.nameLabel}
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        maxLength={80}
                        placeholder={t.demoForm.namePlaceholder}
                        value={formData.nombre}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="empresa" className={styles.fieldLabel}>
                        {t.demoForm.companyLabel}
                      </label>
                      <input
                        id="empresa"
                        type="text"
                        name="empresa"
                        required
                        maxLength={100}
                        placeholder={t.demoForm.companyPlaceholder}
                        value={formData.empresa}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.fieldLabel}>
                        {t.demoForm.emailLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        maxLength={120}
                        placeholder={t.demoForm.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="telefono" className={styles.fieldLabel}>
                        {t.demoForm.phoneLabel}
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        required
                        maxLength={25}
                        placeholder={t.demoForm.phonePlaceholder}
                        value={formData.telefono}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="software" className={styles.fieldLabel}>
                        {t.demoForm.softwareLabel}
                      </label>
                      <select
                        id="software"
                        name="software"
                        required
                        value={formData.software}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="">{t.demoForm.softwareDefault}</option>
                        <option value="Wolters Kluwer A3 (a3innuva / A3ASESOR)">Wolters Kluwer A3 (a3innuva / A3ASESOR)</option>
                        <option value="Sage Despachos Connected / Sage 50">Sage Despachos Connected / Sage 50</option>
                        <option value="Contasol (Software DELSOL)">Contasol (Software DELSOL)</option>
                        <option value="Holded ERP">Holded ERP</option>
                        <option value="Cegid / Diez Software">Cegid / Diez Software</option>
                        <option value="Anfix">Anfix</option>
                        <option value="Otro software contable">Otro programa contable</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="volumen" className={styles.fieldLabel}>
                        {t.demoForm.volumeLabel}
                      </label>
                      <select
                        id="volumen"
                        name="volumen"
                        value={formData.volumen}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="Menos de 500 facturas/mes">Menos de 500 facturas/mes</option>
                        <option value="500 a 2.000 facturas/mes">500 a 2.000 facturas/mes</option>
                        <option value="2.000 a 5.000 facturas/mes">2.000 a 5.000 facturas/mes</option>
                        <option value="Más de 5.000 facturas/mes">Más de 5.000 facturas/mes</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="notas" className={styles.fieldLabel}>
                      {t.demoForm.notesLabel}
                    </label>
                    <textarea
                      id="notas"
                      name="notas"
                      maxLength={500}
                      placeholder={t.demoForm.notesPlaceholder}
                      value={formData.notas}
                      onChange={handleChange}
                      className={styles.textarea}
                    />
                  </div>

                  {/* Consentimiento Explícito RGPD */}
                  <div className={styles.consentGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        required
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className={styles.checkboxInput}
                      />
                      <span>
                        Acepto el tratamiento de mis datos de contacto para la coordinación de la demostración conforme a la{' '}
                        <button
                          type="button"
                          className={styles.legalBtn}
                          onClick={() => setLegalOpen(true)}
                        >
                          Política de Privacidad
                        </button>
                        .
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn--primary ${styles.submitBtn}`}
                  >
                    {isSubmitting ? t.demoForm.submittingBtn : t.demoForm.submitBtn}
                  </button>

                  <p className={styles.privacyPledge}>{t.demoForm.privacyNotice}</p>
                </form>
              </div>
            ) : (
              <div className={styles.successCard}>
                <div className={styles.successIcon} aria-hidden="true">✓</div>
                <h3 className={styles.successTitle}>{t.demoForm.successTitle}</h3>
                <p className={styles.successDesc}>{t.demoForm.successMessage}</p>
                <span className="badge badge--green">{t.demoForm.successDetails}</span>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nombre: '',
                      empresa: '',
                      email: '',
                      telefono: '',
                      software: '',
                      volumen: '500 a 2.000 facturas/mes',
                      notas: '',
                    });
                    setPrivacyAccepted(false);
                    mountTimeRef.current = Date.now();
                  }}
                  className="btn btn--outline"
                  style={{ marginTop: '1rem' }}
                >
                  {t.demoForm.newRequestBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Legal y de Privacidad */}
      <LegalModal
        isOpen={legalOpen}
        initialTab="privacy"
        onClose={() => setLegalOpen(false)}
      />
    </section>
  );
};

export default Contact;
