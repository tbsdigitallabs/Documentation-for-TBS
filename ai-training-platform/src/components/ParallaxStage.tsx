'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxStageProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  disabled?: boolean;
}

export function ParallaxStage({ 
  children, 
  className,
  speed = 'normal',
  disabled = false
}: ParallaxStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  const speedClasses = {
    slow: 'transform-gpu',
    normal: 'transform-gpu',
    fast: 'transform-gpu'
  };

  const speedValues = {
    slow: 0.5,
    normal: 1,
    fast: 1.5
  };

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!stageRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speedValues[speed] * 0.5;
      
      stageRef.current.style.transform = `translateY(${rate}px)`;
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disabled]);

  return (
    <div 
      ref={stageRef}
      className={cn(
        'relative',
        speedClasses[speed],
        className
      )}
    >
      {children}
    </div>
  );
}