"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Loader2 } from "lucide-react";
import { getClassRoute } from "@/lib/role-mapping";
import type { OnboardingQuestion } from "@/app/api/onboarding/questions/route";
import OnboardingQuestionCard from "@/components/onboarding/OnboardingQuestionCard";
import OnboardingImageUpload from "@/components/onboarding/OnboardingImageUpload";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import OnboardingLoadingState from "@/components/onboarding/OnboardingLoadingState";

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
            } else {
                console.error("Failed to fetch questions:", response.status, response.statusText);
                // Set default questions if API fails
                setQuestions([
                    {
                        id: "class",
                        question: "What's your role at TBS Digital Labs?",
                        type: "multiple-choice" as const,
                        required: true,
                        options: [
                            { value: "Artificer", label: "Artificer (Developer)", description: "I write code, build applications, and work with technical systems" },
                            { value: "Bard", label: "Bard (Designer)", description: "I create visual designs, user interfaces, and brand assets" },
                            { value: "Paladin", label: "Paladin (Account/Project Manager)", description: "I manage projects, coordinate teams, and ensure deliverables are met" },
                            { value: "Storyteller", label: "Storyteller (Content Creator & PR)", description: "I write content, manage communications, and handle public relations" },
                            { value: "Rogue", label: "Rogue (Sales & Business Development)", description: "I work with clients, manage sales, and develop business opportunities" },
                        ],
                    },
                    {
                        id: "experience",
                        question: "What's your experience level with AI tools?",
                        type: "multiple-choice" as const,
                        required: true,
                        options: [
                            { value: "Novice", label: "Novice", description: "I'm new to AI tools and want to learn the basics" },
                            { value: "Apprentice", label: "Apprentice", description: "I've used some AI tools but want to improve my skills" },
                            { value: "Master", label: "Master", description: "I'm experienced with AI and want to learn advanced techniques" },
                        ],
                    },
                ]);
            }
        } catch (error) {
            console.error("Failed to start onboarding:", error);
            // Set default questions on error
            setQuestions([
                {
                    id: "class",
                    question: "What class do you identify with in your quest?",
                    type: "multiple-choice" as const,
                    required: true,
                    options: [
                        { value: "Artificer", label: "Artificer", description: "Master the tools of code and creation" },
                        { value: "Bard", label: "Bard", description: "Weave visual magic and creative wonders" },
                        { value: "Paladin", label: "Paladin", description: "Lead quests and manage the realm" },
                        { value: "Storyteller", label: "Storyteller", description: "Craft tales and shape narratives" },
                        { value: "Rogue", label: "Rogue", description: "Navigate deals and expand territories" },
                    ],
                },
            ]);
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

    const handleGenerateAvatar = async () => {
        setLoading(true);
        try {
            // Always generate a new random seed for regeneration
            // This ensures each click generates a different avatar
            const seed = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

            // Use our API route to generate avatar (avoids CORS issues)
            const response = await fetch("/api/onboarding/generate-avatar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seed }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate avatar");
            }

            const data = await response.json();

            // Convert base64 to blob
            const base64Data = data.imageData;
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const pngBlob = new Blob([byteArray], { type: data.mimeType || "image/png" });

            // Revoke old preview URL to free memory
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }

            // Convert blob to File object
            const file = new File([pngBlob], `avatar-${seed}.png`, { type: "image/png" });

            // Create preview URL from blob
            const previewUrl = URL.createObjectURL(pngBlob);

            // Set as image file and preview
            setImageFile(file);
            setImagePreview(previewUrl);
        } catch (error) {
            console.error("Failed to generate avatar:", error);
        } finally {
            setLoading(false);
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

    if (!mounted || status === "loading") {
        return <OnboardingLoadingState />;
    }

    if (status === "unauthenticated") {
        return null; // Will redirect via useEffect
    }

    // Show loading while fetching questions
    if (loading && questions.length === 0) {
        return <OnboardingLoadingState message="Loading your adventure questions..." />;
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
                {step === "questions" && questions.length > 0 && currentQuestion ? (
                    <div className="space-y-6">
                        <OnboardingHeader step="questions" />
                        <OnboardingQuestionCard
                            question={currentQuestion}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            selectedAnswer={selectedAnswer}
                            textAnswer={textAnswer}
                            onAnswerChange={setSelectedAnswer}
                            onTextAnswerChange={setTextAnswer}
                            onSubmit={handleAnswerSubmit}
                            loading={loading}
                        />
                    </div>
                ) : step === "image" ? (
                    <div className="space-y-6">
                        <OnboardingHeader step="image" />
                        <OnboardingImageUpload
                            imagePreview={imagePreview}
                            onImageSelect={handleImageSelect}
                            onGenerateAvatar={handleGenerateAvatar}
                            onUpload={handleImageUpload}
                            onSkip={() => completeOnboarding()}
                            loading={loading}
                        />
                    </div>
                ) : questions.length === 0 ? (
                    <OnboardingLoadingState message="Loading your adventure questions..." />
                ) : null}
            </main>
        </div>
    );
}
