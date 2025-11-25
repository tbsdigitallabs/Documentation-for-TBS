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
      <Section className="bg-surface-hero py-16 pt-28" size="md">
        <Container size="lg">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-accent-magenta-5 border border-accent-magenta-20 shadow-lg">
              <BookOpen className="w-12 h-12 text-accent-magenta-500" />
            </div>
            <Heading level={1} className="text-content-primary mb-2 tracking-tight">
              Session 0
            </Heading>
            <p className="text-content-secondary mb-6 text-lg">
              Foundational Knowledge
            </p>
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Master the fundamentals of AI tools and concepts that apply to all roles. Build your foundation before diving into role-specific adventures.
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
                    <span className="text-xs font-mono text-accent-magenta-500 uppercase tracking-wider px-2 py-1 rounded-md bg-accent-magenta-5 border border-accent-magenta-20 inline-block">
                      ADVENTURE {module.slug.split('-')[0].padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                  <p className="body-regular text-content-secondary mb-8">
                    {module.description || "Complete this adventure to unlock new skills."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-content-tertiary mb-8 pt-4 border-t border-border-primary">
                    <span className="flex items-center gap-2">⏱️ {module.estimatedTime || "30 mins"}</span>
                    <span className="flex items-center gap-2">🎯 {module.difficulty || "Beginner"}</span>
                  </div>

                  <Link href={`/session-0/${module.slug}`} className="mt-auto">
                    <Button className="w-full bg-accent-magenta-500 text-white hover:bg-accent-magenta-600 py-3 text-base">
                      Begin Adventure
                    </Button>
                  </Link>
                </HoloCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-content-secondary text-lg mb-4">Foundational adventures coming soon!</p>
              <p className="text-content-tertiary">Check back soon for Session 0 content.</p>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-16">
            <Link href="/class-selection" className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors text-lg font-medium">
              ← Back to Class Selection
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

