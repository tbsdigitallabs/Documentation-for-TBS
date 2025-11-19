<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProgressService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProgressController extends Controller
{
    public function __construct(
        private ProgressService $progressService
    ) {}

    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|string',
            'module_id' => 'required|string',
            'module_name' => 'required|string',
            'completed' => 'boolean',
            'xp_earned' => 'integer|min:0',
        ]);

        $progress = $this->progressService->trackProgress(
            $validated['user_id'],
            $validated['module_id'],
            $validated['module_name'],
            $validated['completed'] ?? false,
            $validated['xp_earned'] ?? 0
        );

        return response()->json([
            'success' => true,
            'message' => 'Progress tracked successfully',
            'data' => $progress,
        ]);
    }

    public function getUserProgress(string $userId): JsonResponse
    {
        $progress = $this->progressService->getUserProgress($userId);

        return response()->json([
            'success' => true,
            'data' => $progress,
        ]);
    }
}

