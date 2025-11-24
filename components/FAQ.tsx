import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const questions = [
  {
    q: "Нужно ли мне разбираться в технологиях?",
    a: "Нет, абсолютно. AI Key создан для обычных людей. Вы просто пишете задачу своими словами, как в мессенджере, а мы делаем остальное."
  },
  {
    q: "Это безопасно? Где хранятся мои данные?",
    a: "Мы используем шифрование банковского уровня. Ваши диалоги не используются для обучения публичных моделей. Вы можете удалить историю в любой момент."
  },
  {
    q: "Работает ли это на телефоне?",
    a: "Да, у нас есть удобная мобильная версия сайта, которая работает как приложение. Просто добавьте иконку на главный экран."
  },
  {
    q: "Что произойдет после 7 дней?",
    a: "Мы напомним вам за день до окончания пробного периода. Если вам понравится, подписка продлится автоматически. Если нет — просто отмените в один клик."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Частые вопросы
        </motion.h2>
        
        <div className="space-y-4">
          {questions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-800 rounded-xl bg-slate-900/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-white text-lg">{item.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 text-center"
        >
            <h3 className="text-xl text-white font-bold mb-6">Готовы упростить свою жизнь?</h3>
            <button className="bg-brand-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-600 transition-all shadow-[0_0_30px_-10px_rgba(20,184,166,0.5)] hover:scale-105">
                Попробовать бесплатно
            </button>
        </motion.div>
      </div>
    </section>
  );
};