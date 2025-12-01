import { getModuleBySlug, getModuleSlugs } from '@/lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
    // SAFETY: This check is wrapped in try-catch to ensure it NEVER blocks access on error
    const moduleId = role === 'session-0' ? `session-0/${slug}` : `${role}/${slug}`;
    const isFoundation = isFoundationModule(moduleId);
    
    // Skip foundation check entirely if it's a foundation module
    if (!isFoundation && session?.user?.profile) {
      try {
        // Check if user has flag indicating all modules completed (David's case)
        const hasAllCompleted = (session.user.profile as any)?.hasAllModulesCompleted;
        
        // Get completedModules from session (limited to 10 most recent)
        let completedModules = session.user.profile.completedModules || [];
        
        // If user has flag or we need to check foundation, fetch full list from user store
        if (hasAllCompleted || completedModules.length < 10) {
          try {
            const { getUserByEmail } = await import('@/lib/user-store');
            if (session.user.email) {
              const storedUser = await getUserByEmail(session.user.email);
              if (storedUser?.completedModules && storedUser.completedModules.length > completedModules.length) {
                // Use full list from user store for foundation check
                completedModules = storedUser.completedModules;
              }
            }
          } catch (storeError) {
            // If user store fetch fails, use session modules (fail gracefully)
            console.warn('Could not fetch from user store, using session modules:', storeError);
          }
        }
        
        const foundationModuleIds = getFoundationModuleIds();
        
        // If no foundation modules exist, allow access (no requirement)
        if (foundationModuleIds.length > 0) {
          const hasFoundation = hasCompletedFoundation(completedModules);
          
          if (!hasFoundation) {
            try {
              const incompleteModules = getIncompleteFoundationModules(completedModules);
              
              return (
                <FoundationRequirement 
                  incompleteModules={incompleteModules}
                  totalFoundationModules={foundationModuleIds.length}
                />
              );
            } catch (reqError) {
              // If showing requirement fails, allow access
              console.error('Error showing foundation requirement (allowing access):', reqError);
            }
          }
        }
      } catch (error) {
        // CRITICAL: On ANY error, allow access to prevent blocking users
        // This ensures the foundation check can never cause a 403 or block access
        console.error('Error in foundation check (allowing access):', error);
        // Continue to render the module normally - fail open
      }
    }
    
    // If no session, allow access (auth middleware will handle redirect)
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
                                            <Image
                                                src={session.user.profile?.profileImage || session.user.image || ''}
                                                alt={session.user.name || 'Profile'}
                                                width={28}
                                                height={28}
                                                className="w-7 h-7 rounded-full object-cover"
                                                unoptimized={(session.user.profile?.profileImage || session.user.image || '').startsWith('/api/images/')}
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
        console.error(`Error loading module ${contentRole}/${slug}:`, error);
        // If it's a file not found error, return 404, otherwise log and return 404
        if (error instanceof Error && error.message.includes('not found')) {
            notFound();
        } else {
            console.error('Unexpected error loading module:', error);
            notFound();
        }
    }
}


