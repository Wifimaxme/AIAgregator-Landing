
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Loader2, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ---------------------------------------------------------------------------
  // ВАЖНО: Вставьте сюда ваш URL веб-приложения (Web App URL) из Google Apps Script
  // Ссылка должна заканчиваться на /exec
  // ---------------------------------------------------------------------------
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_YOUR_SCRIPT_ID/exec';

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const submissionValue = typeof e === 'string' ? e : email;

    if (!submissionValue && typeof e !== 'string') return;

    // Track attempt
    const method = typeof e === 'string' ? 'Social' : 'Email';
    trackEvent('Registration', 'Submit Start', method);

    setIsLoading(true);

    try {
      // Если URL не настроен, просто имитируем успех
      if (GOOGLE_SCRIPT_URL.includes('PLACEHOLDER')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Simulation Mode. Data:', { email: submissionValue, date: new Date().toISOString() });
      } else {
        // Реальная отправка
        const formData = new FormData();
        formData.append('email', submissionValue);
        formData.append('source', 'landing_hero_modal');
        
        // Google Apps Script требует mode: 'no-cors', иначе браузер заблокирует ответ
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' 
        });
      }

      trackEvent('Registration', 'Submit Success', method);
      setIsSuccess(true);
      
      // Очистка и закрытие
      setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
        onClose();
        setEmail('');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form', error);
      trackEvent('Registration', 'Submit Error', method);
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    trackEvent('Registration', 'Social Click', provider);
    // В реальном приложении здесь будет логика OAuth
    handleSubmit(`Auth via ${provider}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Готово!</h3>
                    <p className="text-slate-400">Пробный период активирован.<br/>Проверьте почту для входа.</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Начать бесплатно</h2>
                      <p className="text-slate-400 text-sm">7 дней полного доступа. Карта не требуется.</p>
                    </div>

                    {/* Social Login Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <SocialButton 
                        onClick={() => handleSocialLogin('Google')}
                        className="bg-white hover:bg-gray-100 text-gray-800 border-transparent"
                        icon={<GoogleIcon />}
                        label="Google"
                      />
                      <SocialButton 
                        onClick={() => handleSocialLogin('VK')}
                        className="bg-[#0077FF] hover:bg-[#006add] text-white border-transparent"
                        icon={<VKIcon />}
                        label="VK ID"
                      />
                      <SocialButton 
                        onClick={() => handleSocialLogin('Yandex')}
                        className="bg-[#FC3F1D] hover:bg-[#e63515] text-white border-transparent"
                        icon={<YandexIcon />}
                        label="Яндекс"
                      />
                      <SocialButton 
                        onClick={() => handleSocialLogin('Sber')}
                        className="bg-[#21A038] hover:bg-[#1a8a2e] text-white border-transparent"
                        icon={<SberIcon />}
                        label="Сбер ID"
                      />
                      <SocialButton 
                         onClick={() => handleSocialLogin('Gosuslugi')}
                         className="col-span-2 bg-[#0D4CD3] hover:bg-[#093ead] text-white border-transparent"
                         icon={<GosuslugiIcon />}
                         label="Госуслуги"
                      />
                    </div>

                    <div className="relative flex py-2 items-center mb-6">
                        <div className="flex-grow border-t border-slate-700"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase">Или через Email</span>
                        <div className="flex-grow border-t border-slate-700"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                        <input 
                          type="email" 
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
                        />
                      </div>
                      <button 
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Продолжить <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                    
                    <p className="mt-6 text-center text-xs text-slate-500">
                      Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-slate-400">условиями использования</a> и <a href="#" className="underline hover:text-slate-400">политикой конфиденциальности</a>.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface SocialButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ onClick, icon, label, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-2.5 px-4 border rounded-lg text-sm font-bold transition-transform active:scale-95 ${className}`}
  >
    <div className="w-5 h-5 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <span>{label}</span>
  </button>
);

