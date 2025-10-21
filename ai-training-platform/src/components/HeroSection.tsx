import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { Section } from './Section';
import { Heading } from './Heading';
import { Button } from './ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  children?: React.ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  children
}: HeroSectionProps) {
  return (
    <Section size="lg" className="bg-surface-primary">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <Heading level={1} className="text-4xl lg:text-5xl font-bold text-content-primary">
                {title}
              </Heading>
              <Heading level={2} className="text-xl lg:text-2xl font-normal text-content-secondary">
                {subtitle}
              </Heading>
              <p className="text-lg leading-relaxed text-content-secondary">
                {description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={primaryAction.href}>
                <Button variant="default" size="lg">
                  {primaryAction.label}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href={secondaryAction.href}>
                <Button variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
