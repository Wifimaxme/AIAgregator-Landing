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

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500 selection:text-white relative">
      <ParticleBackground />
      
      <Navbar isScrolled={isScrolled} />
      
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <Features />
        <UseCases />
        <ProactiveMode />
        <InteractiveDemo />
        <HowItWorks />
        <SocialProof />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default App;