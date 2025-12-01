"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastMessage } from '@/components/DavidToast';

interface Toast {
  id: string;
  message: string;
}

type EncouragementType = 'moduleComplete' | 'levelUp' | 'firstModule' | 'streak' | 'rewardUnlocked';

const ENCOURAGEMENT_MESSAGES: Record<EncouragementType, string[]> = {
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

function getRandomMessage(type: EncouragementType): string {
  const messages = ENCOURAGEMENT_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

interface ToastContextType {
  showToast: (message: string) => void;
  showEncouragement: (type: EncouragementType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message }]);
  }, []);

  const showEncouragement = useCallback((type: EncouragementType) => {
    const message = getRandomMessage(type);
    showToast(message);
  }, [showToast]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showEncouragement }}>
      {children}
      {/* Toast container - fixed at bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
