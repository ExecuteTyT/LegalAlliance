import React from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { CreditCard, Calendar, TrendingDown } from 'lucide-react';

interface PricingProps {
  onOpenModal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  return (
    <Section id="pricing" className="bg-neutral-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Стоимость услуги
        </h2>
        <p className="text-lg text-neutral-500">
          Прозрачная фиксированная стоимость. Удобная рассрочка без переплат.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-secondary overflow-hidden relative">
          {/* Декоративная золотая полоса сверху */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-gold"></div>
          
          <div className="p-8 lg:p-12">
            {/* Основная стоимость - крупно и по центру */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-gold">
                  <CreditCard className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium">
                    Общая стоимость
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl lg:text-6xl font-mono font-bold text-primary">
                      150
                    </span>
                    <span className="text-2xl text-neutral-400 font-medium">000 ₽</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Два блока с рассрочкой и платежом - бок о бок */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Блок рассрочки */}
              <div className="bg-gradient-to-br from-secondary/10 to-secondary-light/5 rounded-2xl p-6 border border-secondary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center">
                    <Calendar className="text-primary w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium">Внутренняя рассрочка</p>
                    <p className="text-2xl font-bold text-primary">12 месяцев</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Без переплат и скрытых комиссий. Платежи распределены равномерно.
                </p>
              </div>

              {/* Блок ежемесячного платежа */}
              <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 border border-success/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                    <TrendingDown className="text-white w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium">Ежемесячный платеж</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-mono font-bold text-primary">от</span>
                      <span className="text-3xl font-mono font-bold text-success">5 000</span>
                      <span className="text-lg text-neutral-400">₽/мес</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Комфортная сумма, которая не обременяет семейный бюджет.
                </p>
              </div>
            </div>

            {/* Кнопка CTA */}
            <div className="text-center">
              <Button 
                size="lg" 
                variant="primary"
                onClick={onOpenModal}
                className="w-full md:w-auto px-12"
              >
                Получить консультацию
              </Button>
              <p className="text-xs text-neutral-400 mt-4">
                Первая консультация бесплатна
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};