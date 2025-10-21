'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeonDividerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  animated?: boolean;
  color?: 'magenta' | 'sage' | 'brand';
}

export function NeonDivider({ 
  className,
  variant = 'horizontal',
  animated = true,
  color = 'brand'
}: NeonDividerProps) {
  const colorClasses = {
    magenta: 'border-accent-magenta-500',
    sage: 'border-accent-sage-500',
    brand: 'border-gradient-to-r from-accent-magenta-500 to-accent-sage-500'
  };

  const variantClasses = {
    horizontal: 'w-full h-px',
    vertical: 'h-full w-px'
  };

  return (
    <div 
      className={cn(
        'relative',
        variantClasses[variant],
        colorClasses[color],
        animated && 'neon-divider-animated',
        className
      )}
    >
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
      )}
    </div>
  );
}
