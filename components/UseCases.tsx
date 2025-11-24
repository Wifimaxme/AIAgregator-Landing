import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCasesCategories, useCasesData } from '../data/content';
import { trackEvent } from '../utils/analytics';

export const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof useCasesData>('work');

  const handleTabChange = (id: string) => {
    setActiveTab(id as keyof typeof useCasesData);
    trackEvent('UseCases', 'Switch Tab', id);
  };

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden">
      {/* Use transparent/gradient bg instead of solid to show particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Полезен каждому
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Выберите вашу сферу и посмотрите, как AI Key упрощает жизнь.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {useCasesCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === cat.id 
                  ? 'bg-white text-slate-950 shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] scale-105 z-10' 
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white backdrop-blur-sm'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="max-w-5xl mx-auto min-h-[300px]">
          <AnimatePresence mode='wait'>
            <div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {useCasesData[activeTab].map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl hover:border-brand-500/50 transition-colors group relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 blur-2xl group-hover:scale-150 transition-transform duration-700 animate-aurora"></div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-brand-400 font-bold mb-6 group-hover:scale-110 group-hover:bg-brand-500/10 transition-all duration-300">
                    {idx + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-100 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed flex-grow">{item.desc}</p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-brand-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Пример
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};