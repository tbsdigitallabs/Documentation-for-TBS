"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  role?: 'developers' | 'designers' | 'project-managers' | 'content-creators' | 'sales-business';
}

export function HoloCard({
  children,
  className,
  role
}: HoloCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const roleColors = {
    developers: 'from-accent-developers',
    designers: 'from-accent-designers',
    'project-managers': 'from-accent-project-managers',
    'content-creators': 'from-accent-content-creators',
    'sales-business': 'from-accent-sales-business'
  };

  const borderGradient = role && roleColors[role] ? roleColors[role] : 'from-accent-magenta-500';

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "relative group rounded-xl border border-white/10 bg-surface-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent-magenta-500/10 flex flex-col",
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-20">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${borderGradient} to-transparent opacity-20`}
          style={style}
        />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {children}
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none z-0" />
    </div>
  );
}
