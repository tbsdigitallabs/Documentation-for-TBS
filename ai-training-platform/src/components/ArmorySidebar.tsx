"use client";

import Link from "next/link";
import { Wrench, BookOpen, Shield, TrendingUp, Video } from "lucide-react";

interface ArmoryModule {
    slug: string;
    title?: string;
    description?: string;
    estimatedTime?: string;
    difficulty?: string;
}

// Map module slugs to icons
const moduleIcons: Record<string, typeof Wrench> = {
    "02-admin-automation": Wrench,
    "03-ai-cybersecurity-best-practices": Shield,
    "04-ai-landscape-2025": TrendingUp,
    "sora-setup": Video,
};

// Fallback icon
const defaultIcon = BookOpen;

// Shared modules - these are the "tools" modules available to all roles
// Exclude foundation modules (01-*) as those are in Session 0
const sharedModules: ArmoryModule[] = [
    {
        slug: "02-admin-automation",
        title: "Personal Admin Automation",
        description: "Learn how to reclaim 5+ hours of your week by automating admin tasks using AI.",
        estimatedTime: "30 minutes",
        difficulty: "Beginner",
    },
    {
        slug: "03-ai-cybersecurity-best-practices",
        title: "AI Cybersecurity Best Practices",
        description: "Learn how to safely integrate AI tools into your workflow while protecting company IP and sensitive data.",
        estimatedTime: "45 minutes",
        difficulty: "Intermediate",
    },
    {
        slug: "04-ai-landscape-2025",
        title: "The AI Landscape: Late 2025 Edition",
        description: "From Chatbots to Agents: A strategic overview of the major AI players—Anthropic, OpenAI, DeepSeek, and the new wave of Autonomous Agents.",
        estimatedTime: "15 mins",
        difficulty: "Intermediate",
    },
    {
        slug: "sora-setup",
        title: "Sora 2 Setup Guide",
        description: "Step-by-step instructions for TBS Digital Labs team members to access Sora 2 for training and professional use.",
        estimatedTime: "10 minutes",
        difficulty: "Beginner",
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
                Shared tools and resources available to all roles
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

