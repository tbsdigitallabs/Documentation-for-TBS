// XP thresholds for each level
export const XP_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 3500,
  8: 5000,
  9: 7500,
  10: 10000,
};

// Maximum level
export const MAX_LEVEL = 10;

// Calculate level from XP
export function calculateLevel(xp: number): number {
  let level = 1;
  for (let lvl = 1; lvl <= MAX_LEVEL; lvl++) {
    if (xp >= XP_THRESHOLDS[lvl]) {
      level = lvl;
    } else {
      break;
    }
  }
  return level;
}

// Get XP needed for next level
export function getXPForNextLevel(currentXP: number, currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  const nextThreshold = XP_THRESHOLDS[nextLevel] || 0;
  return Math.max(0, nextThreshold - currentXP);
}

// Get XP progress for current level (0-1)
export function getLevelProgress(currentXP: number, currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return 1;
  
  const currentThreshold = XP_THRESHOLDS[currentLevel] || 0;
  const nextThreshold = XP_THRESHOLDS[currentLevel + 1] || currentThreshold;
  const progressXP = currentXP - currentThreshold;
  const levelRange = nextThreshold - currentThreshold;
  
  return levelRange > 0 ? Math.min(1, progressXP / levelRange) : 0;
}

// ===== RANKS SYSTEM =====
// Ranks are earned through levelling up
export interface Rank {
  id: string;
  name: string;
  description: string;
  minLevel: number;
  cssClass: string;
}

export const RANKS: Rank[] = [
  { id: 'initiate', name: 'Initiate', description: 'Just getting started', minLevel: 1, cssClass: 'rank-initiate' },
  { id: 'rookie', name: 'Rookie', description: 'Learning the ropes', minLevel: 2, cssClass: 'rank-rookie' },
  { id: 'operative', name: 'Operative', description: 'Competent and capable', minLevel: 3, cssClass: 'rank-operative' },
  { id: 'specialist', name: 'Specialist', description: 'Skilled in your craft', minLevel: 4, cssClass: 'rank-specialist' },
  { id: 'veteran', name: 'Veteran', description: 'Battle-tested professional', minLevel: 5, cssClass: 'rank-veteran' },
  { id: 'elite', name: 'Elite', description: 'Top-tier performer', minLevel: 6, cssClass: 'rank-elite' },
  { id: 'expert', name: 'Expert', description: 'Master of your domain', minLevel: 7, cssClass: 'rank-expert' },
  { id: 'commander', name: 'Commander', description: 'Leading by example', minLevel: 8, cssClass: 'rank-commander' },
  { id: 'legend', name: 'Legend', description: 'Your name is known', minLevel: 9, cssClass: 'rank-legend' },
  { id: 'apex', name: 'Apex', description: 'The pinnacle of achievement', minLevel: 10, cssClass: 'rank-apex' },
];

export function getRankForLevel(level: number): Rank {
  const eligibleRanks = RANKS.filter(r => r.minLevel <= level);
  return eligibleRanks[eligibleRanks.length - 1] || RANKS[0];
}

export function getUnlockedRanks(level: number): Rank[] {
  return RANKS.filter(r => r.minLevel <= level);
}

// Legacy function - maps to rank name
export function getExperienceLevelName(level: number): string {
  return getRankForLevel(level).name;
}

// ===== TITLES SYSTEM =====
// Titles are special achievements that can be displayed
export type TitleSource = 'level' | 'achievement' | 'event' | 'custom';

