"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';

export default function Home() {

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