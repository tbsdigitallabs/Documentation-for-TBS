"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Layers, ArrowRight } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ModulePresentationProps {
    content: string; // Raw MDX content
    onComplete: () => void;
}

// Custom MDX Components to match Stitch Design
const components = {
    h1: (props: any) => (
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-magenta mb-6 leading-tight" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-4xl font-bold text-content-primary mb-6 mt-2" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-2xl font-bold text-cyber-cyan dark:text-cyber-cyan text-oxford-blue mb-4 mt-6" {...props} />
    ),
    p: (props: any) => (
        <div className="text-lg text-content-secondary leading-relaxed mb-6" {...props} />
    ),
    ul: (props: any) => (
        <div className="grid grid-cols-1 gap-4 my-8">
            <ul className="space-y-4" {...props} />
        </div>
    ),
    li: (props: any) => (
        <li className="flex items-start gap-4 p-4 rounded-xl bg-surface-tertiary/50 border border-gray-200 dark:border-white/10 hover:bg-surface-tertiary transition-colors">
            <div className="w-6 h-6 rounded-full bg-cyber-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
            </div>
            <span className="text-content-secondary" {...props} />
        </li>
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-cyber-magenta pl-6 py-2 my-6 bg-cyber-magenta/5 rounded-r-lg italic text-content-secondary" {...props} />
    ),
    strong: (props: any) => (
        <strong className="text-content-primary font-bold" {...props} />
    ),
    img: (props: any) => (
        <div className="relative w-full h-64 md:h-80 my-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img
                className="object-cover w-full h-full"
                {...props}
            />
        </div>
    ),
};

interface SlideData {
    serialized: any;
    image?: {
        src: string;
        alt: string;
    };
}

export function ModulePresentation({ content, onComplete }: ModulePresentationProps) {
    const [slides, setSlides] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideData, setSlideData] = useState<SlideData[]>([]);

    // Split content into slides based on horizontal rules '---'
    useEffect(() => {
        if (content) {
            // Split by '---' surrounded by newlines, handling both Unix (\n) and Windows (\r\n) line endings
            const rawSlides = content.split(/\r?\n---\r?\n/).map(slide => slide.trim()).filter(slide => slide.length > 0);
            setSlides(rawSlides);

            // Process each slide: extract image if present, serialize text
            const processSlides = async () => {
                const processed = await Promise.all(
                    rawSlides.map(async (slide) => {
                        // Check for markdown image: ![alt](src)
                        const imageMatch = slide.match(/!\[(.*?)\]\((.*?)\)/);
                        let textContent = slide;
                        let image = undefined;

                        if (imageMatch) {
                            image = {
                                alt: imageMatch[1],
                                src: imageMatch[2]
                            };
                            // Remove the image markdown from the text content
                            textContent = slide.replace(imageMatch[0], '');
                        }

                        const serialized = await serialize(textContent);
                        return { serialized, image };
                    })
                );
                setSlideData(processed);
            };

            processSlides();
        }
    }, [content]);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const progress = ((currentSlide + 1) / slides.length) * 100;

    if (slideData.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-cyan"></div>
            </div>
        );
    }

    const currentSlideData = slideData[currentSlide];

    return (
        <div className="flex flex-col h-full w-full">
            {/* Main Content Area */}
            <div className="flex-grow flex flex-col relative min-h-0">

                {/* Progress Indicator - Fixed at top of content */}
                <div className="flex-shrink-0 mb-6 flex items-center gap-4 px-1">
                    <div className="flex-grow h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <span className="text-sm font-mono text-content-tertiary">
                        {currentSlide + 1} / {slides.length}
                    </span>
                </div>

                {/* Slide Content - Scrollable */}
                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <div className="bg-surface-card rounded-2xl p-6 md:p-10 border border-white/10 shadow-xl backdrop-blur-md min-h-full">
                                {currentSlideData.image ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
                                        {/* Text Column */}
                                        <div className="prose prose-lg prose-invert max-w-none">
                                            <MDXRemote {...currentSlideData.serialized} components={components} />
                                        </div>

                                        {/* Image Column */}
                                        <div className="relative w-full h-64 lg:h-auto lg:aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg lg:sticky lg:top-0">
                                            <img
                                                src={currentSlideData.image.src}
                                                alt={currentSlideData.image.alt}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="prose prose-lg prose-invert max-w-none mx-auto">
                                        <MDXRemote {...currentSlideData.serialized} components={components} />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Navigation - Fixed at bottom */}
            <div className="flex-shrink-0 flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                <button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                        ${currentSlide === 0
                            ? 'text-content-tertiary cursor-not-allowed'
                            : 'bg-surface-tertiary text-content-primary hover:bg-surface-tertiary/80'}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-button text-button border border-button-border hover:bg-button-hover transition-all"
                >
                    {currentSlide === slides.length - 1 ? (
                        <>
                            Complete Module
                            <CheckCircle className="w-5 h-5" />
                        </>
                    ) : (
                        <>
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
