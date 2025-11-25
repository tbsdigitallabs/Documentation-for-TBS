import { getModuleBySlug, getModuleSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ThemeToggle from '@/components/ThemeToggle';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowLeft, Clock, Target, BookOpen } from 'lucide-react';
import { ModuleWrapper } from '@/components/modules/ModuleWrapper';

// Force static generation for these pages
export const dynamic = 'force-static';

// Generate all possible paths at build time
export async function generateStaticParams() {
    try {
        const roles = ['project-managers', 'developers', 'content-creators', 'designers', 'sales', 'shared'];
        const params = [];

        for (const role of roles) {
            try {
                const slugs = getModuleSlugs(role);
                for (const slug of slugs) {
                    params.push({
                        role,
                        slug: slug.replace(/\.mdx$/, ''),
                    });
                }
            } catch (error) {
                console.warn(`Failed to get modules for role ${role}:`, error);
                // Continue with other roles
            }
        }

        // Add session-0 routes (uses shared content)
        try {
            const sharedSlugs = getModuleSlugs('shared');
            for (const slug of sharedSlugs) {
                params.push({
                    role: 'session-0',
                    slug: slug.replace(/\.mdx$/, ''),
                });
            }
        } catch (error) {
            console.warn('Failed to get shared modules:', error);
        }

        return params;
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        // Return empty array to prevent build failure
        return [];
    }
}

export default async function ModulePage({ params }: { params: Promise<{ role: string; slug: string }> }) {
    const { role, slug } = await params;
    const session = await getServerSession(authOptions);

    // Map session-0 to shared content directory
    const contentRole = role === 'session-0' ? 'shared' : role;

    try {
        const { content, metadata } = getModuleBySlug(contentRole, slug);

        return (
            <div className="min-h-screen bg-surface-primary text-content-primary relative overflow-hidden flex flex-col h-screen">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyber-magenta/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[120px]" />
                </div>

                {/* Header */}
                <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
                    <div className="container mx-auto px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <Link href={role === 'session-0' ? '/session-0' : `/${role}`} className="p-2 rounded-full hover:bg-white/10 transition-colors group">
                                    <ArrowLeft className="w-5 h-5 text-content-secondary group-hover:text-content-primary" />
                                </Link>
                                <div className="h-6 w-px bg-white/10" />
                                <Link href="/" className="flex items-center gap-3">
                                    <Image
                                        src="/images/tbs-lab-logo.png?v=2"
                                        alt="TBS Digital Labs"
                                        width={140}
                                        height={47}
                                        className="h-8 w-auto object-contain invert dark:invert-0"
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                {session?.user && (
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        title="View Profile"
                                    >
                                        {session.user.profile?.profileImage || session.user.image ? (
                                            <img
                                                src={session.user.profile?.profileImage || session.user.image || ''}
                                                alt={session.user.name || 'Profile'}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white text-sm font-semibold">
                                                {session.user.name?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </Link>
                                )}
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Layout Container - Uses flex to fill viewport minus header */}
                <div className="flex-grow flex flex-col min-h-0 container mx-auto px-4 md:px-6 py-4">
                    <div className="flex-grow flex flex-col min-h-0 max-w-[1600px] mx-auto w-full">
                        {/* Module Header - Metadata removed as requested */}
                        <div className="mb-2 flex-shrink-0">
                            {/* Title removed to avoid duplication with ModulePresentation */}
                        </div>

                        {/* Content - Fills remaining space */}
                        <div className="flex-grow min-h-0 flex flex-col">
                            <ModuleWrapper content={content} questions={metadata.questions || []} />
                        </div>

                        {/* Footer Navigation - Fixed at bottom of container */}
                        <div className="mt-2 flex justify-between items-center pt-2 border-t border-white/10 flex-shrink-0">
                            <Link
                                href={role === 'session-0' ? '/session-0' : `/${role}`}
                                className="flex items-center gap-2 text-content-secondary hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Overview</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}


