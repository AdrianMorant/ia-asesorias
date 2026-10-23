import React, { useState, useEffect } from 'react';
import styles from './LegalModal.module.css';
import { Shield, FileText, Cookie, X, Check, Sliders, AlertCircle } from 'lucide-react';

export type LegalTab = 'privacy' | 'legal' | 'cookies' | 'preferences';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);
  const [prevInitial, setPrevInitial] = useState<LegalTab>(initialTab);

  // Estados de preferencias de cookies
  const [analyticsConsent, setAnalyticsConsent] = useState(() => {
    return localStorage.getItem('kontapro_cookie_analytics') === 'true';
  });
  const [savedNotice, setSavedNotice] = useState(false);

  if (initialTab !== prevInitial) {
    setPrevInitial(initialTab);
    setTab(initialTab);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSaveCookiePreferences = () => {
    localStorage.setItem('kontapro_cookie_analytics', analyticsConsent ? 'true' : 'false');
    localStorage.setItem('kontapro_cookie_consent_status', 'customized');
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.titleIconBox}>
              <Shield size={20} className={styles.titleIcon} />
            </div>
            <h3 id="legal-modal-title" className={styles.title}>
              Información Legal & Transparencia Normativa
            </h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar ventana legal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className={styles.tabBar} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'privacy'}
            className={`${styles.tabBtn} ${tab === 'privacy' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('privacy')}
          >
            <Shield size={15} />
            Política de Privacidad
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'legal'}
            className={`${styles.tabBtn} ${tab === 'legal' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('legal')}
          >
            <FileText size={15} />
            Aviso Legal
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'cookies'}
            className={`${styles.tabBtn} ${tab === 'cookies' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('cookies')}
          >
            <Cookie size={15} />
            Política de Cookies
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'preferences'}
            className={`${styles.tabBtn} ${tab === 'preferences' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('preferences')}
          >
            <Sliders size={15} />
            Configurar Cookies
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className={styles.content}>
          {tab === 'privacy' && (
            <>
              <div className={styles.noticePending}>
                <AlertCircle size={16} className={styles.noticeIcon} />
                <span>
                  <strong>Nota de transparencia:</strong> Los datos identificativos del responsable señalados con <code>[Pendiente de confirmación]</code> serán completados de forma definitiva con los datos mercantiles antes del lanzamiento comercial abierto.
                </span>
              </div>

              <h4>1. Responsable del Tratamiento de Datos</h4>
              <p>
                El responsable del tratamiento de los datos recogidos a través de este sitio web es:
              </p>
              <ul>
                <li><strong>Denominación comercial:</strong> KontaPro Suite</li>
                <li><strong>Titular / Razón Social:</strong> <em>[Razón social del titular pendiente de confirmación antes de publicación final]</em></li>
                <li><strong>NIF / CIF:</strong> <em>[NIF pendiente de confirmación antes de publicación final]</em></li>
                <li><strong>Domicilio Social:</strong> <em>[Domicilio fiscal pendiente de confirmación antes de publicación final]</em></li>
                <li><strong>Email de Contacto Privacidad:</strong> <em>[Email corporativo legal pendiente de confirmación antes de publicación final]</em></li>
                <li><strong>Atención Telefónica de Soporte:</strong> +34 686 766 266</li>
              </ul>

              <h4>2. Finalidad del Tratamiento y Legitimación</h4>
              <p>
                Los datos personales aportados mediante el formulario de contacto y solicitud de acceso a la beta cerrada (nombre, empresa, correo corporativo, teléfono y software contable utilizado) se tratan estrictamente para:
              </p>
              <ul>
                <li>Gestionar y coordinar la sesión de demostración técnica del software KontaPro.</li>
                <li>Evaluar la compatibilidad técnica y el volumen de facturación del despacho solicitante.</li>
                <li>Atender consultas técnicas previas y facilitar el acceso guiado a la beta.</li>
              </ul>
              <p>
                La base jurídica del tratamiento es la <strong>aplicación de medidas precontractuales a petición del interesado</strong> y el <strong>consentimiento expreso</strong> facilitado al enviar el formulario (Arts. 6.1.a y 6.1.b del RGPD UE 2016/679).
              </p>

              <h4>3. Conservación de los Datos</h4>
              <p>
                Los datos se conservarán durante el periodo necesario para gestionar la relación precontractual con el despacho y el seguimiento de la beta, o hasta que el usuario solicite su supresión.
              </p>

              <h4>4. Destinatarios y Proveedores</h4>
              <p>
                KontaPro no cede ni comercializa datos personales con terceros. Los servidores de almacenamiento y cómputo se encuentran alojados exclusivamente en la Unión Europea bajo estándares conformes al RGPD. Los datos contables nunca se transfieren a terceros ni se utilizan para entrenar modelos públicos de inteligencia artificial.
              </p>

              <h4>5. Ejercicio de Derechos</h4>
              <p>
                El usuario puede solicitar el ejercicio de sus derechos de Acceso, Rectificación, Supresión, Limitación, Oposición y Portabilidad dirigiéndose por escrito con referencia &quot;Protección de Datos&quot; al teléfono <strong>+34 686 766 266</strong> o al correo legal de la entidad una vez designado formalmente.
              </p>
            </>
          )}

          {tab === 'legal' && (
            <>
              <div className={styles.noticePending}>
                <AlertCircle size={16} className={styles.noticeIcon} />
                <span>
                  <strong>Información LSSI-CE:</strong> Campos societarios oficiales pendientes de incorporación registral definitiva.
                </span>
              </div>

              <h4>1. Información General y Titularidad</h4>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):
              </p>
              <ul>
                <li><strong>Nombre del Proyecto:</strong> KontaPro</li>
                <li><strong>Titular de la Web:</strong> <em>[Razón social / Titular de la explotación pendiente de confirmación]</em></li>
                <li><strong>NIF:</strong> <em>[NIF pendiente de confirmación]</em></li>
                <li><strong>Dirección:</strong> <em>[Dirección de la sede pendiente de confirmación]</em></li>
                <li><strong>Contacto Directo:</strong> +34 686 766 266</li>
              </ul>

              <h4>2. Propiedad Intelectual e Industrial</h4>
              <p>
                El código fuente, arquitectura del software, logotipos, elementos gráficos, textos explicativos, maquetas de interfaz y algoritmos de triaje de KontaPro son titularidad de sus desarrolladores legítimos o cuentan con autorización de uso, estando protegidos por la normativa de propiedad intelectual.
              </p>

              <h4>3. Carácter Demostrativo del Entorno Web</h4>
              <p>
                Los paneles interactivos, importes numéricos y tablas de facturación mostrados en la web pública tienen carácter de prototipo demostrativo con datos ficticios. No constituyen operaciones bancarias reales ni implican homologaciones no acreditadas.
              </p>
            </>
          )}

          {tab === 'cookies' && (
            <>
              <h4>1. ¿Qué son las cookies?</h4>
              <p>
                Una cookie es un fichero técnico que se descarga en el navegador del usuario al acceder a determinados sitios web para permitir la navegación segura y el almacenamiento de preferencias operativas.
              </p>

              <h4>2. Tipología de Cookies Empleadas en KontaPro</h4>
              <ul>
                <li>
                  <strong>Cookies Técnicas (Estrictamente Necesarias):</strong> Indispensables para el funcionamiento de la web (almacenamiento de preferencia de idioma <code>kontapro_language_preference</code> y control de sesiones seguras). No requieren consentimiento previo al ser necesarias para prestar el servicio solicitado.
                </li>
                <li>
                  <strong>Cookies de Preferencias / Rendimiento:</strong> Destinadas a recordar configuraciones personalizadas del usuario. Vienen desactivadas por defecto y solo se ejecutan tras consentimiento explícito.
                </li>
                <li>
                  <strong>Sin Cookies Publicitarias de Terceros:</strong> KontaPro no instala cookies de rastreo publicitario cruzado ni comparte identificadores con redes de publicidad.
                </li>
              </ul>
            </>
          )}

          {tab === 'preferences' && (
            <div className={styles.preferencesPanel}>
              <h4>Panel de Configuración de Cookies</h4>
              <p className={styles.prefDesc}>
                Puedes activar o desactivar cada categoría de cookies. Las cookies técnicas son obligatorias para el funcionamiento de la plataforma web.
              </p>

              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <strong>Cookies Técnicas y de Navegación</strong>
                  <span className={styles.prefSub}>
                    Necesarias para la selección de idioma, envío seguro de formularios y renderizado visual.
                  </span>
                </div>
                <span className={styles.alwaysActive}>Siempre activas</span>
              </div>

              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <strong>Métricas y Rendimiento Agregado</strong>
                  <span className={styles.prefSub}>
                    Permiten medir de forma anónima el rendimiento de la consola y la estabilidad de carga.
                  </span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              {savedNotice && (
                <div className={styles.savedAlert}>
                  <Check size={16} /> Preferencias guardadas correctamente.
                </div>
              )}

              <div className={styles.prefActions}>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleSaveCookiePreferences}
                >
                  Guardar Preferencias
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
