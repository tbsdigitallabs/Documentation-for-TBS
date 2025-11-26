"use client";

import { Loader2 } from "lucide-react";

interface OnboardingLoadingStateProps {
  message?: string;
}

export default function OnboardingLoadingState({
  message = "Initialising systems...",
}: OnboardingLoadingStateProps) {
  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-sage-600 dark:text-accent-sage-400" />
        <p className="text-content-secondary">{message}</p>
      </div>
    </div>
  );
}

