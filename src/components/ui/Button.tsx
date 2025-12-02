// src/components/ui/Button.tsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  onClick,
  className = '',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-[var(--color-egyptian-gold-500)] text-[var(--color-void-950)] hover:bg-[var(--color-egyptian-gold-400)]',
    secondary: 'glass-surface text-white border border-[var(--color-glass-border)]',
    ghost: 'bg-transparent text-white hover:bg-[var(--color-glass-white)]'
  };

  useGSAP(() => {
    if (!buttonRef.current || disabled) return;

    const button = buttonRef.current;
    const magnet = magnetRef.current;
    
    // Magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power4.out'
      });
      
      gsap.to(magnet, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power4.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, magnet], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg font-medium
        transition-all duration-300
        transform-gpu
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <div ref={magnetRef} className="relative inline-flex items-center justify-center">
        {children}
      </div>
      
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 rounded-lg bg-neon-gold opacity-0 hover:opacity-20 blur-xl transition-opacity duration-300" />
      )}
    </button>
  );
};

export default Button;