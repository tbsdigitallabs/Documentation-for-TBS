<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class ContentCreatorsController extends Controller
{
    public function index(): View
    {
        $modules = [
            [
                'number' => 1,
                'title' => 'AI Writing Assistants',
                'badge' => 'Foundation',
                'description' => 'Leverage AI writing tools for content creation and optimisation.',
                'features' => ['Content generation', 'Writing assistance', 'Editing tools'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 2,
                'title' => 'SEO Optimisation',
                'badge' => 'Advanced',
                'description' => 'Optimise content for search engines using AI-powered SEO tools.',
                'features' => ['Keyword research', 'Content optimisation', 'Analytics'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 3,
                'title' => 'Brand Voice Consistency',
                'badge' => 'Expert',
                'description' => 'Maintain consistent brand voice across all content using AI.',
                'features' => ['Voice analysis', 'Style guides', 'Consistency checks'],
                'duration' => '30 min',
                'lessons' => 4,
                'progress' => 0,
            ],
        ];

        return view('pages.content-creators', compact('modules'));
    }
}

