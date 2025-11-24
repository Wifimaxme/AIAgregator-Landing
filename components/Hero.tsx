import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms:
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); 
  
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yMockup = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 z-20">
      
      {/* Background Gradient Spots Container - Handles overflow to prevent scrollbars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: yBg1 }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: yBg2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-600/20 rounded-full blur-[120px]" 
        />
      </div>

      {/* Z-index 20 ensures content (and its glow) stays above the next section's background if overlapping */}
      <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
        
        {/* Text Content - Parallax Layer 2 (Middle) */}
        <motion.div style={{ y: yText }} className="max-w-4xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs md:text-sm font-medium text-slate-300">Доступен новый режим: "Проактивный помощник"</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Личный AI-помощник,<br className="hidden md:block" /> 
              который работает за вас
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Пишите письма, готовьте отчёты и решайте бытовые задачи в пару кликов. 
              Мы автоматически подбираем лучшую нейросеть под ваш запрос — без VPN и сложных настроек.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)]"
              >
                Попробовать бесплатно 7 дней
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 rounded-full font-medium text-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <PlayCircle className="w-5 h-5" />
                Как это работает
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Mockup Preview - Parallax Layer 3 (Closest/Distinct) */}
        <motion.div 
           style={{ y: yMockup }}
           className="mt-16 md:mt-24 relative w-full max-w-5xl z-10"
        >
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative rounded-t-2xl bg-slate-900/80 border border-slate-700 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800/10 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <div className="ml-4 w-64 h-6 rounded-md bg-slate-800/50"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-slate-800 h-[300px] md:h-[400px]">
                    {/* Before */}
                    <div className="p-6 md:p-8 flex flex-col">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Ваш запрос</div>
                        <div className="text-slate-300 font-mono text-sm md:text-base bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                            "напиши начальнику что я заболел, буду на связи после обеда но важный отчет доделаю завтра, вежливо"
                        </div>
                    </div>
                    {/* After */}
                    <div className="p-6 md:p-8 flex flex-col bg-slate-900/50 relative overflow-hidden">
                         <div className="absolute inset-0 bg-brand-500/5 pointer-events-none"></div>
                        <div className="text-xs font-bold text-brand-400 uppercase mb-4 tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                            Результат AI Key
                        </div>
                        <div className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            "Добрый день, [Имя начальника].
                            
                            К сожалению, сегодня я плохо себя чувствую и вынужден взять больничный. Буду доступен для срочных вопросов после 14:00.
                            
                            По поводу отчёта: я держу ситуацию на контроле и отправлю его завтра утром в приоритетном порядке.
                            
                            Спасибо за понимание."
                        </div>
                    </div>
                </div>
            </div>
            {/* Gradient glow under mockup - positioned to not be clipped */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-20 -z-10"></div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};