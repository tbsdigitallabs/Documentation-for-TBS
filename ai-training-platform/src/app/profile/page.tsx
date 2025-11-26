"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Edit2, Save, X, Upload, Sparkles, Zap, Shield, Target, Brain, Cpu, Terminal, Loader2 } from "lucide-react";
import ClientPageHeader from "@/components/ClientPageHeader";
import { CLASS_NAMES, CLASS_JOB_TITLES } from "@/lib/role-mapping";
import Link from "next/link";
import { Container } from "@/components/Container";
import {
  CharacterSheet,
  CharacterSheetHeader,
  CharacterSheetBody,
  StatBlock,
  DataPanel,
  XPBar,
  LevelPath,
  AvatarFrame,
  MissionLog,
  RewardGrid,
  NextReward,
  CosmeticSelector,
} from "@/components/profile";
import { getXPForNextLevel, getLevelProgress, getExperienceLevelName, getUnlockedRewards, getNextReward, MAX_LEVEL, XP_THRESHOLDS, COSMETIC_REWARDS, DEFAULT_LOADOUT, type CosmeticLoadout } from "@/lib/levelling";

export const dynamic = 'force-dynamic';

interface CompletedModule {
  moduleId: string;
  moduleName: string;
  completedAt: string;
  xpEarned: number;
  quizScore?: number;
}

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
  completedModules?: CompletedModule[];
}

const classIcons: Record<string, { icon: typeof Zap; color: string }> = {
  [CLASS_NAMES.DEVELOPERS]: { icon: Cpu, color: "text-blue-600 dark:text-blue-400" },
  [CLASS_NAMES.DESIGNERS]: { icon: Brain, color: "text-purple-600 dark:text-purple-400" },
  [CLASS_NAMES.PROJECT_MANAGERS]: { icon: Shield, color: "text-emerald-600 dark:text-emerald-400" },
  [CLASS_NAMES.CONTENT_CREATORS]: { icon: Terminal, color: "text-amber-600 dark:text-amber-400" },
  [CLASS_NAMES.SALES]: { icon: Target, color: "text-red-600 dark:text-red-400" },
};

