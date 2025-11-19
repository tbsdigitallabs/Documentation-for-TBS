<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class ClassSelectionController extends Controller
{
    public function index(): View
    {
        $tracks = [
            [
                'id' => 'developers',
                'title' => 'Developer',
                'badge' => 'Technical',
                'description' => 'Master AI-assisted coding, debugging, and MCP server development for TBS projects',
                'features' => [
                    'Cursor IDE workflows',
                    'GitHub Copilot integration',
                    'MCP server development',
                ],
                'modules' => 3,
                'duration' => '2-3 hrs',
                'icon' => 'D',
                'color' => 'accent-developers',
            ],
            [
                'id' => 'designers',
                'title' => 'Designer',
                'badge' => 'Creative',
                'description' => 'Create stunning visuals with AI design tools and Sora 2 video generation for client projects',
                'features' => [
                    'AI design tools',
                    'Sora 2 video creation',
                    'Asset generation workflows',
                ],
                'modules' => 3,
                'duration' => '2-3 hrs',
                'icon' => 'D',
                'color' => 'accent-designers',
            ],
            [
                'id' => 'project-managers',
                'title' => 'Project Manager',
                'badge' => 'Strategic',
                'description' => 'Optimise project planning, resource management, and client communication with AI tools',
                'features' => [
                    'Asana automation',
                    'Resource optimisation',
                    'Client communication tools',
                ],
                'modules' => 3,
                'duration' => '2-3 hrs',
                'icon' => 'PM',
                'color' => 'accent-project-managers',
            ],
            [
                'id' => 'content-creators',
                'title' => 'Content Creator',
                'badge' => 'Creative',
                'description' => 'Enhance content creation with AI writing assistants and visual generation for marketing materials',
                'features' => [
                    'AI writing assistants',
                    'SEO optimisation',
                    'Brand voice consistency',
                ],
                'modules' => 3,
                'duration' => '2-3 hrs',
                'icon' => 'CC',
                'color' => 'accent-content-creators',
            ],
            [
                'id' => 'sales-business-dev',
                'title' => 'Sales & Business Dev',
                'badge' => 'Growth',
                'description' => 'Streamline CRM automation, proposal generation, and client research for business development',
                'features' => [
                    'HubSpot automation',
                    'Proposal generation',
                    'Lead qualification',
                ],
                'modules' => 3,
                'duration' => '2-3 hrs',
                'icon' => 'S',
                'color' => 'accent-sales-business',
            ],
        ];

        return view('pages.class-selection', compact('tracks'));
    }
}

