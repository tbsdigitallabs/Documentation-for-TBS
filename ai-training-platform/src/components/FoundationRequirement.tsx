"use client";

import Link from 'next/link';
import { BookOpen, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

interface FoundationRequirementProps {
  incompleteModules: string[];
  totalFoundationModules: number;
}

export function FoundationRequirement({ incompleteModules, totalFoundationModules }: FoundationRequirementProps) {
  const completedCount = totalFoundationModules - incompleteModules.length;
  const progressPercentage = totalFoundationModules > 0 ? (completedCount / totalFoundationModules) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <Section className="py-16" size="lg">
        <Container size="md">
          <div className="bg-surface-card border-2 border-accent-magenta-500/30 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-accent-magenta-5 border-2 border-accent-magenta-500/30 mb-4">
                <Lock className="w-8 h-8 text-accent-magenta-500" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-content-primary mb-3">
                Foundation Training Required
              </h1>
              <p className="text-content-secondary text-lg mb-6">
                Complete all foundational modules before accessing role-specific AI training.
              </p>
            </div>

            <div className="bg-surface-tertiary rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-accent-magenta-500" />
                <h2 className="text-lg font-semibold text-content-primary">
                  Why Foundation Training Matters
                </h2>
              </div>
              <p className="text-content-secondary mb-4">
                Before using AI tools in your role-specific work, you must understand:
              </p>
              <ul className="space-y-2 text-content-secondary list-disc list-inside">
                <li>Cybersecurity best practices for protecting company IP</li>
                <li>How to safely test and integrate AI tools</li>
                <li>Data sanitisation and secure workflows</li>
                <li>When to use enterprise vs public AI solutions</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-content-primary">
                  Foundation Progress
                </span>
                <span className="text-sm text-content-secondary">
                  {completedCount} of {totalFoundationModules} completed
                </span>
              </div>
              <div className="w-full bg-surface-tertiary rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-magenta-500 to-accent-sage-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {incompleteModules.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-content-primary mb-3">
                  Remaining Foundation Modules:
                </h3>
                <div className="space-y-2">
                  {incompleteModules.map((moduleId) => {
                    const moduleSlug = moduleId.replace('session-0/', '');
                    return (
                      <Link
                        key={moduleId}
                        href={`/session-0/${moduleSlug}`}
                        className="block p-3 bg-surface-secondary hover:bg-surface-hover rounded-lg border border-border-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-accent-magenta-500 flex-shrink-0" />
                          <span className="text-sm text-content-primary">
                            {moduleSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/session-0" className="flex-1">
                <Button size="lg" className="w-full bg-accent-magenta-500 hover:bg-accent-magenta-600 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Go to Foundation Training
                </Button>
              </Link>
              <Link href="/class-selection" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Return to Class Selection
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
