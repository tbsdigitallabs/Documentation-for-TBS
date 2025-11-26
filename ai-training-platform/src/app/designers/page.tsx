import { getAllModules } from '@/lib/mdx';
import { Sparkles } from 'lucide-react';
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

export default async function DesignersPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  const modules = getAllModules('designers');

  const otherClasses = getAllClasses().filter(c => c.name !== "Bard" && c.name !== "Session 0");
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
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent-designers-10 border border-accent-designers-20 shadow-md">
              <Sparkles className="w-8 h-8 text-accent-designers" />
            </div>
            <div>
              <Heading level={1} className="text-content-primary mb-0 tracking-tight text-2xl md:text-3xl">
                Bard
              </Heading>
              <p className="text-content-secondary text-sm">
                Designers
              </p>
            </div>
          </div>
          {userClass !== "Bard" && userClass && (
            <p className="text-content-tertiary text-xs mb-2">
              Exploring Bard class. Your primary class is {userClass}.
            </p>
          )}
          <p className="text-content-secondary max-w-3xl text-base leading-relaxed">
            Embark on creative adventures with AI design tools. Level up your visual skills and unlock powerful workflows.
          </p>
        </Container>
      </Section>

      <RolePageContent
        roleName="Bard"
        roleSlug="designers"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="#FFB800"
        description="Embark on creative adventures with AI design tools."
      />
    </div>
  );
}