// --- Brand Icons ---

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const VKIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M13.162 18.994c.609 0 .858-.446.858-1.26v-3.248c0-.633.508-1.08 1.12-1.08.57 0 1.344.406 2.057 1.642l1.103 1.956c.552.98.935 1.045 1.637 1.045h2.863c.69 0 .977-.384.776-1.134-.356-1.332-2.709-4.832-3.662-5.746-.867-.832-.823-.746 1.144-3.545 1.254-1.785 1.763-2.705 1.579-3.376-.179-.652-1.156-.652-1.503-.652h-3.32c-.93 0-1.189.467-1.442 1.056-.566 1.317-2.012 4.19-2.32 4.19-.115 0-.294-.216-.294-1.298v-3.21c0-1.096-.15-1.724-1.12-1.724-.51 0-.916.27-1.129.497-.247.264-.092.746.307.78 1.05.11 1.026 1.62 1.026 2.76v2.16c0 .495-.297.643-.594.643-.635 0-2.314-2.616-3.197-5.119-.17-.482-.338-1.028-1.196-1.028H4.634c-.878 0-1.037.47-1.037.917 0 .814 1.12 4.88 5.176 9.278 2.798 3.036 5.252 2.94 4.389 2.94z" />
  </svg>
);

const YandexIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M11.5 24h-7c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h15c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2h-8z" fillOpacity="0" />
    <path d="M10.1 20.3h2.6l-1.3-3.6 4.3-8.8H13l-2.4 6-2.2-6H5.6l3.8 9-1.5 3.4h2.2z" />
  </svg>
);

const SberIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
     <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.9"/>
     <path d="M17.8 13.6c-2.3 1.8-4.9 2-6.6 1.8-1.5-.2-2.5-.7-2.5-.7l-.5 1.7s1.3.8 3.5.9c2.3.1 5.4-.5 8.1-2.6l-2-1.1zm.5-3.3c-2.5 1.5-5.2 1.5-6.6 1.2-1.5-.3-2.2-.8-2.2-.8l-.5 1.6s1 .7 3.2 1c2.2.3 5.4 0 8.1-2.1l-2-0.9z" />
     <path d="M18.8 7.3c-2.7 1.3-5.5 1-6.7.7-1.4-.4-1.9-.9-1.9-.9L9.7 8.7s.8.7 2.9 1.1c2.1.4 5.4.3 8.3-1.4l-2.1-1.1z" />
  </svg>
);

const GosuslugiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
     <path d="M5.4 12.8c0 .2.1.5.1.8.2 1 .7 2.1 2.3 2.1 2.2 0 2.2-1.6 2.2-2.4 0-1.4-.4-2.8-1.2-3.8l-1.6 1c.5.8.6 1.8.6 2.4 0 .2 0 .5-.3.5-1 0-1-1.5-1-1.6-.3-.1-.9-.1-1.1 1z" />
     <path d="M16 8.5c-1.3 0-2.4.4-3.4 1.2.9.8 1.9 1.5 3 2.1l.6-1.8c-1.4-.8-2.6-1.8-3.4-3.1 1.4-1.2 3-1.9 5.3-1.8v1.8c-1.3-.1-1.7.3-2.1 1.6z" />
     <path d="M3 12c0 5 4 9 9 9s9-4 9-9-4-9-9-9-9 4-9 9zm14.1-3.6c1.6.4 2.8 1.8 2.8 3.8 0 2.6-2.1 4.5-5.4 4.5-2.2 0-3.9-1-4.8-2l1.3-1.4c.8.9 1.9 1.5 3.3 1.5 1.8 0 2.6-1 2.6-2.4 0-1.4-.8-2.3-3.1-2.6l-1-.2c-1.6-.2-3.1-.7-3.1-3.1 0-2 1.6-3.8 4.7-3.8 2.3 0 3.7 1 4.6 2l-1.5 1.4c-.6-.7-1.5-1.4-2.9-1.4-1.7 0-2.2.9-2.2 1.8 0 1.2.9 1.7 2.4 1.9l2.3.4z" />
  </svg>
);
