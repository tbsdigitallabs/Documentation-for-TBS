import { getAllModules } from '@/lib/mdx';
import { Wrench } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageHeader from '@/components/PageHeader';
import { ModuleListPage } from '@/components/ModuleListPage';

export const dynamic = 'force-static';

export default async function ToolsPage() {
  const modules = getAllModules('tools');
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <PageHeader session={session} />
      <ModuleListPage
        modules={modules}
        hero={{
          label: 'OPTIONAL TOOLS',
          icon: Wrench,
          title: 'AI Tools & Best Practices',
          subtitle: 'Tool-Specific Guides',
          description: 'Learn best practices and standard operating procedures for specific AI tools. These modules are optional and can be completed at any time.',
          accentColor: 'sage',
        }}
        moduleConfig={{
          routePrefix: 'tools',
          prefixLabel: 'TOOL',
          buttonText: 'Start',
          accentColor: 'sage',
        }}
        emptyState={{
          title: 'AWAITING MODULE DATA...',
          description: 'Tool modules coming soon.',
        }}
      />
    </div>
  );
}
