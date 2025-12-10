import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { AlertTriangle, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { submitForm } from '../utils/formSubmit';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await submitForm({
        name: formData.name,
        phone: formData.phone,
        source: 'Exit Intent модальное окно'
      });

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '' });
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        setError(result.message || 'Произошла ошибка при отправке');
      }
    } catch (err) {
      setError('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { setIsOpen(false); setIsSubmitted(false); setFormData({ name: '', phone: '' }); }}>
      {!isSubmitted ? (
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Как к вам обращаться?" 
              className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all text-base"
            />
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ваш телефон для связи" 
              className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary outline-none transition-all text-base"
            />
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-xl p-3">
                <p className="text-sm text-error text-center">{error}</p>
              </div>
            )}
            <Button 
              fullWidth 
              size="lg" 
              className="text-lg py-6 shadow-2xl hover:shadow-3xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                'Получить БЕСПЛАТНУЮ консультацию'
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-6">
            <Lock size={12} />
            <span>Ваши данные под защитой</span>
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
        </div>
      )}
    </Modal>
  );
};