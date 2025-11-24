import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Infinity as InfinityIcon } from 'lucide-react';

const plans = [
  {
    name: "Пробный",
    price: "0₽",
    period: "/ 7 дней",
    description: "Идеально для знакомства. Доступ ко всем функциям на неделю.",
    features: [
      "Доступ ко всем нейросетям",
      "Обычный режим чата",
      "Голосовой ввод",
      "Работа без VPN",
      "Поддержка 24/7"
    ],
    highlight: false,
    buttonText: "Попробовать бесплатно"
  },
  {
    name: "Базовый",
    price: "300₽",
    period: "/ месяц",
    description: "Для повседневных задач и переписки.",
    features: [
      "Базовый пакет токенов",
      "Токены не сгорают (копятся)",
      "Обычный режим чата",
      "Голосовой ввод",
      "Работа без VPN"
    ],
    highlight: false,
    buttonText: "Выбрать Базовый"
  },
  {
    name: "Про",
    price: "1800₽",
    period: "/ месяц",
    description: "Максимальная мощь для профессионалов.",
    features: [
      "Проактивный режим",
      "Увеличенный пакет токенов",
      "Токены не сгорают (копятся)",
      "Приоритетная генерация",
      "Работа с файлами и фото",
      "Персональная поддержка"
    ],
    highlight: true,
    buttonText: "Выбрать Про"
  }
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Выберите свой план</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Честные тарифы без скрытых условий. Неиспользованные токены в платных тарифах переносятся на следующий месяц.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start relative z-10">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible to allow staggering effect
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
               {/* Glow effect for Highlighted Plan */}
               {plan.highlight && (
                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-600 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
               )}
               
               <div className={`relative h-full bg-slate-950 rounded-2xl border p-8 flex flex-col ${plan.highlight ? 'border-brand-500/50 shadow-2xl' : 'border-slate-800 shadow-lg'}`}>
                 
                 {plan.highlight && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-accent-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                     <Zap className="w-3 h-3 fill-current" />
                     ХИТ ПРОДАЖ
                   </div>
                 )}

                 <div className="mb-6">
                   <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-200'}`}>{plan.name}</h3>
                   <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-bold text-white">{plan.price}</span>
                     <span className="text-slate-500 text-sm">{plan.period}</span>
                   </div>
                   <p className="text-slate-500 text-sm mt-4 min-h-[40px]">
                     {plan.description}
                   </p>
                 </div>

                 <div className="h-px bg-slate-800 mb-6"></div>

                 <ul className="space-y-4 mb-8 flex-grow">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                       {feature.includes("не сгорают") ? (
                         <InfinityIcon className="w-5 h-5 text-brand-400 shrink-0" />
                       ) : feature.includes("Проактивный") ? (
                          <Zap className="w-5 h-5 text-yellow-400 shrink-0 fill-yellow-400/20" />
                       ) : (
                         <CheckCircle className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-brand-500' : 'text-slate-600'}`} />
                       )}
                       <span className={feature.includes("Проактивный") ? "font-bold text-white" : ""}>{feature}</span>
                     </li>
                   ))}
                 </ul>

                 <button className={`w-full font-bold text-lg py-3 rounded-xl transition-all duration-300 ${
                   plan.highlight 
                    ? 'bg-white text-slate-900 hover:bg-brand-50 shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] hover:scale-105' 
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                 }`}>
                   {plan.buttonText}
                 </button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};