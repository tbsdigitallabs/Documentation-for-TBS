"use client";

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { Zap, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the initial render
    return (
      <button
        className="relative inline-flex h-8 w-14 items-center rounded-full border border-border-primary bg-surface-secondary cursor-pointer transition-all duration-200"
        aria-label="Toggle theme"
        role="switch"
        disabled
      >
        <span className="absolute flex h-6 w-6 rounded-full bg-white shadow-md items-center justify-center transition-transform duration-200 translate-x-[2px]">
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-border-primary cursor-pointer transition-all duration-200 hover:border-accent-sage-500 focus:outline-none focus:ring-2 focus:ring-accent-sage-500 focus:ring-offset-2"
      style={{
        backgroundColor: theme === 'dark'
          ? 'var(--color-oxford-blue)'
          : 'var(--color-gray-200)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {/* Toggle circle */}
      <span
        className="absolute flex h-6 w-6 rounded-full shadow-md items-center justify-center transition-transform duration-200"
        style={{
          transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(2px)',
          backgroundColor: theme === 'dark' ? '#1a1a2e' : 'white',
        }}
      >
        {theme === 'dark' ? (
          <Zap className="h-3.5 w-3.5 text-accent-sage-400" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
