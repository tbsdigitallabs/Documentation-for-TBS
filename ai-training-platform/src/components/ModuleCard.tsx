import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HoloCard } from '@/components/HoloCard';
import type { ModuleMetadata } from '@/lib/mdx';

interface ModuleCardProps {
  module: ModuleMetadata;
  routePrefix: string;
  prefixLabel: string;
  buttonText: string;
  accentColor?: 'magenta' | 'sage' | 'cyan';
}

const accentClasses = {
  magenta: {
    badge: 'text-accent-magenta-500 bg-accent-magenta-5 border-accent-magenta-20',
  },
  sage: {
    badge: 'text-accent-sage-500 bg-accent-sage-5 border-accent-sage-20',
  },
  cyan: {
    badge: 'text-accent-cyan-500 bg-accent-cyan-5 border-accent-cyan-20',
  },
};

export function ModuleCard({
  module,
  routePrefix,
  prefixLabel,
  buttonText,
  accentColor = 'magenta',
}: ModuleCardProps) {
  const accent = accentClasses[accentColor];
  const moduleNumber = module.slug.split('-')[0].padStart(2, '0');

  return (
    <HoloCard className="flex flex-col h-full">
      <div className="mb-6">
        <span className={`mono-label ${accent.badge} px-2 py-1 rounded-md border inline-block`}>
          {prefixLabel} {moduleNumber}
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

      <Link href={`/${routePrefix}/${module.slug}`} className="mt-auto">
        <Button variant="default" size="lg" className="w-full">
          {buttonText}
        </Button>
      </Link>
    </HoloCard>
  );
}
