import React from 'react';
import { cn } from '@/lib/utils';

interface CharacterSheetProps {
  children: React.ReactNode;
  className?: string;
}

export function CharacterSheet({ children, className }: CharacterSheetProps) {
  return (
    <div className={cn('char-sheet', className)}>
      <div className="char-sheet-accent-bar" />
      {children}
      <div className="char-sheet-accent-bar" />
    </div>
  );
}

interface CharacterSheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CharacterSheetHeader({ children, className }: CharacterSheetHeaderProps) {
  return (
    <div className={cn('char-sheet-header', className)}>
      {children}
    </div>
  );
}

interface CharacterSheetBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CharacterSheetBody({ children, className }: CharacterSheetBodyProps) {
  return (
    <div className={cn('grid grid-cols-12 gap-0', className)}>
      {children}
    </div>
  );
}

interface CharacterSheetColumnProps {
  children: React.ReactNode;
  span?: number;
  className?: string;
  border?: 'right' | 'left' | 'none';
}

export function CharacterSheetColumn({ 
  children, 
  span = 4, 
  className,
  border = 'none'
}: CharacterSheetColumnProps) {
  const borderClass = {
    right: 'lg:border-r border-b lg:border-b-0 border-[color-mix(in_srgb,var(--color-sage)_20%,transparent)]',
    left: 'lg:border-l border-t lg:border-t-0 border-[color-mix(in_srgb,var(--color-sage)_20%,transparent)]',
    none: ''
  };
  
  return (
    <div className={cn(
      `col-span-12 lg:col-span-${span} p-6`,
      borderClass[border],
      className
    )}>
      {children}
    </div>
  );
}

