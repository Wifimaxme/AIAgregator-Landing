import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto text-slate-300 space-y-6 text-sm md:text-base leading-relaxed"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Политика конфиденциальности</h1>
      <p className="text-slate-500 text-sm mb-8">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Общие положения</h2>
        <p>
          Настоящая Политика конфиденциальности описывает, как сервис AI Key (далее «Мы», «Сервис») собирает, использует и защищает информацию пользователей (далее «Пользователь»).
          Используя наш сайт и сервисы, вы соглашаетесь с условиями настоящей Политики.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Какую информацию мы собираем</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Личные данные:</strong> Адрес электронной почты, который вы предоставляете при регистрации.</li>
          <li><strong>Технические данные:</strong> IP-адрес, тип браузера, данные cookie для обеспечения безопасности сессии.</li>
          <li><strong>Пользовательский контент:</strong> Текстовые и голосовые запросы, которые вы отправляете для обработки нейросетями.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Как мы используем информацию</h2>
        <p>Мы используем ваши данные для:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Предоставления доступа к функционалу Сервиса.</li>
          <li>Обработки ваших запросов через API партнеров (OpenAI, Anthropic, Google). При этом данные анонимизируются, где это возможно.</li>
          <li>Улучшения качества работы Сервиса и исправления ошибок.</li>
          <li>Отправки важных уведомлений, касающихся работы Сервиса (например, об изменении тарифов или технических работах).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Хранение и защита данных</h2>
        <p>
          Мы принимаем все необходимые технические и организационные меры для защиты ваших данных от несанкционированного доступа. 
          Ваши пароли хранятся в зашифрованном виде (хеши). Мы не храним данные ваших банковских карт — обработка платежей происходит на стороне платежного провайдера.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Передача данных третьим лицам</h2>
        <p>
          Мы не продаем и не передаем ваши личные данные третьим лицам для маркетинговых целей. 
          Передача данных возможна только в случаях, предусмотренных законодательством, или для обеспечения работы функционала (например, передача текста запроса в LLM-модель для генерации ответа).
        </p>
      </section>
      
      <div className="pt-8 mt-8 border-t border-slate-800">
        <p>Если у вас есть вопросы по поводу конфиденциальности, пожалуйста, свяжитесь с нами по адресу: privacy@ai-key.app</p>
      </div>
    </motion.div>
  );
};