import React from 'react';
import { Section } from '../components/ui/Section';
import { ScrollAnimation } from '../components/ui/ScrollAnimation';
import { Handshake, FileText, Gavel, Scale, CheckCircle2 } from 'lucide-react';

const steps = [
  { 
    id: '01', 
    title: 'Бесплатная консультация', 
    duration: '1-2 дня', 
    desc: 'Анализируем вашу ситуацию, проверяем документы, оцениваем шансы на успех и риски.',
    checklist: ['Разбор ситуации юристом', 'Оценка перспектив дела', 'Расчет стоимости'],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&q=80',
    icon: Handshake,
    color: 'from-blue-50 to-blue-100'
  },
  { 
    id: '02', 
    title: 'Сбор документов', 
    duration: '2-4 недели', 
    desc: 'Собираем полный пакет документов для суда. Взаимодействуем с банками и госорганами за вас.',
    checklist: ['Запросы в банки', 'Подготовка описи имущества', 'Составление заявления'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
    icon: FileText,
    color: 'from-purple-50 to-purple-100'
  },
  { 
    id: '03', 
    title: 'Подача заявления', 
    duration: '3-5 дней', 
    desc: 'Направляем документы в Арбитражный суд. Суд принимает заявление и назначает дату заседания.',
    checklist: ['Оплата госпошлины', 'Регистрация дела в суде', 'Назначение номера дела'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&q=80',
    icon: Gavel,
    color: 'from-amber-50 to-amber-100'
  },
  { 
    id: '04', 
    title: 'Судебное заседание', 
    duration: '1-2 месяца', 
    desc: 'Суд признает вас банкротом. Вводится процедура реализации. Прекращаются звонки коллекторов.',
    checklist: ['Признание банкротом', 'Остановка начисления пеней', 'Снятие арестов'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=400&fit=crop&q=80',
    icon: Scale,
    color: 'from-indigo-50 to-indigo-100'
  },
  { 
    id: '05', 
    title: 'Списание долгов', 
    duration: '6-9 месяцев', 
    desc: 'Финансовый управляющий завершает процедуру. Суд выносит определение о полном списании долгов.',
    checklist: ['Отчет управляющего', 'Завершение реализации', 'Полное освобождение'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&q=80',
    icon: CheckCircle2,
    color: 'from-green-50 to-green-100'
  }
];

export const Process: React.FC = () => {
  return (
    <Section id="process" className="bg-gradient-to-b from-white via-neutral-50/50 to-white">
      <ScrollAnimation>
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Простой путь к свободе от долгов
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Весь процесс занимает в среднем <strong className="text-primary">9 месяцев</strong>. Мы работаем "под ключ" — вы просто следуете нашим инструкциям.
          </p>
        </div>
      </ScrollAnimation>

      <div className="relative">
        {/* Desktop Timeline Line with Progress */}
        <div className="hidden lg:block absolute top-24 left-[8%] right-[8%] h-1 bg-neutral-200 rounded-full overflow-hidden z-0">
          <div className="h-full bg-gradient-gold rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-4 relative">
          {steps.map((step, idx) => (
            <ScrollAnimation key={idx} delay={idx * 100} direction="up">
              <div className="group relative">
                {/* Mobile Vertical Line */}
                <div className="lg:hidden absolute top-0 bottom-0 left-[31px] w-1 bg-gradient-to-b from-secondary/30 to-secondary-light/30 z-0"></div>
                {idx === steps.length - 1 && <div className="lg:hidden absolute top-20 bottom-0 left-[31px] w-1 bg-white z-0"></div>}

                <div className="flex lg:block gap-6">
                  {/* Step Number Badge with Icon */}
                  <div className="relative shrink-0 z-10">
                    <div className="relative">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white border-4 border-secondary rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-lg lg:text-2xl text-primary shadow-gold group-hover:scale-110 group-hover:border-primary group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-gold opacity-5 group-hover:opacity-10 transition-opacity"></div>
                        <span className="relative z-10 text-xs lg:text-sm mb-1">{step.id}</span>
                        <step.icon className="w-4 h-4 lg:w-6 lg:h-6 text-secondary relative z-10" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-3xl mt-6 lg:mt-16 border-2 border-neutral-200 hover:border-secondary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group/card">
                    {/* Image Section */}
                    <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                      <img 
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23E5E7EB" width="600" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="24" dy=".3em" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EИзображение%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-white/50">
                          <step.icon className="w-4 h-4 text-secondary" strokeWidth={2} />
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{step.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 lg:p-8 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl lg:text-2xl text-primary leading-tight mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-neutral-700 text-sm lg:text-base leading-relaxed mb-6 flex-grow">
                        {step.desc}
                      </p>

                      {/* Checklist */}
                      <div className="space-y-3 mt-auto pt-6 border-t border-neutral-100">
                        {step.checklist.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover/card:bg-success/20 transition-colors">
                              <span className="text-success font-bold text-xs">✓</span>
                            </div>
                            <span className="text-sm text-neutral-700 flex-1 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
      
      <ScrollAnimation delay={500}>
        <div className="text-center mt-16 lg:mt-24">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 rounded-2xl border-2 border-secondary/20 shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-success" strokeWidth={2.5} />
            <p className="text-lg font-semibold text-primary">
              Итого: полное списание долгов за <span className="font-bold text-secondary text-xl">9 месяцев</span>
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </Section>
  );
};