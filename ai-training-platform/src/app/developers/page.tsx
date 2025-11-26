import { getAllModules } from '@/lib/mdx';
import { Hammer } from 'lucide-react';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { getAllClasses, type ClassInfo } from '@/lib/role-mapping';
import RolePageContent from '@/components/RolePageContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

const roleMap: Record<string, string> = {
  "Artificer": "developers",
  "Bard": "designers",
  "Paladin": "project-managers",
  "Storyteller": "content-creators",
  "Rogue": "sales-business-dev",
};

export default async function DevelopersPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  const modules = getAllModules('developers');

  // Get modules from other roles for "See More"
  const otherClasses = getAllClasses().filter(c => c.name !== "Artificer" && c.name !== "Session 0");
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
      <PageHeader session={session} />
      <Section className="bg-surface-hero py-6 pt-20" size="sm">
        <Container size="lg">
          <div className="flex items-center gap-6 mb-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent-developers-10 border border-accent-developers-20 shadow-md">
              <Hammer className="w-8 h-8 text-accent-developers" />
            </div>
            <div>
              <Heading level={1} className="text-content-primary mb-0 tracking-tight text-2xl md:text-3xl">
                Artificer
              </Heading>
              <p className="text-content-secondary text-sm">
                Developers
              </p>
            </div>
          </div>
          {userClass !== "Artificer" && userClass && (
            <p className="text-content-tertiary text-xs mb-2">
              Exploring Artificer class. Your primary class is {userClass}.
            </p>
          )}
          <p className="text-content-secondary max-w-3xl text-base leading-relaxed">
            Enhance your development capabilities with AI-powered tools. Complete missions to unlock advanced techniques and workflows.
          </p>
        </Container>
      </Section>

      <RolePageContent
        roleName="Artificer"
        roleSlug="developers"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="#0A84FF"
        description="Level up your coding skills with AI assistants."
      />
    </div>
  );
}
