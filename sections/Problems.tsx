import React from 'react';
import { Section } from '../components/ui/Section';
import { PhoneOff, TrendingDown, Landmark, FileWarning, Frown, Home } from 'lucide-react';
import { ProblemItem } from '../types';

const problems: ProblemItem[] = [
  { id: 1, title: "Звонки коллекторов", description: "Постоянное давление на вас и ваших близких, угрозы и бесконечные звонки.", Icon: PhoneOff },
  { id: 2, title: "Рост долга", description: "Проценты и штрафы растут каждый день, долг становится неподъемным.", Icon: TrendingDown },
  { id: 3, title: "Арест счетов", description: "Приставы блокируют карты, списывают зарплату и детские пособия.", Icon: Landmark },
  { id: 4, title: "Судебные письма", description: "Получаете повестки в суд, не знаете как правильно реагировать юридически.", Icon: FileWarning },
  { id: 5, title: "Стресс и тревога", description: "Постоянное чувство страха за будущее, бессонница и напряжение в семье.", Icon: Frown },
  { id: 6, title: "Риск потери жилья", description: "Страх, что за долги могут отобрать единственное жилье или имущество.", Icon: Home },
];

export const Problems: React.FC = () => {
  return (
    <Section id="problems" className="bg-neutral-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Узнаете себя в одной из этих ситуаций?
        </h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Если хотя бы один пункт совпадает — это повод обратиться за профессиональной помощью.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {problems.map((problem) => (
          <div 
            key={problem.id}
            className="bg-white p-8 rounded-2xl border border-transparent shadow-sm hover:shadow-premium hover:-translate-y-2 hover:border-secondary transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-gold transition-colors duration-300">
              <problem.Icon className="w-8 h-8 text-primary group-hover:text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{problem.title}</h3>
            <p className="text-neutral-500 leading-relaxed">
              {problem.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};