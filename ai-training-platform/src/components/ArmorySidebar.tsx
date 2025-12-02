"use client";

import Link from "next/link";
import { Wrench, BookOpen, Video, Code, MessageSquare, Sparkles, Image, Search, FileText, Palette, Zap } from "lucide-react";

interface ArmoryModule {
    slug: string;
    title?: string;
    description?: string;
    estimatedTime?: string;
    difficulty?: string;
}

// Map module slugs to icons
const moduleIcons: Record<string, typeof Wrench> = {
    "sora-setup": Video,
    "cursor-ide": Code,
    "claude": MessageSquare,
    "chatgpt": MessageSquare,
    "github-copilot": Code,
    "midjourney": Image,
    "runway-ml": Video,
    "perplexity": Search,
    "notion-ai": FileText,
    "figma-ai": Palette,
    "claude-desktop": Zap,
};

// Fallback icon
const defaultIcon = BookOpen;

// Armory modules - AI tools and their SOPs only (excluding foundation modules)
// These are specific tools and standard operating procedures for using them
const sharedModules: ArmoryModule[] = [
    {
        slug: "sora-setup",
        title: "Sora 2 Setup Guide",
        description: "Step-by-step instructions for TBS Digital Labs team members to access Sora 2 for training and professional use.",
        estimatedTime: "10 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "cursor-ide",
        title: "Cursor IDE SOP",
        description: "Standard operating procedures for using Cursor IDE, the AI-powered code editor for enhanced development workflows.",
        estimatedTime: "20 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "claude",
        title: "Claude (Anthropic) SOP",
        description: "Best practices and workflows for using Claude AI assistant for coding, writing, and analysis tasks.",
        estimatedTime: "15 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "chatgpt",
        title: "ChatGPT (OpenAI) SOP",
        description: "Guidelines for using ChatGPT effectively in professional contexts, including prompt engineering and workflow integration.",
        estimatedTime: "15 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "github-copilot",
        title: "GitHub Copilot SOP",
        description: "Setup and usage guidelines for GitHub Copilot AI code completion tool in your development environment.",
        estimatedTime: "15 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "midjourney",
        title: "Midjourney SOP",
        description: "Standard operating procedures for using Midjourney AI image generation for design and creative projects.",
        estimatedTime: "20 minutes",
        difficulty: "Intermediate",
    },
    {
        slug: "runway-ml",
        title: "Runway ML SOP",
        description: "Workflow guidelines for using Runway ML's AI video and image generation tools in production.",
        estimatedTime: "25 minutes",
        difficulty: "Intermediate",
    },
    {
        slug: "perplexity",
        title: "Perplexity AI SOP",
        description: "Best practices for using Perplexity AI research assistant for information gathering and fact-checking.",
        estimatedTime: "10 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "notion-ai",
        title: "Notion AI SOP",
        description: "Guidelines for leveraging Notion AI features for documentation, project management, and knowledge organisation.",
        estimatedTime: "15 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "figma-ai",
        title: "Figma AI SOP",
        description: "Standard operating procedures for using Figma's AI-powered design tools and automation features.",
        estimatedTime: "20 minutes",
        difficulty: "Intermediate",
    },
];

export function ArmorySidebar() {

    if (sharedModules.length === 0) {
        return null;
    }

    return (
        <div className="glass-card rounded-xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-magenta-500/20">
                    <Wrench className="w-5 h-5 text-accent-magenta-500" />
                </div>
                <h3 className="text-lg font-heading font-bold text-content-primary">Armory</h3>
            </div>
            <p className="text-sm text-content-secondary mb-4">
                AI tools and their standard operating procedures
            </p>
            <div className="space-y-2">
                {sharedModules.map((module) => {
                    const Icon = moduleIcons[module.slug] || defaultIcon;
                    return (
                        <Link
                            key={module.slug}
                            href={`/shared/${module.slug}`}
                            className="block p-3 rounded-lg border border-border-primary hover:border-accent-magenta-500/50 hover:bg-accent-magenta-500/5 transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 p-1.5 rounded bg-accent-magenta-500/10 group-hover:bg-accent-magenta-500/20 transition-colors">
                                    <Icon className="w-4 h-4 text-accent-magenta-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-body font-semibold text-content-primary group-hover:text-accent-magenta-500 transition-colors line-clamp-2">
                                        {module.title || module.slug}
                                    </h4>
                                    {module.description && (
                                        <p className="text-xs text-content-secondary mt-1 line-clamp-2">
                                            {module.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2 text-xs text-content-secondary">
                                        {module.estimatedTime && (
                                            <span className="mono-text">{module.estimatedTime}</span>
                                        )}
                                        {module.difficulty && (
                                            <>
                                                {module.estimatedTime && <span>•</span>}
                                                <span className="mono-text capitalize">{module.difficulty}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

