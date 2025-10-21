import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: string | number;
  progress?: number;
}

interface TrainingProgressCardProps {
  stats: StatItem[];
  title?: string;
  className?: string;
}

export function TrainingProgressCard({
  stats,
  title = "Your Training Progress",
  className
}: TrainingProgressCardProps) {
  return (
    <motion.div 
      className={cn(
        "rounded-xl shadow-lg p-6 border bg-surface-card border-border-primary",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-6 text-content-primary font-heading">
        {title}
      </h3>
      <div className="space-y-5">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-content-secondary font-body">
                {stat.label}
              </span>
              <span className="text-lg font-semibold text-content-primary font-heading">
                {stat.value}
              </span>
            </div>
            {stat.progress !== undefined && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-magenta to-accent-sage rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
