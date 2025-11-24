import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-2">AI Key</div>
            <p className="text-slate-500 text-sm">Ваш личный AI-помощник для работы и жизни.</p>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">О нас</a>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Оферта</a>
          </div>

          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AI Key. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};