import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Shield, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-slate-300 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">О нас</h1>
        <p className="text-xl text-slate-400">
          Мы делаем искусственный интеллект доступным и полезным инструментом для каждого.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <Sparkles className="w-10 h-10 text-brand-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Наша миссия</h3>
          <p>
            Убрать барьеры между сложными технологиями и обычными пользователями. 
            Вам не нужно быть программистом, чтобы использовать мощь нейросетей для улучшения своей жизни.
          </p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <Users className="w-10 h-10 text-accent-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Для кого мы</h3>
          <p>
            Для фрилансеров, студентов, родителей и предпринимателей. 
            AI Key — это ваш личный ассистент, который берет на себя рутину, освобождая время для важного.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Наши ценности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-3">
             <Shield className="w-6 h-6 text-brand-500" />
             <h4 className="font-bold text-white">Приватность</h4>
             <p className="text-sm">Мы не торгуем вашими данными. Ваша переписка с AI остается конфиденциальной.</p>
          </div>
          <div className="flex flex-col gap-3">
             <Zap className="w-6 h-6 text-yellow-400" />
             <h4 className="font-bold text-white">Скорость</h4>
             <p className="text-sm">Мы оптимизируем запросы так, чтобы вы получали ответ быстрее, чем успеете глотнуть кофе.</p>
          </div>
          <div className="flex flex-col gap-3">
             <Users className="w-6 h-6 text-accent-500" />
             <h4 className="font-bold text-white">Честность</h4>
             <p className="text-sm">Никаких скрытых списаний. Прозрачные тарифы и честный пробный период.</p>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-slate-800 text-center">
        <p className="mb-4">Команда AI Key базируется по всему миру, но наши корни и фокус — на русскоязычном сегменте интернета.</p>
        <p className="text-slate-500 text-sm">Свяжитесь с нами: support@ai-key.app</p>
      </div>
    </div>
  );
};