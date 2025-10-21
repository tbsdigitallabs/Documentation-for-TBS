"use client";

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';

export default function Module1Page() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="bg-surface-header border-b border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-primary.png'}
                alt="TBS Digital Labs"
                width={120}
                height={40}
                className="h-10 w-auto"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
              <div>
                <h1 className="text-2xl font-heading font-bold text-content-primary">
                  Module 1: Cursor IDE Mastery
                </h1>
                <p className="text-sm text-content-secondary">
                  Developer Training
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="w-10 h-10 bg-accent-developers rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">D</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-content-secondary">
              <li><Link href="/" className="hover:text-content-primary">AI Training Platform</Link></li>
              <li className="text-content-tertiary">/</li>
              <li><Link href="/developers" className="hover:text-content-primary">Developer Training</Link></li>
              <li className="text-content-tertiary">/</li>
              <li className="text-content-primary">Module 1: Cursor IDE Mastery</li>
            </ol>
          </nav>

          {/* Module Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-content-primary mb-4">Module 1: Cursor IDE Mastery</h1>
            <p className="text-xl text-content-secondary mb-6">
              Learn to leverage Cursor's AI capabilities for efficient coding and development workflows.
            </p>
            <div className="flex items-center space-x-4 text-sm text-content-tertiary">
              <span>⏱️ 45 minutes</span>
              <span>📚 5 lessons</span>
              <span>🎯 Beginner</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-content-secondary">Progress</span>
              <span className="text-sm text-content-secondary">0%</span>
            </div>
            <div className="w-full bg-surface-tertiary rounded-full h-2">
              <div className="bg-accent-developers h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <div className="bg-surface-card rounded-lg p-6 border border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-content-primary mb-2">Lesson 1: Getting Started with Cursor</h3>
                  <p className="text-content-secondary">Learn the basics of Cursor IDE and its AI-powered features.</p>
                </div>
                <button className="bg-accent-developers text-white px-4 py-2 rounded-md hover:bg-accent-developers/90">
                  Start Lesson
                </button>
              </div>
            </div>

            <div className="bg-surface-card rounded-lg p-6 border border-primary opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-content-tertiary mb-2">Lesson 2: AI Code Generation</h3>
                  <p className="text-content-tertiary">Master the art of generating code with AI assistance.</p>
                </div>
                <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                  Locked
                </button>
              </div>
            </div>

            <div className="bg-surface-card rounded-lg p-6 border border-primary opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-content-tertiary mb-2">Lesson 3: Code Review & Debugging</h3>
                  <p className="text-content-tertiary">Use AI to review and debug your code effectively.</p>
                </div>
                <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                  Locked
                </button>
              </div>
            </div>

            <div className="bg-surface-card rounded-lg p-6 border border-primary opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-content-tertiary mb-2">Lesson 4: Advanced Features</h3>
                  <p className="text-content-tertiary">Explore advanced Cursor features and shortcuts.</p>
                </div>
                <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                  Locked
                </button>
              </div>
            </div>

            <div className="bg-surface-card rounded-lg p-6 border border-primary opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-content-tertiary mb-2">Lesson 5: Best Practices</h3>
                  <p className="text-content-tertiary">Learn best practices for AI-assisted development.</p>
                </div>
                <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                  Locked
                </button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/developers" className="inline-flex items-center text-content-secondary hover:text-content-primary">
              ← Back to Developer Training
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
