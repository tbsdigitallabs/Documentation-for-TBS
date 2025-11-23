"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-surface-primary">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-magenta-500/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-sage-500/20 blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-oxford-blue/10 blur-[100px] animate-float" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glitch Title */}
          <div className="mb-6 relative inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-heading font-bold text-content-primary tracking-tighter"
            >
              Learning
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-magenta-500 to-accent-sage-500 relative">
                Lab
                <span className="absolute inset-0 bg-gradient-to-r from-accent-magenta-500 to-accent-sage-500 opacity-50 blur-lg -z-10" />
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-content-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Master the AI tools that are reshaping your role.
            <br className="hidden md:block" />
            Practical, role-specific training for the TBS team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/class-selection">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-button text-button border border-button-border hover:bg-button-hover shadow-lg transition-all duration-300 hover:-translate-y-1">
                Start Training
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2 border-button-border text-content-primary hover:bg-surface-secondary transition-all duration-300">
                Explore Modules
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-content-tertiary flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-content-tertiary"
          />
        </div>
      </motion.div>
    </section>
  );
}
