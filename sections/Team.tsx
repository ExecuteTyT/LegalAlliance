import React from 'react';
import { Section } from '../components/ui/Section';
import { Scale, Users, Briefcase } from 'lucide-react';

const team = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Ведущий юрист",
    experience: "12 лет опыта",
    specialization: "Банкротство физлиц",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&q=80",
    story: "Помог более 500 клиентам списать долги и начать новую жизнь."
  },
  {
    id: 2,
    name: "Дмитрий Соколов",
    role: "Старший юрист",
    experience: "10 лет опыта",
    specialization: "Защита от коллекторов",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&q=80",
    story: "Эксперт по работе с банками и МФО. Более 300 успешных дел."
  },
  {
    id: 3,
    name: "Сергей Иванов",
    role: "Юрист",
    experience: "8 лет опыта",
    specialization: "Судебное представительство",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face&q=80",
    story: "Специализируется на сложных случаях с сохранением имущества."
  },
  {
    id: 4,
    name: "Игорь Волков",
    role: "Юрист-консультант",
    experience: "6 лет опыта",
    specialization: "Первичные консультации",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80",
    story: "Помогает клиентам на первом этапе, объясняет все простым языком."
  }
];

const stats = [
  { icon: Users, value: "1250+", label: "Успешных дел" },
  { icon: Briefcase, value: "8", label: "Лет опыта" },
  { icon: Scale, value: "98%", label: "Положительных решений" },
  { icon: Users, value: "0", label: "Потерянного имущества" }
];

export const Team: React.FC = () => {
  return (
    <Section id="team" className="bg-gradient-to-br from-neutral-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
          Команда экспертов, которая вам поможет
        </h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Опытные юристы с многолетней практикой. Мы понимаем вашу ситуацию и знаем, как помочь.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-secondary transition-all duration-300 hover:shadow-lg text-center"
          >
            <stat.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-neutral-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div 
            key={member.id}
            className="bg-white rounded-3xl overflow-hidden border-2 border-neutral-100 hover:border-secondary transition-all duration-300 hover:shadow-xl group"
          >
            <div className="relative h-64 md:h-64 overflow-hidden">
              <img 
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ objectPosition: 'center 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-white/90 text-sm">{member.role}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-secondary font-semibold text-sm mb-1">{member.experience}</p>
                <p className="text-neutral-600 text-sm">{member.specialization}</p>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed italic">
                "{member.story}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

