"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Layers, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ModulePresentationProps {
    content: string; // Raw MDX content
    onComplete: () => void;
}

// Custom MDX Components - Responsive text sizing
const components = {
    h1: (props: any) => (
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-magenta mb-4 md:mb-6 leading-tight" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-content-primary mb-4 md:mb-6 mt-2" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-accent-sage-700 dark:text-accent-sage-400 mb-3 md:mb-4 mt-4 md:mt-6" {...props} />
    ),
    p: (props: any) => (
        <div className="text-sm sm:text-base md:text-lg text-content-secondary leading-relaxed mb-4 md:mb-6" {...props} />
    ),
    ul: (props: any) => (
        <div className="grid grid-cols-1 gap-2 md:gap-4 my-4 md:my-8">
            <ul className="space-y-2 md:space-y-4" {...props} />
        </div>
    ),
    li: (props: any) => (
        <li className="flex items-start gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:rounded-xl bg-surface-tertiary/50 border border-gray-200 dark:border-white/10">
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent-sage-100 dark:bg-cyber-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-sage-600 dark:bg-cyber-cyan" />
            </div>
            <span className="text-sm md:text-base text-content-secondary" {...props} />
        </li>
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-2 md:border-l-4 border-cyber-magenta pl-3 md:pl-6 py-2 my-4 md:my-6 bg-cyber-magenta/5 rounded-r-lg italic text-sm md:text-base text-content-secondary" {...props} />
    ),
    strong: (props: any) => (
        <strong className="text-content-primary font-bold" {...props} />
    ),
    img: (props: any) => (
        <div className="my-3 md:my-4 rounded-lg md:rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/20">
            <Image
                className="w-full h-auto max-h-[300px] md:max-h-[400px] object-contain mx-auto"
                width={800}
                height={400}
                alt={props.alt || 'Module image'}
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
            {/* Progress Bar - Compact, at top */}
            <div className="flex-shrink-0 mb-4 flex items-center gap-3">
                <div className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <span className="text-xs font-mono text-content-tertiary whitespace-nowrap">
                    {currentSlide + 1} / {slides.length}
                </span>
            </div>

            {/* Main Content Area - Full width, scrollable */}
            <div className="flex-grow overflow-y-auto min-h-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="h-full"
                    >
                        <div className="bg-surface-card rounded-xl p-4 md:p-6 lg:p-8 border border-white/10 shadow-lg min-h-full">
                            {currentSlideData.image ? (
                                <div className="space-y-4">
                                    {/* Image - Full width at top */}
                                    <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/10 flex items-center justify-center max-w-2xl mx-auto lg:float-right lg:ml-6 lg:mb-4 lg:w-[40%] lg:max-w-md">
                                        <Image
                                            src={currentSlideData.image.src}
                                            alt={currentSlideData.image.alt || 'Module image'}
                                            width={400}
                                            height={280}
                                            className="w-full h-auto max-h-[280px] object-contain"
                                        />
                                    </div>
                                    
                                    {/* Text Content - Flows around image on large screens */}
                                    <div className="prose prose-lg prose-invert max-w-none">
                                        <MDXRemote {...currentSlideData.serialized} components={components} />
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <MDXRemote {...currentSlideData.serialized} components={components} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Navigation - Responsive */}
            <div className="flex-shrink-0 flex items-center justify-between mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-200 dark:border-white/10">
                <button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className={`btn-nav flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-all
                        ${currentSlide === 0 ? 'opacity-50' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Back</span>
                </button>

                <button
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {currentSlide === slides.length - 1 ? (
                        <>
                            <span className="hidden sm:inline">Complete Mission</span>
                            <span className="sm:hidden">Complete</span>
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                        </>
                    ) : (
                        <>
                            <span>Continue</span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
