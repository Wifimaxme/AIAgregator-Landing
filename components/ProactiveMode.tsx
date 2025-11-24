import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Monitor, Layers, ArrowRight, Check } from 'lucide-react';
import { AILogo } from './ui/AILogo';

export const ProactiveMode: React.FC = () => {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Text */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500/20 to-accent-500/20 border border-brand-500/30 text-brand-300 text-sm font-bold mb-6 shadow-[0_0_15px_-5px_rgba(20,184,166,0.5)]">
                <Zap className="w-4 h-4 fill-current" />
                <span>Революция в продуктивности</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Он понимает, <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-400">
                  над чем вы работаете
                </span>
              </h2>

              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                AI Key сам анализирует приложение или сайт, в котором вы работаете. Он видит контекст и предлагает помощь именно тогда, когда она нужна.
              </p>

              <div className="space-y-6">
                <div className="group flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-brand-500/50 transition-colors shadow-lg">
                    <Monitor className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Работает везде</h3>
                    <p className="text-slate-500 text-sm">Будь то Google Docs, CRM-система, почта или среда разработки — AI Key всегда под рукой.</p>
                  </div>
                </div>
                
                <div className="group flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-accent-500/50 transition-colors shadow-lg">
                    <Layers className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Контекстные подсказки</h3>
                    <p className="text-slate-500 text-sm">Выделяет главное, исправляет ошибки и предлагает идеи, опираясь на содержимое экрана.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800">
                <div className="text-slate-400 text-sm mb-4">Доступно эксклюзивно в тарифе:</div>
                <div className="flex items-center gap-3">
                   <span className="text-2xl font-bold text-white">Про</span>
                   <div className="px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full">1800₽ / мес</div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Visual Demo */}
          <div className="lg:w-1/2 w-full order-1 lg:order-2">
            <div className="relative perspective-1000">
              
              {/* Main Screen Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3]"
              >
                 {/* Browser Bar */}
                 <div className="bg-slate-950 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                    </div>
                    <div className="mx-auto w-1/2 h-2 bg-slate-800 rounded-full" />
                 </div>

                 {/* Content: Email Client Simulation */}
                 <div className="p-8 bg-slate-900 h-full relative">
                    {/* Email Header */}
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-10 h-10 rounded-full bg-slate-800" />
                       <div className="space-y-2">
                          <div className="w-32 h-3 bg-slate-800 rounded" />
                          <div className="w-24 h-2 bg-slate-800 rounded opacity-50" />
                       </div>
                    </div>
                    
                    {/* Email Body & Context Transformation Area */}
                    <div className="relative min-h-[160px]">
                      <AnimatePresence mode="wait">
                        {!isApplied ? (
                          <motion.div
                            key="draft"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Draft Lines */}
                            <div className="space-y-3 opacity-30">
                              <div className="w-full h-2 bg-slate-700 rounded" />
                              <div className="w-11/12 h-2 bg-slate-700 rounded" />
                              <div className="w-full h-2 bg-slate-700 rounded" />
                              <div className="w-3/4 h-2 bg-slate-700 rounded" />
                            </div>

                            {/* Highlighted Section (Context) */}
                            <div className="mt-6 p-4 rounded-lg border-2 border-brand-500/30 bg-brand-500/5 relative">
                                <div className="absolute -top-3 left-4 bg-brand-900 text-brand-400 text-[10px] font-bold px-2 py-0.5 rounded border border-brand-500/30">
                                  Context
                                </div>
                                <div className="space-y-2">
                                  <div className="w-full h-2 bg-slate-500 rounded animate-pulse" />
                                  <div className="w-5/6 h-2 bg-slate-500 rounded animate-pulse" />
                                </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-slate-300 text-sm leading-relaxed font-medium"
                          >
                             <p>Добрый день, Александр!</p>
                             <p className="mt-3">
                               Благодарим вас за уделенное время и подробное предложение. Мы внимательно изучили материалы.
                             </p>
                             <p className="mt-3">
                               К сожалению, на данный момент мы вынуждены отказаться от сотрудничества, так как условия не полностью соответствуют нашим текущим приоритетам.
                             </p>
                             <p className="mt-3 text-slate-500 italic">
                               С уважением, Иван.
                             </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                 </div>

                 {/* AI Suggestion Pop-up */}
                 <motion.div
                   initial={{ scale: 0, opacity: 0, x: 20 }}
                   whileInView={{ scale: 1, opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                   className="absolute bottom-6 right-6 w-64 z-20"
                 >
                    {/* Shimmering Border/Glow Effect */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-brand-400 via-accent-500 to-brand-400 opacity-75 blur-[2px]"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        opacity: isApplied ? 0 : 0.75 // Hide glow when applied
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    {/* Content Card */}
                    <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-4">
                      <div className="flex items-start gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center shrink-0 shadow-lg">
                            <AILogo className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="text-white font-bold text-sm mb-1">Предложение AI</h4>
                            <p className="text-slate-300 text-xs leading-snug mb-3">
                               {isApplied 
                                 ? "Текст успешно обновлен. Мы сделали его более дипломатичным." 
                                 : "Кажется, вы пишете отказ клиенту. Хотите сделать его более мягким и сохранить отношения?"
                               }
                            </p>
                            <button 
                              onClick={() => setIsApplied(true)}
                              disabled={isApplied}
                              className={`w-full text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                                isApplied 
                                ? 'bg-brand-500 text-white cursor-default'
                                : 'bg-white text-slate-900 hover:bg-brand-50 hover:scale-[1.02]'
                              }`}
                            >
                               {isApplied ? (
                                 <>
                                   Готово
                                   <Check className="w-3 h-3" />
                                 </>
                               ) : (
                                 <>
                                   Применить
                                   <ArrowRight className="w-3 h-3" />
                                 </>
                               )}
                            </button>
                         </div>
                      </div>
                    </div>
                 </motion.div>

                 {/* Glow behind popup */}
                 <div className="absolute bottom-6 right-6 w-64 h-32 bg-brand-500/20 blur-[50px] pointer-events-none z-10" />

              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};