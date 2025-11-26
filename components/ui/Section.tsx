import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClass?: string;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', containerClass = '', children }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id={id} className={`py-20 lg:py-32 overflow-hidden ${className}`}>
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${containerClass}`}
      >
        {children}
      </div>
    </section>
  );
};