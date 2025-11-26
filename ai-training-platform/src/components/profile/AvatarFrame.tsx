"use client";

import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarFrameProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarFrame({ src, alt = 'Avatar', size = 'md', className }: AvatarFrameProps) {
  const sizeClasses = {
    sm: 'max-w-[120px]',
    md: 'max-w-[180px]',
    lg: 'max-w-[220px]'
  };
  
  return (
    <div className={cn('char-avatar-frame mx-auto', sizeClasses[size], className)}>
      <div className="char-avatar-inner">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-accent-sage-100 to-accent-magenta-100 dark:from-accent-sage-500/10 dark:to-accent-magenta-500/10">
            <User className="w-1/2 h-1/2 text-accent-sage-400 dark:text-accent-sage-500/40" />
          </div>
        )}
      </div>
      <div className="corner-accent corner-accent-tl" />
      <div className="corner-accent corner-accent-tr" />
      <div className="corner-accent corner-accent-bl" />
      <div className="corner-accent corner-accent-br" />
    </div>
  );
}

