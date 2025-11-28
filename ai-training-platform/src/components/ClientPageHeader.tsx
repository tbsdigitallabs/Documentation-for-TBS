"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

export default function ClientPageHeader() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-primary px-5 py-3 border-b border-border-primary h-16 max-h-16">
      <Logo />
      <div className="flex items-center gap-4">
        {session?.user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded-full bg-surface-secondary hover:bg-surface-hover transition-colors text-content-secondary hover:text-content-primary"
            >
              {session.user.profile?.profileImage || session.user.image ? (
                <img
                  src={session.user.profile?.profileImage || session.user.image || ''}
                  alt={session.user.name || 'Profile'}
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
    </div>
  );
}

