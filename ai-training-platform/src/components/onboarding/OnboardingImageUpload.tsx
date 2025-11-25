"use client";

import { Upload, ExternalLink, Loader2 } from "lucide-react";

interface OnboardingImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onSkip: () => void;
  loading: boolean;
}

export default function OnboardingImageUpload({
  imagePreview,
  onImageSelect,
  onUpload,
  onSkip,
  loading,
}: OnboardingImageUploadProps) {
  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
      {!imagePreview ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-surface-tertiary border-2 border-dashed border-border-secondary flex items-center justify-center mb-4">
              <Upload className="w-12 h-12 text-content-tertiary" />
            </div>
            <p className="text-content-secondary mb-4">
              Need to forge your avatar?
            </p>
            <a
              href="https://nanobanana.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-cyber-magenta text-white rounded-lg hover:bg-cyber-magenta/80 transition-colors mb-6 font-semibold"
            >
              Visit Nano Banana to Create Your Avatar
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={onImageSelect}
              className="hidden"
            />
            <div className="px-6 py-3 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors inline-block">
              Upload Image
            </div>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-cyber-cyan">
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={onImageSelect}
                className="hidden"
              />
              <div className="px-4 py-2 bg-surface-secondary text-content-primary rounded-lg hover:bg-surface-hover transition-colors text-center font-semibold">
                Change Image
              </div>
            </label>
            <button
              onClick={onUpload}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors disabled:bg-disabled disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  Uploading...
                </>
              ) : (
                "Complete Adventure Setup"
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

