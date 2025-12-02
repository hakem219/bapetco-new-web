// src/components/ui/Card.tsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: 'lift' | 'glow' | 'none';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = 'lift'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || hover === 'none') return;

    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      if (hover === 'lift') {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power4.out'
        });
      } else if (hover === 'glow') {
        gsap.to(card, {
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
          duration: 0.3,
          ease: 'power4.out'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: 'none',
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hover]);

  return (
    <div
      ref={cardRef}
      className={`
        glass-surface
        rounded-xl
        p-6
        transform-gpu
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;