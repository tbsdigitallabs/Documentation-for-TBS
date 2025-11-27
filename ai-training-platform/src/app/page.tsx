"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getClassRoute } from '@/lib/role-mapping';
import ClientPageHeader from '@/components/ClientPageHeader';

export default function Home() {
  const router = useRouter();

  // Always call useSession - Rules of Hooks require consistent hook order
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

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
  }, [status, session, router]);

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
        <ClientPageHeader />

        <main className="px-5 pt-28 pb-10">
          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <h1 className="text-[32px] font-heading font-bold text-content-primary mb-3 leading-tight tracking-tight">Empower Your Work with AI</h1>
            <p className="text-xs font-mono text-accent-magenta-500 mb-2">SYSTEM VERSION: 2.0 (CYBERPUNK)</p>
            <p className="body-regular text-content-secondary mb-8">
              Select your operative class and begin your AI mastery journey. Each track contains specialised missions designed for TBS Digital Labs team members.
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
