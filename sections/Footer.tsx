import React from 'react';
import { Button } from '../components/ui/Button';
import { Scale, Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-primary pt-20 text-white relative overflow-hidden">
      {/* Final CTA Block (Positioned slightly overlapping top) */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 mb-20">
        <div className="bg-gradient-to-br from-secondary to-secondary-light rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-primary">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Готовы начать жизнь без долгов?</h2>
            <p className="text-lg text-primary-dark/80 font-medium">Запишитесь на бесплатную консультацию. Мы работаем без выходных.</p>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-auto">
             <Button variant="primary" className="bg-primary text-white hover:bg-primary-light shadow-none" onClick={onOpenModal}>Записаться сейчас</Button>
             <p className="text-center text-sm font-semibold opacity-70">✓ Ответим за 30 минут</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Scale className="text-secondary" size={32} />
              <span className="text-2xl font-bold">Правовой Альянс</span>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Команда экспертов с 8-летним опытом. Помогаем гражданам законно списать долги и начать новую финансовую жизнь.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/74951234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all cursor-pointer group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://t.me/alliance_pravo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all cursor-pointer group"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#services" className="hover:text-secondary transition-colors">Банкротство физлиц</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Защита от коллекторов</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Реструктуризация</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Судебное представительство</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Информация</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#" className="hover:text-secondary transition-colors">О компании</a></li>
              <li><a href="#cases" className="hover:text-secondary transition-colors">Кейсы клиентов</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Отзывы</a></li>
              <li><a href="#faq" className="hover:text-secondary transition-colors">Вопрос-ответ</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex gap-3">
                <MapPin className="text-secondary shrink-0" size={20} />
                <span>г. Москва, ул. Примерная, д. 123, офис 404</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-secondary shrink-0" size={20} />
                <a href="mailto:info@alliance-pravo.ru" className="hover:text-white transition-colors">info@alliance-pravo.ru</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© 2025 Правовой Альянс. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-secondary transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};