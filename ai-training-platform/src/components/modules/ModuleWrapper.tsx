"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ModulePresentation } from './ModulePresentation';
import { Questionnaire, Question } from './Questionnaire';

interface ModuleWrapperProps {
    content: string;
    questions: Question[];
}

export function ModuleWrapper({ content, questions }: ModuleWrapperProps) {
    const [mode, setMode] = useState<'presentation' | 'questionnaire'>('presentation');
    const pathname = usePathname();
    const { update } = useSession();

    // Extract module info from pathname (e.g., /developers/module-1 or /session-0/module-1)
    const pathParts = pathname.split('/');
    const role = pathParts[1];
    const moduleSlug = pathParts[2] || '';
    // Use slash format to match foundation check format (session-0/slug or role/slug)
    const moduleId = `${role}/${moduleSlug}`;
    const moduleName = moduleSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const handlePresentationComplete = () => {
        if (questions && questions.length > 0) {
            setMode('questionnaire');
        } else {
            // No quiz, award XP immediately
            awardXP(0, 0);
        }
    };

    const handleQuizComplete = async (score: number) => {
        // Award XP based on quiz score
        await awardXP(score, questions.length);
    };

    const awardXP = async (quizScore: number, totalQuestions: number) => {
        try {
            const response = await fetch('/api/progress/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    moduleId,
                    moduleName,
                    quizScore,
                    totalQuestions,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
                // Update session with new XP and level
                await update({
                    profile: data.profile,
                });

                // Show notification if level up
                if (data.levelUp) {
                    // You could add a toast notification here
                    console.log(`Level up! You're now level ${data.newLevel}!`);
                }
            }
        } catch (error) {
            console.error('Failed to award XP:', error);
        }
    };

    if (mode === 'questionnaire') {
        return <Questionnaire questions={questions} onComplete={handleQuizComplete} />;
    }

    return <ModulePresentation content={content} onComplete={handlePresentationComplete} />;
}
