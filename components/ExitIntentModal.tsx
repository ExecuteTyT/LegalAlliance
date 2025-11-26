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
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Не уходите с долгами. Получите бесплатную экспресс-оценку вашей ситуации прямо сейчас.
        </p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
          <input 
            type="text" 
            placeholder="Ваше имя" 
            className="w-full h-12 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all"
          />
          <input 
            type="tel" 
            placeholder="Телефон" 
            className="w-full h-12 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all"
          />
          <Button fullWidth size="lg">Получить консультацию</Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-6">
          <Lock size={12} />
          <span>Ваши данные под защитой</span>
        </div>
      </div>
    </Modal>
  );
};