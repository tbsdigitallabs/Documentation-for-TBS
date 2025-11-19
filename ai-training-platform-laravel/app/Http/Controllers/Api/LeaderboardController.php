<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeaderboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $type = $request->get('type', 'xp');
        $limit = (int) $request->get('limit', 10);

        $leaderboard = match ($type) {
            'xp' => User::orderBy('xp', 'desc')->limit($limit)->get(['id', 'name', 'email', 'xp', 'level', 'image']),
            'level' => User::orderBy('level', 'desc')->orderBy('xp', 'desc')->limit($limit)->get(['id', 'name', 'email', 'xp', 'level', 'image']),
            'completion' => User::withCount(['progress as completed_modules' => function ($query) {
                $query->where('completed', true);
            }])->orderBy('completed_modules', 'desc')->limit($limit)->get(['id', 'name', 'email', 'image']),
            default => collect(),
        };

        return response()->json([
            'success' => true,
            'type' => $type,
            'leaderboard' => $leaderboard,
        ]);
    }
}

