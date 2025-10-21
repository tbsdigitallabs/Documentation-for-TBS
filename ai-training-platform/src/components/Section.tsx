import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  background?: 'primary' | 'secondary' | 'tertiary' | 'hero' | 'card';
}

export function Section({ 
  children, 
  className, 
  size = 'md',
  background = 'primary' 
}: SectionProps) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-16', 
    lg: 'py-24'
  };

  const backgroundClasses = {
    primary: 'bg-surface-primary',
    secondary: 'bg-surface-secondary',
    tertiary: 'bg-surface-tertiary',
    hero: 'bg-surface-hero',
    card: 'bg-surface-card'
  };

  return (
    <section 
      className={cn(
        sizeClasses[size],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}