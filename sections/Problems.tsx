import React from 'react';
import { Section } from '../components/ui/Section';
import { PhoneOff, TrendingDown, Landmark, FileWarning, Frown, Home } from 'lucide-react';
import { ProblemItem } from '../types';

const problems: ProblemItem[] = [
  { 
    id: 1, 
    title: "Звонки коллекторов", 
    description: "Постоянное давление на вас и ваших близких, угрозы и бесконечные звонки.", 
    Icon: PhoneOff,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80",
    story: "Анна, 34 года: 'Каждый звонок вызывал панику. Я боялась даже смотреть на телефон.'"
  },
  { 
    id: 2, 
    title: "Рост долга", 
    description: "Проценты и штрафы растут каждый день, долг становится неподъемным.", 
    Icon: TrendingDown,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80",
    story: "Дмитрий, 42 года: 'Долг вырос с 500 тысяч до 2 миллионов за год. Я не видел выхода.'"
  },
  { 
    id: 3, 
    title: "Арест счетов", 
    description: "Приставы блокируют карты, списывают зарплату и детские пособия.", 
    Icon: Landmark,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80",
    story: "Елена, 38 лет: 'Заблокировали карту с детскими пособиями. Не знала, как кормить детей.'"
  },
  { 
    id: 4, 
    title: "Судебные письма", 
    description: "Получаете повестки в суд, не знаете как правильно реагировать юридически.", 
    Icon: FileWarning,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80",
    story: "Сергей, 45 лет: 'Каждое письмо из суда вызывало ужас. Я не понимал, что делать.'"
  },
  { 
    id: 5, 
    title: "Стресс и тревога", 
    description: "Постоянное чувство страха за будущее, бессонница и напряжение в семье.", 
    Icon: Frown,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&q=80",
    story: "Мария, 36 лет: 'Не спала ночами. Думала, что жизнь закончена. Семья страдала вместе со мной.'"
  },
  { 
    id: 6, 
    title: "Риск потери жилья", 
    description: "Страх, что за долги могут отобрать единственное жилье или имущество.", 
    Icon: Home,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80",
    story: "Игорь, 41 год: 'Боялся, что заберут квартиру. Не знал, где будут жить дети.'"
  },
];

export const Problems: React.FC = () => {
  return (
    <Section id="problems" className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Узнаете себя? Мы понимаем вашу боль
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Если хотя бы один пункт совпадает — это повод обратиться за профессиональной помощью. Вы не одни в этой ситуации.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div 
              key={problem.id}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-error/50 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={problem.image}
                  alt={problem.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-error/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-error/30">
                  <problem.Icon className="w-6 h-6 text-error" strokeWidth={2} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  {problem.description}
                </p>
                
                {problem.story && (
                  <div className="mt-4 pt-4 border-t border-neutral-700">
                    <p className="text-sm text-neutral-400 italic leading-relaxed">
                      "{problem.story}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};