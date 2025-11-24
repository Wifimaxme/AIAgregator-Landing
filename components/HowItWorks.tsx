import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/content';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
       {/* Background accent with shimmer */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-brand-900/20 to-accent-900/20 bg-[length:200%_200%] animate-aurora blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Всё гениальное — просто
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Никаких сложных настроек и инструкций. Начните пользоваться мощью искусственного интеллекта за три простых шага.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Arrow (Desktop only, not on last item) */}
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-10 -translate-y-1/2 z-20 text-slate-700">
                  <ArrowRight className="w-8 h-8 lg:w-12 lg:h-12 opacity-50" />
                </div>
              )}

              {/* 
                  FIX: Separated Motion logic from CSS Transition logic.
                  The outer motion.div handles the entrance.
                  The inner div handles the hover effects.
              */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                className="h-full"
              >
                <div className="h-full relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/80 hover:border-brand-500/30 transition-all duration-300 group-hover:-translate-y-2">
                  {/* Large Watermark Number */}
                  <div className="absolute top-2 right-4 text-7xl font-black text-slate-800/30 select-none group-hover:text-brand-900/20 transition-colors pointer-events-none">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-brand-400 mb-6 shadow-lg group-hover:shadow-brand-500/20 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-brand-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <step.icon className="w-8 h-8 relative z-10" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-brand-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-slate-400 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                  
                  {/* Bottom line accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-500 rounded-b-2xl transition-all duration-500 group-hover:w-full"></div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};