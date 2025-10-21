'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlitchLayerProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchLayer({ 
  children, 
  className,
  enabled = false,
  intensity = 'medium'
}: GlitchLayerProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const intensityClasses = {
    low: 'glitch-low',
    medium: 'glitch-medium', 
    high: 'glitch-high'
  };

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    // Trigger glitch on key events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Enter') {
        triggerGlitch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div 
      className={cn(
        'relative',
        intensityClasses[intensity],
        isGlitching && 'glitch-active',
        className
      )}
    >
      {children}
    </div>
  );
}