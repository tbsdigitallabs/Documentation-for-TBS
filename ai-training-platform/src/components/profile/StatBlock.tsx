"use client";

import { cn } from '@/lib/utils';

interface StatBlockProps {
  value: string | number;
  label: string;
  color?: 'cyan' | 'magenta';
  className?: string;
}

export function StatBlock({ value, label, color = 'cyan', className }: StatBlockProps) {
  const colorClasses = {
    cyan: {
      text: 'text-accent-sage-700 dark:text-accent-sage-400',
      border: 'border-accent-sage-300 dark:border-accent-sage-500/30'
    },
    magenta: {
      text: 'text-accent-magenta-700 dark:text-accent-magenta-400',
      border: 'border-accent-magenta-300 dark:border-accent-magenta-500/30'
    }
  };
  
  return (
    <div className={cn('stat-block', colorClasses[color].border, className)}>
      <div className={cn('stat-block-value', colorClasses[color].text)}>
        {value}
      </div>
      <div className="stat-block-label">{label}</div>
    </div>
  );
}
