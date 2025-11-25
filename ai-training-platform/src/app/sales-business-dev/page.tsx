"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getAllModules } from '@/lib/mdx';
import Link from 'next/link';
import { Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { HoloCard } from '@/components/HoloCard';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import { getClassDisplayName, getAllClasses, type ClassInfo } from '@/lib/role-mapping';

export const dynamic = 'force-dynamic';

const roleMap: Record<string, string> = {
  "Artificer": "developers",
  "Bard": "designers",
  "Paladin": "project-managers",
  "Storyteller": "content-creators",
  "Rogue": "sales-business-dev",
};

export default function SalesBusinessDevPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const userClass = session?.user?.profile?.selectedClass;
  const isUserClass = userClass === "Rogue";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-content-secondary">Loading...</p>
        </div>
      </div>
    );
  }

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
            {!isUserClass && userClass && (
              <p className="text-content-tertiary text-sm mb-4">
                You're exploring the Rogue class. Your primary class is {getClassDisplayName(userClass)}.
              </p>
            )}
            <p className="text-content-secondary max-w-2xl mx-auto text-xl leading-relaxed">
              Level up your sales skills with AI-powered adventures. Unlock powerful tools to accelerate business development and close more deals.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-surface py-16" size="lg">
        <Container size="xl">
          <h2 className="text-2xl font-heading font-bold text-content-primary mb-6">
            {isUserClass ? "Your Adventures" : "Rogue Adventures"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-12">
            {modules.map((module) => (
              <HoloCard key={module.slug} role="sales-business" className="flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-xs font-mono text-accent-sales-business uppercase tracking-wider px-2 py-1 rounded-md bg-accent-sales-business-5 border border-accent-sales-business-10 inline-block">
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
                <Link href={`/sales-business-dev/${module.slug}`} className="mt-auto">
                  <Button className="w-full bg-accent-sales-business text-white hover:bg-accent-sales-business-90 py-3 text-base">
                    Begin Adventure
                  </Button>
                </Link>
              </HoloCard>
            ))}
          </div>

          {otherModules.length > 0 && (
            <div className="mt-12">
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full flex items-center justify-between px-6 py-4 bg-surface-card rounded-lg border border-border-primary hover:bg-surface-hover transition-colors mb-6"
              >
                <span className="text-lg font-semibold text-content-primary">
                  Explore Other Classes
                </span>
                {showMore ? (
                  <ChevronUp className="w-5 h-5 text-content-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-content-secondary" />
                )}
              </button>

              {showMore && (
                <div className="space-y-8">
                  {otherModules.map(({ class: classInfo, modules: mods }) => (
                    <div key={classInfo.name}>
                      <h3 className="text-xl font-heading font-bold text-content-primary mb-4">
                        {classInfo.name} - {classInfo.jobTitle}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {mods.slice(0, 3).map((module) => (
                          <HoloCard key={module.slug} role={roleMap[classInfo.name] as any} className="flex flex-col h-full">
                            <div className="mb-6">
                              <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-md inline-block">
                                ADVENTURE {module.slug.split('-')[0].padStart(2, '0')}
                              </span>
                            </div>
                            <h2 className="heading-3 text-content-primary mb-4 flex-grow">{module.title}</h2>
                            <p className="body-regular text-content-secondary mb-8">
                              {module.description || "Learn new skills in this module."}
                            </p>
                            <Link href={`${classInfo.route}/${module.slug}`} className="mt-auto">
                              <Button className="w-full py-3 text-base">
                                View Adventure
                              </Button>
                            </Link>
                          </HoloCard>
                        ))}
                      </div>
                      {mods.length > 3 && (
                        <div className="mt-4 text-center">
                          <Link href={classInfo.route} className="text-content-secondary hover:text-content-primary transition-colors">
                            View all {classInfo.name} adventures →
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
