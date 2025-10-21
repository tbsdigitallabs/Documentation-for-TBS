import React from 'react';
import { cn } from '@/lib/utils';

interface StatItem {
    label: string;
    value: string | number;
    progress?: number;
}

interface StatsPanelProps {
    stats: StatItem[];
    className?: string;
    layout?: 'horizontal' | 'vertical' | 'grid';
}

export function StatsPanel({
    stats,
    className,
    layout = 'horizontal'
}: StatsPanelProps) {
    const layoutClasses = {
        horizontal: 'flex flex-col sm:flex-row gap-3',
        vertical: 'flex flex-col gap-3',
        grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
    };

    return (
        <div className={cn('card-professional p-4', layoutClasses[layout], className)}>
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col min-w-0 flex-1">
                    <div className="text-xs text-content-tertiary mb-1 font-medium">
                        {stat.label}
                    </div>
                    <div className="text-lg font-semibold text-content-primary mb-2">
                        {stat.value}
                    </div>
                    {stat.progress !== undefined && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className={cn(
                                    "h-full bg-gradient-to-r from-accent-magenta to-accent-sage rounded-full transition-all duration-300",
                                    stat.progress === 0 ? "w-0" : stat.progress === 25 ? "w-1/4" : stat.progress === 50 ? "w-1/2" : stat.progress === 75 ? "w-3/4" : stat.progress === 100 ? "w-full" : "w-0"
                                )}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}