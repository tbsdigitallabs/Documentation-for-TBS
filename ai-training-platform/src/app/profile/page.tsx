"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User, Edit2, Save, X, Upload, ExternalLink, Sparkles, Award, Star, CheckCircle } from "lucide-react";
import ClientPageHeader from "@/components/ClientPageHeader";
import Link from "next/link";
import { calculateLevel, getXPForNextLevel, getLevelProgress, getExperienceLevelName, getUnlockedRewards, getNextReward, MAX_LEVEL, XP_THRESHOLDS, COSMETIC_REWARDS } from "@/lib/levelling";

export const dynamic = 'force-dynamic';

interface UserProfile {
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
    bio?: string;
    role?: string;
    skills?: string[];
    interests?: string[];
    learningGoals?: string;
    experienceLevel?: string;
    selectedClass?: string;
    hobbies?: string | null;
    systems?: string | null;
    level?: number;
    xp?: number;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile>({});

    // Always call useSession - Rules of Hooks require consistent hook order
    const { data: session, status, update } = useSession();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (status === "authenticated" && session) {
            fetchProfile();
        }
    }, [status, session, router]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/profile");
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setEditedProfile(data);
                if (data.profileImage) {
                    setImagePreview(data.profileImage);
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Upload image if new one selected
            let imageUrl = editedProfile.profileImage;
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const uploadResponse = await fetch("/api/profile/upload-image", {
                    method: "POST",
                    body: formData,
                });
                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    imageUrl = uploadData.imageUrl;
                }
            }

            // Update profile
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...editedProfile,
                    profileImage: imageUrl,
                }),
            });

            if (response.ok) {
                const updated = await response.json();
                setProfile(updated);
                // Update session with new profile data
                await update({
                    profile: {
                        bio: updated.bio,
                        role: updated.role,
                        skills: updated.skills,
                        interests: updated.interests,
                        learningGoals: updated.learningGoals,
                        experienceLevel: updated.experienceLevel,
                        profileImage: updated.profileImage,
                        selectedClass: updated.selectedClass,
                        level: updated.level,
                        xp: updated.xp,
                    }
                });
                setEditing(false);
                setImageFile(null);
            }
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-cyan mx-auto mb-4"></div>
                    <p className="text-content-secondary">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const displayImage = imagePreview || profile?.image || profile?.profileImage;
    const classNames: Record<string, string> = {
        "Artificer": "Developers",
        "Bard": "Designers",
        "Paladin": "Project Managers",
        "Storyteller": "Content Creators & PR",
        "Rogue": "Sales & Business",
    };

    return (
        <div className="min-h-screen bg-gradient-surface">
            <ClientPageHeader />

            {/* Main Content */}
            <main className="px-5 pt-24 pb-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-heading font-bold text-content-primary">
                        Your Adventurer Profile
                    </h1>
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-cyber-cyan text-white hover:bg-cyber-cyan/80 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setEditedProfile(profile || {});
                                    setImageFile(null);
                                    setImagePreview(profile?.profileImage || profile?.image || null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-surface-secondary text-content-secondary hover:bg-surface-hover rounded-lg font-semibold transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Image & Stats */}
                    <div className="md:col-span-1">
                        <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    {displayImage ? (
                                        <img
                                            src={displayImage}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-cyber-cyan"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-surface-tertiary border-4 border-cyber-cyan flex items-center justify-center">
                                            <User className="w-16 h-16 text-content-tertiary" />
                                        </div>
                                    )}
                                    {editing && (
                                        <label className="absolute bottom-0 right-0 bg-cyber-cyan text-white rounded-full p-2 cursor-pointer hover:bg-cyber-cyan/80 transition-colors">
                                            <Upload className="w-4 h-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <h2 className="text-xl font-heading font-bold text-content-primary mb-1">
                                    {profile?.name || "Adventurer"}
                                </h2>
                                {profile?.selectedClass && (
                                    <p className="text-sm text-content-secondary mb-2">
                                        {profile.selectedClass} • {classNames[profile.selectedClass] || profile.selectedClass}
                                    </p>
                                )}
                                {profile?.level && (
                                    <div className="space-y-4 mt-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-cyber-cyan">{profile.level}</div>
                                                <div className="text-xs text-content-tertiary">Level</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-cyber-magenta">{profile.xp || 0}</div>
                                                <div className="text-xs text-content-tertiary">XP</div>
                                            </div>
                                        </div>

                                        {/* Experience Level (read-only, based on level) */}
                                        <div className="text-center pt-2 border-t border-border-primary">
                                            <div className="text-xs text-content-tertiary mb-1">Experience Level</div>
                                            <div className="text-sm font-semibold text-content-primary">
                                                {getExperienceLevelName(profile.level || 1)}
                                            </div>
                                        </div>

                                        {/* Level Progress Bar */}
                                        {profile.level < MAX_LEVEL && (
                                            <div className="pt-2">
                                                <div className="flex items-center justify-between text-xs text-content-tertiary mb-1">
                                                    <span>Progress to Level {profile.level + 1}</span>
                                                    <span>{getXPForNextLevel(profile.xp || 0, profile.level || 1)} XP needed</span>
                                                </div>
                                                <div className="w-full bg-surface-tertiary rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-cyber-cyan to-cyber-magenta h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${getLevelProgress(profile.xp || 0, profile.level || 1) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {editing && !displayImage && (
                                <div className="mt-4 text-center">
                                    <a
                                        href="https://nanobanana.ai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-magenta text-white rounded-lg hover:bg-cyber-magenta/80 transition-colors text-sm font-semibold"
                                    >
                                        Create Avatar at Nano Banana
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2">
                        <div className="bg-surface-card rounded-xl p-6 border border-border-primary space-y-6">
                            {editing ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-semibold text-content-primary mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={editedProfile.bio || ""}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                            placeholder="Tell us about your adventurer..."
                                            className="w-full min-h-24 px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-cyber-cyan resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-content-primary mb-2">
                                            Role / Title
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProfile.role || ""}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                                            placeholder="Your job title or role"
                                            className="w-full px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-cyber-cyan"
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-semibold text-content-primary mb-2">
                                            Learning Goals
                                        </label>
                                        <textarea
                                            value={editedProfile.learningGoals || ""}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, learningGoals: e.target.value })}
                                            placeholder="What knowledge do you seek?"
                                            className="w-full min-h-20 px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-cyber-cyan resize-none"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {profile?.bio && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Bio</h3>
                                            <p className="text-content-primary">{profile.bio}</p>
                                        </div>
                                    )}

                                    {profile?.role && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Role</h3>
                                            <p className="text-content-primary">{profile.role}</p>
                                        </div>
                                    )}

                                    {profile?.level && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Experience Level</h3>
                                            <p className="text-content-primary">
                                                {getExperienceLevelName(profile.level)}
                                            </p>
                                        </div>
                                    )}

                                    {profile?.learningGoals && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Learning Goals</h3>
                                            <p className="text-content-primary">{profile.learningGoals}</p>
                                        </div>
                                    )}

                                    {profile?.hobbies && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Hobbies & Interests</h3>
                                            <p className="text-content-primary whitespace-pre-wrap">{profile.hobbies}</p>
                                        </div>
                                    )}

                                    {profile?.systems && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Systems & Tools</h3>
                                            <p className="text-content-primary whitespace-pre-wrap">{profile.systems}</p>
                                        </div>
                                    )}

                                    {profile?.skills && profile.skills.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {profile?.interests && profile.interests.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Interests</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.interests.map((interest, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-cyber-magenta/20 text-cyber-magenta rounded-full text-sm"
                                                    >
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Levelling System & Rewards Section */}
                {profile?.level && (
                    <div className="mt-8 bg-surface-card rounded-xl p-6 border border-border-primary">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-cyber-magenta" />
                            <h2 className="text-xl font-heading font-bold text-content-primary">Levelling System</h2>
                        </div>

                        {/* Current Progress */}
                        <div className="mb-6 p-4 bg-surface-secondary rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-content-primary">Level {profile.level} / {MAX_LEVEL}</span>
                                <span className="text-sm text-content-secondary">{profile.xp || 0} XP</span>
                            </div>
                            {profile.level < MAX_LEVEL ? (
                                <>
                                    <div className="w-full bg-surface-tertiary rounded-full h-3 mb-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-cyber-cyan to-cyber-magenta h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${getLevelProgress(profile.xp || 0, profile.level) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-content-tertiary">
                                        {getXPForNextLevel(profile.xp || 0, profile.level)} XP until Level {profile.level + 1}
                                    </p>
                                </>
                            ) : (
                                <div className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta rounded-full h-3" />
                            )}
                        </div>

                        {/* Unlocked Rewards */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-content-primary mb-3 flex items-center gap-2">
                                <Award className="w-4 h-4 text-cyber-cyan" />
                                Unlocked Rewards
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {getUnlockedRewards(profile.level).map((reward) => (
                                    <div
                                        key={reward.level}
                                        className="p-3 bg-surface-secondary rounded-lg border border-cyber-cyan/30"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Star className="w-3 h-3 text-cyber-cyan fill-cyber-cyan" />
                                            <span className="text-xs font-semibold text-content-primary">Lv {reward.level}</span>
                                        </div>
                                        <div className="text-xs font-semibold text-cyber-cyan mb-1">{reward.name}</div>
                                        <div className="text-xs text-content-tertiary">{reward.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Reward Preview */}
                        {getNextReward(profile.level) && (
                            <div className="p-4 bg-gradient-to-r from-cyber-magenta/10 to-cyber-cyan/10 rounded-lg border border-cyber-magenta/30">
                                <h3 className="text-sm font-semibold text-content-primary mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-cyber-magenta" />
                                    Next Reward
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-semibold text-cyber-magenta mb-1">
                                            Level {getNextReward(profile.level)!.level}: {getNextReward(profile.level)!.name}
                                        </div>
                                        <div className="text-xs text-content-secondary">
                                            {getNextReward(profile.level)!.description}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-content-tertiary mb-1">Unlock at</div>
                                        <div className="text-sm font-bold text-cyber-magenta">
                                            {XP_THRESHOLDS[getNextReward(profile.level)!.level]} XP
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Level Path Overview */}
                        <div className="mt-6 pt-6 border-t border-border-primary">
                            <h3 className="text-sm font-semibold text-content-primary mb-4">Level Path</h3>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
                                    const isUnlocked = level <= (profile.level || 1);
                                    const reward = COSMETIC_REWARDS.find(r => r.level === level);
                                    return (
                                        <div
                                            key={level}
                                            className={`flex items-center gap-3 p-2 rounded-lg ${isUnlocked ? 'bg-cyber-cyan/10 border border-cyber-cyan/30' : 'bg-surface-tertiary/50 opacity-60'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isUnlocked ? 'bg-cyber-cyan text-white' : 'bg-surface-secondary text-content-tertiary'}`}>
                                                {level}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-semibold text-content-primary">
                                                    {reward?.name || `Level ${level}`}
                                                </div>
                                                <div className="text-xs text-content-tertiary">
                                                    {XP_THRESHOLDS[level]} XP
                                                </div>
                                            </div>
                                            {isUnlocked && (
                                                <Award className="w-4 h-4 text-cyber-cyan" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Completed Modules Section */}
                {profile?.completedModules && profile.completedModules.length > 0 && (
                    <div className="mt-8 bg-surface-card rounded-xl p-6 border border-border-primary">
                        <div className="flex items-center gap-2 mb-6">
                            <Award className="w-5 h-5 text-cyber-cyan" />
                            <h2 className="text-xl font-heading font-bold text-content-primary">Completed Modules</h2>
                            <span className="ml-auto text-sm text-content-secondary">
                                {profile.completedModules.length} {profile.completedModules.length === 1 ? 'module' : 'modules'}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {profile.completedModules.map((module, index) => (
                                <div
                                    key={module.moduleId}
                                    className="p-4 bg-surface-secondary rounded-lg border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                                                <h3 className="text-sm font-semibold text-content-primary">
                                                    {module.moduleName}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-content-tertiary ml-6">
                                                <span>+{module.xpEarned} XP</span>
                                                {module.quizScore !== undefined && (
                                                    <span>Quiz: {module.quizScore}%</span>
                                                )}
                                                <span>
                                                    {new Date(module.completedAt).toLocaleDateString('en-AU', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total XP from modules */}
                        <div className="mt-6 pt-6 border-t border-border-primary">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-content-primary">Total XP from Modules</span>
                                <span className="text-lg font-bold text-cyber-magenta">
                                    {profile.completedModules.reduce((sum, m) => sum + m.xpEarned, 0)} XP
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

