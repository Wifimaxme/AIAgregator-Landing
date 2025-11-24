import React from 'react';
import { motion } from 'framer-motion';

export const TermsOfService: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto text-slate-300 space-y-6 text-sm md:text-base leading-relaxed"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Публичная оферта</h1>
      <p className="text-slate-500 text-sm mb-8">Редакция от {new Date().toLocaleDateString('ru-RU')}</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Предмет соглашения</h2>
        <p>
          Администрация сервиса AI Key (далее «Исполнитель») предлагает любому физическому лицу (далее «Заказчик») заключить договор на условиях, изложенных ниже.
          Акцептом (принятием) оферты считается регистрация на сайте или оплата подписки.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Услуги сервиса</h2>
        <p>
          Исполнитель предоставляет Заказчику доступ к программному обеспечению «AI Key», работающему по модели SaaS (Software as a Service). 
          Сервис представляет собой интерфейс для взаимодействия с моделями искусственного интеллекта.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Оплата и подписка</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Услуги предоставляются на платной основе согласно тарифам, опубликованным на Сайте.</li>
          <li>Подписка продлевается автоматически, если пользователь не отменил её в личном кабинете.</li>
          <li>Пробный период предоставляется единоразово для одного аккаунта.</li>
          <li>Исполнитель не хранит платежные данные. Оплата производится через защищенный платежный шлюз.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Ограничение ответственности</h2>
        <p>
          Сервис предоставляется «как есть» (as is). Исполнитель не гарантирует, что работа сервиса будет бесперебойной или безошибочной.
        </p>
        <p>
          Исполнитель не несет ответственности за содержание ответов, сгенерированных искусственным интеллектом. Пользователь обязан самостоятельно проверять фактическую точность информации.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Запрещенное использование</h2>
        <p>Заказчику запрещается:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Использовать сервис для генерации контента, нарушающего законодательство РФ.</li>
          <li>Пытаться получить доступ к исходному коду сервиса или нарушить его безопасность.</li>
          <li>Перепродавать доступ к сервису третьим лицам без письменного разрешения Исполнителя.</li>
        </ul>
      </section>

      <div className="pt-8 mt-8 border-t border-slate-800">
        <p>
          Реквизиты Исполнителя:<br/>
          ИП Иванов Иван Иванович<br/>
          ИНН: 123456789012<br/>
          Email: legal@ai-key.app
        </p>
      </div>
    </motion.div>
  );
};