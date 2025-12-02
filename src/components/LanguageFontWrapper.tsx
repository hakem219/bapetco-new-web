// src/components/LanguageFontWrapper.tsx
import React, { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageFontWrapperProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const LanguageFontWrapper: React.FC<LanguageFontWrapperProps> = ({ 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const getFontClass = () => {
    if (isRTL) {
      return variant === 'primary' 
        ? 'font-[family:var(--font-ar-primary)]' 
        : 'font-[family:var(--font-ar-secondary)]';
    }
    return variant === 'primary' 
      ? 'font-[family:var(--font-en-primary)]' 
      : 'font-[family:var(--font-en-secondary)]';
  };

  return (
    <div className={`${getFontClass()} ${className}`}>
      {children}
    </div>
  );
};

export default LanguageFontWrapper;