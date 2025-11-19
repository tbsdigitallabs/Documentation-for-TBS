<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class DevelopersController extends Controller
{
    public function index(): View
    {
        $modules = [
            [
                'number' => 1,
                'title' => 'Cursor IDE Mastery',
                'badge' => 'Foundation',
                'description' => 'Learn to leverage Cursor\'s AI capabilities for efficient coding, debugging, and code generation in TBS projects.',
                'features' => [
                    'AI-powered code completion',
                    'Intelligent debugging assistance',
                    'Code refactoring workflows',
                ],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 2,
                'title' => 'GitHub Copilot Integration',
                'badge' => 'Advanced',
                'description' => 'Integrate GitHub Copilot into your development workflow for enhanced productivity and code quality.',
                'features' => [
                    'Copilot chat integration',
                    'Code suggestion optimisation',
                    'Documentation generation',
                ],
                'duration' => '30 min',
                'lessons' => 4,
                'progress' => 0,
            ],
            [
                'number' => 3,
                'title' => 'MCP Server Development',
                'badge' => 'Expert',
                'description' => 'Build custom MCP servers to extend AI capabilities and integrate with TBS development workflows.',
                'features' => [
                    'MCP server architecture',
                    'Custom tool integration',
                    'Production deployment',
                ],
                'duration' => '60 min',
                'lessons' => 6,
                'progress' => 0,
            ],
        ];

        return view('pages.developers', compact('modules'));
    }
}

