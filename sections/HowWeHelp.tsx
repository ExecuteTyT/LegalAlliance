import React from 'react';
import { Section } from '../components/ui/Section';
import { TrendingDown, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowWeHelp: React.FC = () => {
  const beforeAfter = [
    { 
      before: "Постоянный стресс и тревога",
      after: "Спокойный сон и уверенность",
      icon: Shield
    },
    { 
      before: "Звонки коллекторов каждый день",
      after: "Звонки прекращены с первого дня",
      icon: CheckCircle2
    },
    { 
      before: "Растущий долг с процентами",
      after: "Долг полностью списан",
      icon: TrendingDown
    },
    { 
      before: "Страх потерять имущество",
      after: "Имущество сохранено",
      icon: Shield
    },
  ];

  return (
    <Section id="how-we-help" className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Как мы помогаем вернуть вам жизнь
        </h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Визуализация процесса от проблемы к решению
        </p>
      </div>

      {/* Before/After Infographic */}
      <div className="mb-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Before */}
          <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-3xl p-8 lg:p-12 border-2 border-error/20">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-3 bg-error/20 rounded-full mb-4">
                <span className="text-error font-bold text-xl uppercase tracking-wider">ДО</span>
              </div>
              <h3 className="text-2xl font-bold text-error mb-6">Ваша ситуация сейчас</h3>
            </div>
            
            <div className="space-y-6">
              {beforeAfter.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-error/20 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-error" />
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-700 font-medium">{item.before}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-error/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-error mb-2">2 500 000 ₽</div>
                <div className="text-sm text-neutral-600">Средний долг клиента</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* After */}
          <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-3xl p-8 lg:p-12 border-2 border-success/20 relative">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-3 bg-success/20 rounded-full mb-4">
                <span className="text-success font-bold text-xl uppercase tracking-wider">ПОСЛЕ</span>
              </div>
              <h3 className="text-2xl font-bold text-success mb-6">Ваша жизнь через 9 месяцев</h3>
            </div>
            
            <div className="space-y-6">
              {beforeAfter.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-700 font-medium">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-success/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">0 ₽</div>
                <div className="text-sm text-neutral-600">Долг полностью списан</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

