<?php

namespace App\Services;

use App\Models\Progress;
use App\Models\User;
use App\Services\XPService;

class ProgressService
{
    public function __construct(
        private XPService $xpService
    ) {}

    public function trackProgress(string $userId, string $moduleId, string $moduleName, bool $completed = false, int $xpEarned = 0): Progress
    {
        $progress = Progress::updateOrCreate(
            [
                'user_id' => $userId,
                'module_id' => $moduleId,
            ],
            [
                'id' => uniqid('prog_'),
                'module_name' => $moduleName,
                'completed' => $completed,
                'completed_at' => $completed ? now() : null,
                'xp_earned' => $xpEarned,
            ]
        );

        if ($xpEarned > 0) {
            $this->xpService->awardXP($userId, $xpEarned, 'module_completion');
        }

        return $progress;
    }

    public function getUserProgress(string $userId): array
    {
        $progress = Progress::where('user_id', $userId)->get();
        
        return [
            'total_modules' => $progress->count(),
            'completed_modules' => $progress->where('completed', true)->count(),
            'total_xp' => $progress->sum('xp_earned'),
            'modules' => $progress->toArray(),
        ];
    }

    public function getModuleProgress(string $userId, string $moduleId): ?Progress
    {
        return Progress::where('user_id', $userId)
            ->where('module_id', $moduleId)
            ->first();
    }
}

