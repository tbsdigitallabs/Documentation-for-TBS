import React from 'react';
import { cn } from '@/lib/utils';

interface HUDFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'grid';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function HUDFrame({ 
  children, 
  className,
  variant = 'default',
  intensity = 'subtle'
}: HUDFrameProps) {
  const variantClasses = {
    default: 'border border-border-primary',
    glow: 'border border-accent shadow-lg',
    grid: 'border border-border-primary bg-tech-grid-subtle'
  };

  const intensityClasses = {
    subtle: 'shadow-sm',
    medium: 'shadow-md',
    strong: 'shadow-lg'
  };

  return (
    <div 
      className={cn(
        'card-professional',
        variantClasses[variant],
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
}
