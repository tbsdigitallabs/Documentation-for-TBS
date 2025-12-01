import React from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { Heading } from './Heading';
import { FeatureCard } from './FeatureCard';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeaturesSectionProps {
  title: string;
  description: string;
  features: Feature[];
  className?: string;
}

export function FeaturesSection({
  title,
  description,
  features
}: FeaturesSectionProps) {
  return (
    <Section size="lg" className="bg-surface-secondary">
      <Container size="full">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl font-bold mb-4 text-content-primary">
            {title}
          </Heading>
          <p className="text-lg max-w-3xl mx-auto text-content-secondary">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
