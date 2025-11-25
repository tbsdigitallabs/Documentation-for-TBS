"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import { getClassRoute } from '@/lib/role-mapping';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Only call useSession after component mounts to avoid SSR issues
  const sessionResult = mounted ? useSession() : { data: null, status: 'loading' as const };
  const { data: session, status } = sessionResult;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const selectedClass = session.user.profile?.selectedClass;

      if (selectedClass) {
        // Redirect to user's role page
        const route = getClassRoute(selectedClass);
        router.push(route);
      } else {
        // Redirect to class selection if no class selected
        router.push("/class-selection");
      }
    }
  }, [mounted, status, session, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-surface-primary text-content-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-content-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-surface-primary text-content-primary">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
          <Logo />
          <ThemeToggle />
        </div>

        <main className="px-5 pt-28 pb-10">
          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <h1 className="text-[32px] font-heading font-bold text-content-primary mb-3 leading-tight tracking-tight">Empower Your Work with AI</h1>
            <p className="body-regular text-content-secondary mb-8">
              Choose your class and embark on an exciting adventure to master AI tools. Level up your skills with role-specific challenges designed for TBS Digital Labs team members.
            </p>
            <Link href="/auth/signin" className="btn-primary inline-block">
              Log in
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Authenticated users will be redirected, but show loading as fallback
  return (
    <div className="min-h-screen bg-surface-primary text-content-primary flex items-center justify-center">
      <div className="text-center">
        <p className="text-content-secondary">Redirecting...</p>
      </div>
    </div>
  );
}
