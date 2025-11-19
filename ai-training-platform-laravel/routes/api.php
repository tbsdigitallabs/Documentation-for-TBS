<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\UserAnalyticsController;

Route::middleware('auth:sanctum')->group(function () {
    // Progress tracking
    Route::post('/progress/track', [ProgressController::class, 'track']);
    Route::get('/progress/{userId}', [ProgressController::class, 'getUserProgress']);
    
    // Achievements
    Route::post('/achievements/award', [AchievementController::class, 'award']);
    Route::get('/achievements/{userId}', [AchievementController::class, 'getUserAchievements']);
    
    // Leaderboard
    Route::get('/leaderboard', [LeaderboardController::class, 'index']);
    
    // Analytics
    Route::get('/analytics/user/{userId}', [UserAnalyticsController::class, 'getUserAnalytics']);
    Route::get('/analytics/module/{moduleId}', [UserAnalyticsController::class, 'getModuleAnalytics']);
});

