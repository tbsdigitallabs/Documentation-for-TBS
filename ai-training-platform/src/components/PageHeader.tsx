import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { User } from 'lucide-react';
import type { Session } from 'next-auth';

interface PageHeaderProps {
  session: Session | null;
}

export default function PageHeader({ session }: PageHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
      <Logo />
      <div className="flex items-center gap-4">
        {session?.user && (
          <Link
            href="/profile"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-secondary hover:bg-surface-hover transition-colors text-content-secondary hover:text-content-primary"
            title="View Profile"
          >
            {session.user.profile?.profileImage || session.user.image ? (
              <Image
                src={session.user.profile?.profileImage || session.user.image || ''}
                alt={session.user.name || 'Profile'}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}

