<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class ProjectManagersController extends Controller
{
    public function index(): View
    {
        $modules = [
            [
                'number' => 1,
                'title' => 'Asana Automation',
                'badge' => 'Foundation',
                'description' => 'Automate project management workflows with AI-powered Asana integration.',
                'features' => ['Task automation', 'Workflow optimisation', 'Team coordination'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 2,
                'title' => 'Resource Optimisation',
                'badge' => 'Advanced',
                'description' => 'Optimise resource allocation and project planning with AI tools.',
                'features' => ['Resource planning', 'Capacity management', 'Efficiency tools'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 3,
                'title' => 'Client Communication Tools',
                'badge' => 'Expert',
                'description' => 'Enhance client communication and reporting with AI assistance.',
                'features' => ['Report generation', 'Communication templates', 'Status updates'],
                'duration' => '30 min',
                'lessons' => 4,
                'progress' => 0,
            ],
        ];

        return view('pages.project-managers', compact('modules'));
    }
}

