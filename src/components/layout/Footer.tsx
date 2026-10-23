import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import KontaProLogo from '../common/KontaProLogo';
import { useLanguage } from '../../i18n';
import LegalModal, { type LegalTab } from '../common/LegalModal';
import CookieBanner from '../common/CookieBanner';
import { ShieldCheck, PhoneCall } from 'lucide-react';

const CURRENT_YEAR = 2026;

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          {/* Marca KontaPro */}
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Link to="/" aria-label="KontaPro Suite">
                <KontaProLogo theme="dark" height={36} />
              </Link>
            </div>
            <p className={styles.tagline}>{t.footer.tagline}</p>
            <div className={styles.securityPledge}>
              <ShieldCheck size={16} className={styles.pledgeIcon} />
              <span>{t.footer.securityNotice}</span>
            </div>
          </div>

          {/* Columnas de Navegación Multipágina */}
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Producto</h4>
              <Link to="/soluciones" className={styles.colLink}>
                Soluciones para Despachos
              </Link>
              <Link to="/funcionalidades" className={styles.colLink}>
                Funcionalidades & PGC
              </Link>
              <Link to="/como-funciona" className={styles.colLink}>
                Cómo Funciona & Triaje
              </Link>
              <Link to="/simulador" className={styles.colLink}>
                Simulador de Impacto
              </Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Seguridad & Normativa</h4>
              <Link to="/seguridad" className={styles.colLink}>
                Preparado para Veri*factu
              </Link>
              <Link to="/seguridad" className={styles.colLink}>
                Controles de Referencia ISO 27001
              </Link>
              <Link to="/seguridad" className={styles.colLink}>
                Blindaje RGPD & DPA (Art. 28)
              </Link>
              <Link to="/seguridad" className={styles.colLink}>
                Cifrado Bancario AES-256
              </Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Acceso Comercial</h4>
              <Link to="/demo" className={styles.colLink}>
                Solicitar Acceso Beta
              </Link>
              <Link to="/precios" className={styles.colLink}>
                Condiciones & Precios
              </Link>
              <Link to="/simulador" className={styles.colLink}>
                Calcular Ahorro Mensual
              </Link>
              <a href="tel:+34686766266" className={styles.colLinkPhone}>
                <PhoneCall size={14} />
                <span>+34 686 766 266</span>
              </a>
            </div>
          </div>
        </div>

        {/* Fila Inferior Legal */}
        <div className={styles.bottom}>
          <p>© {CURRENT_YEAR} {t.footer.rightsReserved}</p>

          <div className={styles.legalLinks}>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => openLegal('privacy')}
            >
              {t.footer.privacy}
            </button>
            <span>•</span>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => openLegal('legal')}
            >
              {t.footer.legal}
            </button>
            <span>•</span>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => openLegal('cookies')}
            >
              {t.footer.cookies}
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
      <CookieBanner onOpenPreferences={() => openLegal('cookies')} />
    </footer>
  );
};

export default Footer;
