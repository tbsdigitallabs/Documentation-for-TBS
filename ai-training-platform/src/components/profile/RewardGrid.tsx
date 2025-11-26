"use client";

import { cn } from '@/lib/utils';

interface Reward {
  level: number;
  name: string;
  description?: string;
}

interface RewardGridProps {
  rewards: Reward[];
  title?: string;
  className?: string;
}

export function RewardGrid({ rewards, title = 'Unlocked Rewards', className }: RewardGridProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="mono-label text-accent-readable-cyan">
        {title} ({rewards.length})
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {rewards.map((reward) => (
          <div key={reward.level} className="reward-chip group" title={reward.description}>
            <div className="mono-text text-xs text-accent-readable-cyan font-semibold mb-1">Lv.{reward.level}</div>
            <div className="text-xs text-content-primary truncate">{reward.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

