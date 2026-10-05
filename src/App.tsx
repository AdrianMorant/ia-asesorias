import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Solution from './components/sections/Solution';
import HowItWorks from './components/sections/HowItWorks';
import Triage from './components/sections/Triage';
import Integrations from './components/sections/Integrations';
import DashboardDemo from './components/sections/DashboardDemo';
import RoiCalculator from './components/sections/RoiCalculator';
import Security from './components/sections/Security';
import AboutMe from './components/sections/AboutMe';
import Faq from './components/sections/Faq';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    // Observador para animaciones de revelado suave al hacer scroll
    const sections = document.querySelectorAll('section, .reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach((sec) => {
      sec.classList.add('reveal');
      observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Triage />
        <Integrations />
        <DashboardDemo />
        <RoiCalculator />
        <Security />
        <AboutMe />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
