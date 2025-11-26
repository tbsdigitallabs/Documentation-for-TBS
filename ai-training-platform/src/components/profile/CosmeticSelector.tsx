"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { 
  CosmeticLoadout, 
  getRewardsByType,
  RANKS,
  TITLES,
  NAMEPLATES,
  TITLEBARS,
  type CosmeticType 
} from '@/lib/levelling';

interface CosmeticSelectorProps {
  level: number;
  currentLoadout: CosmeticLoadout;
  onLoadoutChange: (loadout: CosmeticLoadout) => void;
  className?: string;
}

type TabType = 'rank' | 'title' | 'nameplate' | 'titlebar' | 'frame' | 'badge' | 'effect';

const TABS: { id: TabType; label: string }[] = [
  { id: 'rank', label: 'Rank' },
  { id: 'title', label: 'Title' },
  { id: 'nameplate', label: 'Plate' },
  { id: 'titlebar', label: 'Bar' },
  { id: 'frame', label: 'Frame' },
  { id: 'badge', label: 'Badge' },
  { id: 'effect', label: 'Effect' },
];

export function CosmeticSelector({ level, currentLoadout, onLoadoutChange, className }: CosmeticSelectorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('rank');
  const [isExpanded, setIsExpanded] = useState(false);

  const getUnlockedItems = (type: TabType) => {
    switch (type) {
      case 'rank':
        return RANKS.filter(r => r.minLevel <= level);
      case 'title':
        return TITLES.filter(t => {
          if (t.source !== 'level') return false;
          const levelReqs: Record<string, number> = {
            'newcomer': 1, 'dedicated': 3, 'rising-star': 5, 'trailblazer': 7, 'mastermind': 10
          };
          return level >= (levelReqs[t.id] || 999);
        });
      case 'nameplate':
        return NAMEPLATES.filter(np => !np.unlockLevel || level >= np.unlockLevel);
      case 'titlebar':
        return TITLEBARS.filter(tb => !tb.unlockLevel || level >= tb.unlockLevel);
      default:
        return getRewardsByType(level, type as CosmeticType);
    }
  };

  const getCurrentEquipped = (type: TabType): string | undefined => {
    switch (type) {
      case 'rank': return currentLoadout.equippedRank;
      case 'title': return currentLoadout.equippedTitle;
      case 'nameplate': return currentLoadout.equippedNameplate;
      case 'titlebar': return currentLoadout.equippedTitlebar;
      case 'frame': return currentLoadout.equippedFrame;
      case 'badge': return currentLoadout.equippedBadge;
      case 'effect': return currentLoadout.equippedEffect;
      default: return undefined;
    }
  };

  const handleSelect = (type: TabType, id: string) => {
    const newLoadout = { ...currentLoadout };
    switch (type) {
      case 'rank': newLoadout.equippedRank = id; break;
      case 'title': newLoadout.equippedTitle = id === currentLoadout.equippedTitle ? undefined : id; break;
      case 'nameplate': newLoadout.equippedNameplate = id; break;
      case 'titlebar': newLoadout.equippedTitlebar = id; break;
      case 'frame': newLoadout.equippedFrame = id; break;
      case 'badge': newLoadout.equippedBadge = id === currentLoadout.equippedBadge ? undefined : id; break;
      case 'effect': newLoadout.equippedEffect = id === currentLoadout.equippedEffect ? undefined : id; break;
    }
    onLoadoutChange(newLoadout);
  };

  const items = getUnlockedItems(activeTab);
  const equippedId = getCurrentEquipped(activeTab);

  return (
    <div className={cn('', className)}>
      {/* Header Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-surface-tertiary border border-border-primary rounded-lg hover:bg-surface-hover transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-readable-magenta" />
          <span className="mono-label text-content-primary">
            Customise Appearance
          </span>
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 text-accent-readable-cyan transition-transform duration-200',
          isExpanded && 'rotate-180'
        )} />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 p-4 bg-surface-card border border-border-primary rounded-lg">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-border-primary">
            {TABS.map(tab => {
              const count = getUnlockedItems(tab.id).length;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-2.5 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'bg-accent-sage-600 text-white'
                      : 'bg-surface-tertiary text-content-primary border border-border-primary hover:bg-surface-hover'
                  )}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <div className="col-span-full text-center py-6 text-content-tertiary text-sm">
                No {activeTab}s unlocked yet
              </div>
            ) : (
              items.map((item: any) => {
                const itemId = item.id;
                const isEquipped = equippedId === itemId;
                const itemName = item.name;
                const itemDesc = item.description;
                
                return (
                  <button
                    key={itemId}
                    onClick={() => handleSelect(activeTab, itemId)}
                    className={cn(
                      'relative p-3 rounded-lg border text-left transition-all hover:scale-[1.02] cursor-pointer',
                      isEquipped
                        ? 'bg-accent-sage-100 dark:bg-accent-sage-900/40 border-accent-sage-500'
                        : 'bg-surface-tertiary border-border-primary hover:border-accent-sage-400 hover:bg-surface-hover'
                    )}
                  >
                    {isEquipped && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-accent-sage-600 dark:text-accent-sage-400" />
                      </div>
                    )}
                    <div className="text-sm font-semibold text-content-primary truncate pr-5">
                      {itemName}
                    </div>
                    <div className="text-xs text-content-secondary truncate mt-1">
                      {itemDesc}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Note */}
          <p className="mt-4 text-xs text-content-tertiary text-center">
            Changes are applied immediately
          </p>
        </div>
      )}
    </div>
  );
}
