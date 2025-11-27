"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Hammer, Sparkles, Shield, Scroll, Coins } from "lucide-react";
import { getClassRoute, getAllClasses, CLASS_NAMES, type ClassInfo } from "@/lib/role-mapping";
import ClientPageHeader from "@/components/ClientPageHeader";
import { Leaderboard } from "@/components/Leaderboard";

export default function ClassSelectionPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && status === "authenticated" && session?.user?.profile?.selectedClass) {
            setSelectedClass(session.user.profile.selectedClass);
        }
    }, [mounted, status, session]);

    const handleClassSelect = async (classInfo: ClassInfo) => {
        setSelectedClass(classInfo.name);

        // Update session with selected class
        await update({
            profile: {
                ...session?.user?.profile,
                selectedClass: classInfo.name,
            },
        });

        // Redirect to selected role page
        router.push(classInfo.route);
    };

    const classes = getAllClasses().filter(c => c.name !== CLASS_NAMES.FOUNDATION); // Exclude Foundation from main selection

    const classIcons: Record<string, typeof Hammer> = {
        [CLASS_NAMES.DEVELOPERS]: Hammer,
        [CLASS_NAMES.DESIGNERS]: Sparkles,
        [CLASS_NAMES.PROJECT_MANAGERS]: Shield,
        [CLASS_NAMES.CONTENT_CREATORS]: Scroll,
        [CLASS_NAMES.SALES]: Coins,
        [CLASS_NAMES.FOUNDATION]: BookOpen,
    };

    const classColors: Record<string, string> = {
        [CLASS_NAMES.DEVELOPERS]: "var(--color-accent-developers)",
        [CLASS_NAMES.DESIGNERS]: "var(--color-accent-designers)",
        [CLASS_NAMES.PROJECT_MANAGERS]: "var(--color-accent-project-managers)",
        [CLASS_NAMES.CONTENT_CREATORS]: "var(--color-accent-content-creators)",
        [CLASS_NAMES.SALES]: "var(--color-accent-sales-business)",
        [CLASS_NAMES.FOUNDATION]: "var(--accent-magenta-500)",
    };

    if (!mounted || status === "loading") {
        return (
            <div className="min-h-screen bg-surface-primary text-content-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-content-secondary mono-text text-sm">INITIALISING SYSTEM...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-primary text-content-primary">
            <ClientPageHeader />

            {/* Main Content */}
            <main className="px-5 pt-24 pb-10">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="mono-label text-accent-readable-cyan mb-2">TBS DIGITAL LABS // TRAINING DIVISION // CYBERPUNK MODE ACTIVE</p>
                    <h1 className="text-[32px] font-heading font-bold text-content-primary mb-3 leading-tight tracking-tight">Initialise Training Protocol</h1>
                    <p className="body-regular text-content-secondary mb-8">
                        Select your operative class and begin your AI mastery journey. Each track contains specialised missions designed for your role.
                    </p>
                </div>
            </main>

            {/* Class Selection with Leaderboard */}
            <div className="px-5 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <h2 className="text-xl font-heading font-bold text-content-primary mb-6 leading-tight tracking-tight text-center lg:text-left">Select Operative Class</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                {classes.map((classItem) => {
                                    const Icon = classIcons[classItem.name] || BookOpen;
                                    const accentColor = classColors[classItem.name] || "var(--accent-magenta-500)";
                                    const isSelected = selectedClass === classItem.name;
                                    // Force Cyberpunk names regardless of what constants.ts returns
                                    let displayName = classItem.name;
                                    // Check for both legacy keys and old DND names
                                    if (displayName === "Developers" || displayName === "Artificer") displayName = "Netrunner";
                                    if (displayName === "Designers" || displayName === "Bard") displayName = "Artisan";
                                    if (displayName === "Project Managers" || displayName === "Paladin") displayName = "Fixer";
                                    if (displayName === "Content Creators" || displayName === "Storyteller") displayName = "Media";
                                    if (displayName === "Sales" || displayName === "Rogue") displayName = "Face";

                                    return (
                                        <button
                                            key={classItem.name}
                                            onClick={() => handleClassSelect(classItem)}
                                            className={`flex flex-col items-center rounded-xl p-4 glass-card hover:scale-105 active:scale-[0.98] transition-all cursor-pointer ${isSelected ? "ring-2 ring-accent-sage-500 dark:ring-accent-sage-400" : ""
                                                }`}
                                        >
                                            <div
                                                className="flex items-center justify-center size-12 rounded-xl mb-3"
                                                style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 20%, transparent)` }}
                                            >
                                                <Icon className="w-6 h-6" style={{ color: accentColor }} />
                                            </div>
                                            <h3 className="text-sm font-body font-semibold text-content-primary mb-0.5 leading-tight text-center">{displayName}</h3>
                                            <p className="text-xs font-body font-normal text-content-secondary text-center" style={{ opacity: 0.7 }}>{classItem.jobTitle}</p>
                                            {isSelected && (
                                                <p className="text-xs font-body font-semibold text-accent-readable-cyan mt-2">Selected</p>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Leaderboard Sidebar */}
                        <div className="lg:col-span-1">
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
