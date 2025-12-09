import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { CaseStudy } from '../types';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';
import { ScrollAnimation } from '../components/ui/ScrollAnimation';

const cases: CaseStudy[] = [
  {
    id: 1,
    name: "Мария С.",
    profession: "Предприниматель",
    location: "Москва",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 4200000,
    term: 7,
    result: "Долг списан полностью",
    quote: "Спасибо за поддержку в самый сложный период жизни. Наконец-то могу спать спокойно.",
    rating: 5,
    date: "15 января 2025"
  },
  {
    id: 2,
    name: "Дмитрий К.",
    profession: "IT-специалист",
    location: "Санкт-Петербург",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 8700000,
    term: 6,
    result: "Сохранил автомобиль",
    quote: "Боялся потерять машину, но юристы нашли законный способ ее сохранить.",
    rating: 5,
    date: "8 января 2025"
  },
  {
    id: 3,
    name: "Елена В.",
    profession: "Врач",
    location: "Казань",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 1800000,
    term: 5,
    result: "Списаны микрозаймы",
    quote: "МФО угрожали каждый день. После первого визита к юристам звонки прекратились.",
    rating: 5,
    date: "22 декабря 2024"
  },
  {
    id: 4,
    name: "Сергей М.",
    profession: "Инженер",
    location: "Новосибирск",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 3200000,
    term: 8,
    result: "Сохранена квартира",
    quote: "Думал, что потеряю единственное жилье. Оказалось, можно сохранить и списать долги.",
    rating: 5,
    date: "5 декабря 2024"
  },
  {
    id: 5,
    name: "Мария И.",
    profession: "Учитель",
    location: "Екатеринбург",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 2450000,
    term: 6,
    result: "Долг списан полностью",
    quote: "Не могла поверить, что это возможно. Теперь живу без страха и тревоги.",
    rating: 5,
    date: "18 ноября 2024"
  },
  {
    id: 6,
    name: "Игорь Л.",
    profession: "Менеджер",
    location: "Краснодар",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 5600000,
    term: 9,
    result: "Сохранено имущество",
    quote: "Процедура прошла гладко. Юристы все объяснили, поддерживали на каждом этапе.",
    rating: 5,
    date: "10 ноября 2024"
  },
  {
    id: 7,
    name: "Ольга К.",
    profession: "Бухгалтер",
    location: "Ростов-на-Дону",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 2400000,
    term: 7,
    result: "Долг списан полностью",
    quote: "Спасибо за профессионализм. Все сделали быстро и качественно.",
    rating: 5,
    date: "28 октября 2024"
  },
  {
    id: 8,
    name: "Александр В.",
    profession: "Продавец",
    location: "Воронеж",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 1900000,
    term: 6,
    result: "Списаны кредиты",
    quote: "Не думал, что смогу избавиться от долгов. Теперь свободен и счастлив.",
    rating: 5,
    date: "15 октября 2024"
  },
  {
    id: 9,
    name: "Татьяна Р.",
    profession: "Медсестра",
    location: "Самара",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face&q=80",
    debt: 2800000,
    term: 8,
    result: "Долг списан полностью",
    quote: "Очень благодарна команде. Помогли в трудную минуту, поддержали морально.",
    rating: 5,
    date: "2 октября 2024"
  }
];

export const Cases: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const goToCase = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCase();
    }
    if (isRightSwipe) {
      prevCase();
    }
  };

  const currentCase = cases[currentIndex];

  return (
    <Section id="cases" className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Реальные истории людей, которые вернули себе жизнь
        </h2>
        <p className="text-lg text-neutral-500">
          Они уже начали новую жизнь без долгов. Вы тоже можете.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item, idx) => (
          <ScrollAnimation key={item.id} delay={idx * 100} direction="up">
            <div className="bg-white rounded-3xl border-2 border-neutral-200 overflow-hidden hover:shadow-2xl hover:border-secondary transition-all duration-300 group">
            <div className="h-2 w-full bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover border-2 border-secondary shadow-lg group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23E5E7EB" width="80" height="80" rx="40"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="24" dy=".3em" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E' + item.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg mb-1">{item.name}</h4>
                  <p className="text-sm text-neutral-500 mb-2">{item.profession}, {item.location}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < item.rating ? 'fill-secondary text-secondary' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{item.date}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 mb-6 border border-neutral-200">
                <div className="flex justify-between items-end mb-4 border-b-2 border-error/20 pb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-error tracking-wider block mb-1">ДО</span>
                    <span className="text-xs text-neutral-500">Постоянный стресс</span>
                  </div>
                  <span className="font-mono font-bold text-error text-xl">
                    <AnimatedNumber value={item.debt} formatter={(v) => `${v.toLocaleString('ru-RU')} ₽`} />
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase font-bold text-success tracking-wider block mb-1">ПОСЛЕ</span>
                    <span className="text-xs text-neutral-500">Спокойная жизнь</span>
                  </div>
                  <span className="font-mono font-bold text-success text-2xl">0 ₽</span>
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
          </ScrollAnimation>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div 
          className="bg-white rounded-3xl border-2 border-neutral-200 overflow-hidden shadow-xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="h-2 w-full bg-gradient-gold"></div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
              <img 
                src={currentCase.image} 
                alt={currentCase.name}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover border-2 border-secondary shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23E5E7EB" width="64" height="64" rx="32"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="20" dy=".3em" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E' + currentCase.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="flex-1">
                <h4 className="font-bold text-primary text-lg mb-1">{currentCase.name}</h4>
                <p className="text-sm text-neutral-500 mb-2">{currentCase.profession}, {currentCase.location}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < currentCase.rating ? 'fill-secondary text-secondary' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-400 mt-1">{currentCase.date}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-5 mb-6 border border-neutral-200">
              <div className="flex justify-between items-end mb-4 border-b-2 border-error/20 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-error tracking-wider block mb-1">ДО</span>
                  <span className="text-xs text-neutral-500">Постоянный стресс</span>
                </div>
                <span className="font-mono font-bold text-error text-lg">
                  <AnimatedNumber key={currentCase.id} value={currentCase.debt} formatter={(v) => `${v.toLocaleString('ru-RU')} ₽`} />
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase font-bold text-success tracking-wider block mb-1">ПОСЛЕ</span>
                  <span className="text-xs text-neutral-500">Спокойная жизнь</span>
                </div>
                <span className="font-mono font-bold text-success text-xl">0 ₽</span>
              </div>
            </div>

            <div className="mb-6">
               <span className="inline-block px-3 py-1 bg-success/10 text-success text-xs font-bold uppercase rounded-full tracking-wider">
                 {currentCase.result}
               </span>
            </div>

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 text-secondary/20 w-8 h-8" />
              <p className="text-neutral-600 italic relative z-10 pl-4 text-sm">
                "{currentCase.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevCase}
            className="w-12 h-12 rounded-full bg-white border-2 border-secondary flex items-center justify-center shadow-lg hover:bg-secondary hover:text-white transition-all"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {cases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToCase(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-secondary w-8' : 'bg-neutral-300'
                }`}
                aria-label={`Перейти к отзыву ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextCase}
            className="w-12 h-12 rounded-full bg-white border-2 border-secondary flex items-center justify-center shadow-lg hover:bg-secondary hover:text-white transition-all"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Section>
  );
};