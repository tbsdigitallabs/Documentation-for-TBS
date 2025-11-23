"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const errorMessages: Record<string, string> = {
        Configuration: "There is a problem with the server configuration.",
        AccessDenied: "Access denied. Please use your @thebigsmoke.com.au or @tbsdigitallabs.com.au email address.",
        Verification: "The verification token has expired or has already been used.",
        Default: "An error occurred during authentication.",
    };

    return (
        <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Logo showText={false} />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
                        Authentication Error
                    </h1>
                </div>

                {/* Error Card */}
                <div className="bg-surface-card rounded-xl shadow-lg border border-border-primary p-8">
                    <div className="text-center mb-6">
                        <div className="mb-4 text-6xl">⚠️</div>
                        <p className="text-content-secondary mb-4">
                            {errorMessages.Default}
                        </p>
                        <div className="mt-6 space-y-4">
                            <Link
                                href="/auth/signin"
                                className="inline-block w-full px-4 py-3 border-button rounded-lg shadow-md bg-button text-button hover:bg-button-hover hover:border-button-hover transition-colors duration-200 font-semibold text-center"
                            >
                                Try Again
                            </Link>
                            <Link
                                href="/"
                                className="inline-block w-full px-4 py-3 text-content-secondary hover:text-content-primary transition-colors duration-200 text-center"
                            >
                                Return Home
                            </Link>
                        </div>
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

