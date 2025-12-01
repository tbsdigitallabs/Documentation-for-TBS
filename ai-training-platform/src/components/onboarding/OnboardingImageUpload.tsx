"use client";

import { Upload, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface OnboardingImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateAvatar: () => Promise<void>;
  onUpload: () => void;
  onSkip: () => void;
  loading: boolean;
}

export default function OnboardingImageUpload({
  imagePreview,
  onImageSelect,
  onGenerateAvatar,
  onUpload,
  onSkip,
  loading,
}: OnboardingImageUploadProps) {
  const [generating, setGenerating] = useState(false);

  const handleGenerateAvatar = async () => {
    setGenerating(true);
    try {
      await onGenerateAvatar();
    } catch (error) {
      console.error("Failed to generate avatar:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
      {!imagePreview ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-surface-tertiary border-2 border-dashed border-border-secondary flex items-center justify-center mb-4">
              <Upload className="w-12 h-12 text-content-tertiary" />
            </div>
            <p className="text-content-secondary mb-6">
              Choose your avatar
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={handleGenerateAvatar}
              disabled={loading || generating}
              className="inline-flex items-center px-6 py-3 bg-cyber-magenta text-white rounded-lg hover:bg-cyber-magenta/80 transition-colors font-semibold disabled:bg-disabled disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Avatar
                </>
              )}
            </button>

            <span className="text-content-tertiary text-sm">or</span>

            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={onImageSelect}
                className="hidden"
                disabled={loading || generating}
              />
              <div className="px-6 py-3 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors inline-block disabled:bg-disabled disabled:cursor-not-allowed">
                Upload Your Own Image
              </div>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-cyber-cyan">
            <Image
              src={imagePreview}
              alt="Profile preview"
              width={192}
              height={192}
              className="w-full h-full object-cover"
              unoptimized={!!imagePreview && (imagePreview.startsWith('data:') || imagePreview.startsWith('blob:') || imagePreview.startsWith('/api/images/'))}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleGenerateAvatar}
                disabled={loading || generating}
                className="flex-1 px-4 py-2 bg-surface-secondary text-content-primary rounded-lg hover:bg-surface-hover transition-colors text-center font-semibold disabled:bg-disabled disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Avatar
                  </>
                )}
              </button>
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageSelect}
                  className="hidden"
                  disabled={loading || generating}
                />
                <div className="px-4 py-2 bg-surface-secondary text-content-primary rounded-lg hover:bg-surface-hover transition-colors text-center font-semibold disabled:bg-disabled disabled:cursor-not-allowed">
                  Upload Different Image
                </div>
              </label>
            </div>
            <button
              onClick={onUpload}
              disabled={loading || generating}
              className="w-full px-4 py-2 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors disabled:bg-disabled disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  Uploading...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onSkip}
        disabled={loading}
        className="w-full mt-4 px-4 py-2 text-content-secondary hover:text-content-primary transition-colors text-center"
      >
        Skip for now
      </button>
    </div>
  );
}

