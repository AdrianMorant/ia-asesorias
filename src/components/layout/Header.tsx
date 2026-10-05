import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const NAV = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Control Semáforo', href: '#control-semaforo' },
  { label: 'Integraciones', href: '#conectividad' },
  { label: 'Panel Demo', href: '#dashboard' },
  { label: 'Sobre mí', href: '#sobre-mi' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Columna 1: Logo */}
        <a href="#" className={styles.logo} aria-label="Inicio">
          <span className={styles.logoMark}>A</span>
          <span className={styles.logoText}>
            adrián<span className={styles.logoAccent}>morant</span>
          </span>
          <span className={styles.logoBadge}>IA Asesorías</span>
        </a>

        {/* Columna 2: Navegación estrictamente centrada */}
        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={styles.navLink}>
              {n.label}
            </a>
          ))}
        </nav>

        {/* Columna 3: Botón CTA anclado a la derecha dentro del contenedor */}
        <div className={styles.actions}>
          <a href="#contacto" className={`btn btn--primary ${styles.ctaBtn}`}>
            Solicitar demostración
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen1 : ''}`}></span>
          <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen2 : ''}`}></span>
          <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen3 : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu desplegable */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a
            href="#problema"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            El Problema
          </a>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="btn btn--primary"
            style={{ width: '100%', textAlign: 'center', marginTop: '0.75rem' }}
            onClick={() => setMenuOpen(false)}
          >
            Solicitar demostración
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
