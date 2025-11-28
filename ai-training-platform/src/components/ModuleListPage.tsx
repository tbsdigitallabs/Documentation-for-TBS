import Link from 'next/link';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { ModuleListHero } from '@/components/ModuleListHero';
import { ModuleCard } from '@/components/ModuleCard';
import type { ModuleMetadata } from '@/lib/mdx';
import { LucideIcon } from 'lucide-react';

interface ModuleListPageProps {
  modules: ModuleMetadata[];
  hero: {
    label: string;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
    accentColor: 'magenta' | 'sage' | 'cyan';
  };
  moduleConfig: {
    routePrefix: string;
    prefixLabel: string;
    buttonText: string;
    accentColor?: 'magenta' | 'sage' | 'cyan';
  };
  emptyState?: {
    title: string;
    description: string;
  };
  backLink?: {
    href: string;
    text: string;
  };
}

export function ModuleListPage({
  modules,
  hero,
  moduleConfig,
  emptyState = {
    title: 'AWAITING MODULE DATA...',
    description: 'Modules coming soon.',
  },
  backLink = {
    href: '/class-selection',
    text: '← Return to Role Selection',
  },
}: ModuleListPageProps) {
  return (
    <>
      <ModuleListHero {...hero} />

      <Section className="bg-gradient-surface py-16" size="lg">
        <Container size="xl">
          {modules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {modules.map((module) => (
                <ModuleCard
                  key={module.slug}
                  module={module}
                  {...moduleConfig}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-content-secondary text-lg mb-4 mono-text">{emptyState.title}</p>
              <p className="text-content-tertiary">{emptyState.description}</p>
            </div>
          )}

          {backLink && (
            <div className="text-center mt-12">
              <Link
                href={backLink.href}
                className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors text-base font-medium"
              >
                {backLink.text}
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
