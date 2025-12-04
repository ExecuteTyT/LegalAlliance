import React from 'react';
import { Section } from '../components/ui/Section';

const steps = [
  { 
    id: '01', 
    title: 'Бесплатная консультация', 
    duration: '1-2 дня', 
    desc: 'Анализируем вашу ситуацию, проверяем документы, оцениваем шансы на успех и риски.',
    checklist: ['Разбор ситуации юристом', 'Оценка перспектив дела', 'Расчет стоимости']
  },
  { 
    id: '02', 
    title: 'Сбор документов', 
    duration: '2-4 недели', 
    desc: 'Собираем полный пакет документов для суда. Взаимодействуем с банками и госорганами за вас.',
    checklist: ['Запросы в банки', 'Подготовка описи имущества', 'Составление заявления']
  },
  { 
    id: '03', 
    title: 'Подача заявления', 
    duration: '3-5 дней', 
    desc: 'Направляем документы в Арбитражный суд. Суд принимает заявление и назначает дату заседания.',
    checklist: ['Оплата госпошлины', 'Регистрация дела в суде', 'Назначение номера дела']
  },
  { 
    id: '04', 
    title: 'Судебное заседание', 
    duration: '1-2 месяца', 
    desc: 'Суд признает вас банкротом. Вводится процедура реализации. Прекращаются звонки коллекторов.',
    checklist: ['Признание банкротом', 'Остановка начисления пеней', 'Снятие арестов']
  },
  { 
    id: '05', 
    title: 'Списание долгов', 
    duration: '6-9 месяцев', 
    desc: 'Финансовый управляющий завершает процедуру. Суд выносит определение о полном списании долгов.',
    checklist: ['Отчет управляющего', 'Завершение реализации', 'Полное освобождение']
  }
];

export const Process: React.FC = () => {
  return (
    <Section id="process" className="bg-white">
      <div className="text-center mb-16 lg:mb-24">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Как проходит процедура
        </h2>
        <p className="text-lg text-neutral-500">
          Весь процесс занимает в среднем 9 месяцев. Мы работаем "под ключ".
        </p>
      </div>

      <div className="relative">
        {/* Desktop Timeline Line */}
        <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-1 bg-gradient-gold rounded-full opacity-30"></div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              {/* Mobile Vertical Line */}
              <div className="lg:hidden absolute top-0 bottom-0 left-[27px] w-1 bg-gradient-to-b from-secondary/30 to-secondary-light/30"></div>

              <div className="flex lg:block gap-6">
                {/* Dot / Number */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 lg:w-20 lg:h-20 bg-white border-4 border-secondary rounded-full flex items-center justify-center font-mono font-bold text-xl lg:text-3xl text-primary shadow-gold group-hover:scale-110 group-hover:border-primary transition-all duration-300 z-10 relative">
                    {step.id}
                  </div>
                  {/* Connector for mobile last item fix */}
                  {idx === steps.length - 1 && <div className="lg:hidden absolute top-14 bottom-0 left-[27px] w-1 bg-white"></div>}
                </div>

                {/* Card */}
                <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 mt-4 lg:mt-12 border border-transparent hover:border-secondary hover:shadow-premium hover:-translate-y-2 transition-all duration-300 min-h-[320px] flex flex-col">
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">
                      {step.duration}
                    </span>
                    <h3 className="font-bold text-xl text-primary leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-grow">
                    {step.desc}
                  </p>

                  <ul className="space-y-2 mt-auto">
                    {step.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                        <span className="text-success font-bold mt-px">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12 lg:mt-20">
         <p className="inline-block px-6 py-3 bg-neutral-100 rounded-full text-primary font-medium border border-neutral-200">
           Итого: полное списание долгов за <span className="font-bold text-secondary-dark">9 месяцев</span>
         </p>
      </div>
    </Section>
  );
};