import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function TracksLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-surface-primary text-content-primary">
            <Sidebar />
            <main className="flex-1 p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
