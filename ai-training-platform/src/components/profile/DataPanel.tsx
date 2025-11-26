"use client";

import { cn } from '@/lib/utils';

interface DataPanelProps {
  label: string;
  children: React.ReactNode;
  variant?: 'cyan' | 'magenta' | 'muted';
  className?: string;
}

export function DataPanel({ label, children, variant = 'cyan', className }: DataPanelProps) {
  const variantClasses = {
    cyan: 'data-panel',
    magenta: 'data-panel data-panel-magenta',
    muted: 'data-panel data-panel-muted'
  };
  
  return (
    <div className={cn(variantClasses[variant], className)}>
      <div className="data-label">{label}</div>
      <div className="text-content-primary">{children}</div>
    </div>
  );
}

