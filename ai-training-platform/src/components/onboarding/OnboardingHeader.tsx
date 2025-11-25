"use client";

import { Sparkles, Upload } from "lucide-react";

interface OnboardingHeaderProps {
  step: "questions" | "image";
}

export default function OnboardingHeader({ step }: OnboardingHeaderProps) {
  if (step === "questions") {
    return (
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-magenta/20 mb-4">
          <Sparkles className="w-8 h-8 text-cyber-magenta" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
          Gearing Up for Your Adventure
        </h1>
        <p className="text-content-secondary">
          Answer a few questions to craft your adventurer's profile
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-cyan/20 mb-4">
        <Upload className="w-8 h-8 text-cyber-cyan" />
      </div>
      <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
        Choose Your Avatar
      </h1>
      <p className="text-content-secondary">
        Upload an AI-generated portrait to represent your adventurer in the realm
      </p>
    </div>
  );
}

