import React from 'react';
import { Section } from '../components/ui/Section';
import { CaseStudy } from '../types';
import { Quote } from 'lucide-react';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';

const cases: CaseStudy[] = [
  {
    id: 1,
    name: "Мария С.",
    profession: "Предприниматель",
    location: "Москва",
    image: "",
    debt: 4200000,
    term: 7,
    result: "Долг списан полностью",
    quote: "Спасибо за поддержку в самый сложный период жизни. Наконец-то могу спать спокойно."
  },
  {
    id: 2,
    name: "Дмитрий К.",
    profession: "IT-специалист",
    location: "Санкт-Петербург",
    image: "",
    debt: 8700000,
    term: 6,
    result: "Сохранил автомобиль",
    quote: "Боялся потерять машину, но юристы нашли законный способ ее сохранить."
  },
  {
    id: 3,
    name: "Елена В.",
    profession: "Врач",
    location: "Казань",
    image: "",
    debt: 1800000,
    term: 5,
    result: "Списаны микрозаймы",
    quote: "МФО угрожали каждый день. После первого визита к юристам звонки прекратились."
  }
];

export const Cases: React.FC = () => {
  return (
    <Section id="cases" className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Реальные истории наших клиентов
        </h2>
        <p className="text-lg text-neutral-500">
          Они уже начали новую жизнь без долгов
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-neutral-200 overflow-hidden hover:shadow-premium hover:border-secondary transition-all duration-300 group">
            <div className="h-2 w-full bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="p-8">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <h4 className="font-bold text-primary text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-neutral-500">{item.profession}, {item.location}</p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-end mb-4 border-b border-neutral-200 pb-4">
                  <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Было</span>
                  <span className="font-mono font-bold text-error text-xl">
                    <AnimatedNumber value={item.debt} formatter={(v) => `${v.toLocaleString('ru-RU')} ₽`} />
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Стало</span>
                  <span className="font-mono font-bold text-success text-xl">0 ₽</span>
                </div>
              </div>

              <div className="mb-6">
                 <span className="inline-block px-3 py-1 bg-success/10 text-success text-xs font-bold uppercase rounded-full tracking-wider">
                   {item.result}
                 </span>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-secondary/20 w-8 h-8" />
                <p className="text-neutral-600 italic relative z-10 pl-4">
                  "{item.quote}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};