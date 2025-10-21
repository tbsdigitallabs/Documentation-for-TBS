"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';
import { HoloCard } from '@/components/HoloCard';
import { fadeIn, scaleIn, staggerContainer, staggerItem, hoverScale, buttonHover, pageTransition } from '@/lib/animations';

export default function ProjectManagersPage() {
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
              className="inline-flex items-center gap-2 bg-accent-project-managers/10 text-accent-project-managers px-3 py-1.5 rounded-full text-small font-medium mb-4 border border-accent-project-managers/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-1.5 h-1.5 bg-accent-project-managers rounded-full animate-pulse"></div>
              Project Manager Track
            </motion.div>

            <Heading level={1} className="text-content-primary mb-4">
              AI-Powered Project Management
            </Heading>
            <p className="text-heading-3 text-content-secondary mb-6 max-w-3xl mx-auto">
              Optimise project planning, resource management, and client communication with AI tools. Streamline workflows for better project outcomes.
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
              <HoloCard role="project-managers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-project-managers to-accent-project-managers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">1</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Asana Automation</h2>
                    <div className="text-small text-content-tertiary bg-accent-project-managers/10 px-2 py-1 rounded">Foundation</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Automate project workflows and task management using AI-powered Asana integrations.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Task automation rules
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Progress tracking
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Team notifications
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
                <Link href="/project-managers/module-1" className="mt-auto">
                  <Button className="w-full bg-accent-project-managers text-white hover:bg-accent-project-managers/90">
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
              <HoloCard role="project-managers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-project-managers to-accent-project-managers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">2</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Resource Optimisation</h2>
                    <div className="text-small text-content-tertiary bg-accent-project-managers/10 px-2 py-1 rounded">Advanced</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Use AI to optimise resource allocation and team productivity across multiple projects.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Capacity planning
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Skill matching
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Timeline optimisation
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
                <Link href="/project-managers/module-2" className="mt-auto">
                  <Button className="w-full bg-accent-project-managers text-white hover:bg-accent-project-managers/90">
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
              <HoloCard role="project-managers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-project-managers to-accent-project-managers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Client Communication Tools</h2>
                    <div className="text-small text-content-tertiary bg-accent-project-managers/10 px-2 py-1 rounded">Expert</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Enhance client communication with AI-powered reporting and status updates.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Automated reporting
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Status dashboards
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-project-managers rounded-full mr-3"></span>
                    Risk assessment
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-display">
                    <span className="text-heading-3 text-content-primary">45 min</span>
                    <span className="text-small text-content-secondary">Duration</span>
                  </div>
                  <div className="stat-display">
                    <span className="text-heading-3 text-content-secondary">4</span>
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
                <Link href="/project-managers/module-3" className="mt-auto">
                  <Button className="w-full bg-accent-project-managers text-white hover:bg-accent-project-managers/90">
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