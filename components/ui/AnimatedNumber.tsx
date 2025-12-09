import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatter?: (val: number) => string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  duration = 2000, 
  formatter = (val) => val.toLocaleString('ru-RU'),
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Reset and restart animation when value changes
    setDisplayValue(0);
    setAnimationKey(prev => prev + 1);
  }, [value]);

  useEffect(() => {
    if (isVisible) {
      let startTime: number | null = null;
      let animationFrameId: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setDisplayValue(Math.floor(easeProgress * value));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isVisible, value, duration, animationKey]);

  return (
    <span ref={ref} className={className}>
      {formatter(displayValue)}
    </span>
  );
};