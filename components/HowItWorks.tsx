import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, MousePointerClick, Wand2 } from 'lucide-react';

const steps = [
  {
    icon: LogIn,
    title: "1. Зайдите на сайт",
    desc: "С телефона или ноутбука. Скачивать приложение не обязательно."
  },
  {
    icon: MousePointerClick,
    title: "2. Выберите задачу",
    desc: "Нажмите «Написать письмо» или просто откройте чат."
  },
  {
    icon: Wand2,
    title: "3. Получите магию",
    desc: "Опишите задачу своими словами — AI Key всё сделает за вас."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Всё гениальное — просто
        </motion.h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto gap-12 md:gap-0">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-800 via-brand-500/50 to-slate-800 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center text-center md:w-1/3 px-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-brand-400 mb-6 shadow-lg group-hover:border-brand-500 group-hover:shadow-brand-500/20 transition-all duration-300">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};