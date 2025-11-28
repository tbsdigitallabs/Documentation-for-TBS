import { getModuleBySlug, getModuleSlugs } from '@/lib/mdx';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeft } from 'lucide-react';
import { ModuleWrapper } from '@/components/modules/ModuleWrapper';
import { hasCompletedFoundation, isFoundationModule, getFoundationModuleIds, getIncompleteFoundationModules } from '@/lib/foundation-check';
import { FoundationRequirement } from '@/components/FoundationRequirement';

// Use dynamic rendering to check foundation requirements
export const dynamic = 'force-dynamic';

// Generate all possible paths at build time
export async function generateStaticParams() {
    try {
        // Map route slugs to content directories
        const roleMappings: Record<string, string> = {
            'project-managers': 'project-managers',
            'developers': 'developers',
            'content-creators': 'content-creators',
            'designers': 'designers',
            'sales-business-dev': 'sales',
            'sales': 'sales',
            'shared': 'shared',
        };
        
        const params = [];

        for (const [routeRole, contentRole] of Object.entries(roleMappings)) {
            try {
                const slugs = getModuleSlugs(contentRole);
                for (const slug of slugs) {
                    params.push({
                        role: routeRole,
                        slug: slug.replace(/\.mdx$/, ''),
                    });
                }
            } catch (error) {
                console.warn(`Failed to get modules for role ${contentRole}:`, error);
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

    // Map route slugs to content directory names
    const contentRole = role === 'session-0' 
      ? 'shared' 
      : role === 'sales-business-dev' 
        ? 'sales' 
        : role;

    // Check foundation requirement for non-foundation modules
    const moduleId = role === 'session-0' ? `session-0/${slug}` : `${role}/${slug}`;
    const isFoundation = isFoundationModule(moduleId);
    
    // Only check foundation if user is authenticated and it's not a foundation module
    // Allow unauthenticated users to access (they'll be redirected by auth)
    if (!isFoundation && session?.user?.profile) {
      try {
        const completedModules = session.user.profile.completedModules || [];
        const foundationModuleIds = getFoundationModuleIds();
        
        // If no foundation modules exist, allow access (shouldn't happen, but safety check)
        if (foundationModuleIds.length === 0) {
          console.warn('No foundation modules found, allowing access');
        } else {
          const hasFoundation = hasCompletedFoundation(completedModules);
          
          if (!hasFoundation) {
            const incompleteModules = getIncompleteFoundationModules(completedModules);
            
            return (
              <FoundationRequirement 
                incompleteModules={incompleteModules}
                totalFoundationModules={foundationModuleIds.length}
              />
            );
          }
        }
      } catch (error) {
        console.error('Error checking foundation requirements:', error);
        // On error, allow access to prevent blocking users - log but don't fail
      }
    }
    
    // If no session, allow access (auth will handle redirect)
    // If foundation module, always allow access

    try {
        const { content, metadata } = getModuleBySlug(contentRole, slug);

        return (
            <div className="min-h-screen bg-surface-primary text-content-primary relative overflow-hidden flex flex-col h-screen">
                {/* Background Effects - Subtle */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyber-magenta/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyber-cyan/5 rounded-full blur-[100px]" />
                </div>

                {/* Minimal Header - Just navigation */}
                <header className="border-b border-border-primary bg-surface-primary sticky top-0 z-50 flex-shrink-0">
                    <div className="px-4 py-1.5 max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <Link href={role === 'session-0' ? '/session-0' : `/${role}`} className="py-1 px-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors group flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4 text-content-secondary group-hover:text-content-primary" />
                                <span className="text-sm text-content-secondary group-hover:text-content-primary">Back to overview</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                {session?.user && (
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        title="View Profile"
                                    >
                                        {session.user.profile?.profileImage || session.user.image ? (
                                            <img
                                                src={session.user.profile?.profileImage || session.user.image || ''}
                                                alt={session.user.name || 'Profile'}
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white text-xs font-semibold">
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

                {/* Main Content - Full viewport height minus header */}
                <div className="flex-grow flex flex-col min-h-0 px-4 md:px-8 lg:px-12 xl:px-16 py-3">
                    <div className="flex-grow flex flex-col min-h-0 w-full">
                        {/* Content - Fills all available space */}
                        <div className="flex-grow min-h-0 flex flex-col">
                            <ModuleWrapper content={content} questions={metadata.questions || []} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}


