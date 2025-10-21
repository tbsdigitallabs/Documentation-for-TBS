"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';
import { HoloCard } from '@/components/HoloCard';
import { fadeIn, scaleIn, staggerContainer, staggerItem, hoverScale, buttonHover, pageTransition } from '@/lib/animations';

export default function DesignersPage() {
    return (
        <motion.div
            className="min-h-screen bg-gradient-surface"
            {...pageTransition}
        >
            {/* Hero Section */}
            <Section className="bg-surface-hero" size="md">
                <Container>
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 bg-accent-designers/10 text-accent-designers px-3 py-1.5 rounded-full text-small font-medium mb-4 border border-accent-designers/20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="w-1.5 h-1.5 bg-accent-designers rounded-full animate-pulse"></div>
                            Designer Track
                        </motion.div>

                        <Heading level={1} className="text-content-primary mb-4">
                            AI-Powered Design
                        </Heading>
                        <p className="text-heading-3 text-content-secondary mb-6 max-w-3xl mx-auto">
                            Create stunning visuals with AI design tools and Sora 2 video generation. Master workflows that enhance creativity and efficiency for TBS client projects.
                        </p>
                        <div className="flex items-center justify-center text-content-tertiary">
                            <span className="text-small">3 modules • 2-3 hours total • Self-paced learning</span>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Modules Section */}
            <Section className="bg-gradient-surface" size="lg">
                <Container>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Module 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="designers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-designers to-accent-designers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">1</span>
                                    </div>
                                    <div>
                                        <h2 className="text-heading-3 text-content-primary">AI Design Tools</h2>
                                        <div className="text-small text-content-tertiary bg-accent-designers/10 px-2 py-1 rounded">Foundation</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Master AI-powered design tools for creating professional visuals, logos, and marketing materials.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Midjourney workflows
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        DALL-E integration
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Brand consistency tools
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">45 min</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">5</span>
                                        <span className="text-small text-content-secondary">Lessons</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between text-small text-content-secondary mb-1">
                                        <span>Progress</span>
                                        <span>0%</span>
                                    </div>
                                    <div className="progress-professional">
                                        <div className="progress-fill-professional" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <Link href="/designers/module-1" className="mt-auto">
                                    <Button className="w-full bg-accent-designers text-white hover:bg-accent-designers/90">
                                        Start Module 1
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Module 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="designers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-designers to-accent-designers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">2</span>
                                    </div>
                                    <div>
                                        <h2 className="text-heading-3 text-content-primary">Sora 2 Video Creation</h2>
                                        <div className="text-small text-content-tertiary bg-accent-designers/10 px-2 py-1 rounded">Advanced</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Create compelling video content using Sora 2's advanced AI video generation capabilities.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Video prompt engineering
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Style consistency
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Post-production workflows
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">60 min</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">6</span>
                                        <span className="text-small text-content-secondary">Lessons</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between text-small text-content-secondary mb-1">
                                        <span>Progress</span>
                                        <span>0%</span>
                                    </div>
                                    <div className="progress-professional">
                                        <div className="progress-fill-professional" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <Link href="/designers/module-2" className="mt-auto">
                                    <Button className="w-full bg-accent-designers text-white hover:bg-accent-designers/90">
                                        Start Module 2
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Module 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="designers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-designers to-accent-designers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">3</span>
                                    </div>
                                    <div>
                                        <h2 className="text-heading-3 text-content-primary">Asset Generation Workflows</h2>
                                        <div className="text-small text-content-tertiary bg-accent-designers/10 px-2 py-1 rounded">Expert</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Streamline asset creation and management workflows for efficient project delivery.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Batch asset generation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Quality control processes
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Client delivery systems
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">45 min</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">4</span>
                                        <span className="text-small text-content-secondary">Lessons</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between text-small text-content-secondary mb-1">
                                        <span>Progress</span>
                                        <span>0%</span>
                                    </div>
                                    <div className="progress-professional">
                                        <div className="progress-fill-professional" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <Link href="/designers/module-3" className="mt-auto">
                                    <Button className="w-full bg-accent-designers text-white hover:bg-accent-designers/90">
                                        Start Module 3
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>
                    </motion.div>

                    {/* Back Button */}
                    <div className="text-center mt-12">
                        <Link href="/class-selection" className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors">
                            ← Back to Track Selection
                        </Link>
                    </div>
                </Container>
            </Section>
        </motion.div>
    );
}