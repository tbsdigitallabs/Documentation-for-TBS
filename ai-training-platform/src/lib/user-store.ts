import fs from 'fs';
import path from 'path';

// File-based user storage for leaderboard
// In production, replace with database

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Excluded accounts (dev accounts)
const EXCLUDED_EMAILS = [
  'dev@tbsdigitallabs.com.au',
  'test@tbsdigitallabs.com.au',
];

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  selectedClass?: string;
  level: number;
  xp: number;
  image?: string;
  profileImage?: string;
  cosmeticLoadout?: {
    equippedFrame?: string;
    equippedEffect?: string;
    equippedBadge?: string;
    equippedNameplate?: string;
    equippedTitlebar?: string;
    equippedTitle?: string;
  };
  completedModules?: Array<{
    moduleId: string;
    moduleName: string;
    completedAt: string;
    xpEarned: number;
    quizScore?: number;
  }>;
  lastUpdated: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers(): StoredUser[] {
  ensureDataDir();
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading users file:', error);
  }
  return [];
}

function writeUsers(users: StoredUser[]) {
  ensureDataDir();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

export function upsertUser(user: Partial<StoredUser> & { email: string }) {
  const users = readUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  const updatedUser: StoredUser = {
    id: user.id || user.email,
    email: user.email,
    name: user.name || 'Anonymous',
    selectedClass: user.selectedClass,
    level: user.level || 1,
    xp: user.xp || 0,
    image: user.image,
    profileImage: user.profileImage,
    cosmeticLoadout: user.cosmeticLoadout,
    completedModules: (user as any).completedModules,
    lastUpdated: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    // Update existing user, preserving fields not provided
    users[existingIndex] = {
      ...users[existingIndex],
      ...updatedUser,
      // Keep higher XP/level if not provided
      level: user.level ?? users[existingIndex].level,
      xp: user.xp ?? users[existingIndex].xp,
    };
  } else {
    users.push(updatedUser);
  }

  writeUsers(users);
  return updatedUser;
}

export function getLeaderboard(): StoredUser[] {
  const users = readUsers();
  
  // Filter out excluded accounts and sort by XP
  return users
    .filter(user => !EXCLUDED_EMAILS.includes(user.email.toLowerCase()))
    .sort((a, b) => b.xp - a.xp);
}

export function getUserByEmail(email: string): StoredUser | null {
  const users = readUsers();
  return users.find(u => u.email === email) || null;
}

