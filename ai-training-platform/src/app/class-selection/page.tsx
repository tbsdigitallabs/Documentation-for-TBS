"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Hammer, Sparkles, Shield, Scroll, Coins } from "lucide-react";
import { getClassRoute, getAllClasses, CLASS_NAMES, type ClassInfo } from "@/lib/role-mapping";
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
        [CLASS_NAMES.DEVELOPERS]: "#0A84FF",
        [CLASS_NAMES.DESIGNERS]: "#FFB800",
        [CLASS_NAMES.PROJECT_MANAGERS]: "#00C48C",
        [CLASS_NAMES.CONTENT_CREATORS]: "#850AFF",
        [CLASS_NAMES.SALES]: "#EF4444",
        [CLASS_NAMES.FOUNDATION]: "#D56EED",
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
                    <p className="mono-label text-accent-readable-cyan mb-2">TBS DIGITAL LABS // TRAINING DIVISION</p>
                    <h1 className="text-[32px] font-heading font-bold text-content-primary mb-3 leading-tight tracking-tight">Initialise Training Protocol</h1>
                    <p className="body-regular text-content-secondary mb-8">
                        Select your operative class and begin your AI mastery journey. Each track contains specialised missions designed for your role.
                    </p>
                </div>
            </main>

            {/* Class Selection - Responsive Grid */}
            <div className="px-5 pb-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xl font-heading font-bold text-content-primary mb-6 leading-tight tracking-tight text-center">Select Operative Class</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {classes.map((classItem) => {
                            const Icon = classIcons[classItem.name] || BookOpen;
                            const accentColor = classColors[classItem.name] || "#D56EED";
                            const isSelected = selectedClass === classItem.name;

                            return (
                                <button
                                    key={classItem.name}
                                    onClick={() => handleClassSelect(classItem)}
                                    className={`flex flex-col items-center rounded-xl p-4 glass-card hover:scale-105 active:scale-[0.98] transition-all cursor-pointer ${isSelected ? "ring-2 ring-cyber-cyan" : ""
                                        }`}
                                >
                                    <div
                                        className="flex items-center justify-center size-12 rounded-xl mb-3"
                                        style={{ backgroundColor: `${accentColor}33` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: accentColor }} />
                                    </div>
                                    <h3 className="text-sm font-body font-semibold text-content-primary mb-0.5 leading-tight text-center">{classItem.name}</h3>
                                    <p className="text-xs font-body font-normal text-content-secondary text-center" style={{ opacity: 0.7 }}>{classItem.jobTitle}</p>
                                    {isSelected && (
                                        <p className="text-xs font-body font-semibold text-cyber-cyan mt-2">Selected</p>
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
