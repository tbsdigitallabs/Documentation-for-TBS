import React from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { Heading } from './Heading';
import { Button } from './ui/button';
import Link from 'next/link';

interface Action {
  label: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary';
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  className
}: CTASectionProps) {
  return (
    <Section size="md" className="bg-surface-primary">
      <Container size="lg">
        <div className="text-center rounded-2xl p-12 text-white bg-gradient-brand">
          <Heading level={2} className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            {title}
          </Heading>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryAction.href}>
              <Button variant={primaryAction.variant || "secondary"} size="lg">
                {primaryAction.label}
              </Button>
            </Link>
            {secondaryAction && (
              <Link href={secondaryAction.href}>
                <Button 
                  variant={secondaryAction.variant || "outline"} 
                  size="lg"
                  className="border-white text-white hover:bg-white"
                >
                  {secondaryAction.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