// Use CLASS_JOB_TITLES from role-mapping for consistency
const classNames = CLASS_JOB_TITLES;

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({});

  const { data: session, status, update } = useSession();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatingAvatar, setGeneratingAvatar] = useState(false);
  const [cosmeticLoadout, setCosmeticLoadout] = useState<CosmeticLoadout>(DEFAULT_LOADOUT);

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

  const handleGenerateAvatar = async () => {
    setGeneratingAvatar(true);
    try {
      // Use random seed each time to generate a new avatar
      const randomSeed = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      const response = await fetch('/api/onboarding/generate-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed: randomSeed }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const imageDataUrl = `data:${data.mimeType};base64,${data.imageData}`;
        setImagePreview(imageDataUrl);
        // Convert base64 to blob for upload
        const byteCharacters = atob(data.imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: data.mimeType });
        const file = new File([blob], 'avatar.png', { type: data.mimeType });
        setImageFile(file);
      }
    } catch (error) {
      console.error('Failed to generate avatar:', error);
    } finally {
      setGeneratingAvatar(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-cyan mx-auto mb-4" />
          <p className="text-content-secondary mono-text text-sm">LOADING PERSONNEL FILE...</p>
        </div>
      </div>
    );
  }

  const displayImage = imagePreview || profile?.image || profile?.profileImage;
  const ClassIcon = profile?.selectedClass ? classIcons[profile.selectedClass]?.icon || Zap : Zap;
  const classColor = profile?.selectedClass ? classIcons[profile.selectedClass]?.color || "text-accent-readable-cyan" : "text-accent-readable-cyan";
  const currentLevel = profile?.level || 1;
  const currentXP = profile?.xp || 0;
  const xpNeeded = getXPForNextLevel(currentXP, currentLevel);
  const nextReward = getNextReward(currentLevel);
  const unlockedRewards = getUnlockedRewards(currentLevel);
  const xpForCurrentLevel = XP_THRESHOLDS[currentLevel] || 0;
  const xpForNextLevel = XP_THRESHOLDS[currentLevel + 1] || XP_THRESHOLDS[MAX_LEVEL];
  const progressInLevel = currentXP - xpForCurrentLevel;
  const xpRequiredForLevel = xpForNextLevel - xpForCurrentLevel;

  const missions = profile?.completedModules?.map(m => ({
    id: m.moduleId,
    name: m.moduleName,
    completedAt: m.completedAt,
    xpEarned: m.xpEarned,
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <ClientPageHeader />

      <main className="pt-20 pb-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <CharacterSheet className="mt-4">
            {/* Header */}
            <CharacterSheetHeader className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="mono-label text-accent-readable-cyan">TBS Digital Labs // Personnel File</span>
                <div className="h-4 w-px bg-border-primary hidden sm:block" />
                <span className="mono-text text-xs text-accent-readable-magenta font-semibold">CLEARANCE: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-secondary border border-border-primary text-accent-readable-cyan hover:bg-surface-hover rounded mono-label transition-all"
                  >
                    <Edit2 className="w-3 h-3" />
                    Modify
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-accent-sage-600 dark:bg-accent-sage-800 border border-accent-sage-600 dark:border-accent-sage-600 text-white hover:bg-accent-sage-700 dark:hover:bg-accent-sage-700 rounded mono-label transition-all disabled:opacity-50"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditedProfile(profile || {});
                        setImageFile(null);
                        setImagePreview(profile?.profileImage || profile?.image || null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 rounded mono-label transition-all"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </CharacterSheetHeader>

            {/* Main Content Grid */}
            <CharacterSheetBody>
              {/* Left Column - Avatar & Identity */}
              <div className="col-span-12 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-cyber-cyan/20 p-6">
                {/* Avatar */}
                <div className="relative mb-6">
                  <AvatarFrame 
                    src={displayImage} 
                    alt={profile?.name || 'Profile'} 
                    size="md"
                    frameStyle={cosmeticLoadout.equippedFrame?.replace('frame-', '') as any || 'starter'}
                    effectStyle={cosmeticLoadout.equippedEffect?.replace('effect-', '')}
                  />
                  {editing && (
                    <label className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-cyber-cyan text-oxford-blue rounded px-3 py-1.5 cursor-pointer hover:bg-cyber-cyan/80 transition-colors flex items-center gap-2 mono-label z-10">
                      <Upload className="w-3 h-3" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Identity */}
                <div className="text-center mb-6 mt-8">
                  <h1 className="text-2xl font-heading font-bold text-content-primary mb-1">
                    {profile?.name || "Unknown Operative"}
                  </h1>
                  {profile?.selectedClass && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <ClassIcon className={`w-4 h-4 ${classColor}`} />
                      <span className={classColor}>{profile.selectedClass}</span>
                      <span className="text-content-tertiary">•</span>
                      <span className="text-content-secondary">{classNames[profile.selectedClass]}</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <StatBlock value={currentLevel} label="Level" color="cyan" />
                  <StatBlock value={currentXP} label="XP" color="magenta" />
                </div>

                {/* Experience Rank */}
                <DataPanel label="Rank" variant="muted">
                  <span className="text-lg font-semibold">{getExperienceLevelName(currentLevel)}</span>
                </DataPanel>

                {editing && (
                  <button
                    onClick={handleGenerateAvatar}
                    disabled={generatingAvatar}
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-accent-magenta-100 dark:bg-cyber-magenta/20 border border-accent-magenta-300 dark:border-cyber-magenta/50 text-accent-readable-magenta rounded mono-label hover:bg-accent-magenta-200 dark:hover:bg-cyber-magenta/30 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {generatingAvatar ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Generate Avatar
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Middle Column - Stats & Progress */}
              <div className="col-span-12 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-cyber-cyan/20 p-6">
                {/* XP Progress Bar */}
                <XPBar
                  current={progressInLevel}
                  max={xpRequiredForLevel}
                  label="Experience Progress"
                  sublabel={currentLevel < MAX_LEVEL ? `${xpNeeded} XP to Lv.${currentLevel + 1}` : 'MAX LEVEL'}
                  className="mb-6"
                />

                {/* Level Path */}
                <LevelPath
                  currentLevel={currentLevel}
                  maxLevel={MAX_LEVEL}
                  rewards={COSMETIC_REWARDS}
                  xpThresholds={XP_THRESHOLDS}
                  className="mb-6"
                />

                {/* Next Reward */}
                {nextReward && (
                  <NextReward
                    level={nextReward.level}
                    name={nextReward.name}
                    description={nextReward.description}
                    xpRequired={XP_THRESHOLDS[nextReward.level]}
                    className="mb-6"
                  />
                )}

                {/* Unlocked Rewards */}
                <RewardGrid rewards={unlockedRewards} className="mb-6" />

                {/* Cosmetic Selector */}
                <CosmeticSelector
                  level={currentLevel}
                  currentLoadout={cosmeticLoadout}
                  onLoadoutChange={setCosmeticLoadout}
                />
              </div>

              {/* Right Column - Profile Data & Mission Log */}
              <div className="col-span-12 lg:col-span-4 p-6">
                {/* Profile Data */}
                <div className="mb-6">
                  <div className="mono-label text-accent-readable-cyan mb-3 flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    Personnel Data
                  </div>
                  
                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block mono-label text-content-tertiary mb-1">Bio</label>
                        <textarea
                          value={editedProfile.bio || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          placeholder="Enter bio..."
                          className="w-full min-h-20 px-3 py-2 bg-surface-tertiary border border-cyber-cyan/30 rounded text-content-primary placeholder-content-tertiary focus:outline-none focus:border-cyber-cyan mono-text text-sm resize-none"
                        />
                      </div>
                      <div>
                        <label className="block mono-label text-content-tertiary mb-1">Role / Title</label>
                        <input
                          type="text"
                          value={editedProfile.role || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                          placeholder="Enter role..."
                          className="w-full px-3 py-2 bg-surface-tertiary border border-cyber-cyan/30 rounded text-content-primary placeholder-content-tertiary focus:outline-none focus:border-cyber-cyan mono-text text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mono-label text-content-tertiary mb-1">Learning Goals</label>
                        <textarea
                          value={editedProfile.learningGoals || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, learningGoals: e.target.value })}
                          placeholder="Enter goals..."
                          className="w-full min-h-16 px-3 py-2 bg-surface-tertiary border border-cyber-cyan/30 rounded text-content-primary placeholder-content-tertiary focus:outline-none focus:border-cyber-cyan mono-text text-sm resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile?.role && (
                        <DataPanel label="Role" variant="cyan">{profile.role}</DataPanel>
                      )}
                      {profile?.bio && (
                        <DataPanel label="Bio" variant="magenta">
                          <span className="text-sm">{profile.bio}</span>
                        </DataPanel>
                      )}
                      {profile?.learningGoals && (
                        <DataPanel label="Objectives" variant="muted">
                          <span className="text-sm">{profile.learningGoals}</span>
                        </DataPanel>
                      )}
                      {!profile?.role && !profile?.bio && !profile?.learningGoals && (
                        <div className="p-4 bg-surface-card border border-dashed border-border-primary rounded text-center">
                          <div className="text-content-secondary text-sm mono-text">No data on file</div>
                          <button
                            onClick={() => setEditing(true)}
                            className="mt-2 text-accent-readable-cyan text-xs mono-label hover:underline"
                          >
                            Add Information
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mission Log */}
                {missions.length > 0 ? (
                  <MissionLog missions={missions} />
                ) : (
                  <div className="space-y-3">
                    <div className="mono-label text-accent-readable-cyan flex items-center gap-2">
                      <Terminal className="w-3 h-3" />
                      Mission Log
                    </div>
                    <div className="p-4 bg-surface-card border border-dashed border-border-primary rounded text-center">
                      <div className="text-content-secondary text-sm mono-text">No missions completed</div>
                      <Link
                        href={profile?.selectedClass ? `/${classNames[profile.selectedClass]?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}` : '/class-selection'}
                        className="mt-2 inline-block text-accent-readable-cyan text-xs mono-label hover:underline"
                      >
                        Begin Training
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CharacterSheetBody>
          </CharacterSheet>
        </div>
      </main>
    </div>
  );
}
