<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AchievementService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AchievementController extends Controller
{
    public function __construct(
        private AchievementService $achievementService
    ) {}

    public function award(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'icon' => 'required|string',
        ]);

        $achievement = $this->achievementService->awardAchievement(
            $validated['user_id'],
            $validated['title'],
            $validated['description'],
            $validated['icon']
        );

        return response()->json([
            'success' => true,
            'message' => 'Achievement awarded successfully',
            'data' => $achievement,
        ]);
    }

    public function getUserAchievements(string $userId): JsonResponse
    {
        $achievements = $this->achievementService->getUserAchievements($userId);

        return response()->json([
            'success' => true,
            'data' => $achievements,
        ]);
    }
}

