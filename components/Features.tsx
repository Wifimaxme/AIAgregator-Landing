
import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '../data/content';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      {/* Added semi-transparent gradient background instead of solid color */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Умнее, чем просто чат-бот</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Мы объединили мощь передовых технологий в простой интерфейс, который экономит ваше время.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-slate-600 transition-colors duration-300 hover:bg-slate-800/60"
            >
              <div className={`w-12 h-12 rounded-lg bg-slate-950/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
