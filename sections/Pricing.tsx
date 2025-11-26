import React from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingProps {
  onOpenModal: () => void;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Базовый',
    price: 120000,
    description: 'Для долгов до 500 тыс. ₽',
    features: ['Консультация юриста', 'Сбор документов', 'Подготовка заявления', 'Базовая защита']
  },
  {
    id: 'optimal',
    name: 'Оптимальный',
    price: 180000,
    description: 'Полное сопровождение',
    isPopular: true,
    features: ['Всё из Базового', 'Личный менеджер', 'Защита от коллекторов', 'Представительство в суде', 'Контроль реализации', 'Сохранение прожиточного минимума']
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 250000,
    description: 'Сложные случаи с имуществом',
    features: ['Всё из Оптимального', 'Работа старшего партнера', 'Защита сделок и имущ-ва', 'Выездные консультации', 'Приоритетная поддержка 24/7']
  }
];

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  return (
    <Section id="pricing" className="bg-neutral-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Прозрачные тарифы
        </h2>
        <p className="text-lg text-neutral-500">
          Фиксированная стоимость в договоре. Возможна рассрочка до 12 месяцев.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative p-8 rounded-3xl transition-all duration-300 ${
              plan.isPopular 
                ? 'bg-white shadow-2xl border-2 border-secondary transform lg:-translate-y-4 lg:scale-105 z-10' 
                : 'bg-white shadow-lg border border-neutral-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-gold text-primary font-bold text-xs uppercase tracking-wider py-2 px-6 rounded-full shadow-lg">
                Популярный выбор
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
              <p className="text-neutral-500 mb-6">{plan.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                 <span className="text-4xl lg:text-5xl font-mono font-bold text-primary">
                   {(plan.price / 1000).toFixed(0)}
                 </span>
                 <span className="text-xl text-neutral-400 font-medium">тыс. ₽</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-success stroke-[3]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              fullWidth 
              variant={plan.isPopular ? 'primary' : 'secondary'}
              onClick={onOpenModal}
            >
              Выбрать тариф
            </Button>
            
            <p className="text-center text-xs text-neutral-400 mt-4">
              Рассрочка от {Math.round(plan.price / 12).toLocaleString()} ₽/мес
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};