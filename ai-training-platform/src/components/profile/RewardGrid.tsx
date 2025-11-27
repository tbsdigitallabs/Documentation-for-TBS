"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Reward {
  id?: string;
  level: number;
  name: string;
  description?: string;
  type?: string;
  rarity?: string;
}

interface RewardGridProps {
  rewards: Reward[];
  title?: string;
  className?: string;
}

export function RewardGrid({ rewards, title = 'Unlocked Rewards', className }: RewardGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn('space-y-3', className)}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full group cursor-pointer"
      >
        <div className="mono-label text-accent-readable-cyan group-hover:text-accent-readable-cyan/80 transition-colors">
          {title} ({rewards.length})
        </div>
        <ChevronDown className={cn("w-4 h-4 text-accent-readable-cyan transition-transform duration-200", isExpanded && "rotate-180")} />
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in slide-in-from-top-2 duration-200">
          {rewards.map((reward, index) => (
            <div 
              key={reward.id || `${reward.level}-${reward.name}-${index}`} 
              className="reward-chip group" 
              title={reward.description}
            >
              <div className="mono-text text-xs text-accent-readable-cyan font-semibold mb-1">Lv.{reward.level}</div>
              <div className="text-xs text-content-primary truncate">{reward.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
