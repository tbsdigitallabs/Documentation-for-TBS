"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { User } from 'lucide-react';

type FrameStyle = 'starter' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'animated' | 'legendary';

interface AvatarFrameProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  frameStyle?: FrameStyle;
  effectStyle?: string;
  className?: string;
}

const frameClasses: Record<FrameStyle, string> = {
  starter: 'frame-starter',
  bronze: 'frame-bronze',
  silver: 'frame-silver',
  gold: 'frame-gold',
  platinum: 'frame-platinum',
  animated: 'frame-animated',
  legendary: 'frame-legendary',
};

export function AvatarFrame({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  frameStyle = 'starter',
  effectStyle,
  className 
}: AvatarFrameProps) {
  const sizeClasses = {
    sm: 'max-w-[120px]',
    md: 'max-w-[180px]',
    lg: 'max-w-[220px]'
  };
  
  return (
    <div className={cn(
      'char-avatar-frame mx-auto', 
      sizeClasses[size], 
      frameClasses[frameStyle],
      effectStyle && `effect-${effectStyle}`,
      className
    )}>
      <div className="char-avatar-inner relative w-full aspect-square">
        {src ? (
          <Image 
            src={src} 
            alt={alt || 'Avatar'} 
            fill 
            className="object-cover" 
            unoptimized={src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/api/images/') || src.includes('dicebear.com')}
            onError={(e) => {
              console.error('[AvatarFrame] Image load error:', src, e);
            }}
          />
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

