"use client";

import { cn } from '@/lib/utils';

interface LevelPathProps {
  currentLevel: number;
  maxLevel?: number;
  rewards?: { level: number; name: string }[];
  xpThresholds?: Record<number, number>;
  className?: string;
}

export function LevelPath({ 
  currentLevel, 
  maxLevel = 10, 
  rewards = [],
  xpThresholds = {},
  className 
}: LevelPathProps) {
  const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);
  
  return (
    <div className={cn('space-y-3', className)}>
      <div className="mono-label text-accent-readable-cyan">Level Path</div>
      <div className="flex items-center gap-1">
        {levels.map((level) => {
          const isUnlocked = level <= currentLevel;
          const isCurrent = level === currentLevel;
          const reward = rewards.find(r => r.level === level);
          
          return (
            <div key={level} className="relative group flex-1">
              <div className={cn(
                'level-pip',
                isCurrent && 'level-pip-current',
                !isCurrent && isUnlocked && 'level-pip-unlocked',
                !isCurrent && !isUnlocked && 'level-pip-locked'
              )}>
                {level}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-card border border-border-primary rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="text-content-primary font-medium">{reward?.name || `Level ${level}`}</div>
                <div className="text-content-tertiary">{xpThresholds[level] || 0} XP</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

