"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

export default function HeaderNav() {
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Use theme-specific logo, fallback to dark logo if not mounted yet
    const logoSrc = mounted 
        ? (theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png')
        : '/images/logo-dark.png';

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4' : 'pt-0'}`}>
            <nav
                className={`
          transition-all duration-500 ease-out
          flex items-center justify-between
          ${scrolled
                        ? 'w-[90%] max-w-5xl rounded-full border border-border-primary bg-surface-header/80 backdrop-blur-xl shadow-lg px-6 py-2 mt-2'
                        : 'w-full border-b border-border-primary bg-surface-header/80 backdrop-blur-md px-6 py-2'
                    }
        `}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src={logoSrc}
                        alt="TBS Lab"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-1">
                    {[
                        { name: 'Tracks', path: '/class-selection' },
                        { name: 'Developers', path: '/developers' },
                        { name: 'Managers', path: '/project-managers' },
                        { name: 'Designers', path: '/designers' },
                    ].map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="px-4 py-2 rounded-full text-sm font-medium text-content-secondary hover:text-content-primary hover:bg-surface-secondary/50 dark:hover:bg-white/5 transition-all duration-200"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
