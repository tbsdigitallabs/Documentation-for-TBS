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
    <div className={cn('cosmetic-selector', className)}>
      {/* Header Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cosmetic-selector-header"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--color-light-magenta)]" />
          <span className="mono-label text-[var(--color-text-primary)]">
            Customise Appearance
          </span>
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 text-[var(--color-sage)] transition-transform duration-200',
          isExpanded && 'rotate-180'
        )} />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="cosmetic-selector-content">
          {/* Tabs */}
          <div className="cosmetic-selector-tabs">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'cosmetic-tab',
                    isActive && 'cosmetic-tab-active'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Items Grid */}
          <div className="cosmetic-items-grid">
            {items.length === 0 ? (
              <div className="cosmetic-empty-state">
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
                      'cosmetic-item',
                      isEquipped && 'cosmetic-item-selected'
                    )}
                  >
                    {isEquipped && (
                      <div className="cosmetic-item-check">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <div className="cosmetic-item-name">
                      {itemName}
                    </div>
                    <div className="cosmetic-item-desc">
                      {itemDesc}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Note */}
          <p className="cosmetic-footer">
            Changes are applied immediately
          </p>
        </div>
      )}
    </div>
  );
}
