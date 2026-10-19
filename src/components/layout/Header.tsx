import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import KontaProLogo from '../common/KontaProLogo';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n/types';

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'va', label: 'VAL', name: 'Valencià' },
  { code: 'en', label: 'EN', name: 'English' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.solutions, href: '#soluciones' },
    { label: t.nav.triage, href: '#triage' },
    { label: t.nav.features, href: '#showcase' },
    { label: t.nav.integrations, href: '#integraciones' },
    { label: t.nav.calculator, href: '#calculadora' },
    { label: t.nav.compliance, href: '#seguridad' },
    { label: t.nav.faq, href: '#faq' },
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Columna 1: Logotipo Oficial KontaPro */}
        <a href="#" className={styles.logo} aria-label="KontaPro - Inicio">
          <KontaProLogo height={34} />
        </a>

        {/* Columna 2: Navegación Principal */}
        <nav className={styles.nav} aria-label="Navegación principal">
          {navLinks.map((n) => (
            <a key={n.href} href={n.href} className={styles.navLink}>
              {n.label}
            </a>
          ))}
        </nav>

        {/* Columna 3: Idioma + CTA Demostración */}
        <div className={styles.actions}>
          {/* Selector de Idioma (ES / VAL / EN) */}
          <div className={styles.langSwitcher} role="group" aria-label="Seleccionar idioma">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`${styles.langBtn} ${language === item.code ? styles.langBtnActive : ''}`}
                onClick={() => handleLangChange(item.code)}
                aria-pressed={language === item.code}
                aria-label={`Canviar a ${item.name}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a href="#demo" className={`btn btn--primary ${styles.ctaBtn}`}>
            <span className={styles.ctaGlowDot} aria-hidden="true"></span>
            <span>{t.nav.requestDemo}</span>
          </a>

          {/* Botón Hamburger Móvil */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen1 : ''}`}></span>
            <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen2 : ''}`}></span>
            <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen3 : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}

          <div className={styles.mobileControls}>
            <div className={styles.langSwitcher} role="group" aria-label="Seleccionar idioma">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.langBtn} ${language === item.code ? styles.langBtnActive : ''}`}
                  onClick={() => {
                    handleLangChange(item.code);
                    setMenuOpen(false);
                  }}
                  aria-pressed={language === item.code}
                  aria-label={`Canviar a ${item.name}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#demo"
            className="btn btn--primary"
            style={{ width: '100%', textAlign: 'center', marginTop: '0.75rem' }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.requestDemo}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
