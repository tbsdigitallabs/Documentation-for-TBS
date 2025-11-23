import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell } from 'lucide-react';

export function TopNav() {
    return (
        <header className="sticky top-0 z-50 glass-card bg-background-dark/80 border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/tbs-lab-logo.png"
                        alt="TBSLab Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto"
                    />
                    <span className="text-xl font-semibold text-white">LearningLab</span>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                        <Link href="#" className="hover:text-primary transition-colors">Courses</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Tracks</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Community</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
                    </nav>
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
