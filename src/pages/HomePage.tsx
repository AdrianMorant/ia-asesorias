import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import StatsBanner from '../components/sections/StatsBanner';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import HowItWorks from '../components/sections/HowItWorks';
import Triage from '../components/sections/Triage';
import Integrations from '../components/sections/Integrations';
import DashboardDemo from '../components/sections/DashboardDemo';
import RoiCalculator from '../components/sections/RoiCalculator';
import Security from '../components/sections/Security';
import AboutCompany from '../components/sections/AboutCompany';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'KontaPro Suite | Software de Contabilidad, Facturación & Copiloto Fiscal IA para Asesorías';
  }, []);

  return (
    <>
      <Hero />
      <StatsBanner />
      <Problem />
      <Solution />
      <HowItWorks />
      <Triage />
      <Integrations />
      <DashboardDemo />
      <RoiCalculator />
      <Security />
      <AboutCompany />
      <Faq />
      <Contact />
    </>
  );
};

export default HomePage;
