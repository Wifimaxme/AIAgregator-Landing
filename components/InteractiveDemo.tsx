
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mic } from 'lucide-react';
import { AILogo } from './ui/AILogo';
import { demoData } from '../data/content';
import { trackEvent } from '../utils/analytics';

export const InteractiveDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSelectDemo = (index: number) => {
    setActiveDemo(index);
    setText("");
    setShowResponse(false);
    setIsTyping(true);
    trackEvent('Demo', 'Select Scenario', demoData[index].label);
  };

  // Typing effect for prompt
  useEffect(() => {
    if (isTyping) {
      const targetText = demoData[activeDemo].prompt;
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= targetText.length) {
          setText(targetText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          // Simulate network delay then show response
          setTimeout(() => setShowResponse(true), 600);
        }
      }, 30); // Typing speed
      return () => clearInterval(interval);
    }
  }, [isTyping, activeDemo]);

  return (
    <section id="demo" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative blob with REDUCED intensity and SLOWER animation */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-brand-900/10 to-accent-900/10 bg-[length:200%_200%] animate-aurora rounded-full blur-[80px] pointer-events-none" 
        style={{ animationDuration: '30s' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Попробуйте магию прямо сейчас</h2>
          <p className="text-slate-400 text-lg">Выберите задачу — посмотрите, как AI Key справляется за секунды.</p>
        </motion.div>

        {/* Improved Tab Navigation with Smooth Animation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {demoData.map((demo, index) => {
            const isActive = activeDemo === index;
            return (
              <button
                key={index}
                onClick={() => handleSelectDemo(index)}
                className="relative px-6 py-3 rounded-full text-sm font-bold focus:outline-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Active Background (Framer Motion) */}
                {isActive && (
                  <motion.div
                    layoutId="activeDemoTab"
                    className="absolute inset-0 bg-brand-600 rounded-full shadow-lg shadow-brand-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Inactive Background (CSS Transition) */}
                <div 
                   className={`absolute inset-0 rounded-full border border-slate-700 bg-slate-800/50 transition-opacity duration-300 ${
                     isActive ? "opacity-0" : "opacity-100 hover:border-slate-500"
                   }`} 
                />

                {/* Text Label */}
                <span 
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {demo.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => {
            if (!hasStarted) {
              setHasStarted(true);
              setIsTyping(true);
              trackEvent('Demo', 'Auto Start', 'Viewport Enter');
            }
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[400px] flex flex-col"
        >
          {/* Header */}
          <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/50">
               <AILogo className="w-4 h-4" />
               <span className="text-slate-300 text-sm font-medium">AI Key - Чат</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 flex flex-col gap-6">
            {/* User Message (Voice Input Style) */}
            <div className="flex justify-end">
               <div className={`bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-[70%] transition-opacity duration-300 ${text ? 'opacity-100' : 'opacity-0'}`}>
                 
                 {/* Voice Visualization Header */}
                 <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-slate-700/50">
                    <div className="flex items-center gap-2 text-brand-400">
                      <div className={`p-1.5 rounded-full ${isTyping ? 'bg-brand-500/20' : 'bg-slate-700/50'}`}>
                        <Mic className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Голосовой ввод</span>
                    </div>
                    
                    {/* Audio Waveform */}
                    <div className="flex items-center gap-0.5 h-3">
                      {[1, 2, 3, 4, 5, 6].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-0.5 bg-brand-400 rounded-full"
                          animate={{ 
                            height: isTyping ? [4, 12, 4] : 3,
                            opacity: isTyping ? 1 : 0.3
                          }}
                          transition={{ 
                            duration: 0.5, 
                            repeat: Infinity, 
                            delay: bar * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                 </div>

                 {/* Transcribed Text */}
                 <div className="text-sm md:text-base leading-relaxed">
                   {text}
                   {isTyping && <span className="animate-pulse inline-block w-1 h-4 ml-1 bg-brand-400 align-middle"></span>}
                 </div>
               </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              {showResponse ? (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-gradient-to-br from-brand-900/40 to-slate-800 border border-brand-500/20 text-white px-5 py-4 rounded-2xl rounded-tl-sm max-w-[90%] shadow-lg"
                 >
                    <div className="flex items-center gap-2 mb-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      AI Key Ответ
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                      {demoData[activeDemo].response}
                    </div>
                 </motion.div>
              ) : (
                !isTyping && text && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm px-4">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Input Area (Fake) */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <div className="w-full bg-slate-950 border border-slate-700 rounded-xl h-12 px-4 flex items-center text-slate-500 text-sm">
                {text ? (
                   <span className="opacity-50 italic">Распознавание завершено...</span>
                ) : (
                   "Нажмите на кнопку микрофона..."
                )}
              </div>
              <div className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white transition-colors ${isTyping ? 'bg-red-500 animate-pulse' : 'bg-brand-600'}`}>
                {isTyping ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
