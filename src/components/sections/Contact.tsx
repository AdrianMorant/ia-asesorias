import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    software: '',
    volumen: '500 a 2.000 facturas/mes',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className={styles.section} id="contacto">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Direct Info & Value */}
          <div className={styles.infoCol}>
            <span className="badge badge--blue">Contacto Directo</span>
            <h2 className={styles.title}>¿Cuánto tiempo dedica tu equipo a picar facturas?</h2>
            <p className={styles.subtitle}>
              Cuéntame cómo trabajáis y analizamos la viabilidad técnica para vuestro software contable sin compromiso.
            </p>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.benefitIcon}>🔍</span>
                <div>
                  <strong>Diagnóstico de viabilidad técnica</strong>
                  <span>Analizamos cómo se conectaría la IA a tu programa contable habitual.</span>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <span className={styles.benefitIcon}>⚡</span>
                <div>
                  <strong>Prueba con tus propias facturas</strong>
                  <span>Procesamos ejemplos reales de tus clientes para comprobar la tasa de acierto.</span>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <span className={styles.benefitIcon}>🔒</span>
                <div>
                  <strong>Garantía de confidencialidad</strong>
                  <span>Acuerdo formal previo para total tranquilidad de tus clientes y de tu despacho.</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className={styles.directCard}>
              <span className={styles.directLabel}>Hablemos directamente:</span>
              <div className={styles.directLinks}>
                <a href="mailto:amorant2005@gmail.com" className={styles.directLink}>
                  ✉️ amorant2005@gmail.com
                </a>
                <a href="tel:+34686766266" className={styles.directLink}>
                  📞 +34 686 766 266
                </a>
              </div>
              <span className={styles.directNote}>
                Respondo personalmente a todas las consultas en menos de 24 horas.
              </span>
            </div>
          </div>

          {/* Right Column: Optimized Agile Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successBadge}>✓</div>
                  <h3 className={styles.successTitle}>¡Solicitud enviada correctamente!</h3>
                  <p className={styles.successMsg}>
                    Muchas gracias, <strong>{formData.nombre}</strong>. He recibido tus datos para evaluar la automatización con <strong>{formData.software}</strong>. Me pondré en contacto contigo muy pronto.
                  </p>
                  <button
                    className="btn btn--ghost"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nombre: '',
                        email: '',
                        telefono: '',
                        software: '',
                        volumen: '500 a 2.000 facturas/mes',
                      });
                    }}
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Solicitar estudio de viabilidad</h3>
                    <p className={styles.formSub}>
                      Completa estos 5 campos breves y evaluaremos tu caso.
                    </p>
                  </div>

                  {/* 1. Nombre y Apellidos (obligatorio) */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="nombre">
                      1. Nombre y Apellidos <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Ej. Laura Gómez Martínez"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  {/* 2 & 3. Email corporativo y Teléfono */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">
                        2. Email corporativo <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="laura@asesoriagomez.es"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="telefono">
                        3. Teléfono de contacto <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        placeholder="600 123 456"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 4. Software contable utilizado actualmente (obligatorio) */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="software">
                      4. Software contable utilizado actualmente <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="software"
                      name="software"
                      type="text"
                      required
                      placeholder="Ej. A3innuva, Sage 50, Contasol, Holded, etc."
                      value={formData.software}
                      onChange={handleChange}
                    />
                  </div>

                  {/* 5. Volumen mensual aproximado de facturas */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="volumen">
                      5. Volumen mensual aproximado de facturas (despacho)
                    </label>
                    <select
                      id="volumen"
                      name="volumen"
                      value={formData.volumen}
                      onChange={handleChange}
                    >
                      <option value="Menos de 500 facturas/mes">Menos de 500 facturas / mes</option>
                      <option value="500 a 2.000 facturas/mes">500 a 2.000 facturas / mes</option>
                      <option value="Más de 2.000 facturas/mes">Más de 2.000 facturas / mes</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: '100%', marginTop: 'var(--sp-2)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando estudio...' : 'Solicitar estudio de automatización →'}
                  </button>

                  <p className={styles.legalNotice}>
                    🔒 Compromiso de confidencialidad: tus datos solo se emplearán para evaluar la viabilidad de tu despacho. Sin spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
