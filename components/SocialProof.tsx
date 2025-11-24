import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { val: "60+", label: "Сценариев использования" },
  { val: "5 ч", label: "Экономии в неделю в среднем" },
  { val: "87%", label: "Продлевают подписку после триала" }
];

const testimonials = [
  {
    name: "Алексей В.",
    role: "Менеджер проектов",
    text: "Раньше тратил час на отчеты, теперь 5 минут. AI Key понимает контекст лучше, чем обычный ChatGPT."
  },
  {
    name: "Марина Д.",
    role: "Мама двоих детей",
    text: "Помогает с уроками сыну и даже составил меню на неделю. Очень просто, никаких сложных настроек."
  },
  {
    name: "Дмитрий К.",
    role: "Копирайтер",
    text: "Проактивный режим в браузере — это киллер-фича. Пишу посты сразу в админке сайта."
  }
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-800 pb-16 mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-500">
                {stat.val}
              </div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Что говорят пользователи
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">"{t.text}"</p>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};