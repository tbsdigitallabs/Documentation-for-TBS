"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'accent' | 'developers' | 'designers' | 'project-managers';
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className = '', 
  showLabel = true,
  label,
  color = 'accent'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    accent: 'bg-gradient-to-r from-accent-designers to-accent-project-managers',
    developers: 'bg-accent-developers',
    designers: 'bg-accent-designers',
    'project-managers': 'bg-accent-project-managers'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-content-secondary">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-content-tertiary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="progress-tech h-2">
        <motion.div
          className={`progress-fill ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
