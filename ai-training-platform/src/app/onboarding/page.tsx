"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, Upload, ExternalLink, Loader2, ChevronRight } from "lucide-react";
import { getClassRoute } from "@/lib/role-mapping";
import type { OnboardingQuestion } from "@/app/api/onboarding/questions/route";

interface ProfileData {
    selectedClass?: string;
    experienceLevel?: string;
    hobbies?: string | null;
    systems?: string | null;
    profileImage?: string;
}

export default function OnboardingPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [step, setStep] = useState<"questions" | "image">("questions");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<OnboardingQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [profileData, setProfileData] = useState<ProfileData>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [textAnswer, setTextAnswer] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data: session, status, update } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (status === "authenticated" && session) {
            startOnboarding();
        }
    }, [mounted, status, session, router]);

    const startOnboarding = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/onboarding/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session?.user?.email,
                    name: session?.user?.name,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data.questions || []);
            }
        } catch (error) {
            console.error("Failed to start onboarding:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;

        // Validate required questions
        if (currentQuestion.required) {
            if (currentQuestion.type === "multiple-choice" && !selectedAnswer) {
                return;
            }
            if (currentQuestion.type === "text" && !textAnswer.trim()) {
                return;
            }
        }

        setLoading(true);
        try {
            // Update profile data based on question type
            const answer = currentQuestion.type === "multiple-choice" ? selectedAnswer : textAnswer;

            // Update local state immediately
            if (currentQuestion.id === "class") {
                setProfileData(prev => ({ ...prev, selectedClass: answer }));
            } else if (currentQuestion.id === "experience") {
                setProfileData(prev => ({ ...prev, experienceLevel: answer }));
            } else if (currentQuestion.id === "hobbies") {
                setProfileData(prev => ({ ...prev, hobbies: answer || null }));
            } else if (currentQuestion.id === "systems") {
                setProfileData(prev => ({ ...prev, systems: answer || null }));
            }

            // Move to next question or image step
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer("");
                setTextAnswer("");
            } else {
                // All questions answered, move to image step
                setStep("image");
            }
        } catch (error) {
            console.error("Failed to submit answer:", error);
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

    const handleImageUpload = async () => {
        if (!imageFile) {
            await completeOnboarding();
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch("/api/onboarding/upload-image", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                await completeOnboarding(data.imageUrl);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Failed to upload image:", error);
            await completeOnboarding();
        } finally {
            setLoading(false);
        }
    };

    const completeOnboarding = async (imageUrl?: string) => {
        try {
            const finalProfileData = {
                ...profileData,
                profileImage: imageUrl,
            };

            // Update session with profile data and mark onboarding as complete
            await update({
                onboardingCompleted: true,
                profile: finalProfileData,
            });

            // Redirect to user's role page if class is selected, otherwise to class selection
            if (profileData.selectedClass) {
                const route = getClassRoute(profileData.selectedClass);
                router.push(route);
            } else {
                router.push("/class-selection");
            }
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
        }
    };

    if (!mounted || status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyber-cyan" />
                    <p className="text-content-secondary">Gearing up for your adventure...</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-surface">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-header-80 px-5 py-3 backdrop-blur-sm border-b border-border-primary h-16 max-h-16">
                <Logo />
                <ThemeToggle />
            </div>

            {/* Main Content */}
            <main className="px-5 pt-24 pb-10 max-w-2xl mx-auto">
                {step === "questions" && currentQuestion ? (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-magenta/20 mb-4">
                                <Sparkles className="w-8 h-8 text-cyber-magenta" />
                            </div>
                            <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
                                Gearing Up for Your Adventure
                            </h1>
                            <p className="text-content-secondary">
                                Answer a few questions to craft your adventurer's profile
                            </p>
                        </div>

                        <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-content-tertiary">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </span>
                                    <div className="w-32 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cyber-cyan transition-all duration-300"
                                            style={{
                                                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-content-primary mb-2">
                                    {currentQuestion.question}
                                </h2>
                                {currentQuestion.helpText && (
                                    <p className="text-sm text-content-tertiary mb-4">
                                        {currentQuestion.helpText}
                                    </p>
                                )}

                                {currentQuestion.type === "multiple-choice" && currentQuestion.options ? (
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setSelectedAnswer(option.value)}
                                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${selectedAnswer === option.value
                                                        ? "border-cyber-cyan bg-cyber-cyan/10"
                                                        : "border-border-secondary hover:border-cyber-cyan/50 bg-surface-secondary"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-content-primary">
                                                            {option.label}
                                                        </div>
                                                        {option.description && (
                                                            <div className="text-sm text-content-secondary mt-1">
                                                                {option.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {selectedAnswer === option.value && (
                                                        <ChevronRight className="w-5 h-5 text-cyber-cyan" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <textarea
                                        value={textAnswer}
                                        onChange={(e) => setTextAnswer(e.target.value)}
                                        placeholder={currentQuestion.placeholder || "Type your answer here..."}
                                        className="w-full min-h-32 px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent resize-none"
                                        disabled={loading}
                                    />
                                )}
                            </div>

                            <button
                                onClick={handleAnswerSubmit}
                                disabled={
                                    (currentQuestion.required &&
                                        ((currentQuestion.type === "multiple-choice" && !selectedAnswer) ||
                                            (currentQuestion.type === "text" && !textAnswer.trim()))) ||
                                    loading
                                }
                                className="w-full px-6 py-3 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors disabled:bg-disabled disabled:text-disabled disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : currentQuestionIndex < questions.length - 1 ? (
                                    "Next Question"
                                ) : (
                                    "Continue to Avatar"
                                )}
                            </button>
                        </div>
                    </div>
                ) : step === "image" ? (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-cyan/20 mb-4">
                                <Upload className="w-8 h-8 text-cyber-cyan" />
                            </div>
                            <h1 className="text-3xl font-heading font-bold text-content-primary mb-2">
                                Choose Your Avatar
                            </h1>
                            <p className="text-content-secondary">
                                Upload an AI-generated portrait to represent your adventurer in the realm
                            </p>
                        </div>

                        <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
                            {!imagePreview ? (
                                <div className="text-center py-12">
                                    <div className="mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-surface-tertiary border-2 border-dashed border-border-secondary flex items-center justify-center mb-4">
                                            <Upload className="w-12 h-12 text-content-tertiary" />
                                        </div>
                                        <p className="text-content-secondary mb-4">
                                            Need to forge your avatar?
                                        </p>
                                        <a
                                            href="https://nanobanana.ai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-cyber-magenta text-white rounded-lg hover:bg-cyber-magenta/80 transition-colors mb-6 font-semibold"
                                        >
                                            Visit Nano Banana to Create Your Avatar
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>

                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <div className="px-6 py-3 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors inline-block">
                                            Upload Image
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-cyber-cyan">
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                            />
                                            <div className="px-4 py-2 bg-surface-secondary text-content-primary rounded-lg hover:bg-surface-hover transition-colors text-center font-semibold">
                                                Change Image
                                            </div>
                                        </label>
                                        <button
                                            onClick={handleImageUpload}
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors disabled:bg-disabled disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                "Complete Adventure Setup"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => completeOnboarding()}
                                disabled={loading}
                                className="w-full mt-4 px-4 py-2 text-content-secondary hover:text-content-primary transition-colors text-center"
                            >
                                Skip for now
                            </button>
                        </div>
                    </div>
                ) : null}
            </main>
        </div>
    );
}
