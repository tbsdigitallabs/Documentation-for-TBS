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
    cyan: 'text-cyber-cyan border-cyber-cyan/30',
    magenta: 'text-cyber-magenta border-cyber-magenta/30'
  };
  
  return (
    <div className={cn('stat-block', colorClasses[color], className)}>
      <div className={cn('stat-block-value', colorClasses[color].split(' ')[0])}>
        {value}
      </div>
      <div className="stat-block-label">{label}</div>
    </div>
  );
}

