import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-primary">
      {/* Background Image with Overlay - Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&q=80)',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95"></div>
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
      
      {/* Decorative Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Вернем вам спокойный сон <br />
              и <span className="text-gradient-gold">жизнь без долгов</span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-xl mb-2">
              Мы понимаем ваш страх. <strong className="text-white">1250+ человек</strong> уже начали новую жизнь.
            </p>
            <p className="text-base lg:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Законно спишем долги до <span className="font-bold text-white">10 млн ₽</span> за <span className="font-bold text-white">9 месяцев</span>. 
              Сохраним ваше имущество и защитим от коллекторов с первого дня.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-2xl hover:shadow-3xl" onClick={onOpenModal}>
              Получить БЕСПЛАТНУЮ консультацию
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-primary hover:border-white shadow-lg transition-all"
              onClick={onOpenModal}
            >
              Проверить долги
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/90 text-sm font-medium text-center">
              <span className="text-success font-bold">✓ Сегодня уже 23 человека</span> получили бесплатную консультацию
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            {[
              "Без предоплаты",
              "1250+ успешных дел",
              "Работаем по договору"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="text-success w-5 h-5" />
                <span className="font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Visual Form Representation */}
        <div className="relative">
           <div className="glass p-8 rounded-3xl relative z-10 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
             <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Avatar" 
                  loading="lazy"
                  className="w-16 h-16 rounded-full border-2 border-secondary object-cover"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">Мария Иванова</h3>
                  <p className="text-secondary text-sm">Долг списан полностью</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="text-neutral-300 text-sm">Сумма долга</span>
                   <span className="text-white font-mono font-bold text-xl line-through decoration-error">
                     <AnimatedNumber value={2450000} formatter={(val) => `${val.toLocaleString('ru-RU')} ₽`} />
                   </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="text-neutral-300 text-sm">После процедуры</span>
                   <span className="text-success font-mono font-bold text-xl">0 ₽</span>
                </div>
             </div>
             <div className="mt-6 pt-6 border-t border-white/10">
               <p className="text-white/80 text-sm italic">
                 "Спасибо команде Правового Альянса. Теперь я могу дышать свободно и не бояться звонков."
               </p>
             </div>
           </div>
           {/* Decorative elements behind card */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light rounded-full opacity-40 blur-2xl"></div>
        </div>
      </div>
    </section>
  );
};