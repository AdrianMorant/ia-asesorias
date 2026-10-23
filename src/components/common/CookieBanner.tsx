import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onOpenPreferences: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPreferences }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kontapro_cookie_consent_status');
    if (!consent) {
      // Mostrar con un leve retardo para que la experiencia visual de entrada sea fluida
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('kontapro_cookie_consent_status', 'accepted');
    localStorage.setItem('kontapro_cookie_analytics', 'true');
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('kontapro_cookie_consent_status', 'rejected');
    localStorage.setItem('kontapro_cookie_analytics', 'false');
    setVisible(false);
  };

  const handleConfigure = () => {
    onOpenPreferences();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.bannerContainer} role="region" aria-label="Gestión de consentimiento de cookies">
      <div className={styles.bannerInner}>
        <div className={styles.iconCol}>
          <div className={styles.iconBox}>
            <Cookie size={24} className={styles.cookieIcon} />
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.titleRow}>
            <strong>Transparencia y Gestión de Cookies en KontaPro</strong>
            <span className={styles.complianceChip}>
              <ShieldCheck size={12} /> Privacidad por Diseño
            </span>
          </div>
          <p className={styles.bannerText}>
            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y la persistencia de idioma. Las cookies no esenciales solo se activan con tu consentimiento. Puedes aceptar todas, rechazarlas o configurar tus preferencias en cualquier momento.
          </p>
        </div>

        <div className={styles.actionsCol}>
          <button
            type="button"
            className={styles.acceptBtn}
            onClick={handleAcceptAll}
          >
            Aceptar todas
          </button>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={handleRejectNonEssential}
          >
            Rechazar no esenciales
          </button>
          <button
            type="button"
            className={styles.configBtn}
            onClick={handleConfigure}
          >
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
