<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use App\Services\ContentService;

class ModuleController extends Controller
{
    public function __construct(
        private ContentService $contentService
    ) {}

    public function show(string $role, int $module): View
    {
        $roleData = [
            'developers' => [
                'title' => 'Developer',
                'path' => '/developers',
                'color' => 'accent-developers',
            ],
            'designers' => [
                'title' => 'Designer',
                'path' => '/designers',
                'color' => 'accent-designers',
            ],
            'project-managers' => [
                'title' => 'Project Manager',
                'path' => '/project-managers',
                'color' => 'accent-project-managers',
            ],
            'content-creators' => [
                'title' => 'Content Creator',
                'path' => '/content-creators',
                'color' => 'accent-content-creators',
            ],
            'sales-business-dev' => [
                'title' => 'Sales & Business Dev',
                'path' => '/sales-business-dev',
                'color' => 'accent-sales-business',
            ],
        ];

        $moduleData = $this->getModuleData($role, $module);
        $content = $this->contentService->getModuleContent($role, $module);
        $parsed = $this->contentService->parseMDX($content);

        return view('pages.module', [
            'role' => $roleData[$role] ?? $roleData['developers'],
            'module' => array_merge($moduleData, $parsed['frontmatter']),
            'content' => $parsed['body'],
            'roleSlug' => $role,
        ]);
    }

    private function getModuleData(string $role, int $module): array
    {
        $modules = [
            'developers' => [
                1 => [
                    'title' => 'Cursor IDE Mastery',
                    'description' => 'Learn to leverage Cursor\'s AI capabilities for efficient coding, debugging, and code generation in TBS projects.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                2 => [
                    'title' => 'GitHub Copilot Integration',
                    'description' => 'Integrate GitHub Copilot into your development workflow for enhanced productivity and code quality.',
                    'lessons' => 4,
                    'estimatedTime' => '30 minutes',
                    'progress' => 0,
                ],
                3 => [
                    'title' => 'MCP Server Development',
                    'description' => 'Build custom MCP servers to extend AI capabilities and integrate with TBS development workflows.',
                    'lessons' => 6,
                    'estimatedTime' => '60 minutes',
                    'progress' => 0,
                ],
            ],
            'designers' => [
                1 => [
                    'title' => 'AI Design Tools Mastery',
                    'description' => 'Master AI-powered design tools for creating stunning visuals and assets.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                2 => [
                    'title' => 'Sora 2 Video Creation',
                    'description' => 'Create professional videos using Sora 2 for client projects.',
                    'lessons' => 6,
                    'estimatedTime' => '60 minutes',
                    'progress' => 0,
                ],
                3 => [
                    'title' => 'Asset Generation Workflows',
                    'description' => 'Streamline asset generation and management for client projects.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
            ],
            'project-managers' => [
                1 => [
                    'title' => 'Asana Automation',
                    'description' => 'Automate project management workflows with AI-powered Asana integration.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                2 => [
                    'title' => 'Resource Optimisation',
                    'description' => 'Optimise resource allocation and project planning with AI tools.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                3 => [
                    'title' => 'Client Communication Tools',
                    'description' => 'Enhance client communication and reporting with AI assistance.',
                    'lessons' => 4,
                    'estimatedTime' => '30 minutes',
                    'progress' => 0,
                ],
            ],
            'content-creators' => [
                1 => [
                    'title' => 'AI Writing Assistants',
                    'description' => 'Leverage AI writing tools for content creation and optimisation.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                2 => [
                    'title' => 'SEO Optimisation',
                    'description' => 'Optimise content for search engines using AI-powered SEO tools.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                3 => [
                    'title' => 'Brand Voice Consistency',
                    'description' => 'Maintain consistent brand voice across all content using AI.',
                    'lessons' => 4,
                    'estimatedTime' => '30 minutes',
                    'progress' => 0,
                ],
            ],
            'sales-business-dev' => [
                1 => [
                    'title' => 'HubSpot Automation',
                    'description' => 'Automate CRM workflows and lead management with HubSpot and AI.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                2 => [
                    'title' => 'Proposal Generation',
                    'description' => 'Generate professional proposals and quotes using AI assistance.',
                    'lessons' => 5,
                    'estimatedTime' => '45 minutes',
                    'progress' => 0,
                ],
                3 => [
                    'title' => 'Lead Qualification',
                    'description' => 'Qualify and prioritise leads using AI-powered analysis tools.',
                    'lessons' => 4,
                    'estimatedTime' => '30 minutes',
                    'progress' => 0,
                ],
            ],
        ];

        return $modules[$role][$module] ?? [
            'title' => 'Module ' . $module,
            'description' => 'Training module content.',
            'lessons' => 5,
            'estimatedTime' => '45 minutes',
            'progress' => 0,
        ];
    }
}
