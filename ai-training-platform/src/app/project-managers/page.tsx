import { getAllModules } from '@/lib/mdx';
import { Shield } from 'lucide-react';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import { getAllClasses, type ClassInfo } from '@/lib/role-mapping';
import RolePageContent from '@/components/RolePageContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

const roleMap: Record<string, string> = {
  "Artificer": "developers",
  "Bard": "designers",
  "Paladin": "project-managers",
  "Storyteller": "content-creators",
  "Rogue": "sales-business-dev",
};

export default async function ProjectManagersPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  const modules = getAllModules('project-managers');
  
  const otherClasses = getAllClasses().filter(c => c.name !== "Paladin" && c.name !== "Session 0");
  const otherModules: Array<{ class: ClassInfo; modules: ReturnType<typeof getAllModules> }> = [];
  
  otherClasses.forEach(classInfo => {
    const role = roleMap[classInfo.name];
    if (role) {
      try {
        const mods = getAllModules(role);
        if (mods.length > 0) {
          otherModules.push({ class: classInfo, modules: mods });
        }
      } catch (e) {
        // Skip if role doesn't exist
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
        <Logo />
        <ThemeToggle />
      </div>
      <Section className="bg-surface-hero py-16 pt-28" size="md">
        <Container size="lg">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-accent-project-managers-10 border border-accent-project-managers-20">
              <Shield className="w-12 h-12 text-accent-project-managers" />
            </div>
            <Heading level={1} className="text-content-primary mb-2">
              Paladin
            </Heading>
            <p className="text-content-secondary mb-6 text-lg">
              Project Managers
            </p>
            {userClass !== "Paladin" && userClass && (
              <p className="text-content-tertiary text-sm mb-4">
                You're exploring the Paladin class. Your primary class is {userClass}.
              </p>
            )}
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Level up your project management skills with AI-powered adventures. Unlock new abilities to streamline workflows and achieve better outcomes.
            </p>
          </div>
        </Container>
      </Section>

      <RolePageContent
        roleName="Paladin"
        roleSlug="project-managers"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="#00C48C"
        description="Level up your project management skills with AI-powered adventures."
      />
    </div>
  );
}
