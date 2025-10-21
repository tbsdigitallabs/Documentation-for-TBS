"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function SignIn() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signIn("google", { 
        redirect: false,
        callbackUrl: "/class-selection"
      });
      
      if (result?.error) {
        setError("Access denied. Please use your @thebigsmoke.com.au or @tbsdigitallabs.com.au email address.");
      }
    } catch (error) {
      setError("An error occurred during sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-primary.png'}
              alt="TBS Digital Labs"
              width={120}
              height={40}
              className="h-12 w-auto"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
            Welcome to AI Training Platform
          </h1>
          <p className="text-content-secondary">
            Sign in with your TBS email to begin your AI mastery journey
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-surface-card rounded-xl shadow-lg border border-primary p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-content-primary mb-2">
              Access Required
            </h2>
            <p className="text-sm text-content-secondary">
              This platform is restricted to TBS Digital Labs team members
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
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

          {/* Email Requirements */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Authorized Email Domains
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• @thebigsmoke.com.au</li>
              <li>• @tbsdigitallabs.com.au</li>
            </ul>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
