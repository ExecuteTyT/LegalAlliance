import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Lock, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); setTimeout(() => setIsSubmitted(false), 300); }}>
      {!isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">Заявка на консультацию</h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            Оставьте свои контакты. Юрист перезвонит вам в течение 15 минут и ответит на все вопросы.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input 
              type="text" 
              required
              placeholder="Ваше имя" 
              className="w-full h-12 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all"
            />
            <input 
              type="tel" 
              required
              placeholder="+7 (___) ___-__-__" 
              className="w-full h-12 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all"
            />
            <Button fullWidth size="lg">Жду звонка</Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-6">
            <Lock size={12} />
            <span>Конфиденциально. Ваши данные не передаются третьим лицам.</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Заявка принята!</h2>
          <p className="text-neutral-600 mb-8">
            Спасибо за доверие. Наш специалист уже получил ваш запрос и скоро свяжется с вами.
          </p>
          <Button fullWidth onClick={onClose} variant="secondary">Вернуться на сайт</Button>
        </div>
      )}
    </Modal>
  );
};