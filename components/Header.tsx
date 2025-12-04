import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Scale } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Услуги', href: '#services' },
    { label: 'Процесс', href: '#process' },
    { label: 'Кейсы', href: '#cases' },
    { label: 'Стоимость', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'h-20 bg-white/95 backdrop-blur-md shadow-sm' : 'h-24 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isScrolled ? 'bg-primary text-secondary' : 'bg-white text-primary'}`}>
              <Scale size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
                Правовой<br/>Альянс
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? 'text-neutral-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+74951234567" 
              className={`flex items-center gap-2 font-semibold ${isScrolled ? 'text-primary' : 'text-white'}`}
            >
              <Phone size={18} className="text-secondary" />
              <span>+7 (495) 123-45-67</span>
            </a>
            <Button size="sm" variant={isScrolled ? 'primary' : 'secondary'} onClick={onOpenModal}>
              Консультация
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className={isScrolled ? 'text-primary' : 'text-white'} size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-primary/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center">
                   <Scale size={18} />
                </div>
                <span className="font-bold text-xl text-primary">Правовой Альянс</span>
             </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="text-neutral-500" size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 mb-10">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-medium text-primary hover:text-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <Button fullWidth variant="phone">
              <Phone size={18} className="mr-2" />
              Позвонить
            </Button>
            <Button fullWidth onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }}>
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};