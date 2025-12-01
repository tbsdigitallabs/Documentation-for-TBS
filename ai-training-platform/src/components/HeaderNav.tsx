"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function HeaderNav() {
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { data: session } = useSession();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/auth/login' });
    };

    // Use theme-specific logo
    const logoSrc = mounted
        ? (theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png')
        : '/images/logo-light.png';

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4' : 'pt-0'}`}>
            <nav
                className={`
          transition-all duration-500 ease-out
          flex items-center justify-between
          ${scrolled
                        ? 'w-[90%] max-w-5xl rounded-full border border-border-primary bg-surface-primary shadow-lg px-6 py-2 mt-2'
                        : 'w-full border-b border-border-primary bg-surface-primary px-6 py-2'
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
                    {session?.user && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 px-2 py-1 rounded-full bg-surface-secondary hover:bg-surface-hover transition-colors text-content-secondary hover:text-content-primary"
                            >
                                {session.user.image || session.user.profile?.profileImage ? (
                                    <Image
                                        src={session.user.profile?.profileImage || session.user.image || ''}
                                        alt={session.user.name || 'Profile'}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-surface-tertiary flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                                <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-surface-card border border-border-primary rounded-xl shadow-xl overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-border-primary">
                                        <p className="text-sm font-semibold text-content-primary truncate">
                                            {session.user.name || 'Team Member'}
                                        </p>
                                        <p className="text-xs text-content-tertiary truncate">
                                            {session.user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-content-secondary hover:bg-surface-hover hover:text-content-primary transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                        View Profile
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
