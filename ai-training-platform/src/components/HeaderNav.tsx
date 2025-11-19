"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

// Glitch functionality removed based on updated brief

export default function HeaderNav() {
    const { theme } = useTheme();
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-surface-header backdrop-blur-md border-b border-primary shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                        <Link href="/" className="flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-primary.png'}
                                    alt="TBS Digital Labs"
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto"
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                                <span className="text-heading-3 text-content-primary hidden sm:inline">AI Training Hub</span>
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-content-secondary" style={{ flexShrink: 0 }}>
                            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={`whitespace-nowrap transition-colors px-2 py-1 text-sm font-medium ${pathname === '/' ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`} style={{ display: 'block' }}>Home</Link>
                            <Link href="/class-selection" aria-current={pathname.startsWith('/class-selection') ? 'page' : undefined} className={`whitespace-nowrap transition-colors px-2 py-1 text-sm font-medium ${pathname.startsWith('/class-selection') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`} style={{ display: 'block' }}>Tracks</Link>
                            <Link href="/developers" aria-current={pathname.startsWith('/developers') ? 'page' : undefined} className={`whitespace-nowrap transition-colors px-2 py-1 text-sm font-medium ${pathname.startsWith('/developers') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`} style={{ display: 'block' }}>My Progress</Link>
                            <Link href="/docs/australian-english-guide" aria-current={pathname.startsWith('/docs') ? 'page' : undefined} className={`whitespace-nowrap transition-colors px-2 py-1 text-sm font-medium ${pathname.startsWith('/docs') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`} style={{ display: 'block' }}>Help</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

        </header>
    );
}


