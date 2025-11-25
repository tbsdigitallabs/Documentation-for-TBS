import { getAllModules } from '@/lib/mdx';
import { Coins } from 'lucide-react';
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

export default async function SalesBusinessDevPage() {
  const session = await getServerSession(authOptions);
  const userClass = session?.user?.profile?.selectedClass;
  const modules = getAllModules('sales');
  
  const otherClasses = getAllClasses().filter(c => c.name !== "Rogue" && c.name !== "Session 0");
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
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-accent-sales-business-10 border border-accent-sales-business-20">
              <Coins className="w-12 h-12 text-accent-sales-business" />
            </div>
            <Heading level={1} className="text-content-primary mb-2">
              Rogue
            </Heading>
            <p className="text-content-secondary mb-6 text-lg">
              Sales & Business Development
            </p>
            {userClass !== "Rogue" && userClass && (
              <p className="text-content-tertiary text-sm mb-4">
                You're exploring the Rogue class. Your primary class is {userClass}.
              </p>
            )}
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Level up your sales skills with AI-powered adventures. Unlock powerful tools to accelerate business development and close more deals.
            </p>
          </div>
        </Container>
      </Section>

      <RolePageContent
        roleName="Rogue"
        roleSlug="sales-business-dev"
        userClass={userClass}
        modules={modules}
        otherModules={otherModules}
        accentColor="#EF4444"
        Icon={Coins}
        description="Level up your sales skills with AI-powered adventures."
      />
    </div>
  );
}
