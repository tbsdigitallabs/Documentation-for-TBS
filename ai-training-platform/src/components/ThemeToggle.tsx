"use client";

import { useTheme } from './ThemeProvider';
import { useEffect, useState, useRef } from 'react';
import { Zap, Sun, Moon } from 'lucide-react';

interface PopupPosition {
  placement: 'top' | 'bottom' | 'left' | 'right';
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  trianglePosition: 'left' | 'right' | 'top' | 'bottom';
  triangleOffset: number;
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
  const previousTheme = useRef(theme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate popup position based on viewport
  const calculatePopupPosition = (): PopupPosition | null => {
    if (!buttonRef.current || !containerRef.current) return null;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 16; // Minimum padding from viewport edges
    const popupMinWidth = 240; // Wider minimum width
    const popupMaxWidth = 400; // Wider maximum width
    const popupEstimatedHeight = 70; // Reduced height estimate

    // Convert button position from viewport coordinates to container-relative coordinates
    const buttonLeft = buttonRect.left - containerRect.left;

    // Calculate available space in each direction (using viewport for space calculation)
    const spaceBelow = viewportHeight - buttonRect.bottom - padding;
    const spaceAbove = buttonRect.top - padding;
    const spaceRight = viewportWidth - buttonRect.right - padding;
    const spaceLeft = buttonRect.left - padding;

    // Determine best placement
    let placement: 'top' | 'bottom' | 'left' | 'right';
    let trianglePosition: 'left' | 'right' | 'top' | 'bottom';
    let triangleOffset: number;
    let width: number;
    let position: { left?: number; right?: number; top?: number; bottom?: number } = {};

    // Prefer bottom if enough space, otherwise top
    if (spaceBelow >= popupEstimatedHeight) {
      placement = 'bottom';
      trianglePosition = 'top';
      // Calculate button center in viewport coordinates for space calculations
      const buttonCenterXViewport = buttonRect.left + buttonRect.width / 2;
      const idealWidth = Math.min(popupMaxWidth, Math.max(popupMinWidth, spaceRight + spaceLeft - 32));
      width = idealWidth;

      // Calculate popup left position in viewport coordinates
      let popupLeftViewport: number;
      if (buttonCenterXViewport - idealWidth / 2 < padding) {
        popupLeftViewport = padding;
      } else if (buttonCenterXViewport + idealWidth / 2 > viewportWidth - padding) {
        popupLeftViewport = viewportWidth - padding - idealWidth;
      } else {
        popupLeftViewport = buttonCenterXViewport - idealWidth / 2;
      }

      // Convert to container-relative coordinates
      const popupLeft = popupLeftViewport - containerRect.left;

      // Triangle offset is the distance from popup left edge to button center (container-relative)
      const buttonCenterX = buttonLeft + buttonRect.width / 2;
      triangleOffset = buttonCenterX - popupLeft;

      position = {
        top: buttonRect.height + 8,
        left: popupLeft,
      };
    } else if (spaceAbove >= popupEstimatedHeight) {
      placement = 'top';
      trianglePosition = 'bottom';
      const buttonCenterXViewport = buttonRect.left + buttonRect.width / 2;
      const idealWidth = Math.min(popupMaxWidth, Math.max(popupMinWidth, spaceRight + spaceLeft - 32));
      width = idealWidth;

      // Calculate popup left position in viewport coordinates
      let popupLeftViewport: number;
      if (buttonCenterXViewport - idealWidth / 2 < padding) {
        popupLeftViewport = padding;
      } else if (buttonCenterXViewport + idealWidth / 2 > viewportWidth - padding) {
        popupLeftViewport = viewportWidth - padding - idealWidth;
      } else {
        popupLeftViewport = buttonCenterXViewport - idealWidth / 2;
      }

      // Convert to container-relative coordinates
      const popupLeft = popupLeftViewport - containerRect.left;

      // Triangle offset (container-relative)
      const buttonCenterX = buttonLeft + buttonRect.width / 2;
      triangleOffset = buttonCenterX - popupLeft;

      position = {
        bottom: buttonRect.height + 8,
        left: popupLeft,
      };
    } else if (spaceRight >= popupMinWidth) {
      placement = 'right';
      trianglePosition = 'left';
      triangleOffset = buttonRect.height / 2;
      position = {
        left: buttonRect.width + 8,
        top: 0,
      };
      width = Math.min(popupMaxWidth, Math.max(popupMinWidth, spaceRight - 16));
    } else {
      placement = 'left';
      trianglePosition = 'right';
      triangleOffset = buttonRect.height / 2;
      position = {
        right: buttonRect.width + 8,
        top: 0,
      };
      width = Math.min(popupMaxWidth, Math.max(popupMinWidth, spaceLeft - 16));
    }

    return {
      placement,
      ...position,
      width,
      trianglePosition,
      triangleOffset,
    };
  };

  // Easter egg: show message when switching themes
  useEffect(() => {
    if (mounted && previousTheme.current !== theme) {
      if (previousTheme.current === 'dark' && theme === 'light') {
        setEasterEggMessage("Ouch, who turned on the big light?");
      } else if (previousTheme.current === 'light' && theme === 'dark') {
        setEasterEggMessage("Ahh, that's better.");
      }
      const timer = setTimeout(() => {
        setEasterEggMessage(null);
        setPopupPosition(null);
      }, 3000);
      previousTheme.current = theme;
      return () => clearTimeout(timer);
    }
    previousTheme.current = theme;
  }, [theme, mounted]);

  // Calculate position when message appears or window resizes
  useEffect(() => {
    if (easterEggMessage && buttonRef.current) {
      const updatePosition = () => {
        requestAnimationFrame(() => {
          const position = calculatePopupPosition();
          setPopupPosition(position);
        });
      };

      // Initial calculation
      updatePosition();

      // Recalculate on window resize
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [easterEggMessage]);

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
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
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
            <Moon className="h-3.5 w-3.5 text-accent-sage-400" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-amber-500" />
          )}
        </span>
      </button>

      {/* Easter egg speech bubble */}
      {easterEggMessage && popupPosition && (
        <div
          className="absolute z-50 animate-in fade-in slide-in-from-top-2 duration-300"
          style={{
            ...(popupPosition.top !== undefined ? { top: `${popupPosition.top}px` } : {}),
            ...(popupPosition.bottom !== undefined ? { bottom: `${popupPosition.bottom}px` } : {}),
            ...(popupPosition.left !== undefined ? { left: `${popupPosition.left}px` } : {}),
            ...(popupPosition.right !== undefined ? { right: `${popupPosition.right}px` } : {}),
            width: `${popupPosition.width}px`,
          }}
        >
          <div className="relative bg-surface-card border border-border-primary rounded-lg shadow-xl px-4 py-3">
            {/* Speech bubble triangle */}
            {popupPosition.trianglePosition === 'top' && (
              <>
                <div
                  className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white dark:border-b-[var(--color-surface-card)]"
                  style={{
                    top: '-8px',
                    left: `${popupPosition.triangleOffset}px`,
                    transform: 'translateX(-50%)',
                  }}
                />
                <div
                  className="absolute w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] border-b-border-primary"
                  style={{
                    top: '-10px',
                    left: `${popupPosition.triangleOffset}px`,
                    transform: 'translateX(-50%)',
                    marginLeft: '-1px',
                  }}
                />
              </>
            )}
            {popupPosition.trianglePosition === 'bottom' && (
              <>
                <div
                  className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white dark:border-t-[var(--color-surface-card)]"
                  style={{
                    bottom: '-8px',
                    left: `${popupPosition.triangleOffset}px`,
                    transform: 'translateX(-50%)',
                  }}
                />
                <div
                  className="absolute w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-border-primary"
                  style={{
                    bottom: '-10px',
                    left: `${popupPosition.triangleOffset}px`,
                    transform: 'translateX(-50%)',
                    marginLeft: '-1px',
                  }}
                />
              </>
            )}
            {popupPosition.trianglePosition === 'left' && (
              <>
                <div
                  className="absolute w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white dark:border-r-[var(--color-surface-card)]"
                  style={{
                    left: '-8px',
                    top: `${popupPosition.triangleOffset}px`,
                    transform: 'translateY(-50%)',
                  }}
                />
                <div
                  className="absolute w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[9px] border-r-border-primary"
                  style={{
                    left: '-10px',
                    top: `${popupPosition.triangleOffset}px`,
                    transform: 'translateY(-50%)',
                    marginTop: '-1px',
                  }}
                />
              </>
            )}
            {popupPosition.trianglePosition === 'right' && (
              <>
                <div
                  className="absolute w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white dark:border-l-[var(--color-surface-card)]"
                  style={{
                    right: '-8px',
                    top: `${popupPosition.triangleOffset}px`,
                    transform: 'translateY(-50%)',
                  }}
                />
                <div
                  className="absolute w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[9px] border-l-border-primary"
                  style={{
                    right: '-10px',
                    top: `${popupPosition.triangleOffset}px`,
                    transform: 'translateY(-50%)',
                    marginTop: '-1px',
                  }}
                />
              </>
            )}
            <p className="text-sm text-content-secondary italic leading-snug whitespace-normal">
              &ldquo;{easterEggMessage}&rdquo;
            </p>
            <p className="text-xs text-content-tertiary mt-1.5 text-right">
              — David
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
