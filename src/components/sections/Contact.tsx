import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';

export interface LeadRecord {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  software: string;
  volumen: string;
}

const STORAGE_KEY = 'ia_asesorias_leads';
const WEB3FORMS_KEY = '0415647e-e22b-4ed5-a00d-8bd10604a02f';

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
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Cargar leads guardados en el navegador
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLeads(JSON.parse(saved));
      }
    } catch {
      // Manejo silencioso en caso de modo privado estricto
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-ES')} ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;

    const newLead: LeadRecord = {
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      fecha: formattedDate,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      software: formData.software,
      volumen: formData.volumen,
    };

    // 1. Guardar en localStorage como copia de seguridad local
    try {
      const updatedLeads = [newLead, ...leads];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    } catch (err) {
      console.error('Error al guardar lead en localStorage:', err);
    }

    // 2. Enviar a Web3Forms para recibir notificación instantánea por correo electrónico
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🚀 Nueva solicitud de viabilidad IA - ${formData.nombre}`,
          from_name: 'IA Asesorías Web',
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          software_contable: formData.software,
          volumen_facturas: formData.volumen,
          mensaje: `El despacho ${formData.nombre} solicita estudio de viabilidad para su software ${formData.software} (${formData.volumen}). Teléfono: ${formData.telefono} | Email: ${formData.email}`,
        }),
      });
    } catch (err) {
      console.warn('Envío a Web3Forms con advertencia (respaldado en local):', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const downloadCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Fecha', 'Nombre', 'Email', 'Telefono', 'Software', 'Volumen'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fecha}"`,
      `"${l.nombre.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.telefono.replace(/"/g, '""')}"`,
      `"${l.software.replace(/"/g, '""')}"`,
      `"${l.volumen.replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_asesorias_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLeads = () => {
    if (window.confirm('¿Seguro que deseas vaciar el historial de solicitudes recibidas?')) {
      localStorage.removeItem(STORAGE_KEY);
      setLeads([]);
    }
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

            {/* Acceso a bandeja de solicitudes para el administrador */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={styles.adminTrigger}
              title="Ver solicitudes registradas en este navegador"
            >
              📋 Ver solicitudes recibidas ({leads.length})
            </button>
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

      {/* Modal de bandeja de solicitudes */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <span>📥</span>
                <h3 className={styles.modalTitle}>Bandeja de Solicitudes Recibidas ({leads.length})</h3>
              </div>
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalExplainer}>
                💡 <strong>¿Dónde se guardan los datos?</strong><br />
                Cada vez que alguien envía el formulario, sus datos se almacenan de forma instantánea aquí en tu navegador (en <code>localStorage</code>) para que no se pierdan. Para recibirlos automáticamente en tu correo electrónico (<code>amorant2005@gmail.com</code>) o en Google Sheets/CRM al publicar tu web en Internet, solo necesitas conectar un endpoint gratuito (como Formspree o Web3Forms).
              </div>

              {leads.length === 0 ? (
                <div className={styles.emptyState}>
                  No hay solicitudes registradas todavía.<br />
                  Rellena el formulario de la derecha para ver cómo aparece aquí en tiempo real.
                </div>
              ) : (
                <div className={styles.leadsTableWrapper}>
                  <table className={styles.leadsTable}>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Software Contable</th>
                        <th>Volumen / Mes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td><strong>{l.fecha}</strong></td>
                          <td>{l.nombre}</td>
                          <td><a href={`mailto:${l.email}`} style={{ color: 'var(--c-blue)' }}>{l.email}</a></td>
                          <td><a href={`tel:${l.telefono}`} style={{ color: 'var(--c-blue)' }}>{l.telefono}</a></td>
                          <td><span className="badge badge--blue">{l.software}</span></td>
                          <td>{l.volumen}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <div>
                {leads.length > 0 && (
                  <button 
                    type="button" 
                    onClick={clearLeads} 
                    className="btn btn--ghost" 
                    style={{ fontSize: '0.82rem', padding: '6px 12px', color: '#EF4444' }}
                  >
                    🗑️ Vaciar registros
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {leads.length > 0 && (
                  <button 
                    type="button" 
                    onClick={downloadCSV} 
                    className="btn btn--primary" 
                    style={{ fontSize: '0.85rem', padding: '6px 14px' }}
                  >
                    📥 Descargar en Excel (CSV)
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="btn btn--ghost" 
                  style={{ fontSize: '0.85rem', padding: '6px 14px' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
