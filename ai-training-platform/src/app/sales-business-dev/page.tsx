import { getAllModules, type ModuleMetadata } from '@/lib/mdx';
import { Coins } from 'lucide-react';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { getAllClasses, CLASS_NAMES, type ClassInfo } from '@/lib/role-mapping';
import RolePageContent from '@/components/RolePageContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageHeader from '@/components/PageHeader';
import { hasCompletedFoundation, getFoundationModuleIds, getIncompleteFoundationModules } from '@/lib/foundation-check';
import { FoundationRequirement } from '@/components/FoundationRequirement';

export const dynamic = 'force-dynamic';

const classToRouteSlug: Record<string, string> = {
  [CLASS_NAMES.DEVELOPERS]: "developers",
  [CLASS_NAMES.DESIGNERS]: "designers",
  [CLASS_NAMES.PROJECT_MANAGERS]: "project-managers",
  [CLASS_NAMES.CONTENT_CREATORS]: "content-creators",
  [CLASS_NAMES.SALES]: "sales-business-dev",
};

export default async function SalesBusinessDevPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  
  // Check foundation requirement
  if (session?.user?.profile) {
    try {
      // Check if user has flag indicating all modules completed (David's case)
      const hasAllCompleted = (session.user.profile as any)?.hasAllModulesCompleted;
      
      // CRITICAL: Always fetch full list from user store for foundation check
      // Session only has 10 most recent modules (or none for accounts with hasAllModulesCompleted flag)
      let completedModules: Array<{ moduleId: string }> = [];
      
      if (session.user.email) {
        try {
          const { getUserByEmail } = await import('@/lib/user-store');
          const storedUser = await getUserByEmail(session.user.email);
          if (storedUser?.completedModules && Array.isArray(storedUser.completedModules)) {
            // Use full list from user store - this is the authoritative source
            completedModules = storedUser.completedModules;
          } else {
            // If user store has no modules, fall back to session (might have recent modules)
            completedModules = session.user.profile.completedModules || [];
          }
        } catch (storeError) {
          console.error('[Foundation Check] Could not fetch from user store, using session modules:', storeError);
          completedModules = session.user.profile.completedModules || [];
        }
      } else {
        completedModules = session.user.profile.completedModules || [];
      }
      
      // If user has hasAllModulesCompleted flag, skip foundation check
      if (hasAllCompleted) {
        // User has completed all modules, allow access
      } else {
        const hasFoundation = hasCompletedFoundation(completedModules);
        
        if (!hasFoundation) {
          const foundationModuleIds = getFoundationModuleIds();
          const incompleteModules = getIncompleteFoundationModules(completedModules);
          
          return (
            <div className="min-h-screen bg-gradient-surface">
              <PageHeader session={session} />
              <FoundationRequirement 
                incompleteModules={incompleteModules}
                totalFoundationModules={foundationModuleIds.length}
              />
            </div>
          );
        }
      }
    } catch (error) {
      console.error('Error checking foundation requirement:', error);
      // On error, allow access to prevent blocking users
    }
  }
  
  let modules: ModuleMetadata[];
  try {
    modules = getAllModules('sales');
  } catch (error) {
    console.error('Error loading sales modules:', error);
    modules = [];
  }

  const otherClasses = getAllClasses().filter(c => c.name !== CLASS_NAMES.SALES && c.name !== CLASS_NAMES.FOUNDATION);
  const otherModules: Array<{ class: ClassInfo; modules: ReturnType<typeof getAllModules> }> = [];

  otherClasses.forEach(classInfo => {
    const routeSlug = classToRouteSlug[classInfo.name];
    if (routeSlug) {
      try {
        const mods = getAllModules(routeSlug);
        if (mods.length > 0) {
          otherModules.push({ class: classInfo, modules: mods });
        }
      } catch (_e) {
        // Skip if role doesn't exist
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-surface">
      <PageHeader session={session} />
      <Section className="bg-surface-hero py-6 pt-20" size="sm">
        <Container size="lg">
          <div className="flex items-center gap-6 mb-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent-sales-business-10 border border-accent-sales-business-20 shadow-md">
              <Coins className="w-8 h-8 text-accent-sales-business" />
            </div>
            <div>
              <Heading level={1} className="text-content-primary mb-0 tracking-tight text-2xl md:text-3xl">
                {CLASS_NAMES.SALES}
              </Heading>
              <p className="text-content-secondary text-sm">
                Sales & Business Development
              </p>
            </div>
          </div>
          {userClass !== CLASS_NAMES.SALES && userClass && (
            <p className="text-content-tertiary text-xs mb-2">
              Exploring {CLASS_NAMES.SALES} track. Your primary class is {userClass}.
            </p>
          )}
          <p className="text-content-secondary max-w-3xl text-base leading-relaxed">
            Enhance your business capabilities with AI-powered tools. Complete missions to unlock advanced sales techniques and workflows.
          </p>
        </Container>
      </Section>

      <RolePageContent
        roleName={CLASS_NAMES.SALES}
        roleSlug="sales-business-dev"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="var(--color-accent-sales-business)"
        description="Enhance your business capabilities with AI-powered tools."
      />
    </div>
  );
}
