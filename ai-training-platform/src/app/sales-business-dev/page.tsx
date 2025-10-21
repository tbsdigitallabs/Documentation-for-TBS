"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';
import { HoloCard } from '@/components/HoloCard';
import { fadeIn, scaleIn, staggerContainer, staggerItem, hoverScale, buttonHover, pageTransition } from '@/lib/animations';

export default function SalesBusinessDevPage() {
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
              className="inline-flex items-center gap-2 bg-accent-sales-business/10 text-accent-sales-business px-3 py-1.5 rounded-full text-small font-medium mb-4 border border-accent-sales-business/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-1.5 h-1.5 bg-accent-sales-business rounded-full animate-pulse"></div>
              Sales & Business Development Track
            </motion.div>

            <Heading level={1} className="text-content-primary mb-4">
              AI-Driven Sales & Business Development
            </Heading>
            <p className="text-heading-3 text-content-secondary mb-6 max-w-3xl mx-auto">
              Streamline CRM automation, proposal generation, and client research. Use AI tools to accelerate business development and improve sales outcomes.
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
              <HoloCard role="sales-business" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-sales-business to-accent-sales-business/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">1</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">HubSpot Automation</h2>
                    <div className="text-small text-content-tertiary bg-accent-sales-business/10 px-2 py-1 rounded">Foundation</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Automate CRM workflows and lead management using AI-powered HubSpot integrations.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Lead scoring automation
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Email sequences
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Pipeline management
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
                <Link href="/sales-business-dev/module-1" className="mt-auto">
                  <Button className="w-full bg-accent-sales-business text-white hover:bg-accent-sales-business/90">
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
              <HoloCard role="sales-business" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-sales-business to-accent-sales-business/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">2</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Proposal Generation</h2>
                    <div className="text-small text-content-tertiary bg-accent-sales-business/10 px-2 py-1 rounded">Advanced</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Create compelling proposals and presentations using AI-powered content generation.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Template automation
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Customisation tools
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Presentation design
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
                <Link href="/sales-business-dev/module-2" className="mt-auto">
                  <Button className="w-full bg-accent-sales-business text-white hover:bg-accent-sales-business/90">
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
              <HoloCard role="sales-business" className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-sales-business to-accent-sales-business/70 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-content-primary">Lead Qualification</h2>
                    <div className="text-small text-content-tertiary bg-accent-sales-business/10 px-2 py-1 rounded">Expert</div>
                  </div>
                </div>
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  Use AI to identify and qualify high-value prospects for better conversion rates.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Prospect research
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Intent analysis
                  </div>
                  <div className="flex items-center text-small text-content-tertiary">
                    <span className="w-2 h-2 bg-accent-sales-business rounded-full mr-3"></span>
                    Conversion tracking
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
                <Link href="/sales-business-dev/module-3" className="mt-auto">
                  <Button className="w-full bg-accent-sales-business text-white hover:bg-accent-sales-business/90">
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