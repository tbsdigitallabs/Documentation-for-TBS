import { LucideIcon } from 'lucide-react';
import { Heading } from '@/components/Heading';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';

interface ModuleListHeroProps {
  label: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  accentColor: 'magenta' | 'sage' | 'cyan';
}

const accentClasses = {
  magenta: {
    label: 'text-accent-readable-magenta',
    iconBg: 'bg-accent-magenta-5',
    iconBorder: 'border-accent-magenta-20',
    iconColor: 'text-accent-magenta-500',
  },
  sage: {
    label: 'text-accent-readable-cyan',
    iconBg: 'bg-accent-sage-5',
    iconBorder: 'border-accent-sage-20',
    iconColor: 'text-accent-sage-500',
  },
  cyan: {
    label: 'text-accent-readable-cyan',
    iconBg: 'bg-accent-developers-10',
    iconBorder: 'border-accent-developers-20',
    iconColor: 'text-accent-readable-cyan',
  },
};

export function ModuleListHero({
  label,
  icon: Icon,
  title,
  subtitle,
  description,
  accentColor,
}: ModuleListHeroProps) {
  const accent = accentClasses[accentColor];

  return (
    <Section className="bg-surface-hero py-8 pt-24" size="md">
      <Container size="lg">
        <div className="text-center mb-8">
          <p className={`mono-label ${accent.label} mb-2`}>{label}</p>
          <div className={`inline-flex items-center justify-center p-3 mb-4 rounded-full ${accent.iconBg} border ${accent.iconBorder} shadow-lg`}>
            <Icon className={`w-8 h-8 ${accent.iconColor}`} />
          </div>
          <Heading level={1} className="text-content-primary mb-2 tracking-tight">
            {title}
          </Heading>
          <p className="text-content-secondary mb-4 text-base">
            {subtitle}
          </p>
          <p className="text-content-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
