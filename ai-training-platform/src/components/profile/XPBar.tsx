"use client";

import { cn } from '@/lib/utils';

interface XPBarProps {
  current: number;
  max: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function XPBar({ current, max, label, sublabel, className }: XPBarProps) {
  // Handle case where max is 0 (e.g., max level) -> default to 100%
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 100;
  
  return (
    <div className={cn('space-y-2', className)}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between">
          {label && <span className="mono-label text-accent-readable-cyan">{label}</span>}
          {sublabel && <span className="mono-text text-xs text-content-secondary">{sublabel}</span>}
        </div>
      )}
      <div className="xp-bar">
        <div className="xp-bar-fill" style={{ width: `${percentage}%` }} />
        <div className="xp-bar-label">{percentage.toFixed(0)}%</div>
      </div>
    </div>
  );
}

