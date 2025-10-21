"use client";

import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'accent' | 'developers' | 'designers' | 'project-managers' | 'content-creators' | 'sales-business';
  hover?: boolean;
}

export default function GlowCard({ 
  children, 
  className = '', 
  glowColor = 'accent',
  hover = true 
}: GlowCardProps) {
  const glowClasses = {
    accent: 'glow-accent-subtle',
    developers: 'border-glow',
    designers: 'glow-accent-subtle',
    'project-managers': 'border-glow',
    'content-creators': 'glow-accent-subtle',
    'sales-business': 'border-glow'
  };

  const cardClass = `card-tech rounded-xl p-6 ${glowClasses[glowColor]} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={cardClass}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 25px rgba(213, 110, 237, 0.4)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClass}>
      {children}
    </div>
  );
}
