"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Hammer, Sparkles, Shield, Scroll, Coins } from "lucide-react";
import { getClassRoute, getAllClasses, type ClassInfo } from "@/lib/role-mapping";
import ClientPageHeader from "@/components/ClientPageHeader";

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

    const classes = getAllClasses().filter(c => c.name !== "Session 0"); // Exclude Session 0 from main selection

    const classIcons: Record<string, typeof Hammer> = {
        "Artificer": Hammer,
        "Bard": Sparkles,
        "Paladin": Shield,
        "Storyteller": Scroll,
        "Rogue": Coins,
        "Session 0": BookOpen,
    };

    const classColors: Record<string, string> = {
        "Artificer": "#0A84FF",
        "Bard": "#FFB800",
        "Paladin": "#00C48C",
        "Storyteller": "#850AFF",
        "Rogue": "#EF4444",
        "Session 0": "#D56EED",
    };

    if (!mounted || status === "loading") {
        return (
            <div className="min-h-screen bg-surface-primary text-content-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-content-secondary">Loading...</p>
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
                            const Icon = classIcons[classItem.name] || BookOpen;
                            const accentColor = classColors[classItem.name] || "#D56EED";
                            const isSelected = selectedClass === classItem.name;

                            return (
                                <button
                                    key={classItem.name}
                                    onClick={() => handleClassSelect(classItem)}
                                    className={`flex flex-col shrink-0 w-40 rounded-2xl p-4 glass-card hover:scale-105 transition-transform ${isSelected ? "ring-2 ring-cyber-cyan" : ""
                                        }`}
                                >
                                    <div
                                        className="flex items-center justify-center size-12 rounded-xl mb-4"
                                        style={{ backgroundColor: `${accentColor}33` }}
                                    >
                                        <Icon className="text-3xl" style={{ color: accentColor }} />
                                    </div>
                                    <h3 className="text-base font-body font-semibold text-content-primary mb-1 leading-tight">{classItem.name}</h3>
                                    <p className="text-xs font-body font-normal text-content-secondary mb-2" style={{ opacity: 0.7 }}>{classItem.jobTitle}</p>
                                    {isSelected && (
                                        <p className="text-xs font-body font-semibold text-cyber-cyan mt-1">Selected</p>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
