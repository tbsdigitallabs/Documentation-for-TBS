import React from 'react';
import { cn } from '@/lib/utils';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'holographic';
  role?: 'developers' | 'designers' | 'project-managers' | 'content-creators' | 'sales-business';
}

export function HoloCard({ 
  children, 
  className,
  variant = 'default',
  role
}: HoloCardProps) {
  const variantClasses = {
    default: 'card-professional',
    glow: 'card-professional border-accent shadow-lg',
    holographic: 'card-professional border-accent shadow-lg bg-gradient-to-br from-surface-primary to-surface-secondary'
  };

  const roleClasses = {
    developers: 'border-accent-developers',
    designers: 'border-accent-designers',
    'project-managers': 'border-accent-project-managers',
    'content-creators': 'border-accent-content-creators',
    'sales-business': 'border-accent-sales-business'
  };

  return (
    <div 
      className={cn(
        variantClasses[variant],
        role && roleClasses[role],
        'relative overflow-hidden',
        className
      )}
    >
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-magenta-100 to-transparent opacity-10 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
