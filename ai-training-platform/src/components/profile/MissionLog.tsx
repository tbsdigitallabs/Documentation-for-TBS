"use client";

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Mission {
  id: string;
  name: string;
  completedAt: string;
  xpEarned: number;
}

interface MissionLogProps {
  missions: Mission[];
  className?: string;
}

export function MissionLog({ missions, className }: MissionLogProps) {
  const totalXP = missions.reduce((sum, m) => sum + m.xpEarned, 0);
  
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="mono-label text-cyber-cyan flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          Mission Log
        </span>
        <span className="mono-text text-xs text-cyber-magenta">{totalXP} XP earned</span>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
        {missions.map((mission) => (
          <div key={mission.id} className="mission-log-item">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-content-primary truncate hover:text-cyber-cyan transition-colors">
                  {mission.name}
                </div>
                <div className="mono-text text-xs text-content-tertiary">
                  {new Date(mission.completedAt).toLocaleDateString('en-AU', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="mono-text text-sm font-bold text-cyber-cyan">+{mission.xpEarned}</div>
                <div className="mono-text text-xs text-content-tertiary">XP</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

