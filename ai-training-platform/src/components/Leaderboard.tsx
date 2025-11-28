"use client";

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import Link from 'next/link';
import { AvatarFrame } from '@/components/profile';

interface LeaderboardUser {
  id: string;
  name: string;
  email: string;
  selectedClass: string;
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
}

export function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 1:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 2:
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return <Star className="w-3 h-3 text-content-tertiary" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-surface-card border border-border-primary rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-accent-readable-cyan" />
          <span className="mono-label text-accent-readable-cyan">Leaderboard</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-surface-tertiary/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-surface-card border border-border-primary rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-accent-readable-cyan" />
          <span className="mono-label text-accent-readable-cyan">Leaderboard</span>
        </div>
        <p className="text-sm text-content-secondary text-center py-4">
          No operatives ranked yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border border-border-primary rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-accent-readable-cyan" />
        <span className="mono-label text-accent-readable-cyan">Leaderboard</span>
      </div>
      <div className="space-y-2">
        {users.slice(0, 10).map((user, index) => {
          const displayImage = user.profileImage || user.image;
          const frameStyle = user.cosmeticLoadout?.equippedFrame?.replace('frame-', '') as any || 'starter';
          const effectStyle = user.cosmeticLoadout?.equippedEffect?.replace('effect-', '');
          
          return (
            <Link
              key={user.id}
              href={`/profile?user=${encodeURIComponent(user.email)}`}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
                index < 3 ? 'bg-surface-tertiary/50' : 'hover:bg-surface-tertiary/30'
              }`}
            >
              <div className="flex items-center justify-center w-6">
                {getRankIcon(index)}
              </div>
              <div className="flex-shrink-0 w-10 h-10">
                <AvatarFrame
                  src={displayImage}
                  alt={user.name || 'Avatar'}
                  size="sm"
                  frameStyle={frameStyle}
                  effectStyle={effectStyle}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-content-primary truncate">
                  {user.name || 'Anonymous'}
                </p>
                <p className="text-xs text-content-tertiary truncate">
                  {user.selectedClass || 'Unassigned'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-accent-readable-cyan">
                  Lv.{user.level || 1}
                </p>
                <p className="text-[10px] text-content-tertiary">
                  {user.xp || 0} XP
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

