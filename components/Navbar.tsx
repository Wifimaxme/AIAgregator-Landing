
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { AILogo } from './ui/AILogo';
import { navLinks } from '../data/content';
import { trackEvent } from '../utils/analytics';
import { ViewState } from '../App';

interface NavbarProps {
  isScrolled: boolean;
  onOpenAuth: () => void;
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isScrolled, 
  onOpenAuth, 
  currentView = 'landing',
  onNavigate 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string; href: string }) => {
    e.preventDefault();
    trackEvent('Navigation', 'Click Link', link.name);
    setIsMobileMenuOpen(false);

    if (currentView !== 'landing' && onNavigate) {
       onNavigate('landing');
       // Allow time for state update before scrolling
       setTimeout(() => {
          scrollToSection(link.href);
       }, 100);
    } else {
       scrollToSection(link.href);
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('Navigation', 'Click Logo');
    if (onNavigate) {
      onNavigate('landing');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAuthClick = (source: string) => {
    trackEvent('Navigation', 'Click CTA', source);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    onOpenAuth();
  };

  const isLanding = currentView === 'landing';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isLanding ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center shadow-lg shadow-brand-500/10 group-hover:shadow-brand-500/30 transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-50" />
            <AILogo className="w-7 h-7" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AI Key</span>
        </a>

        {/* Desktop Nav - Only visible on Landing Page */}
        {isLanding ? (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={(e) => handleLogoClick(e)}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Вернуться на главную
            </button>
          </nav>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAuthClick('Desktop Header')}
            className="bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            7 дней бесплатно
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {isLanding ? (
                navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className="text-base font-medium text-slate-300 hover:text-white block"
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                <button 
                   onClick={(e) => { setIsMobileMenuOpen(false); handleLogoClick(e); }}
                   className="text-base font-medium text-slate-300 hover:text-white block text-left"
                >
                  ← На главную
                </button>
              )}
              
              <div className="h-px bg-slate-800 my-2"></div>
              <button 
                onClick={() => handleAuthClick('Mobile Menu')}
                className="w-full bg-brand-500 text-white px-5 py-3 rounded-lg text-base font-bold hover:bg-brand-600 transition-colors text-center shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              >
                Попробовать бесплатно
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};