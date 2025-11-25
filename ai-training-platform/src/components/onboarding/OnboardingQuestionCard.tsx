"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import type { OnboardingQuestion } from "@/app/api/onboarding/questions/route";

interface OnboardingQuestionCardProps {
    question: OnboardingQuestion;
    questionNumber: number;
    totalQuestions: number;
    selectedAnswer?: string;
    textAnswer?: string;
    onAnswerChange: (answer: string) => void;
    onTextAnswerChange: (answer: string) => void;
    onSubmit: () => void;
    loading: boolean;
}

export default function OnboardingQuestionCard({
    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    textAnswer,
    onAnswerChange,
    onTextAnswerChange,
    onSubmit,
    loading,
}: OnboardingQuestionCardProps) {
    const canSubmit = question.required
        ? question.type === "multiple-choice"
            ? !!selectedAnswer
            : !!textAnswer?.trim()
        : true;

    return (
        <div className="bg-surface-card rounded-xl p-6 border border-border-primary">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-content-tertiary">
                        Question {questionNumber} of {totalQuestions}
                    </span>
                    <div className="w-32 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyber-cyan transition-all duration-300"
                            style={{
                                width: `${(questionNumber / totalQuestions) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-content-primary mb-2">
                    {question.question}
                </h2>
                {question.helpText && (
                    <p className="text-sm text-content-tertiary mb-4">
                        {question.helpText}
                    </p>
                )}

                {question.type === "multiple-choice" && question.options ? (
                    <div className="space-y-3">
                        {question.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onAnswerChange(option.value)}
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
                        value={textAnswer || ""}
                        onChange={(e) => onTextAnswerChange(e.target.value)}
                        placeholder={question.placeholder || "Type your answer here..."}
                        className="w-full min-h-32 px-4 py-3 bg-surface-secondary border border-border-secondary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent resize-none"
                        disabled={loading}
                    />
                )}
            </div>

            <button
                onClick={onSubmit}
                disabled={!canSubmit || loading}
                className="w-full px-6 py-3 bg-button text-button hover:bg-button-hover rounded-lg font-semibold transition-colors disabled:bg-disabled disabled:text-disabled disabled:cursor-not-allowed flex items-center justify-center"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                    </>
                ) : questionNumber < totalQuestions ? (
                    "Next Question"
                ) : (
                    "Continue to Avatar"
                )}
            </button>
        </div>
    );
}

