"use client";

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';

interface ModuleLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    role: string;
    rolePath: string;
    moduleNumber: number;
    totalLessons: number;
    estimatedTime: string;
    progress?: number;
}

export default function ModuleLayout({
    children,
    title,
    description,
    role,
    rolePath,
    moduleNumber,
    totalLessons,
    estimatedTime,
    progress = 0
}: ModuleLayoutProps) {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen bg-surface-primary">
            {/* Header */}
            <header className="bg-surface-header border-b border-primary">
                <Container className="py-4">
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
                                <Heading level={2} className="text-content-primary">
                                    {title}
                                </Heading>
                                <p className="text-small text-content-secondary">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <div className="w-10 h-10 bg-accent-developers rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {role.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Main Content */}
            <Section className="bg-surface-primary min-h-screen">
                <Container>
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-content-secondary">
                            <li><Link href="/" className="hover:text-content-primary">AI Training Platform</Link></li>
                            <li className="text-content-tertiary">/</li>
                            <li><Link href={rolePath} className="hover:text-content-primary">{role} Training</Link></li>
                            <li className="text-content-tertiary">/</li>
                            <li className="text-content-primary">{title}</li>
                        </ol>
                    </nav>

                    {/* Module Header */}
                    <div className="mb-8">
                        <Heading level={1} className="text-content-primary mb-4">{title}</Heading>
                        <p className="text-content-secondary mb-6">{description}</p>

                        {/* Module Metadata */}
                        <div className="flex items-center space-x-6 text-sm text-content-tertiary mb-6">
                            <div className="flex items-center">
                                <span className="mr-2">📚</span>
                                {totalLessons} lessons
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">⏱️</span>
                                {estimatedTime}
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">🎯</span>
                                Module {moduleNumber}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-surface-tertiary rounded-full h-2 mb-6">
                            <div
                                className="bg-accent-developers h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Module Content */}
                    <div className="bg-surface-card rounded-lg border border-primary p-6">
                        {children}
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Link href={rolePath} className="inline-flex items-center text-content-secondary hover:text-content-primary">
                            ← Back to {role} Training
                        </Link>
                    </div>
                </Container>
            </Section>
            );
}
