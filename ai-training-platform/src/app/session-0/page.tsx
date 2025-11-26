import { getAllModules } from '@/lib/mdx';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { HoloCard } from '@/components/HoloCard';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-static';

export default async function Session0Page() {
  // Session 0 uses 'shared' role for foundational content
  const modules = getAllModules('shared');
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <PageHeader session={session} />
      {/* Hero Section */}
      <Section className="bg-surface-hero py-8 pt-24" size="md">
        <Container size="lg">
          <div className="text-center mb-8">
            <p className="mono-label text-accent-readable-magenta mb-2">TRAINING PROTOCOL // FOUNDATION</p>
            <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-accent-magenta-5 border border-accent-magenta-20 shadow-lg">
              <BookOpen className="w-8 h-8 text-accent-magenta-500" />
            </div>
            <Heading level={1} className="text-content-primary mb-2 tracking-tight">
              Session 0
            </Heading>
            <p className="text-content-secondary mb-4 text-base">
              Core Systems Training
            </p>
            <p className="text-content-secondary max-w-2xl mx-auto text-lg leading-relaxed">
              Master the fundamentals of AI tools and concepts that apply to all operatives. Complete these modules before accessing role-specific missions.
            </p>
          </div>
        </Container>
      </Section>

      {/* Modules Section */}
      <Section className="bg-gradient-surface py-16" size="lg">
        <Container size="xl">
          {modules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {modules.map((module) => (
                <HoloCard key={module.slug} className="flex flex-col h-full">
                  <div className="mb-6">
                    <span className="mono-label text-accent-magenta-500 px-2 py-1 rounded-md bg-accent-magenta-5 border border-accent-magenta-20 inline-block">
                      MISSION {module.slug.split('-')[0].padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                  <p className="body-regular text-content-secondary mb-8">
                    {module.description || "Complete this module to unlock new capabilities."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-content-tertiary mb-8 pt-4 border-t border-border-primary">
                    <span className="flex items-center gap-2">⏱️ {module.estimatedTime || "30 mins"}</span>
                    <span className="flex items-center gap-2">🎯 {module.difficulty || "Beginner"}</span>
                  </div>

                  <Link href={`/session-0/${module.slug}`} className="mt-auto">
                    <Button variant="default" size="lg" className="w-full">
                      Deploy
                    </Button>
                  </Link>
                </HoloCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-content-secondary text-lg mb-4 mono-text">AWAITING MODULE DATA...</p>
              <p className="text-content-tertiary">Foundation modules coming soon.</p>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-12">
            <Link href="/class-selection" className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors text-base font-medium">
              ← Return to Operative Selection
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

