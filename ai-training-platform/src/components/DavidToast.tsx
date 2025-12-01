"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface DavidToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

// Default export for layout.tsx (placeholder component)
export default function DavidToast() {
  // This component is a placeholder for the global toast container
  // The actual toast logic is managed by ToastContext
  return null;
}

export function ToastMessage({ message, onClose, duration = 4000 }: DavidToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div className="relative bg-surface-card border border-border-primary rounded-lg shadow-xl px-4 py-3 max-w-[90vw] w-auto sm:max-w-[400px] min-w-[280px]">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-2 right-2 text-content-tertiary hover:text-content-primary transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
        <p className="text-sm text-content-primary pr-4">
          &ldquo;{message}&rdquo;
        </p>
        <p className="text-xs text-content-tertiary mt-1 text-right">
          — David
        </p>
      </div>
    </div>
  );
}

// Encouragement messages for different achievements
// Using explicit type instead of keyof typeof to avoid initialization order issues
type EncouragementType = 'moduleComplete' | 'levelUp' | 'firstModule' | 'streak' | 'rewardUnlocked';

export const ENCOURAGEMENT_MESSAGES: Record<EncouragementType, string[]> = {
  moduleComplete: [
    "Nice work, you're on fire!",
    "Another one bites the dust!",
    "Look at you go!",
    "That's the spirit!",
    "You're absolutely smashing it!",
    "Keep that momentum going!",
  ],
  levelUp: [
    "Level up! You're evolving!",
    "New level unlocked. Impressive.",
    "You're getting stronger!",
    "The grind is paying off!",
    "Look at those skills levelling up!",
  ],
  firstModule: [
    "First module done! Welcome to the club.",
    "And so the journey begins...",
    "That's the first step sorted!",
  ],
  streak: [
    "You're on a streak! Don't stop now!",
    "Consistent effort, consistent results!",
  ],
  rewardUnlocked: [
    "Ooh, shiny new reward!",
    "You've earned something special!",
    "New cosmetic unlocked. Looking good!",
  ],
};

export function getRandomMessage(type: EncouragementType): string {
  const messages = ENCOURAGEMENT_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

