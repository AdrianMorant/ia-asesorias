import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import { useAnimatedFavicon } from './utils/useAnimatedFavicon';

// Las 8 Páginas Oficiales de KontaPro Suite
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SimulatorPage from './pages/SimulatorPage';
import SecurityPage from './pages/SecurityPage';
import PricingPage from './pages/PricingPage';
import DemoPage from './pages/DemoPage';

function RouteObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // Pequeño timeout para dar tiempo al montaje del DOM de la nueva ruta
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section, .reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
      );

      sections.forEach((sec) => {
        sec.classList.add('reveal');
        observer.observe(sec);
      });

      return () => observer.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function AppContent() {
  // Favicon dinámico con fondo oscuro animado que cicla de tonalidades sutiles
  useAnimatedFavicon();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteObserver />
      <div className="app-container">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/soluciones" element={<SolutionsPage />} />
            <Route path="/funcionalidades" element={<FeaturesPage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/simulador" element={<SimulatorPage />} />
            <Route path="/seguridad" element={<SecurityPage />} />
            <Route path="/precios" element={<PricingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            {/* Fallback comodín hacia Inicio */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
