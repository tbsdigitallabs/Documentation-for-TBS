"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HoloCard } from '@/components/HoloCard';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import type { ClassInfo } from '@/lib/role-mapping';
import type { ModuleMetadata } from '@/lib/mdx';

interface RolePageContentProps {
    roleName: string;
    roleSlug: string;
    userClass: string | null | undefined;
    modules: ModuleMetadata[];
    otherModules: Array<{ class: ClassInfo; modules: ModuleMetadata[] }>;
    accentColor: string;
    description: string;
}

const roleMap: Record<string, string> = {
    "Artificer": "developers",
    "Bard": "designers",
    "Paladin": "project-managers",
    "Storyteller": "content-creators",
    "Rogue": "sales-business-dev",
};

export default function RolePageContent({
    roleName,
    roleSlug,
    userClass,
    modules,
    otherModules,
    accentColor,
    description,
}: RolePageContentProps) {
    const [mounted, setMounted] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const isUserClass = userClass === roleName;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
                <div className="text-center">
                    <p className="text-content-secondary mono-text text-sm">LOADING MISSION DATA...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Section className="bg-gradient-surface py-8" size="lg">
                <Container size="xl">
                    <h2 className="mono-label text-accent-readable-cyan mb-4">
                        {isUserClass ? "ACTIVE MISSIONS" : `${roleName.toUpperCase()} MISSIONS`}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch mb-8">
                        {modules.map((module) => (
                            <HoloCard key={module.slug} role={roleSlug as any} className="flex flex-col h-full">
                                <div className="mb-6">
                                    <span
                                        className="mono-label px-2 py-1 rounded-md border inline-block"
                                        style={{
                                            color: accentColor,
                                            backgroundColor: `${accentColor}15`,
                                            borderColor: `${accentColor}30`
                                        }}
                                    >
                                        MISSION {module.slug.split('-')[0].padStart(2, '0')}
                                    </span>
                                </div>
                                <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                                <p className="body-regular text-content-secondary mb-8">
                                    {module.description || "Learn new skills in this module."}
                                </p>
                                <div className="flex items-center justify-between text-sm text-content-tertiary mb-8 pt-4 border-t border-border-primary">
                                    <span className="flex items-center gap-2">⏱️ {module.estimatedTime || "30 mins"}</span>
                                    <span className="flex items-center gap-2">🎯 {module.difficulty || "Intermediate"}</span>
                                </div>
                                <Link href={`/${roleSlug}/${module.slug}`} className="mt-auto">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Deploy
                                    </Button>
                                </Link>
                            </HoloCard>
                        ))}
                    </div>

                    {otherModules.length > 0 && (
                        <div className="mt-12">
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="w-full flex items-center justify-between px-6 py-4 bg-surface-card rounded-lg border border-border-primary hover:bg-surface-hover hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mb-6"
                            >
                                <span className="mono-label text-content-primary">
                                    Browse Other Operatives
                                </span>
                                {showMore ? (
                                    <ChevronUp className="w-5 h-5 text-content-secondary" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-content-secondary" />
                                )}
                            </button>

                            {showMore && (
                                <div className="space-y-8">
                                    {otherModules.map(({ class: classInfo, modules: mods }) => (
                                        <div key={classInfo.name}>
                                            <h3 className="text-xl font-heading font-bold text-content-primary mb-4">
                                                {classInfo.name} - {classInfo.jobTitle}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                                                {mods.slice(0, 3).map((module) => (
                                                    <HoloCard key={module.slug} role={roleMap[classInfo.name] as any} className="flex flex-col h-full">
                                                        <div className="mb-6">
                                                            <span className="mono-label px-2 py-1 rounded-md inline-block text-content-secondary">
                                                                MISSION {module.slug.split('-')[0].padStart(2, '0')}
                                                            </span>
                                                        </div>
                                                        <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                                                        <p className="body-regular text-content-secondary mb-8">
                                                            {module.description || "Learn new skills in this module."}
                                                        </p>
                                                        <Link href={`${classInfo.route}/${module.slug}`} className="mt-auto">
                                                            <Button variant="default" size="lg" className="w-full">
                                                                View Mission
                                                            </Button>
                                                        </Link>
                                                    </HoloCard>
                                                ))}
                                            </div>
                                            {mods.length > 3 && (
                                                <div className="mt-4 text-center">
                                                    <Link href={classInfo.route} className="text-content-secondary hover:text-content-primary transition-colors">
                                                        View all {classInfo.name} adventures →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center mt-16">
                        <Link href="/class-selection" className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors text-lg font-medium">
                            ← Back to Class Selection
                        </Link>
                    </div>
                </Container>
            </Section>
        </>
    );
}

