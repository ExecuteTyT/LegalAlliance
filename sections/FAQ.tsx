import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Кто может объявить себя банкротом?",
    answer: "Гражданин РФ, чей долг превышает 500 000 рублей, а просрочка по платежам составляет более 3 месяцев. Однако, можно подать заявление и при меньшей сумме, если очевидно, что вы не сможете платить."
  },
  {
    question: "Заберут ли у меня квартиру?",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Единственное жилье обладает иммунитетом</strong> (даже если квартира в ипотеке) — можно сделать процедуру банкротства. 
          Ипотечное жилье при банкротстве сохраняется, при условии, что данная квартира является единственным жильем и нет просрочек по ипотеке.
        </p>
        <p>
          В такой ситуации мы можем списать долги по потребительским кредитам, кредитным картам и микрозаймам, сохранив при этом ваше жилье.
        </p>
        <p className="pt-2 border-t border-neutral-200">
          <strong>Важно:</strong> Банкротство с ипотекой стало доступно и уже завершено <strong>более 100 дел</strong> с сохранением ипотечного жилья 
          (при условии что эта квартира является единственным жильем).
        </p>
      </div>
    )
  },
  {
    question: "Смогу ли я выезжать за границу?",
    answer: "Запрет на выезд может быть наложен только на время проведения процедуры (обычно 9 месяцев). После завершения процедуры все ограничения снимаются."
  },
  {
    question: "Узнают ли на работе?",
    answer: "Мы не уведомляем работодателя. Информация публикуется в реестре ЕФРСБ, но специально туда никто обычно не заглядывает. Увольнение по причине банкротства незаконно."
  },
  {
    question: "Какие последствия после банкротства?",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Банкротство влечет негативные последствия:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Ограничения на получение кредита в течение 5 лет</li>
          <li>Невозможность повторного банкротства в течение 5 лет</li>
          <li>В течение 3 лет нельзя быть директором юридического лица</li>
        </ul>
        <p className="pt-2 border-t border-neutral-200">
          <strong>Важно:</strong> Предварительно обратитесь к своему кредитору и в многофункциональный центр (МФЦ) для урегулирования ситуации.
        </p>
        <p>
          Процедура проводится в рамках <strong>ФЗ №127 «О несостоятельности (банкротстве)»</strong>.
        </p>
      </div>
    )
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Ответы на частые вопросы
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-secondary bg-white shadow-lg' : 'border-neutral-200 bg-neutral-50 hover:border-secondary/50'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-neutral-700'}`}>
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-gradient-gold rotate-180' : 'bg-neutral-200'
                  }`}>
                    {isOpen ? <Minus size={16} className="text-primary" /> : <Plus size={16} className="text-neutral-500" />}
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-neutral-600 leading-relaxed border-t border-dashed border-neutral-200 mt-2">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};