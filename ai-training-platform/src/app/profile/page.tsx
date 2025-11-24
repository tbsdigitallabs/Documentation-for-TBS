"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/safe-session";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { User, Edit2, Save, X, Upload, ExternalLink } from "lucide-react";
import Link from "next/link";

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
    level?: number;
    xp?: number;
}

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (status === "authenticated") {
            fetchProfile();
        }
    }, [status, router]);

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
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
                <Link href="/class-selection">
                    <Logo />
                </Link>
                <ThemeToggle />
            </div>

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
                                    <div className="flex items-center justify-center gap-4 mt-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-cyber-cyan">{profile.level}</div>
                                            <div className="text-xs text-content-tertiary">Level</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-cyber-magenta">{profile.xp || 0}</div>
                                            <div className="text-xs text-content-tertiary">XP</div>
                                        </div>
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
                                            Experience Level
                                        </label>
                                        <select
                                            value={editedProfile.experienceLevel || ""}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, experienceLevel: e.target.value })}
                                            className="w-full px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-cyber-cyan"
                                        >
                                            <option value="">Select level</option>
                                            <option value="Beginner">Novice</option>
                                            <option value="Intermediate">Apprentice</option>
                                            <option value="Advanced">Master</option>
                                        </select>
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

                                    {profile?.experienceLevel && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Experience</h3>
                                            <p className="text-content-primary">
                                                {profile.experienceLevel === "Beginner" ? "Novice" :
                                                    profile.experienceLevel === "Intermediate" ? "Apprentice" :
                                                        profile.experienceLevel === "Advanced" ? "Master" :
                                                            profile.experienceLevel}
                                            </p>
                                        </div>
                                    )}

                                    {profile?.learningGoals && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-content-tertiary mb-2 uppercase">Learning Goals</h3>
                                            <p className="text-content-primary">{profile.learningGoals}</p>
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
            </main>
        </div>
    );
}

