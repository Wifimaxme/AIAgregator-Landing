import React from 'react';
import { ViewState } from '../App';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleLinkClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    trackEvent('Footer', 'Navigation', view);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-2">AI Key</div>
            <p className="text-slate-500 text-sm">Ваш личный AI-помощник для работы и жизни.</p>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <button 
              onClick={(e) => handleLinkClick(e, 'about')} 
              className="hover:text-white transition-colors focus:outline-none"
            >
              О нас
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 'privacy')} 
              className="hover:text-white transition-colors focus:outline-none"
            >
              Политика конфиденциальности
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 'terms')} 
              className="hover:text-white transition-colors focus:outline-none"
            >
              Оферта
            </button>
          </div>

          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AI Key. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};