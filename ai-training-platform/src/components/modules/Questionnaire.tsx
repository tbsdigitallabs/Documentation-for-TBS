"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option in original array
}

interface ShuffledQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number; // New index after shuffling
}

interface QuestionnaireProps {
    questions: Question[];
    onComplete?: (score: number) => void;
}

/**
 * Fisher-Yates shuffle algorithm
 * Returns shuffled array and index mapping to track original positions
 */
function shuffleArray<T>(array: T[]): { shuffled: T[]; indexMap: number[] } {
    const shuffled = [...array];
    const indexMap = array.map((_, i) => i);

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];
    }

    return { shuffled, indexMap };
}

/**
 * Shuffle question options and update correct answer index
 */
function shuffleQuestionOptions(question: Question): ShuffledQuestion {
    const { shuffled, indexMap } = shuffleArray(question.options);
    // Find new index of correct answer after shuffle
    const newCorrectIndex = indexMap.indexOf(question.correctAnswer);

    return {
        id: question.id,
        question: question.question,
        options: shuffled,
        correctAnswerIndex: newCorrectIndex,
    };
}

export function Questionnaire({ questions, onComplete }: QuestionnaireProps) {
    const pathname = usePathname();
    const [shuffleKey, setShuffleKey] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Shuffle all questions once on mount and when shuffleKey changes (on retry)
    const shuffledQuestions = useMemo(() => {
        return questions.map(shuffleQuestionOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions, shuffleKey]);

    // Get role from pathname for dashboard link (e.g., /developers/01-foundation -> /developers)
    const rolePath = useMemo(() => {
        const parts = pathname.split('/');
        return parts.length >= 2 ? `/${parts[1]}` : '/';
    }, [pathname]);

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === shuffledQuestions[currentQuestion].correctAnswerIndex;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
            if (onComplete) {
                const finalCorrect = selectedOption === shuffledQuestions[currentQuestion].correctAnswerIndex;
                onComplete(score + (finalCorrect ? 1 : 0));
            }
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
        setShuffleKey(prev => prev + 1); // Trigger re-shuffle on retry
    };

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <GlassCard className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-surface-card border-gray-200 dark:border-white/10 backdrop-blur-xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8">
                        {percentage >= 70 ? (
                            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-red-500" />
                            </div>
                        )}
                        <h2 className="text-3xl font-bold text-content-primary mb-2">
                            {percentage >= 70 ? 'Module Completed!' : 'Keep Practising'}
                        </h2>
                        <p className="text-content-secondary">
                            You scored <span className="text-content-primary font-bold">{score}</span> out of <span className="text-content-primary font-bold">{questions.length}</span> ({percentage}%)
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-surface-secondary border border-white/10 text-content-primary hover:bg-surface-tertiary transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Retry Quiz
                        </button>
                        <Link
                            href={rolePath}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-button text-button border border-button-border hover:bg-button-hover transition-all"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </motion.div>
            </GlassCard>
        );
    }

    const question = shuffledQuestions[currentQuestion];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <span className="text-accent-readable-cyan text-sm font-bold tracking-wider uppercase mb-2 block">Question {currentQuestion + 1} of {questions.length}</span>
                    <h2 className="text-2xl font-bold text-content-primary">{question.question}</h2>
                </div>
                <div className="text-content-tertiary font-mono text-sm">
                    Score: {score}
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isAnswered}
                        className={`w-full p-6 rounded-xl text-left transition-all border-2 relative overflow-hidden group
                            ${isAnswered
                                ? index === question.correctAnswerIndex
                                    ? 'bg-green-500/10 border-green-500/50 text-content-primary'
                                    : index === selectedOption
                                        ? 'bg-red-500/10 border-red-500/50 text-content-primary'
                                        : 'bg-surface-tertiary/30 border-transparent text-content-tertiary opacity-50'
                                : index === selectedOption
                                    ? 'bg-cyber-cyan/10 border-cyber-cyan text-content-primary'
                                    : 'bg-surface-tertiary/50 border-transparent text-content-secondary hover:bg-surface-tertiary hover:border-gray-300 dark:hover:border-white/20'
                            }
                        `}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <span className="font-medium text-lg">{option}</span>
                            {isAnswered && index === question.correctAnswerIndex && (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                            {isAnswered && index === selectedOption && index !== question.correctAnswerIndex && (
                                <XCircle className="w-6 h-6 text-red-500" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                {!isAnswered ? (
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className={`px-8 py-3 rounded-lg font-bold transition-all
                            ${selectedOption === null
                                ? 'bg-disabled text-disabled cursor-not-allowed'
                                : 'bg-button text-button hover:bg-button/90'
                            }
                        `}
                    >
                        Submit Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-button text-button border border-button-border hover:bg-button-hover transition-all"
                    >
                        {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
