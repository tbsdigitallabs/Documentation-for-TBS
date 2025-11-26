"use client";

import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface NextRewardProps {
  level: number;
  name: string;
  description: string;
  xpRequired: number;
  className?: string;
}

export function NextReward({ level, name, description, xpRequired, className }: NextRewardProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border',
      'bg-gradient-to-r from-cyber-magenta/10 to-cyber-cyan/10',
      'border-cyber-magenta/30',
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-cyber-magenta" />
        <span className="mono-label text-cyber-magenta">Next Unlock</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-content-primary font-semibold">{name}</div>
          <div className="text-sm text-content-secondary">{description}</div>
        </div>
        <div className="text-right">
          <div className="mono-text text-lg font-bold text-cyber-magenta">Lv.{level}</div>
          <div className="mono-text text-xs text-content-tertiary">{xpRequired} XP</div>
        </div>
      </div>
    </div>
  );
}

