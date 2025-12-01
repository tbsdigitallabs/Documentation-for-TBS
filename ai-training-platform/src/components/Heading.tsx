import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg';
}

export function Heading({ 
  children, 
  className, 
  level = 1,
  size 
}: HeadingProps) {
  const Component = `h${level}` as React.ElementType;
  
  const sizeClasses = {
    sm: level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl',
    md: level === 1 ? 'text-4xl' : level === 2 ? 'text-3xl' : 'text-2xl',
    lg: level === 1 ? 'text-5xl' : level === 2 ? 'text-4xl' : 'text-3xl'
  };

  const defaultSizeClasses = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-semibold', 
    3: 'text-2xl font-semibold'
  };

  return (
    <Component 
      className={cn(
        'font-heading text-content-primary',
        size ? sizeClasses[size] : defaultSizeClasses[level],
        className
      )}
    >
      {children}
    </Component>
  );
}