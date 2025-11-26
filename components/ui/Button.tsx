import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'phone';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-gold text-primary shadow-gold hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white border-2 border-secondary text-primary hover:bg-neutral-50 hover:border-secondary-dark hover:-translate-y-0.5",
    ghost: "bg-transparent text-primary hover:text-secondary hover:bg-neutral-100",
    phone: "bg-success text-white shadow-lg hover:bg-emerald-600 animate-pulse-slow"
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-14 px-8 text-base",
    lg: "h-16 px-10 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};