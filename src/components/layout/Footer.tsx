import React, { useState } from 'react';
import styles from './Footer.module.css';
import KontaProLogo from '../common/KontaProLogo';
import { useLanguage } from '../../i18n';
import LegalModal, { type LegalTab } from '../common/LegalModal';
import CookieBanner from '../common/CookieBanner';
import { ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

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
              <KontaProLogo theme="dark" height={36} />
            </div>
            <p className={styles.tagline}>{t.footer.tagline}</p>
            <div className={styles.securityPledge}>
              <ShieldCheck size={16} className={styles.pledgeIcon} />
              <span>{t.footer.securityNotice}</span>
            </div>
          </div>

          {/* Columnas de Navegación y Soluciones */}
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{t.footer.colProduct}</h4>
              <a href="#showcase" className={styles.colLink}>
                {t.footer.colProductLinks[0]}
              </a>
              <a href="#showcase" className={styles.colLink}>
                {t.footer.colProductLinks[1]}
              </a>
              <a href="#showcase" className={styles.colLink}>
                {t.footer.colProductLinks[2]}
              </a>
              <a href="#showcase" className={styles.colLink}>
                {t.footer.colProductLinks[3]}
              </a>
              <a href="#showcase" className={styles.colLink}>
                {t.footer.colProductLinks[4]}
              </a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>{t.footer.colCompliance}</h4>
              <a href="#seguridad" className={styles.colLink}>
                {t.footer.colComplianceLinks[0]}
              </a>
              <a href="#seguridad" className={styles.colLink}>
                {t.footer.colComplianceLinks[1]}
              </a>
              <a href="#seguridad" className={styles.colLink}>
                {t.footer.colComplianceLinks[2]}
              </a>
              <a href="#seguridad" className={styles.colLink}>
                {t.footer.colComplianceLinks[3]}
              </a>
              <a href="#seguridad" className={styles.colLink}>
                {t.footer.colComplianceLinks[4]}
              </a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>{t.footer.colCompany}</h4>
              <a href="#demo" className={styles.colLink}>
                {t.footer.colCompanyLinks[0]}
              </a>
              <a href="#calculadora" className={styles.colLink}>
                {t.footer.colCompanyLinks[1]}
              </a>
              <a href="#integraciones" className={styles.colLink}>
                {t.footer.colCompanyLinks[2]}
              </a>
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
            <span>•</span>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => openLegal('preferences')}
            >
              Configurar Cookies
            </button>
          </div>

          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span>
              <Sparkles size={11} className={styles.statusSparkle} />
              Beta Cerrada · Motor Activo
            </span>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />

      <CookieBanner onOpenPreferences={() => openLegal('preferences')} />
    </footer>
  );
};

export default Footer;
