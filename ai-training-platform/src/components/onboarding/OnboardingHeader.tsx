"use client";

import { Sparkles, Upload } from "lucide-react";

interface OnboardingHeaderProps {
  step: "questions" | "image";
}

export default function OnboardingHeader({ step }: OnboardingHeaderProps) {
  if (step === "questions") {
    return (
      <div className="text-center mb-8">
        <p className="mono-label text-accent-readable-cyan mb-3">SETUP YOUR PROFILE</p>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-magenta-100 dark:bg-accent-magenta-500/20 mb-4">
          <Sparkles className="w-7 h-7 text-accent-readable-magenta" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-content-primary mb-2">
          Personnel Configuration
        </h1>
        <p className="text-content-secondary text-sm">
          Complete the following to configure your profile
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <p className="mono-label text-accent-readable-cyan mb-3">PROFILE CUSTOMISATION</p>
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-sage-100 dark:bg-accent-sage-500/20 mb-4">
        <Upload className="w-7 h-7 text-accent-readable-cyan" />
      </div>
      <h1 className="text-2xl font-heading font-bold text-content-primary mb-2">
        Upload Avatar
      </h1>
      <p className="text-content-secondary text-sm">
        Add a profile image to personalise your personnel file
      </p>
    </div>
  );
}
