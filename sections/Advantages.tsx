import React from 'react';
import { Section } from '../components/ui/Section';
import { ShieldCheck, Gavel, Clock, Briefcase, Unlock, BarChart3 } from 'lucide-react';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';

const advantages = [
  {
    icon: ShieldCheck,
    title: 'Опыт и экспертиза',
    desc: 'Узкая специализация на банкротстве физлиц. Знаем все нюансы судебной практики.',
    stat: { value: 8, label: 'Лет опыта' },
    size: 'lg'
  },
  {
    icon: Briefcase,
    title: 'Работа "под ключ"',
    desc: 'Берем на себя сбор всех документов и взаимодействие с судом. Ваше участие минимально.',
    size: 'sm'
  },
  {
    icon: Unlock,
    title: 'Без предоплат',
    desc: 'Честная рассрочка. Вы платите только за результат, прописанный в договоре.',
    size: 'sm'
  },
  {
    icon: Gavel,
    title: 'Защита в суде',
    desc: 'Останавливаем звонки коллекторов и приставов с момента заключения договора.',
    size: 'sm'
  },
  {
    icon: Clock,
    title: 'Прозрачность 24/7',
    desc: 'Личный кабинет с отслеживанием статуса дела в реальном времени.',
    size: 'sm'
  },
  {
    icon: BarChart3,
    title: 'Высокий процент успеха',
    desc: '98% наших дел завершаются успешным списанием долгов. Работаем только по договору.',
    stat: { value: 98, label: '% Побед', suffix: '%' },
    size: 'lg'
  }
];

export const Advantages: React.FC = () => {
  return (
    <Section id="services" className="bg-neutral-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Почему выбирают именно нас
        </h2>
        <p className="text-lg text-neutral-500">
          Сочетаем премиальный сервис с доступными ценами и прозрачными условиями работы.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
        {advantages.map((adv, idx) => (
          <div 
            key={idx}
            className={`
              group bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-premium hover:border-secondary transition-all duration-300 relative overflow-hidden
              ${adv.size === 'lg' ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
            `}
          >
            {/* Decorative Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <adv.icon className="text-primary w-8 h-8" strokeWidth={1.5} />
            </div>

            <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{adv.title}</h3>
            <p className="text-neutral-500 leading-relaxed mb-6 relative z-10">
              {adv.desc}
            </p>

            {adv.stat && (
              <div className="mt-auto pt-6 border-t border-neutral-100">
                <div className="text-5xl font-mono font-bold text-secondary mb-1">
                  <AnimatedNumber value={adv.stat.value} />
                  {adv.stat.suffix}
                </div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider font-medium">
                  {adv.stat.label}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};