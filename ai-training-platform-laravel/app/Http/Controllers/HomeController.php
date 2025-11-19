<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $stats = [
            [
                'label' => 'Training Level',
                'value' => 'Beginner',
                'progress' => 0,
            ],
            [
                'label' => 'Modules Completed',
                'value' => '0 of 12',
                'progress' => 0,
            ],
            [
                'label' => 'Skills Developed',
                'value' => '0',
                'progress' => 0,
            ],
        ];

        $features = [
            [
                'title' => 'Role-Specific Training',
                'description' => 'Customised learning paths for developers, designers, project managers, content creators, and sales teams.',
                'icon' => 'target',
            ],
            [
                'title' => 'Internal Tools Focus',
                'description' => 'Learn AI tools and workflows that directly support our client delivery and internal processes.',
                'icon' => 'zap',
            ],
            [
                'title' => 'Progress Monitoring',
                'description' => 'Track your skill development and training completion across all internal modules.',
                'icon' => 'bar-chart-3',
            ],
            [
                'title' => 'Team Knowledge Sharing',
                'description' => 'Collaborate with colleagues and share insights across different roles and experience levels.',
                'icon' => 'users',
            ],
        ];

        return view('pages.home', compact('stats', 'features'));
    }
}

