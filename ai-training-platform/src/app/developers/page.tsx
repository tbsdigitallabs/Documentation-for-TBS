"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';
import { HoloCard } from '@/components/HoloCard';
import { fadeIn, scaleIn, staggerContainer, staggerItem, hoverScale, buttonHover, pageTransition } from '@/lib/animations';

export default function DevelopersPage() {
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
              className="inline-flex items-center gap-2 bg-accent-developers/10 text-accent-developers px-3 py-1.5 rounded-full text-small font-medium mb-4 border border-accent-developers/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-1.5 h-1.5 bg-accent-developers rounded-full animate-pulse"></div>
              Developer Track
            </motion.div>

            <Heading level={1} className="text-content-primary mb-4">
              AI-Assisted Development
            </Heading>
            <p className="text-heading-3 text-content-secondary mb-6 max-w-3xl mx-auto">
              Master AI tools for coding, debugging, and MCP server development. Learn workflows that integrate seamlessly with TBS Digital Labs projects.
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
              <HoloCard role="developers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-developers to-accent-developers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">1</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Cursor IDE Mastery</h2>
                    <div className="text-small text-content-tertiary bg-accent-developers/10 px-2 py-1 rounded">Foundation</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Learn to leverage Cursor's AI capabilities for efficient coding, debugging, and code generation in TBS projects.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    AI-powered code completion
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Intelligent debugging assistance
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Code refactoring workflows
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
                <Link href="/developers/module-1" className="mt-auto">
                  <Button className="w-full bg-accent-developers text-white hover:bg-accent-developers/90">
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
              <HoloCard role="developers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-developers to-accent-developers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">2</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">GitHub Copilot Integration</h2>
                    <div className="text-small text-content-tertiary bg-accent-developers/10 px-2 py-1 rounded">Advanced</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Integrate GitHub Copilot into your development workflow for enhanced productivity and code quality.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Copilot chat integration
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Code suggestion optimization
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Documentation generation
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-display">
                    <span className="text-heading-3 text-content-primary">30 min</span>
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
                <Link href="/developers/module-2" className="mt-auto">
                  <Button className="w-full bg-accent-developers text-white hover:bg-accent-developers/90">
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
              <HoloCard role="developers" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-developers to-accent-developers/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">MCP Server Development</h2>
                    <div className="text-small text-content-tertiary bg-accent-developers/10 px-2 py-1 rounded">Expert</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Build custom MCP servers to extend AI capabilities and integrate with TBS development workflows.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    MCP server architecture
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Custom tool integration
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-developers rounded-full mr-3"></span>
                    Production deployment
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
                <Link href="/developers/module-3" className="mt-auto">
                  <Button className="w-full bg-accent-developers text-white hover:bg-accent-developers/90">
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