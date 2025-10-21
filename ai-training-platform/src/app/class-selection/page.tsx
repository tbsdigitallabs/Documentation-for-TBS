"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Heading } from "@/components/Heading";
import { HoloCard } from "@/components/HoloCard";
import { fadeIn, scaleIn, staggerContainer, staggerItem, hoverScale, buttonHover, pageTransition } from "@/lib/animations";

export default function ClassSelectionPage() {
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
                            Professional Development
                        </motion.div>

                        <Heading level={1} className="text-content-primary mb-4">
                            Choose Your Learning Track
                        </Heading>
                        <p className="text-heading-3 text-content-secondary mb-6 max-w-3xl mx-auto">
                            Select the professional track that matches your role at TBS Digital Labs. Each track includes specialized modules and tools relevant to your work.
                        </p>
                        <div className="flex items-center justify-center text-content-tertiary">
                            <span className="text-small">Self-paced learning • Real project workflows • Team-specific content</span>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="stat-display text-center">
                            <div className="text-heading-2 text-content-primary">5</div>
                            <div className="text-small text-content-secondary">Professional Tracks</div>
                        </div>
                        <div className="stat-display text-center">
                            <div className="text-heading-2 text-content-primary">15+</div>
                            <div className="text-small text-content-secondary">Training Modules</div>
                        </div>
                        <div className="stat-display text-center">
                            <div className="text-heading-2 text-content-primary">2-3</div>
                            <div className="text-small text-content-secondary">Hours per Track</div>
                        </div>
                        <div className="stat-display text-center">
                            <div className="text-heading-2 text-content-primary">100%</div>
                            <div className="text-small text-content-secondary">Team Focused</div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Track Cards Section */}
            <Section className="bg-gradient-surface" size="lg">
                <Container>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        {/* Developer Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="developers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-developers to-accent-developers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">D</span>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-3 text-content-primary">Developer</h3>
                                        <div className="text-small text-content-tertiary bg-accent-developers/10 px-2 py-1 rounded">Technical</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Master AI-assisted coding, debugging, and MCP server development for TBS projects
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                                        Cursor IDE workflows
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                                        GitHub Copilot integration
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                                        MCP server development
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">3</span>
                                        <span className="text-small text-content-secondary">Modules</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">2-3 hrs</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                </div>
                                <Link href="/developers" className="mt-auto">
                                    <Button className="w-full bg-accent-developers text-white hover:bg-accent-developers/90">
                                        Start Developer Track
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Designer Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="designers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-designers to-accent-designers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">D</span>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-3 text-content-primary">Designer</h3>
                                        <div className="text-small text-content-tertiary bg-accent-designers/10 px-2 py-1 rounded">Creative</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Create stunning visuals with AI design tools and Sora 2 video generation for client projects
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        AI design tools
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Sora 2 video creation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-designers rounded-full mr-3"></span>
                                        Asset generation workflows
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">3</span>
                                        <span className="text-small text-content-secondary">Modules</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">2-3 hrs</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                </div>
                                <Link href="/designers" className="mt-auto">
                                    <Button className="w-full bg-accent-designers text-white hover:bg-accent-designers/90">
                                        Start Designer Track
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Project Manager Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="project-managers" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-project-managers to-accent-project-managers/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">PM</span>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-3 text-content-primary">Project Manager</h3>
                                        <div className="text-small text-content-tertiary bg-accent-project-managers/10 px-2 py-1 rounded">Strategic</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Optimise project planning, resource management, and client communication with AI tools
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                                        Asana automation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                                        Resource optimisation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                                        Client communication tools
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">3</span>
                                        <span className="text-small text-content-secondary">Modules</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">2-3 hrs</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                </div>
                                <Link href="/project-managers" className="mt-auto">
                                    <Button className="w-full bg-accent-project-managers text-white hover:bg-accent-project-managers/90">
                                        Start PM Track
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Content Creator Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="content-creators" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-content-creators to-accent-content-creators/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">CC</span>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-3 text-content-primary">Content Creator</h3>
                                        <div className="text-small text-content-tertiary bg-accent-content-creators/10 px-2 py-1 rounded">Creative</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Enhance content creation with AI writing assistants and visual generation for marketing materials
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-content-creators rounded-full mr-3"></span>
                                        AI writing assistants
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-content-creators rounded-full mr-3"></span>
                                        SEO optimisation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-content-creators rounded-full mr-3"></span>
                                        Brand voice consistency
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">3</span>
                                        <span className="text-small text-content-secondary">Modules</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">2-3 hrs</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                </div>
                                <Link href="/content-creators" className="mt-auto">
                                    <Button className="w-full bg-accent-content-creators text-white hover:bg-accent-content-creators/90">
                                        Start Content Track
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>

                        {/* Sales & Business Development Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <HoloCard role="sales-business" className="h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-sales-business to-accent-sales-business/70 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-lg font-bold text-white">S</span>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-3 text-content-primary">Sales & Business Dev</h3>
                                        <div className="text-small text-content-tertiary bg-accent-sales-business/10 px-2 py-1 rounded">Growth</div>
                                    </div>
                                </div>
                                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                                    Streamline CRM automation, proposal generation, and client research for business development
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                                        HubSpot automation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                                        Proposal generation
                                    </div>
                                    <div className="flex items-center text-small text-content-tertiary">
                                        <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                                        Lead qualification
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">3</span>
                                        <span className="text-small text-content-secondary">Modules</span>
                                    </div>
                                    <div className="stat-display">
                                        <span className="text-heading-3 text-content-primary">2-3 hrs</span>
                                        <span className="text-small text-content-secondary">Duration</span>
                                    </div>
                                </div>
                                <Link href="/sales-business-dev" className="mt-auto">
                                    <Button className="w-full bg-accent-sales-business text-white hover:bg-accent-sales-business/90">
                                        Start Sales Track
                                    </Button>
                                </Link>
                            </HoloCard>
                        </motion.div>
                    </motion.div>

                    {/* Back Button */}
                    <div className="text-center mt-12">
                        <Link href="/" className="inline-flex items-center text-content-secondary hover:text-content-primary transition-colors">
                            ← Back to AI Training Hub
                        </Link>
                    </div>
                </Container>
            </Section>
        </motion.div>
    );
}