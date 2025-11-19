<?php

namespace App\Services;

use App\Models\User;

class XPService
{
    private const XP_THRESHOLDS = [
        1 => 0,
        2 => 100,
        3 => 250,
        4 => 500,
        5 => 1000,
        6 => 2000,
        7 => 3500,
        8 => 5000,
        9 => 7500,
        10 => 10000,
    ];

    public function awardXP(string $userId, int $amount, string $activityType): void
    {
        $user = User::findOrFail($userId);
        $user->xp += $amount;
        $user->save();

        $this->updateUserLevel($userId);
    }

    public function updateUserLevel(string $userId): void
    {
        $user = User::findOrFail($userId);
        $newLevel = $this->calculateLevel($user->xp);

        if ($newLevel > $user->level) {
            $user->level = $newLevel;
            $user->save();
        }
    }

    public function calculateLevel(int $xp): int
    {
        $level = 1;
        foreach (self::XP_THRESHOLDS as $lvl => $threshold) {
            if ($xp >= $threshold) {
                $level = $lvl;
            } else {
                break;
            }
        }
        return $level;
    }

    public function getXPForNextLevel(int $currentXP, int $currentLevel): int
    {
        $nextLevel = $currentLevel + 1;
        $nextThreshold = self::XP_THRESHOLDS[$nextLevel] ?? 0;
        return max(0, $nextThreshold - $currentXP);
    }
}

