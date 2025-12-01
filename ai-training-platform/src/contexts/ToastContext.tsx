"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastMessage, getRandomMessage, ENCOURAGEMENT_MESSAGES } from '@/components/DavidToast';

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
  showEncouragement: (type: keyof typeof ENCOURAGEMENT_MESSAGES) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message }]);
  }, []);

  const showEncouragement = useCallback((type: keyof typeof ENCOURAGEMENT_MESSAGES) => {
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
