// src/components/ui/StatCard.tsx
import React from 'react';
import LanguageFontWrapper from '../LanguageFontWrapper';

interface StatCardProps {
  number: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, className = '' }) => {
  return (
    <div className={`glass-surface rounded-lg p-6 text-center ${className}`}>
      <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
        <LanguageFontWrapper variant="secondary">
          {number}
        </LanguageFontWrapper>
      </div>
      <div className="text-sm text-gray-400">
        <LanguageFontWrapper>
          {label}
        </LanguageFontWrapper>
      </div>
    </div>
  );
};

export default StatCard;