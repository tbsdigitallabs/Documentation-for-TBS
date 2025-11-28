import { getAllModules } from '@/lib/mdx';
import { BookOpen } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageHeader from '@/components/PageHeader';
import { ModuleListPage } from '@/components/ModuleListPage';

export const dynamic = 'force-static';

export default async function Session0Page() {
  // Session 0 uses 'shared' role for foundational content
  const modules = getAllModules('shared');
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <PageHeader session={session} />
      <ModuleListPage
        modules={modules}
        hero={{
          label: 'FOUNDATION TRAINING',
          icon: BookOpen,
          title: 'Session 0',
          subtitle: 'Core Systems Training',
          description: 'Master the fundamentals of AI tools and concepts that apply to all team members. Complete these modules before accessing role-specific training.',
          accentColor: 'magenta',
        }}
        moduleConfig={{
          routePrefix: 'session-0',
          prefixLabel: 'MISSION',
          buttonText: 'Deploy',
          accentColor: 'magenta',
        }}
        emptyState={{
          title: 'AWAITING MODULE DATA...',
          description: 'Foundation modules coming soon.',
        }}
      />
    </div>
  );
}

