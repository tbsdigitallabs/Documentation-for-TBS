import { getAllModules } from '@/lib/mdx';
import Link from 'next/link';
import { Hammer } from 'lucide-react';
import { HoloCard } from '@/components/HoloCard';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';

export const dynamic = 'force-static';

export default function DevelopersPage() {
  const modules = getAllModules('developers');

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header with Theme Toggle */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
        <Logo />
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <Section className="bg-surface-hero py-16 pt-28" size="md">
        <Container size="lg">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-accent-developers-10 border border-accent-developers-20 shadow-lg">
              <Hammer className="w-12 h-12 text-accent-developers" />
            </div>
            <Heading level={1} className="text-content-primary mb-2 tracking-tight">
              Artificer
            </Heading>
            <p className="text-content-secondary mb-6 text-lg">
              Developers
            </p>
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Level up your coding skills with AI assistants. Complete adventures to unlock new abilities and master powerful tools.
            </p>
          </div>
        </Container>
      </Section>

      {/* Modules Section */}
      <Section className="bg-gradient-surface py-16" size="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {modules.map((module) => (
              <HoloCard key={module.slug} role="developers" className="flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-xs font-mono text-accent-developers uppercase tracking-wider px-2 py-1 rounded-md bg-accent-developers-5 border border-accent-developers-10 inline-block">
                    ADVENTURE {module.slug.split('-')[0].padStart(2, '0')}
                  </span>
                </div>
                <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                <p className="body-regular text-content-secondary mb-8">
                  {module.description || "Learn new skills in this module."}
                </p>

                <div className="flex items-center justify-between text-sm text-content-tertiary mb-8 pt-4 border-t border-border-primary">
                  <span className="flex items-center gap-2">⏱️ {module.estimatedTime || "30 mins"}</span>
                  <span className="flex items-center gap-2">🎯 {module.difficulty || "Intermediate"}</span>
                </div>

                <Link href={`/developers/${module.slug}`} className="mt-auto">
                  <Button className="w-full bg-accent-developers text-white hover:bg-accent-developers-90 py-3 text-base">
                    Begin Adventure
                  </Button>
                </Link>
              </HoloCard>
            ))}
          </div>

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