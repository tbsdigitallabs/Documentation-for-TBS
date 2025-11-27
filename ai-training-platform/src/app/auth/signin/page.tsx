"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    setIsDev(
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    );
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/class-selection"
      });

      if (result?.error) {
        setError("Access denied. Please try again or contact support.");
      } else if (result?.ok) {
        router.push("/class-selection");
      }
    } catch (error) {
      setError("An error occurred during sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevSkip = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("dev-skip", {
        redirect: false,
        callbackUrl: "/class-selection"
      });

      if (result?.ok) {
        router.push("/class-selection");
      } else if (result?.error) {
        setError("Dev skip auth failed. Please use Google sign in.");
      }
    } catch (error) {
      setError("An error occurred during dev skip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
            Welcome to LearningLab
          </h1>
          <p className="text-content-secondary">
            Begin your quest to master AI tools and level up your skills
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-surface-card rounded-xl shadow-lg border border-border-primary p-8">
          <div className="flex items-center justify-between mb-6">
            <Logo showText={false} className="h-12 w-auto" />
            <h2 className="text-xl font-semibold text-content-primary">
              Sign In
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error border border-error rounded-lg">
              <p className="text-sm text-error-light">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border-button rounded-lg shadow-md bg-button text-button hover:bg-button-hover hover:border-button-hover transition-colors duration-200 disabled:bg-disabled disabled:text-disabled disabled:border-disabled disabled:cursor-not-allowed font-semibold"
          >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-content-tertiary mr-3"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </button>

          {/* Dev Skip Auth Button (Development Only) */}
          {/* {isDev && (
            <>
              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-border-primary"></div>
                <span className="px-3 text-sm text-content-tertiary">or</span>
                <div className="flex-1 border-t border-border-primary"></div>
              </div>
              <button
                onClick={handleDevSkip}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-border-secondary rounded-lg bg-surface-secondary text-content-secondary hover:bg-surface-hover hover:border-border-hover transition-colors duration-200 disabled:bg-disabled disabled:text-disabled disabled:border-disabled disabled:cursor-not-allowed font-semibold text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-content-tertiary mr-2"></div>
                    Skipping auth...
                  </div>
                ) : (
                  <span>Skip Auth (Dev Only)</span>
                )}
              </button>
            </>
          )} */}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
