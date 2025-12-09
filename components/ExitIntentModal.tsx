import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { AlertTriangle, Lock } from 'lucide-react';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
          <AlertTriangle className="text-primary w-8 h-8" strokeWidth={2.5} />
        </div>
        
        <h2 className="text-2xl font-bold text-primary mb-3">Подождите!</h2>
        <p className="text-neutral-600 mb-4 leading-relaxed">
          Не уходите с долгами. Получите <strong className="text-primary">бесплатную</strong> экспресс-оценку вашей ситуации прямо сейчас.
        </p>
        <p className="text-sm text-neutral-500 mb-6">
          Тысячи людей уже начали новую жизнь. Вы тоже можете.
        </p>

        {/* Social Proof */}
        <div className="bg-success/10 rounded-xl p-3 mb-6 border border-success/20">
          <p className="text-xs text-neutral-700">
            <strong className="text-success">✓ Сегодня уже 23 человека</strong> получили помощь
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
          <input 
            type="text" 
            placeholder="Как к вам обращаться?" 
            className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all text-base"
          />
          <input 
            type="tel" 
            placeholder="Ваш телефон для связи" 
            className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all text-base"
          />
          <Button fullWidth size="lg" className="text-lg py-6 shadow-2xl hover:shadow-3xl">
            Получить БЕСПЛАТНУЮ консультацию
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-6">
          <Lock size={12} />
          <span>Ваши данные под защитой</span>
        </div>
      </div>
    </Modal>
  );
};