export interface Title {
  id: string;
  name: string;
  description: string;
  source: TitleSource;
  requirement?: string; // How to unlock (for display)
  cssClass: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export const TITLES: Title[] = [
  // Level-based titles
  { id: 'newcomer', name: 'Newcomer', description: 'Welcome to the platform', source: 'level', requirement: 'Reach Level 1', cssClass: 'title-newcomer', rarity: 'common' },
  { id: 'dedicated', name: 'Dedicated', description: 'Showing commitment', source: 'level', requirement: 'Reach Level 3', cssClass: 'title-dedicated', rarity: 'common' },
  { id: 'rising-star', name: 'Rising Star', description: 'On the path to greatness', source: 'level', requirement: 'Reach Level 5', cssClass: 'title-rising-star', rarity: 'uncommon' },
  { id: 'trailblazer', name: 'Trailblazer', description: 'Forging new paths', source: 'level', requirement: 'Reach Level 7', cssClass: 'title-trailblazer', rarity: 'rare' },
  { id: 'mastermind', name: 'Mastermind', description: 'Peak performance achieved', source: 'level', requirement: 'Reach Level 10', cssClass: 'title-mastermind', rarity: 'legendary' },
  
  // Achievement-based titles
  { id: 'first-blood', name: 'First Blood', description: 'Completed your first module', source: 'achievement', requirement: 'Complete 1 module', cssClass: 'title-first-blood', rarity: 'common' },
  { id: 'scholar', name: 'Scholar', description: 'Knowledge seeker', source: 'achievement', requirement: 'Complete 5 modules', cssClass: 'title-scholar', rarity: 'uncommon' },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Aced a quiz with 100%', source: 'achievement', requirement: 'Score 100% on any quiz', cssClass: 'title-perfectionist', rarity: 'rare' },
  { id: 'completionist', name: 'Completionist', description: 'Finished all modules in a track', source: 'achievement', requirement: 'Complete all modules in one track', cssClass: 'title-completionist', rarity: 'epic' },
  
  // Event titles (for future seasonal events)
  { id: 'early-adopter', name: 'Early Adopter', description: 'Joined during launch', source: 'event', requirement: 'Join during platform launch', cssClass: 'title-early-adopter', rarity: 'rare' },
  
  // Custom titles (awarded manually)
  { id: 'founder', name: 'Founder', description: 'Platform creator', source: 'custom', cssClass: 'title-founder', rarity: 'legendary' },
  { id: 'contributor', name: 'Contributor', description: 'Helped build the platform', source: 'custom', cssClass: 'title-contributor', rarity: 'epic' },
];

export function getTitleById(id: string): Title | undefined {
  return TITLES.find(t => t.id === id);
}

export function getTitlesForLevel(level: number): Title[] {
  const levelRequirements: Record<string, number> = {
    'newcomer': 1,
    'dedicated': 3,
    'rising-star': 5,
    'trailblazer': 7,
    'mastermind': 10,
  };
  
  return TITLES.filter(t => {
    if (t.source !== 'level') return false;
    const reqLevel = levelRequirements[t.id] || 999;
    return level >= reqLevel;
  });
}

// ===== NAMEPLATES SYSTEM =====
// Nameplates are visual styles for displaying the user's name
export interface Nameplate {
  id: string;
  name: string;
  description: string;
  cssClass: string;
  unlockLevel?: number;
  unlockRequirement?: string;
}

export const NAMEPLATES: Nameplate[] = [
  { id: 'default', name: 'Standard', description: 'Default nameplate', cssClass: 'nameplate-default', unlockLevel: 1 },
  { id: 'bronze', name: 'Bronze', description: 'Bronze-trimmed nameplate', cssClass: 'nameplate-bronze', unlockLevel: 2 },
  { id: 'silver', name: 'Silver', description: 'Silver-trimmed nameplate', cssClass: 'nameplate-silver', unlockLevel: 4 },
  { id: 'gold', name: 'Gold', description: 'Gold-trimmed nameplate', cssClass: 'nameplate-gold', unlockLevel: 6 },
  { id: 'platinum', name: 'Platinum', description: 'Platinum-trimmed nameplate', cssClass: 'nameplate-platinum', unlockLevel: 8 },
  { id: 'legendary', name: 'Legendary', description: 'Legendary animated nameplate', cssClass: 'nameplate-legendary', unlockLevel: 10 },
  { id: 'cyber', name: 'Cyber', description: 'Cyberpunk-styled nameplate', cssClass: 'nameplate-cyber', unlockRequirement: 'Complete all Netrunner modules' },
  { id: 'neon', name: 'Neon', description: 'Glowing neon nameplate', cssClass: 'nameplate-neon', unlockRequirement: 'Complete all Artisan modules' },
];

export function getUnlockedNameplates(level: number, completedTracks: string[] = []): Nameplate[] {
  return NAMEPLATES.filter(np => {
    if (np.unlockLevel && level >= np.unlockLevel) return true;
    // Special unlock conditions can be checked here
    if (np.id === 'cyber' && completedTracks.includes('developers')) return true;
    if (np.id === 'neon' && completedTracks.includes('designers')) return true;
    return false;
  });
}

// ===== TITLEBARS SYSTEM =====
// Titlebars are banners/bars that display above or below the user's name
export interface Titlebar {
  id: string;
  name: string;
  description: string;
  cssClass: string;
  unlockLevel?: number;
  unlockRequirement?: string;
}

export const TITLEBARS: Titlebar[] = [
  { id: 'none', name: 'None', description: 'No titlebar', cssClass: 'titlebar-none', unlockLevel: 1 },
  { id: 'simple', name: 'Simple', description: 'Clean, minimal titlebar', cssClass: 'titlebar-simple', unlockLevel: 2 },
  { id: 'gradient', name: 'Gradient', description: 'Gradient background titlebar', cssClass: 'titlebar-gradient', unlockLevel: 4 },
  { id: 'tech', name: 'Tech', description: 'Circuit-pattern titlebar', cssClass: 'titlebar-tech', unlockLevel: 6 },
  { id: 'holographic', name: 'Holographic', description: 'Animated holographic titlebar', cssClass: 'titlebar-holographic', unlockLevel: 8 },
  { id: 'apex', name: 'Apex', description: 'Ultimate prestige titlebar', cssClass: 'titlebar-apex', unlockLevel: 10 },
];

export function getUnlockedTitlebars(level: number): Titlebar[] {
  return TITLEBARS.filter(tb => !tb.unlockLevel || level >= tb.unlockLevel);
}

// ===== COSMETIC REWARDS (Legacy + Extended) =====
export type CosmeticType = 'frame' | 'badge' | 'effect' | 'background' | 'rank' | 'title' | 'nameplate' | 'titlebar';

export interface CosmeticReward {
  id: string;
  level: number;
  name: string;
  description: string;
  type: CosmeticType;
  cssClass?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export const COSMETIC_REWARDS: CosmeticReward[] = [
  // Level 1
  { id: 'frame-starter', level: 1, name: 'Starter Frame', description: 'Basic avatar frame', type: 'frame', cssClass: 'cosmetic-frame-starter', rarity: 'common' },
  { id: 'rank-initiate', level: 1, name: 'Initiate Rank', description: 'Your first rank', type: 'rank', rarity: 'common' },
  { id: 'nameplate-default', level: 1, name: 'Standard Nameplate', description: 'Default nameplate', type: 'nameplate', rarity: 'common' },
  
  // Level 2
  { id: 'badge-bronze', level: 2, name: 'Bronze Badge', description: 'Bronze achievement badge', type: 'badge', cssClass: 'cosmetic-badge-bronze', rarity: 'common' },
  { id: 'rank-rookie', level: 2, name: 'Rookie Rank', description: 'Learning the ropes', type: 'rank', rarity: 'common' },
  { id: 'nameplate-bronze', level: 2, name: 'Bronze Nameplate', description: 'Bronze-trimmed nameplate', type: 'nameplate', rarity: 'common' },
  { id: 'titlebar-simple', level: 2, name: 'Simple Titlebar', description: 'Clean, minimal titlebar', type: 'titlebar', rarity: 'common' },
  
  // Level 3
  { id: 'effect-glow', level: 3, name: 'Glow Effect', description: 'Subtle glow around avatar', type: 'effect', cssClass: 'cosmetic-effect-glow', rarity: 'uncommon' },
  { id: 'rank-operative', level: 3, name: 'Operative Rank', description: 'Competent and capable', type: 'rank', rarity: 'uncommon' },
  { id: 'title-dedicated', level: 3, name: 'Dedicated Title', description: 'Shows your commitment', type: 'title', rarity: 'uncommon' },
  
  // Level 4
  { id: 'badge-silver', level: 4, name: 'Silver Badge', description: 'Silver achievement badge', type: 'badge', cssClass: 'cosmetic-badge-silver', rarity: 'uncommon' },
  { id: 'rank-specialist', level: 4, name: 'Specialist Rank', description: 'Skilled in your craft', type: 'rank', rarity: 'uncommon' },
  { id: 'nameplate-silver', level: 4, name: 'Silver Nameplate', description: 'Silver-trimmed nameplate', type: 'nameplate', rarity: 'uncommon' },
  { id: 'titlebar-gradient', level: 4, name: 'Gradient Titlebar', description: 'Gradient background', type: 'titlebar', rarity: 'uncommon' },
  
  // Level 5
  { id: 'bg-gradient', level: 5, name: 'Gradient Background', description: 'Colourful gradient background', type: 'background', cssClass: 'cosmetic-bg-gradient', rarity: 'rare' },
  { id: 'rank-veteran', level: 5, name: 'Veteran Rank', description: 'Battle-tested professional', type: 'rank', rarity: 'rare' },
  { id: 'title-rising-star', level: 5, name: 'Rising Star Title', description: 'On the path to greatness', type: 'title', rarity: 'rare' },
  
  // Level 6
  { id: 'badge-gold', level: 6, name: 'Gold Badge', description: 'Gold achievement badge', type: 'badge', cssClass: 'cosmetic-badge-gold', rarity: 'rare' },
  { id: 'rank-elite', level: 6, name: 'Elite Rank', description: 'Top-tier performer', type: 'rank', rarity: 'rare' },
  { id: 'nameplate-gold', level: 6, name: 'Gold Nameplate', description: 'Gold-trimmed nameplate', type: 'nameplate', rarity: 'rare' },
  { id: 'titlebar-tech', level: 6, name: 'Tech Titlebar', description: 'Circuit-pattern design', type: 'titlebar', rarity: 'rare' },
  
  // Level 7
  { id: 'frame-animated', level: 7, name: 'Animated Frame', description: 'Animated border effect', type: 'frame', cssClass: 'cosmetic-frame-animated', rarity: 'epic' },
  { id: 'rank-expert', level: 7, name: 'Expert Rank', description: 'Master of your domain', type: 'rank', rarity: 'epic' },
  { id: 'title-trailblazer', level: 7, name: 'Trailblazer Title', description: 'Forging new paths', type: 'title', rarity: 'epic' },
  
  // Level 8
  { id: 'badge-platinum', level: 8, name: 'Platinum Badge', description: 'Platinum achievement badge', type: 'badge', cssClass: 'cosmetic-badge-platinum', rarity: 'epic' },
  { id: 'rank-commander', level: 8, name: 'Commander Rank', description: 'Leading by example', type: 'rank', rarity: 'epic' },
  { id: 'nameplate-platinum', level: 8, name: 'Platinum Nameplate', description: 'Platinum-trimmed nameplate', type: 'nameplate', rarity: 'epic' },
  { id: 'titlebar-holographic', level: 8, name: 'Holographic Titlebar', description: 'Animated holographic design', type: 'titlebar', rarity: 'epic' },
  
  // Level 9
  { id: 'effect-particles', level: 9, name: 'Particle Effect', description: 'Magical particle effects', type: 'effect', cssClass: 'cosmetic-effect-particles', rarity: 'legendary' },
  { id: 'rank-legend', level: 9, name: 'Legend Rank', description: 'Your name is known', type: 'rank', rarity: 'legendary' },
  
  // Level 10
  { id: 'badge-crown', level: 10, name: 'Legendary Crown', description: 'Exclusive legendary crown', type: 'badge', cssClass: 'cosmetic-badge-crown', rarity: 'legendary' },
  { id: 'rank-apex', level: 10, name: 'Apex Rank', description: 'The pinnacle of achievement', type: 'rank', rarity: 'legendary' },
  { id: 'nameplate-legendary', level: 10, name: 'Legendary Nameplate', description: 'Animated legendary nameplate', type: 'nameplate', rarity: 'legendary' },
  { id: 'titlebar-apex', level: 10, name: 'Apex Titlebar', description: 'Ultimate prestige titlebar', type: 'titlebar', rarity: 'legendary' },
  { id: 'title-mastermind', level: 10, name: 'Mastermind Title', description: 'Peak performance achieved', type: 'title', rarity: 'legendary' },
];

// Get unlocked rewards for a level
export function getUnlockedRewards(level: number): CosmeticReward[] {
  return COSMETIC_REWARDS.filter(reward => reward.level <= level);
}

// Get rewards by type
export function getRewardsByType(level: number, type: CosmeticType): CosmeticReward[] {
  return COSMETIC_REWARDS.filter(r => r.level <= level && r.type === type);
}

// Get next reward
export function getNextReward(level: number): CosmeticReward | null {
  if (level >= MAX_LEVEL) return null;
  const nextLevelRewards = COSMETIC_REWARDS.filter(r => r.level === level + 1);
  return nextLevelRewards[0] || null;
}

// Get all rewards unlocking at next level
export function getNextLevelRewards(level: number): CosmeticReward[] {
  if (level >= MAX_LEVEL) return [];
  return COSMETIC_REWARDS.filter(r => r.level === level + 1);
}

// ===== USER COSMETIC LOADOUT =====
// Interface for what cosmetics a user has equipped
export interface CosmeticLoadout {
  equippedTitle?: string;      // Title ID
  equippedRank?: string;       // Rank ID (usually auto from level)
  equippedNameplate?: string;  // Nameplate ID
  equippedTitlebar?: string;   // Titlebar ID
  equippedFrame?: string;      // Frame ID
  equippedBadge?: string;      // Badge ID
  equippedEffect?: string;     // Effect ID
  equippedBackground?: string; // Background ID
}

export const DEFAULT_LOADOUT: CosmeticLoadout = {
  equippedTitle: undefined,
  equippedRank: 'initiate',
  equippedNameplate: 'default',
  equippedTitlebar: 'none',
  equippedFrame: 'frame-starter',
  equippedBadge: undefined,
  equippedEffect: undefined,
  equippedBackground: undefined,
};
