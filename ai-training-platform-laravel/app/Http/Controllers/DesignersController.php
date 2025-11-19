<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class DesignersController extends Controller
{
    public function index(): View
    {
        $modules = [
            [
                'number' => 1,
                'title' => 'AI Design Tools Mastery',
                'badge' => 'Foundation',
                'description' => 'Master AI-powered design tools for creating stunning visuals and assets.',
                'features' => ['AI image generation', 'Design automation', 'Asset creation'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 2,
                'title' => 'Sora 2 Video Creation',
                'badge' => 'Advanced',
                'description' => 'Create professional videos using Sora 2 for client projects.',
                'features' => ['Video generation', 'Editing workflows', 'Client delivery'],
                'duration' => '60 min',
                'lessons' => 6,
                'progress' => 0,
            ],
            [
                'number' => 3,
                'title' => 'Asset Generation Workflows',
                'badge' => 'Expert',
                'description' => 'Streamline asset generation and management for client projects.',
                'features' => ['Workflow automation', 'Asset management', 'Brand consistency'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
        ];

        return view('pages.designers', compact('modules'));
    }
}

