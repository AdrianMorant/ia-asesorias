import React, { useState, useEffect } from 'react';
import styles from './LegalModal.module.css';

export type LegalTab = 'privacy' | 'legal' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);
  const [prevInitial, setPrevInitial] = useState<LegalTab>(initialTab);

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
            <span className={styles.titleIcon} aria-hidden="true">⚖️</span>
            <h3 id="legal-modal-title" className={styles.title}>
              Información Legal y Cumplimiento Normativo
            </h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.tabBar}>
          <button
            type="button"
            className={`${styles.tabBtn} ${tab === 'privacy' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('privacy')}
          >
            Política de Privacidad (RGPD)
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${tab === 'legal' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('legal')}
          >
            Aviso Legal
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${tab === 'cookies' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('cookies')}
          >
            Política de Cookies
          </button>
        </div>

        <div className={styles.content}>
          {tab === 'privacy' && (
            <>
              <h4>1. Responsable del Tratamiento de Datos</h4>
              <p>
                El responsable del tratamiento de los datos recogidos a través de este sitio web es <strong>KontaPro Suite</strong> (en adelante, &quot;KontaPro&quot;), con canal de atención en materia de protección de datos a través del teléfono oficial: <strong>+34 686 766 266</strong>.
              </p>

              <h4>2. Finalidad del Tratamiento y Legitimación</h4>
              <p>
                Los datos personales facilitados a través del formulario de contacto y solicitud de demostración (nombre, empresa, correo corporativo, teléfono y software contable utilizado) se tratan con las siguientes finalidades:
              </p>
              <ul>
                <li>Coordinar, agendar y realizar la sesión de demostración técnica del software KontaPro.</li>
                <li>Evaluar la compatibilidad técnica y el volumen operativo del despacho solicitante.</li>
                <li>Responder a consultas técnicas, presupuestos y soporte previo a la contratación.</li>
              </ul>
              <p>
                La base jurídica que legitima este tratamiento es el <strong>consentimiento expreso del interesado</strong> y la <strong>aplicación de medidas precontractuales</strong> a petición del propio usuario (Artículos 6.1.a y 6.1.b del Reglamento General de Protección de Datos - RGPD UE 2016/679).
              </p>

              <h4>3. Conservación de los Datos</h4>
              <p>
                Los datos se conservarán durante el tiempo estrictamente necesario para la atención de la solicitud comercial y el seguimiento técnico de la demostración, o hasta que el interesado solicite su supresión.
              </p>

              <h4>4. Destinatarios y Transferencias Internacionales</h4>
              <p>
                KontaPro no vende, alquila ni cede datos de contacto a terceros. Para la entrega segura de notificaciones de formularios se emplean proveedores de infraestructura con servidores situados en la Unión Europea o bajo marcos de adecuación conformes al RGPD. Los datos contables o fiscales de clientes nunca se emplean para entrenar modelos públicos de inteligencia artificial.
              </p>

              <h4>5. Derechos del Usuario (ARSOPOL)</h4>
              <p>
                El usuario puede ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Supresión, Limitación del tratamiento, Oposición y Portabilidad</strong> de sus datos personales comunicándose directamente al teléfono oficial <strong>+34 686 766 266</strong> con la referencia &quot;Protección de Datos&quot;, acreditando fehacientemente su identidad.
              </p>
            </>
          )}

          {tab === 'legal' && (
            <>
              <h4>1. Información General y Titularidad</h4>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de la entidad desarrolladora de <strong>KontaPro Suite</strong>, con teléfono oficial de atención directa y soporte técnico para despachos <strong>+34 686 766 266</strong>.
              </p>

              <h4>2. Condiciones de Uso y Propiedad Intelectual</h4>
              <p>
                El acceso y navegación por este sitio web atribuye la condición de usuario, implicando la aceptación de las presentes condiciones.
              </p>
              <p>
                Todos los contenidos, marcas comerciales, logotipos, código fuente, diseños gráficos, algoritmos de triaje y textos explicativos son propiedad exclusiva de KontaPro o cuentan con licencia de uso, estando protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.
              </p>

              <h4>3. Limitación de Responsabilidad</h4>
              <p>
                KontaPro no se hace responsable de los daños o perjuicios derivados de interferencias, interrupciones, virus informáticos o desconexiones en las redes de telecomunicaciones ajenas al control de la plataforma. La información expuesta en la web pública tiene carácter orientativo y demostrativo sobre las funcionalidades de la plataforma SaaS.
              </p>
            </>
          )}

          {tab === 'cookies' && (
            <>
              <h4>1. ¿Qué son las cookies y qué uso hace KontaPro?</h4>
              <p>
                Una cookie es un pequeño fichero de texto que se almacena en el navegador del usuario al visitar una página web.
              </p>
              <p>
                La web pública de KontaPro sigue un principio de <strong>privacidad por diseño</strong>:
              </p>
              <ul>
                <li><strong>Cookies Técnicas Estrictamente Necesarias:</strong> Se emplean únicamente para almacenar la preferencia de idioma (ES, CA, EN) mediante almacenamiento local (<code>kontapro_language_preference</code>) y para garantizar la seguridad en la transmisión de formularios.</li>
                <li><strong>Sin Rastreo Publicitario de Terceros:</strong> No instalamos cookies de terceros con fines de perfilado comercial ni rastreo publicitario masivo.</li>
              </ul>

              <h4>2. Gestión y Desactivación</h4>
              <p>
                El usuario puede configurar su navegador para rechazar o eliminar cookies en cualquier momento a través de las opciones de configuración de su navegador web (Chrome, Firefox, Safari, Edge).
              </p>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
