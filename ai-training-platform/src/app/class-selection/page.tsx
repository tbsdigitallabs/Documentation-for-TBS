"use client";

import Link from "next/link";
import { BookOpen, Hammer, Sparkles, Shield, Scroll, Coins } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

export default function ClassSelectionPage() {
    const classes = [
        {
            classType: "Session 0",
            jobTitle: "Foundational Knowledge",
            icon: BookOpen,
            accentColor: "#D56EED",
            adventures: "5 Adventures",
            href: "/session-0"
        },
        {
            classType: "Artificer",
            jobTitle: "Developers",
            icon: Hammer,
            accentColor: "#0A84FF",
            adventures: "5 Adventures",
            href: "/developers"
        },
        {
            classType: "Bard",
            jobTitle: "Designers",
            icon: Sparkles,
            accentColor: "#FFB800",
            adventures: "3 Adventures",
            href: "/designers"
        },
        {
            classType: "Paladin",
            jobTitle: "Project Managers",
            icon: Shield,
            accentColor: "#00C48C",
            adventures: "7 Adventures",
            href: "/project-managers"
        },
        {
            classType: "Storyteller",
            jobTitle: "Content Creators & PR",
            icon: Scroll,
            accentColor: "#850AFF",
            adventures: "3 Adventures",
            href: "/content-creators"
        },
        {
            classType: "Rogue",
            jobTitle: "Sales & Business",
            icon: Coins,
            accentColor: "#EF4444",
            adventures: "4 Adventures",
            href: "/sales-business-dev"
        }
    ];

    return (
        <div className="min-h-screen bg-surface-primary text-content-primary">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
                <Logo />
                <ThemeToggle />
            </div>

            {/* Main Content */}
            <main className="px-5 pt-24 pb-10">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-[32px] font-heading font-bold text-content-primary mb-3 leading-tight tracking-tight">Start Your AI Adventure</h1>
                    <p className="body-regular text-content-secondary mb-8">
                        Choose your class and embark on an exciting journey to master AI tools. Level up your skills with hands-on adventures designed for your role.
                    </p>
                </div>
            </main>

            {/* Class Selection - Horizontal Scroll */}
            <div className="px-5 pb-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[22px] font-heading font-bold text-content-primary mb-4 leading-tight tracking-tight text-center">Choose Your Class</h2>
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 justify-center">
                        {classes.map((classItem) => {
                            const Icon = classItem.icon;
                            return (
                                <Link
                                    key={classItem.classType}
                                    href={classItem.href}
                                    className="flex flex-col shrink-0 w-40 rounded-2xl p-4 glass-card hover:scale-105 transition-transform"
                                >
                                    <div className="flex items-center justify-center size-12 rounded-xl mb-4" style={{ backgroundColor: `${classItem.accentColor}33` }}>
                                        <Icon className="text-3xl" style={{ color: classItem.accentColor }} />
                                    </div>
                                    <h3 className="text-base font-body font-semibold text-content-primary mb-1 leading-tight">{classItem.classType}</h3>
                                    <p className="text-xs font-body font-normal text-content-secondary mb-2" style={{ opacity: 0.7 }}>{classItem.jobTitle}</p>
                                    <p className="text-sm font-body font-normal text-content-secondary" style={{ opacity: 0.6 }}>{classItem.adventures}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
