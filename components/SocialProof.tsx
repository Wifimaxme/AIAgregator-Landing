
import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, Clock, HeartHandshake } from 'lucide-react';
import { socialProofStats, testimonials } from '../data/content';

// Component for the animated number counter
const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  
  // Extract number from string (e.g. "60+" -> 60, "5 ч" -> 5)
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  React.useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, numericValue, motionValue]);

  // If the original value had no numbers (unlikely but safe), just return text
  if (isNaN(numericValue)) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix || value.replace(/[0-9]/g, '')}
    </span>
  );
};

export const SocialProof: React.FC = () => {
  const icons = [Layers, Clock, HeartHandshake];
  const gradients = [
    "from-brand-500 to-accent-500",
    "from-accent-500 to-emerald-400",
    "from-purple-500 to-pink-500"
  ];

  return (
    <section className="py-24 bg-slate-950/20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        
        {/* Stats Grid - Redesigned for maximum expressiveness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          {socialProofStats.map((stat, idx) => {
            const Icon = icons[idx] || Layers;
            const gradient = gradients[idx % gradients.length];

            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="relative group"
              >
                {/* Background Glow - Reduced intensity and slower animation */}
                <motion.div 
                   className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-lg`}
                   animate={{ 
                     opacity: [0.05, 0.15, 0.05], 
                     scale: [1, 1.02, 1] 
                   }}
                   transition={{ 
                     duration: 8, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                />
                {/* Static hover glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition duration-500`} />
                
                <div className="relative h-full bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-slate-600 transition-colors duration-300 overflow-hidden group-hover:-translate-y-1">
                  
                  {/* Decorative Background Icon */}
                  <Icon className="absolute -right-6 -bottom-6 w-36 h-36 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />

                  {/* Icon Badge with Glow */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-lg opacity-20`}></div>
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-[1px] shadow-2xl`}>
                      <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Number with Counter */}
                  <div className={`text-5xl md:text-6xl font-black text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
                    <Counter value={stat.val} />
                  </div>
                  
                  {/* Label */}
                  <div className="text-slate-300 font-medium text-lg leading-relaxed relative z-10">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-12 relative z-10"
        >
          Что говорят пользователи
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950/80 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-lg group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 text-yellow-500 fill-current group-hover:scale-110 transition-transform" style={{ transitionDelay: `${star * 50}ms` }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-white text-lg">{t.name}</div>
                <div className="text-sm text-brand-400 font-medium">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
