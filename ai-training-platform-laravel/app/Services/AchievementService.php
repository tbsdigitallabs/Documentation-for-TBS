<?php

namespace App\Services;

use App\Models\Achievement;
use App\Models\User;

class AchievementService
{
    public function awardAchievement(string $userId, string $title, string $description, string $icon): Achievement
    {
        return Achievement::create([
            'id' => uniqid('ach_'),
            'user_id' => $userId,
            'title' => $title,
            'description' => $description,
            'icon' => $icon,
            'unlocked_at' => now(),
        ]);
    }

    public function getUserAchievements(string $userId): array
    {
        return Achievement::where('user_id', $userId)
            ->orderBy('unlocked_at', 'desc')
            ->get()
            ->toArray();
    }

    public function checkAndAwardAchievements(string $userId): void
    {
        $user = User::findOrFail($userId);
        
        // First module completed
        $completedModules = $user->progress()->where('completed', true)->count();
        if ($completedModules === 1) {
            $this->awardIfNotExists($userId, 'First Steps', 'Completed your first training module', '🎯');
        }

        // Level up achievements
        if ($user->level >= 5) {
            $this->awardIfNotExists($userId, 'Rising Star', 'Reached level 5', '⭐');
        }
        if ($user->level >= 10) {
            $this->awardIfNotExists($userId, 'Master', 'Reached level 10', '👑');
        }
    }

    private function awardIfNotExists(string $userId, string $title, string $description, string $icon): void
    {
        $exists = Achievement::where('user_id', $userId)
            ->where('title', $title)
            ->exists();

        if (!$exists) {
            $this->awardAchievement($userId, $title, $description, $icon);
        }
    }
}

