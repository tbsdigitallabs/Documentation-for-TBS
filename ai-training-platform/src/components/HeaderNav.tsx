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
            <div className="container mx-auto container-padding py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
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
                                <span className="text-heading-3 text-content-primary">AI Training Hub</span>
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-content-secondary">
                            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={`transition-colors ${pathname === '/' ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`}>Home</Link>
                            <Link href="/class-selection" aria-current={pathname.startsWith('/class-selection') ? 'page' : undefined} className={`transition-colors ${pathname.startsWith('/class-selection') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`}>Tracks</Link>
                            <Link href="/developers" aria-current={pathname.startsWith('/developers') ? 'page' : undefined} className={`transition-colors ${pathname.startsWith('/developers') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`}>My Progress</Link>
                            <Link href="/docs/australian-english-guide" aria-current={pathname.startsWith('/docs') ? 'page' : undefined} className={`transition-colors ${pathname.startsWith('/docs') ? 'text-content-primary border-b-2 border-accent-designers' : 'hover:text-content-primary'}`}>Help</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

        </header>
    );
}


