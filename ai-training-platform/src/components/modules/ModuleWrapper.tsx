"use client";

import React, { useState } from 'react';
import { ModulePresentation } from './ModulePresentation';
import { Questionnaire, Question } from './Questionnaire';

interface ModuleWrapperProps {
    content: string;
    questions: Question[];
}

export function ModuleWrapper({ content, questions }: ModuleWrapperProps) {
    const [mode, setMode] = useState<'presentation' | 'questionnaire'>('presentation');

    const handlePresentationComplete = () => {
        if (questions && questions.length > 0) {
            setMode('questionnaire');
        }
    };

    if (mode === 'questionnaire') {
        return <Questionnaire questions={questions} />;
    }

    return <ModulePresentation content={content} onComplete={handlePresentationComplete} />;
}
