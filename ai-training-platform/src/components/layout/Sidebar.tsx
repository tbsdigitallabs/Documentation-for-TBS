import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, GraduationCap, TrendingUp, User } from 'lucide-react';

export function Sidebar() {
    return (
        <aside className="w-64 bg-surface-secondary/40 dark:bg-surface-secondary/60 p-6 flex flex-col justify-between hidden md:flex h-screen sticky top-0 border-r border-border-primary">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <Image
                        src="/images/tbs-lab-logo.png"
                        alt="TBSLab Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                    />
                    <div>
                        <span className="text-xl font-bold text-content-primary">TBSLab</span>
                        <span className="block text-sm text-content-secondary">LearningLab</span>
                    </div>
                </div>
                <nav className="space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 text-content-secondary hover:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-2 text-cyber-cyan bg-cyber-cyan/10 font-semibold rounded-lg transition-colors">
                        <GraduationCap className="w-5 h-5" />
                        <span>Learning</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-2 text-content-secondary hover:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <TrendingUp className="w-5 h-5" />
                        <span>Progress</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-2 text-content-secondary hover:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
