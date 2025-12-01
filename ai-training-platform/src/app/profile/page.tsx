"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Edit2, Save, X, Upload, Sparkles, Zap, Shield, Target, Brain, Cpu, Terminal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ClientPageHeader from "@/components/ClientPageHeader";
import { CLASS_NAMES, CLASS_JOB_TITLES } from "@/lib/role-mapping";
import type { ClassJobTitleKey } from "@/lib/constants";
import Link from "next/link";
import { Container } from "@/components/Container";
import {
  CharacterSheet,
  CharacterSheetHeader,
  CharacterSheetBody,
  DataPanel,
  XPBar,
  LevelPath,
  AvatarFrame,
  MissionLog,
  RewardGrid,
  NextReward,
  CosmeticSelector,
} from "@/components/profile";
import { getXPForNextLevel, getLevelProgress, getExperienceLevelName, getUnlockedRewards, getNextReward, MAX_LEVEL, XP_THRESHOLDS, COSMETIC_REWARDS, TITLES, DEFAULT_LOADOUT, type CosmeticLoadout } from "@/lib/levelling";
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/image-utils';

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
  cosmeticLoadout?: CosmeticLoadout | null;
}

const classIcons: Record<string, { icon: typeof Zap; color: string }> = {
  [CLASS_NAMES.DEVELOPERS]: { icon: Cpu, color: "text-accent-developers" },
  [CLASS_NAMES.DESIGNERS]: { icon: Brain, color: "text-accent-designers" },
  [CLASS_NAMES.PROJECT_MANAGERS]: { icon: Shield, color: "text-accent-project-managers" },
  [CLASS_NAMES.CONTENT_CREATORS]: { icon: Terminal, color: "text-accent-content-creators" },
  [CLASS_NAMES.SALES]: { icon: Target, color: "text-accent-sales-business" },
};

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

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    console.log('[Profile] fetchProfile called', { hasSession: !!session, sessionEmail: session?.user?.email });
    setLoading(true);
    
    try {
      console.log('[Profile] Starting fetch to /api/profile');
      const startTime = Date.now();
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.error('[Profile] Fetch timeout triggered after 10 seconds');
        controller.abort();
      }, 10000); // 10 second timeout
      
      console.log('[Profile] Making fetch request...');
      const response = await fetch("/api/profile", {
        signal: controller.signal,
      });
      
      const fetchTime = Date.now() - startTime;
      console.log('[Profile] Fetch completed', { status: response.status, statusText: response.statusText, time: `${fetchTime}ms` });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error('[Profile] Response not OK', { status: response.status, statusText: response.statusText });
        const errorData = await response.json().catch((e) => {
          console.error('[Profile] Failed to parse error response', e);
          return { error: 'Unknown error' };
        });
        console.error("[Profile] Failed to fetch profile:", response.status, errorData);
        setLoading(false);
        return;
      }
      
      console.log('[Profile] Parsing response JSON...');
      const data = await response.json();
      console.log('[Profile] Profile data received', { 
        hasProfile: !!data, 
        hasProfileImage: !!data.profileImage,
        hasCosmeticLoadout: !!data.cosmeticLoadout,
        level: data.level,
        xp: data.xp
      });
      
      setProfile(data);
      setEditedProfile(data);
      if (data.profileImage) {
        setImagePreview(data.profileImage);
      }
      // Load cosmetic loadout from profile if available
      if (data.cosmeticLoadout) {
        setCosmeticLoadout(data.cosmeticLoadout);
      } else if (session?.user?.profile) {
        const profileWithCosmetics = session.user.profile as UserProfile;
        if (profileWithCosmetics.cosmeticLoadout) {
          setCosmeticLoadout(profileWithCosmetics.cosmeticLoadout);
        }
      }
      console.log('[Profile] Profile state updated successfully');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error("[Profile] Profile fetch timed out after 10 seconds", error);
      } else {
        console.error("[Profile] Failed to fetch profile:", error);
        console.error("[Profile] Error details:", {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
      }
    } finally {
      console.log('[Profile] Setting loading to false');
      setLoading(false);
    }
  }, [session]);

  // Fetch profile on mount and when session changes
  useEffect(() => {
    console.log('[Profile] useEffect triggered', { 
      status, 
      hasSession: !!session, 
      sessionEmail: session?.user?.email,
      loading 
    });
    
    if (status === 'loading') {
      console.log('[Profile] Session still loading, waiting...');
      return;
    }
    
    if (status === 'unauthenticated') {
      console.log('[Profile] User not authenticated, redirecting...');
      router.push('/auth/signin');
      return;
    }
    
    if (status === 'authenticated' && session?.user?.email) {
      console.log('[Profile] Session authenticated, fetching profile...');
      fetchProfile();
    } else {
      console.warn('[Profile] Session status authenticated but no email', { status, session });
    }
  }, [status, session, fetchProfile, router]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageSrc(reader.result as string);
        setShowCropper(true);
        setZoom(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so the same file can be selected again if needed
    e.target.value = '';
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!tempImageSrc || !croppedAreaPixels) return;
    try {
      const croppedImageBlob = await getCroppedImg(
        tempImageSrc,
        croppedAreaPixels,
        rotation
      );

      if (croppedImageBlob) {
        const file = new File([croppedImageBlob], "avatar.jpg", { type: "image/jpeg" });
        setImageFile(file);
        // Create blob URL for preview, but we'll replace it with server URL after upload
        const blobUrl = URL.createObjectURL(croppedImageBlob);
        setImagePreview(blobUrl);
        setShowCropper(false);
        setTempImageSrc(null);
      }
    } catch (e) {
      console.error("Failed to crop image:", e);
    }
  };

  const handleGenerateAvatar = async () => {
    setGeneratingAvatar(true);
    try {
      // Revoke any existing blob URLs
      if (imagePreview && (imagePreview.startsWith('blob:') || imagePreview.startsWith('data:'))) {
        if (imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
      }

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

      // Revoke any existing blob URLs before uploading
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }

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
          // Immediately update preview to server URL (not blob URL)
          if (imageUrl) {
            setImagePreview(imageUrl);
          }
        } else {
          console.error("Failed to upload image");
          setLoading(false);
          return;
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
        // Update profileImage in the response to ensure it's set
        const finalProfileImage = imageUrl || updated.profileImage;

        setProfile({
          ...updated,
          profileImage: finalProfileImage,
        });

        // CRITICAL: Always use server URL, never blob URL for persistence
        if (finalProfileImage && !finalProfileImage.startsWith('blob:')) {
          setImagePreview(finalProfileImage);
        }

        // Update session with the new profile data including image and cosmetic loadout
        await update({
          profile: {
            bio: updated.bio,
            role: updated.role,
            skills: updated.skills,
            interests: updated.interests,
            learningGoals: updated.learningGoals,
            experienceLevel: updated.experienceLevel,
            profileImage: finalProfileImage,
            selectedClass: updated.selectedClass,
            level: updated.level,
            xp: updated.xp,
            cosmeticLoadout: cosmeticLoadout,
          }
        });

        setEditing(false);
        setImageFile(null);

        // Refresh the profile to ensure consistency
        await fetchProfile();
      } else {
        console.error("Failed to save profile:", await response.text());
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

  // Only use blob URLs if we're in edit mode and haven't saved yet
  // Otherwise, always prefer server URLs to prevent broken images after reload
  const displayImage = editing && imagePreview && imagePreview.startsWith('blob:')
    ? imagePreview
    : (profile?.profileImage || profile?.image || imagePreview);
  const ClassIcon = profile?.selectedClass ? classIcons[profile.selectedClass]?.icon || Zap : Zap;
  const classColor = profile?.selectedClass ? classIcons[profile.selectedClass]?.color || "text-accent-readable-cyan" : "text-accent-readable-cyan";
  const currentLevel = profile?.level || 1;
  const currentXP = profile?.xp || 0;
  const badgeReward = COSMETIC_REWARDS.find(r => r.id === cosmeticLoadout.equippedBadge);
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
                      className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded mono-label transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        // Revoke any blob URLs when canceling
                        if (imagePreview && imagePreview.startsWith('blob:')) {
                          URL.revokeObjectURL(imagePreview);
                        }
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
                <div className="flex flex-col items-center mb-6 mt-8">
                  <div className="flex flex-col items-center w-full">
                    {/* Titlebar */}
                    {cosmeticLoadout.equippedTitlebar && cosmeticLoadout.equippedTitlebar !== 'none' && (
                      <div className={`titlebar ${cosmeticLoadout.equippedTitlebar !== 'none' ? `titlebar-${cosmeticLoadout.equippedTitlebar}` : ''} mx-auto max-w-[240px]`}>
                        {cosmeticLoadout.equippedTitle ?
                          TITLES.find(t => t.id === cosmeticLoadout.equippedTitle)?.name
                          : 'TEAM MEMBER'}
                      </div>
                    )}

                    {/* Nameplate */}
                    <div className="inline-block relative group">
                      <h1 className={cn(
                        "text-2xl font-heading font-bold text-content-primary mb-1 flex items-center gap-3",
                        cosmeticLoadout.equippedNameplate && `nameplate nameplate-${cosmeticLoadout.equippedNameplate}`
                      )}>
                        {badgeReward && (
                          <div
                            className={cn(
                              "badge-container transform hover:scale-110 transition-transform duration-200 flex-shrink-0",
                              badgeReward.cssClass
                            )}
                            title={badgeReward.name}
                          />
                        )}
                        <span>{profile?.name || "Team Member"}</span>
                      </h1>

                      {/* Level Badge */}
                      <div
                        className={cn(
                          "absolute -bottom-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full z-20 font-heading font-bold text-sm shadow-lg transition-all duration-300",
                          cosmeticLoadout.equippedNameplate
                            ? `level-badge-${cosmeticLoadout.equippedNameplate}`
                            : "level-badge-default"
                        )}
                        title={`Level ${currentLevel}`}
                      >
                        {currentLevel}
                      </div>
                    </div>
                  </div>

                  {/* Title if no titlebar */}
                  {cosmeticLoadout.equippedTitle && (!cosmeticLoadout.equippedTitlebar || cosmeticLoadout.equippedTitlebar === 'none') && (
                    <div className={cn(
                      "text-xs font-bold uppercase tracking-wider mt-1 mb-2",
                      `title-${TITLES.find(t => t.id === cosmeticLoadout.equippedTitle)?.rarity || 'common'}`
                    )}>
                      {TITLES.find(t => t.id === cosmeticLoadout.equippedTitle)?.name}
                    </div>
                  )}

                  {profile?.selectedClass && (
                    <div className="flex items-center justify-center gap-2 text-sm mt-2">
                      <ClassIcon className={`w-4 h-4 ${classColor}`} />
                      <span className={classColor}>{profile.selectedClass}</span>
                      <span className="text-content-tertiary">•</span>
                      <span className="text-content-secondary">{CLASS_JOB_TITLES[profile.selectedClass as ClassJobTitleKey] || profile.selectedClass}</span>
                    </div>
                  )}
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
                        href={profile?.selectedClass ? `/${CLASS_JOB_TITLES[profile.selectedClass as ClassJobTitleKey]?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}` : '/class-selection'}
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

      {/* Cropper Modal */}
      {showCropper && tempImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card rounded-lg w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border-primary flex justify-between items-center bg-surface-header-80">
              <h3 className="font-heading text-lg text-content-primary uppercase tracking-wide">Adjust Profile Picture</h3>
              <button onClick={() => setShowCropper(false)} className="text-content-secondary hover:text-content-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[300px] bg-black/90">
              <Cropper
                image={tempImageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                showGrid={true}
                cropShape="round"
              />
            </div>

            <div className="p-4 space-y-4 bg-surface-tertiary">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs mono-label text-content-secondary">Zoom</label>
                  <span className="text-xs mono-text text-content-tertiary">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-surface-secondary rounded-lg appearance-none cursor-pointer accent-[var(--color-sage)]"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs mono-label text-content-secondary">Rotation</label>
                  <span className="text-xs mono-text text-content-tertiary">{rotation}°</span>
                </div>
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-surface-secondary rounded-lg appearance-none cursor-pointer accent-[var(--color-sage)]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowCropper(false)}
                  className="px-4 py-2 rounded text-sm font-medium text-content-primary hover:bg-surface-hover transition-colors border border-border-primary bg-surface-secondary mono-label"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded mono-label transition-all shadow-lg"
                >
                  Confirm Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
