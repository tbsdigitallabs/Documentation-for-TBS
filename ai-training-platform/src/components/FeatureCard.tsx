import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  index,
  className
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200",
        "bg-surface-card border-border-primary",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="mb-4 p-3 rounded-lg bg-accent-magenta/10 w-fit">
        <Icon className="w-6 h-6 text-accent-magenta" />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-content-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-content-secondary">
        {description}
      </p>
    </motion.div>
  );
}
