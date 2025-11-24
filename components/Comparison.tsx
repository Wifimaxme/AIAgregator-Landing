import React, { useState } from 'react';
import { Check, X, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AILogo } from './ui/AILogo';

const comparisonData = [
  {
    title: "Проактивный режим",
    tooltip: "Интеллектуальный ассистент работает поверх браузера. Помогает писать письма, посты и комментарии, не переключая вкладки.",
    standard: false,
    aiKey: true
  },
  {
    title: "Оплата картой РФ",
    tooltip: "Не нужно искать зарубежные карты, посредников или разбираться с криптовалютой. Принимаем любые карты российских банков.",
    standard: false,
    aiKey: true
  },
  {
    title: "Все нейросети в одной цене",
    tooltip: "Вместо того чтобы платить $20/мес отдельно за GPT-4, Claude и Midjourney (итого ~$60+), вы получаете доступ ко всем сразу в одной подписке.",
    standard: false,
    aiKey: true
  },
  {
    title: "Авто-подбор модели",
    tooltip: "Вам не нужно думать, какую модель выбрать. AI Key сам определит, кто лучше справится: Claude с текстом или GPT-4 с кодом.",
    standard: false,
    aiKey: true
  },
  {
    title: "Голос, фото и файлы",
    tooltip: "Записывайте голосовые на бегу, кидайте фото документов или PDF-отчеты — мы распознаем и проанализируем всё.",
    standard: true, // Частично есть у других, но отметим как true для честности, или false если считаем это киллер-фичей
    aiKey: true
  }
];

export const Comparison: React.FC = () => {
  // State to track which tooltip is active on mobile or hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 relative z-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Почему AI Key лучше
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 rounded-2xl border border-slate-800 relative"
        >
          {/* Header */}
          <div className="grid grid-cols-3 p-6 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
            <div className="text-slate-500 font-medium text-sm md:text-base flex items-center">Функция</div>
            <div className="text-center text-slate-500 font-medium text-sm md:text-base flex items-center justify-center">Обычный AI</div>
            <div className="text-center text-brand-400 font-bold text-lg md:text-xl flex items-center justify-center gap-2">
              <div className="relative w-6 h-6">
                 <AILogo className="w-6 h-6" />
              </div>
              AI Key
            </div>
          </div>
          
          {/* Rows */}
          {comparisonData.map((item, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-3 p-6 border-b border-slate-800 last:border-0 last:rounded-b-2xl items-center transition-colors hover:bg-slate-800/40 relative group`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Feature Name & Tooltip Area */}
              <div className="relative flex items-center gap-2 pr-4">
                <div className="text-slate-300 font-medium text-sm md:text-base cursor-help border-b border-dotted border-slate-600 group-hover:border-brand-500 transition-colors">
                  {item.title}
                </div>
                <HelpCircle className="w-4 h-4 text-slate-600 group-hover:text-brand-500 transition-colors hidden sm:block" />
                
                {/* Tooltip Popup */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 bottom-full mb-3 w-64 md:w-72 p-4 bg-slate-800 text-slate-200 text-sm rounded-xl shadow-2xl border border-slate-700 z-50 pointer-events-none"
                    >
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                        <p className="leading-snug">{item.tooltip}</p>
                      </div>
                      {/* Arrow */}
                      <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-slate-800 border-b border-r border-slate-700 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Standard Column */}
              <div className="flex justify-center">
                {item.standard ? (
                  <Check className="text-slate-500 w-6 h-6" />
                ) : (
                  <X className="text-slate-700 w-6 h-6 opacity-50" />
                )}
              </div>

              {/* AI Key Column */}
              <div className="flex justify-center relative">
                 {/* Subtle glow behind the checkmark */}
                 {item.aiKey && (
                   <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 )}
                {item.aiKey ? (
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center relative z-10 shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)]">
                    <Check className="text-brand-400 w-5 h-5 stroke-[3px]" />
                  </div>
                ) : (
                  <X className="text-red-500 w-6 h-6" />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};