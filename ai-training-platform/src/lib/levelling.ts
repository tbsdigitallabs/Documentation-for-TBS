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

// Map level to experience level name
export function getExperienceLevelName(level: number): string {
  if (level <= 3) return "Novice";
  if (level <= 6) return "Apprentice";
  return "Master";
}

// Cosmetic rewards for avatar at each level
export interface CosmeticReward {
  level: number;
  name: string;
  description: string;
  type: 'frame' | 'badge' | 'effect' | 'background';
}

export const COSMETIC_REWARDS: CosmeticReward[] = [
  { level: 1, name: "Starter Frame", description: "Basic avatar frame", type: 'frame' },
  { level: 2, name: "Bronze Badge", description: "Bronze achievement badge", type: 'badge' },
  { level: 3, name: "Glow Effect", description: "Subtle glow around avatar", type: 'effect' },
  { level: 4, name: "Silver Badge", description: "Silver achievement badge", type: 'badge' },
  { level: 5, name: "Gradient Background", description: "Colourful gradient background", type: 'background' },
  { level: 6, name: "Gold Badge", description: "Gold achievement badge", type: 'badge' },
  { level: 7, name: "Animated Frame", description: "Animated border effect", type: 'frame' },
  { level: 8, name: "Platinum Badge", description: "Platinum achievement badge", type: 'badge' },
  { level: 9, name: "Particle Effect", description: "Magical particle effects", type: 'effect' },
  { level: 10, name: "Legendary Crown", description: "Exclusive legendary crown", type: 'badge' },
];

// Get unlocked rewards for a level
export function getUnlockedRewards(level: number): CosmeticReward[] {
  return COSMETIC_REWARDS.filter(reward => reward.level <= level);
}

// Get next reward
export function getNextReward(level: number): CosmeticReward | null {
  if (level >= MAX_LEVEL) return null;
  return COSMETIC_REWARDS.find(reward => reward.level === level + 1) || null;
}

