"use client";

import { useTheme } from './ThemeProvider';
import { useEffect, useState, useRef } from 'react';
import { Zap, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const previousTheme = useRef(theme);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Easter egg: show message when switching themes
  useEffect(() => {
    if (mounted && previousTheme.current !== theme) {
      if (previousTheme.current === 'dark' && theme === 'light') {
        setEasterEggMessage("Ouch, who turned on the big light?");
      } else if (previousTheme.current === 'light' && theme === 'dark') {
        setEasterEggMessage("Ahh, that's better.");
      }
      const timer = setTimeout(() => setEasterEggMessage(null), 3000);
      previousTheme.current = theme;
      return () => clearTimeout(timer);
    }
    previousTheme.current = theme;
  }, [theme, mounted]);

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
    <div className="relative">
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
            backgroundColor: theme === 'dark' ? 'var(--color-surface-card)' : 'white',
          }}
        >
          {theme === 'dark' ? (
            <Zap className="h-3.5 w-3.5 text-accent-sage-400" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-amber-500" />
          )}
        </span>
      </button>

      {/* Easter egg speech bubble */}
      {easterEggMessage && (
        <div className="absolute right-0 top-full mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative bg-surface-card border border-border-primary rounded-lg shadow-xl px-3 py-2 max-w-[200px]">
            {/* Speech bubble triangle */}
            <div className="absolute -top-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white dark:border-b-[var(--color-surface-card)]" />
            <div className="absolute -top-[10px] right-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] border-b-border-primary" style={{ marginRight: '-1px' }} />
            <p className="text-xs text-content-secondary italic">
              &ldquo;{easterEggMessage}&rdquo;
            </p>
            <p className="text-[10px] text-content-tertiary mt-1 text-right">
              — David
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
