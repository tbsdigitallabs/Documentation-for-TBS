<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Progress;
use Illuminate\Http\JsonResponse;

class UserAnalyticsController extends Controller
{
    public function getUserAnalytics(string $userId): JsonResponse
    {
        $user = User::with(['progress', 'achievements'])->findOrFail($userId);

        $analytics = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'level' => $user->level,
                'xp' => $user->xp,
            ],
            'progress' => [
                'total_modules' => $user->progress->count(),
                'completed_modules' => $user->progress->where('completed', true)->count(),
                'total_xp_earned' => $user->progress->sum('xp_earned'),
            ],
            'achievements' => [
                'total' => $user->achievements->count(),
                'recent' => $user->achievements->sortByDesc('unlocked_at')->take(5)->values(),
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $analytics,
        ]);
    }

    public function getModuleAnalytics(string $moduleId): JsonResponse
    {
        $moduleProgress = Progress::where('module_id', $moduleId)->get();

        $analytics = [
            'module_id' => $moduleId,
            'total_users' => $moduleProgress->count(),
            'completed_users' => $moduleProgress->where('completed', true)->count(),
            'completion_rate' => $moduleProgress->count() > 0 
                ? ($moduleProgress->where('completed', true)->count() / $moduleProgress->count()) * 100 
                : 0,
            'average_xp' => $moduleProgress->avg('xp_earned') ?? 0,
        ];

        return response()->json([
            'success' => true,
            'data' => $analytics,
        ]);
    }
}

