
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { UseCases } from './components/UseCases';
import { ProactiveMode } from './components/ProactiveMode';
import { InteractiveDemo } from './components/InteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { SocialProof } from './components/SocialProof';
import { Comparison } from './components/Comparison';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ui/ParticleBackground';
import { RegistrationModal } from './components/RegistrationModal';
import { AboutUs } from './components/AboutUs';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

export type ViewState = 'landing' | 'about' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const openAuth = () => setIsRegModalOpen(true);

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500 selection:text-white relative">
      {/* Particles only on landing or significantly reduced on doc pages? Keeping it everywhere for consistency */}
      <ParticleBackground />
      
      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
      />
      
      <Navbar 
        isScrolled={isScrolled} 
        onOpenAuth={openAuth} 
        currentView={currentView}
        onNavigate={navigateTo}
      />
      
      <main className="flex flex-col w-full relative z-10 min-h-screen">
        {currentView === 'landing' ? (
          <>
            <Hero onOpenAuth={openAuth} />
            <Features />
            <UseCases />
            <ProactiveMode />
            <InteractiveDemo />
            <HowItWorks />
            <SocialProof />
            <Comparison />
            <Pricing onOpenAuth={openAuth} />
            <FAQ />
          </>
        ) : (
          <div className="pt-32 pb-24 container mx-auto px-4 animate-in fade-in duration-500">
             {currentView === 'about' && <AboutUs />}
             {currentView === 'privacy' && <PrivacyPolicy />}
             {currentView === 'terms' && <TermsOfService />}
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;