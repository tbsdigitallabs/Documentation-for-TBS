"use client";

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

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
        className="relative inline-flex h-10 w-16 items-center rounded-full border-2 border-[var(--color-gray-300)] cursor-pointer transition-all duration-200"
        aria-label="Toggle theme"
        role="switch"
        disabled
      >
        <span className="absolute flex h-7 w-7 rounded-full bg-white shadow-md items-center justify-center transition-transform duration-200 translate-x-[4px]">
          <svg
            className="h-4 w-4 flex-shrink-0"
            style={{ color: 'var(--accent-magenta-500)' }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-16 items-center rounded-full border-2 border-[var(--color-gray-300)] cursor-pointer transition-all duration-200 hover:border-[var(--accent-magenta-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-magenta-500)] focus:ring-offset-2"
      style={{
        backgroundColor: theme === 'dark'
          ? 'var(--color-oxford-blue)'
          : 'var(--color-gray-200)',
        borderColor: theme === 'dark'
          ? 'var(--color-gray-600)'
          : 'var(--color-gray-300)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {/* Toggle circle */}
      <span
        className="absolute flex h-7 w-7 rounded-full bg-white dark:bg-gray-800 shadow-md items-center justify-center transition-transform duration-200"
        style={{
          transform: theme === 'dark' ? 'translateX(28px)' : 'translateX(4px)',
        }}
      >
        {theme === 'dark' ? (
          <svg
            className="h-4 w-4 flex-shrink-0"
            style={{ color: 'var(--color-gray-300)' }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 flex-shrink-0"
            style={{ color: 'var(--accent-magenta-500)' }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </span>
    </button>
  );
}
