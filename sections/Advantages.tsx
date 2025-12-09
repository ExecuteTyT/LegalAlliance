import React from 'react';
import { Section } from '../components/ui/Section';
import { ShieldCheck, Gavel, Clock, Briefcase, Unlock, BarChart3 } from 'lucide-react';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';

const advantages = [
  {
    icon: ShieldCheck,
    title: 'Опыт и экспертиза',
    desc: 'Мы специализируемся только на банкротстве физлиц. Знаем все нюансы и подводные камни. Вы можете быть уверены в результате.',
    stat: { value: 8, label: 'Лет опыта' },
    size: 'lg'
  },
  {
    icon: Briefcase,
    title: 'Работа "под ключ"',
    desc: 'Вы не будете бегать по инстанциям. Мы соберем все документы, подадим заявление, будем представлять вас в суде. Вы просто следуете нашим инструкциям.',
    size: 'sm'
  },
  {
    icon: Unlock,
    title: 'Без предоплат',
    desc: 'Мы понимаем вашу финансовую ситуацию. Поэтому работаем в рассрочку — вы платите только за результат, когда долги уже списаны.',
    size: 'sm'
  },
  {
    icon: Gavel,
    title: 'Защита в суде',
    desc: 'С первого дня работы мы останавливаем звонки коллекторов и приставов. Вы наконец-то сможете спать спокойно.',
    size: 'sm'
  },
  {
    icon: Clock,
    title: 'Прозрачность 24/7',
    desc: 'Вы всегда знаете, что происходит с вашим делом. Личный кабинет показывает статус в реальном времени. Никаких сюрпризов.',
    size: 'sm'
  },
  {
    icon: BarChart3,
    title: 'Высокий процент успеха',
    desc: '98% наших дел завершаются успешным списанием долгов. Мы работаем только по договору, все условия прозрачны и понятны.',
    stat: { value: 98, label: '% Побед', suffix: '%' },
    size: 'lg'
  }
];

export const Advantages: React.FC = () => {
  return (
    <Section id="services" className="bg-neutral-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Почему тысячи людей доверяют нам
        </h2>
        <p className="text-lg text-neutral-500">
          Мы понимаем, что вы переживаете. Поэтому делаем все, чтобы процесс был максимально простым и понятным для вас.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((adv, idx) => (
          <div 
            key={idx}
            className={`
              group bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-premium hover:border-secondary transition-all duration-300 relative overflow-hidden flex flex-col
              ${adv.size === 'lg' ? 'md:col-span-2 lg:col-span-2' : ''}
            `}
          >
            {/* Decorative Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex items-start gap-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0">
                <adv.icon className="text-primary w-8 h-8" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-primary mb-3">{adv.title}</h3>
                <p className="text-neutral-500 leading-relaxed mb-6">
                  {adv.desc}
                </p>
              </div>
            </div>

            {adv.stat && (
              <div className="mt-auto pt-6 border-t border-neutral-100 relative z-10">
                <div className="flex items-baseline gap-2">
                  <div className="text-5xl font-mono font-bold text-secondary">
                    <AnimatedNumber value={adv.stat.value} />
                  </div>
                  {adv.stat.suffix && (
                    <div className="text-3xl font-mono font-bold text-secondary">{adv.stat.suffix}</div>
                  )}
                </div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider font-medium mt-1">
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