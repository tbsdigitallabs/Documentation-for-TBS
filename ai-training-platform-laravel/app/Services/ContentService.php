<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ContentService
{
    private string $contentPath;

    public function __construct()
    {
        $this->contentPath = base_path('content');
    }

    public function getModuleContent(string $role, int $module): ?string
    {
        $filePath = $this->contentPath . "/{$role}/module-{$module}.mdx";
        
        if (File::exists($filePath)) {
            return File::get($filePath);
        }

        // Fallback to default content
        return $this->getDefaultModuleContent($role, $module);
    }

    public function getLessonContent(string $role, int $module, int $lesson): ?string
    {
        $filePath = $this->contentPath . "/{$role}/module-{$module}/lesson-{$lesson}.mdx";
        
        if (File::exists($filePath)) {
            return File::get($filePath);
        }

        return null;
    }

    private function getDefaultModuleContent(string $role, int $module): string
    {
        $moduleData = [
            'developers' => [
                1 => [
                    'title' => 'Cursor IDE Mastery',
                    'lessons' => [
                        'Getting Started with Cursor',
                        'AI Code Generation',
                        'Code Review & Debugging',
                        'Advanced Features',
                        'Best Practices',
                    ],
                ],
            ],
        ];

        $data = $moduleData[$role][$module] ?? null;
        
        if (!$data) {
            return "# Module {$module}\n\nContent coming soon.";
        }

        $content = "# {$data['title']}\n\n";
        $content .= "## Overview\n\n";
        $content .= "This module covers essential skills for your role.\n\n";
        $content .= "## Lessons\n\n";
        
        foreach ($data['lessons'] as $index => $lesson) {
            $content .= "### Lesson " . ($index + 1) . ": {$lesson}\n\n";
            $content .= "Content for this lesson will be available soon.\n\n";
        }

        return $content;
    }

    public function parseMDX(string $content): array
    {
        // Simple MDX parser - extract frontmatter and content
        $frontmatter = [];
        $body = $content;

        if (preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)$/s', $content, $matches)) {
            $frontmatterRaw = $matches[1];
            $body = $matches[2];

            // Parse YAML frontmatter
            foreach (explode("\n", $frontmatterRaw) as $line) {
                if (preg_match('/^(\w+):\s*(.+)$/', $line, $lineMatches)) {
                    $frontmatter[$lineMatches[1]] = trim($lineMatches[2], '"\'');
                }
            }
        }

        return [
            'frontmatter' => $frontmatter,
            'body' => $body,
        ];
    }
}

