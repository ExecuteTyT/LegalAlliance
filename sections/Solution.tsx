import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Lock } from 'lucide-react';
import { DebtCalculator } from '../components/DebtCalculator';

interface SolutionProps {
  onOpenModal: () => void;
}

export const Solution: React.FC<SolutionProps> = ({ onOpenModal }) => {
  const [formState, setFormState] = useState({ name: '', phone: '', amount: '500k-1m' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Section className="bg-gradient-to-br from-neutral-50 via-white to-secondary/5">
      <div className="grid lg:grid-cols-5 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
            Мы остановим преследования. Вы не одни.
          </h2>
          <p className="text-xl text-neutral-700 mb-6 leading-relaxed">
            За 9 месяцев проведём вас через процедуру банкротства "под ключ". 
            Вы получите официальное решение суда и начнёте жизнь с чистого листа.
          </p>
          
          {/* Visual Before/After */}
          <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-secondary/20 shadow-lg">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="text-center lg:text-center">
                <div className="text-2xl lg:text-3xl font-bold text-error mb-2">ДО</div>
                <div className="space-y-2 text-sm text-neutral-600 text-left lg:text-center">
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-error shrink-0">✗</span>
                    <span>Постоянный стресс</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-error shrink-0">✗</span>
                    <span>Звонки коллекторов</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-error shrink-0">✗</span>
                    <span>Растущий долг</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-error shrink-0">✗</span>
                    <span>Страх за будущее</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-center border-l border-neutral-200 pl-4 lg:pl-6">
                <div className="text-2xl lg:text-3xl font-bold text-success mb-2">ПОСЛЕ</div>
                <div className="space-y-2 text-sm text-neutral-600 text-left lg:text-center">
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-success shrink-0">✓</span>
                    <span>Спокойный сон</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-success shrink-0">✓</span>
                    <span>Долги списаны</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-success shrink-0">✓</span>
                    <span>Имущество сохранено</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-center">
                    <span className="text-success shrink-0">✓</span>
                    <span>Новая жизнь</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Информационный блок о банкротстве с ипотекой */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary-light/5 rounded-2xl p-6 mb-10 border border-secondary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-primary w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Банкротство с ипотекой стало доступно
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-2">
                  Действует закон о списании долгов, даже если есть действующая ипотека. 
                  Ипотечное жилье при банкротстве сохраняется, при условии, что данная квартира является единственным жильем и нет просрочек по ипотеке.
                </p>
                <p className="text-sm font-semibold text-secondary">
                  Уже завершено более 100 дел с сохранением ипотечного жилья
                </p>
                <p className="text-xs text-neutral-500 mt-3 pt-3 border-t border-secondary/20">
                  Процедура проводится в рамках <strong>ФЗ №127 «О несостоятельности (банкротстве)»</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { num: '01', title: 'Анализ ситуации', desc: 'Бесплатно оцениваем ваши шансы и риски' },
              { num: '02', title: 'Сбор документов', desc: 'Берем всю бюрократию на себя' },
              { num: '03', title: 'Защита в суде', desc: 'Представляем ваши интересы на всех этапах' },
              { num: '04', title: 'Списание долга', desc: 'Получаем решение суда об освобождении от обязательств' }
            ].map((step) => (
              <div key={step.num} className="flex gap-6">
                <span className="text-4xl font-mono font-bold text-secondary-light leading-none pt-1">
                  {step.num}
                </span>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">{step.title}</h4>
                  <p className="text-neutral-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Image and Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Large Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80"
              alt="Спокойная жизнь после решения проблем"
              loading="lazy"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <p className="text-white font-semibold text-lg">
                "Теперь я могу дышать свободно"
              </p>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-neutral-100 relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-gold"></div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">Быстрая проверка</h3>
              <p className="text-neutral-500">Узнайте за 2 минуты, подходит ли вам банкротство</p>
            </div>

            {/* Social Proof */}
            <div className="bg-success/10 rounded-xl p-3 mb-4 border border-success/20">
              <p className="text-xs text-neutral-700 text-center">
                <strong className="text-success">✓ Сегодня уже 23 человека</strong> получили бесплатную консультацию
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Как к вам обращаться?</label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Ваше имя"
                  className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Телефон для связи</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="Ваш телефон"
                  className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Сумма долга</label>
                <div className="relative">
                  <select 
                    name="amount"
                    value={formState.amount}
                    onChange={handleInputChange}
                    className="w-full h-14 px-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all appearance-none"
                  >
                    <option value="under-500k">До 500 тыс. ₽</option>
                    <option value="500k-1m">500 тыс. – 1 млн ₽</option>
                    <option value="1m-3m">1 – 3 млн ₽</option>
                    <option value="over-3m">Более 3 млн ₽</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    ▼
                  </div>
                </div>
              </div>

              <Button fullWidth size="lg" className="mt-2 text-lg py-6 shadow-2xl hover:shadow-3xl">
                Узнать результат
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-4">
                <Lock size={12} />
                <span>Ваши данные под надежной защитой</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Debt Calculator Section */}
      <div className="mt-20">
        <DebtCalculator onOpenModal={onOpenModal} />
      </div>
    </Section>
  );
};