import React, { useState, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import { Award, Shield, CheckCircle2, Users, TrendingUp } from 'lucide-react';

export const Trust: React.FC = () => {
  const [todayCount, setTodayCount] = useState(23);

  useEffect(() => {
    // Simulate real-time counter
    const interval = setInterval(() => {
      setTodayCount(prev => {
        // Random increment between 0-2
        return prev + Math.floor(Math.random() * 3);
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="trust" className="bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Нам доверяют тысячи клиентов
        </h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Мы работаем прозрачно, по договору, с полной ответственностью за результат
        </p>
      </div>

      {/* Real-time Counter */}
      <div className="bg-gradient-to-br from-secondary to-secondary-light rounded-3xl p-8 lg:p-12 mb-16 text-center shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            Сегодня уже <span className="text-primary">{todayCount}</span> человек получили помощь
          </h3>
        </div>
        <p className="text-white/90 text-lg">
          Присоединяйтесь к тем, кто уже начал новую жизнь без долгов
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-success transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-bold text-primary">Работаем по договору</h4>
          </div>
          <p className="text-neutral-600 text-sm">
            Все условия прозрачны и прописаны в договоре. Никаких скрытых платежей.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-success transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-bold text-primary">Конфиденциальность</h4>
          </div>
          <p className="text-neutral-600 text-sm">
            Ваши данные защищены. Мы не передаем информацию третьим лицам.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-success transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-bold text-primary">Опыт и экспертиза</h4>
          </div>
          <p className="text-neutral-600 text-sm">
            8 лет опыта, 1250+ успешных дел. Мы знаем, как помочь в вашей ситуации.
          </p>
        </div>
      </div>

    </Section>
  );
};

