import { getAllModules } from '@/lib/mdx';
import { Scroll } from 'lucide-react';
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

export default async function ContentCreatorsPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  const modules = getAllModules('content-creators');
  
  const otherClasses = getAllClasses().filter(c => c.name !== "Storyteller" && c.name !== "Session 0");
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
      <Section className="bg-surface-hero py-16 pt-28" size="md">
        <Container size="lg">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-accent-content-creators-10 border border-accent-content-creators-20">
              <Scroll className="w-12 h-12 text-accent-content-creators" />
            </div>
            <Heading level={1} className="text-content-primary mb-2">
              Storyteller
            </Heading>
            <p className="text-content-secondary mb-6 text-lg">
              Content Creators & PR
            </p>
            {userClass !== "Storyteller" && userClass && (
              <p className="text-content-tertiary text-sm mb-4">
                You're exploring the Storyteller class. Your primary class is {userClass}.
              </p>
            )}
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Embark on content creation adventures with AI writing assistants. Level up your skills and unlock powerful creative tools.
            </p>
          </div>
        </Container>
      </Section>

      <RolePageContent
        roleName="Storyteller"
        roleSlug="content-creators"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="#850AFF"
        description="Embark on content creation adventures with AI writing assistants."
      />
    </div>
  );
}
