"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  linkTo?: string;
}

export default function Logo({ className = "", showText = true, linkTo = "/" }: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use theme-specific logo
  const logoSrc = mounted
    ? (theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png')
    : '/images/logo-light.png';

  const logoContent = (
    <div className={`flex items-center gap-3 h-full ${className}`}>
      <Image
        src={logoSrc}
        alt="TBS Lab"
        width={200}
        height={67}
        className="max-h-10 w-auto object-contain"
        priority
      />
      {showText && (
        <span className="text-xl font-heading font-bold text-content-primary">LearningLab</span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

