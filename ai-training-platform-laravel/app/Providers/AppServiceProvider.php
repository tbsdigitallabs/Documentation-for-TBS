<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ProgressService;
use App\Services\XPService;
use App\Services\AchievementService;
use App\Services\ContentService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(XPService::class);
        $this->app->singleton(AchievementService::class);
        $this->app->singleton(ContentService::class);
        $this->app->singleton(ProgressService::class, function ($app) {
            return new ProgressService($app->make(XPService::class));
        });
    }

    public function boot(): void
    {
        //
    }
}
