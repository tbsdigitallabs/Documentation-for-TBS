"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrainingProgressCard } from "@/components/TrainingProgressCard";
import { pageTransition } from "@/lib/animations";
import { Target, Zap, BarChart3, Users, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();

  const stats = [
    {
      label: "Training Level",
      value: "Beginner",
      progress: 0
    },
    {
      label: "Modules Completed",
      value: "0 of 12",
      progress: 0
    },
    {
      label: "Skills Developed",
      value: "0",
      progress: 0
    }
  ];

  const features = [
    {
      title: "Role-Specific Training",
      description: "Customized learning paths for developers, designers, project managers, content creators, and sales teams.",
      icon: Target
    },
    {
      title: "Internal Tools Focus",
      description: "Learn AI tools and workflows that directly support our client delivery and internal processes.",
      icon: Zap
    },
    {
      title: "Progress Monitoring",
      description: "Track your skill development and training completion across all internal modules.",
      icon: BarChart3
    },
    {
      title: "Team Knowledge Sharing",
      description: "Collaborate with colleagues and share insights across different roles and experience levels.",
      icon: Users
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-4 lg:space-y-6">
          <motion.div
            className="bg-surface-primary"
            {...pageTransition}
          >
            {/* Hero Section - Compact Composition */}
            <section className="py-4 lg:py-6 px-4 bg-surface-primary rounded-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Side - Hero Content (2 columns) */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="space-y-3">
                      <h1 className="text-4xl lg:text-5xl font-bold leading-tight font-heading text-content-primary">
                        Internal AI Training
                      </h1>
                      <h2 className="text-xl lg:text-2xl font-semibold font-heading text-content-secondary">
                        TBS Digital Labs Team Development
                      </h2>
                      <p className="text-lg leading-relaxed font-body text-content-secondary max-w-2xl">
                        Build your AI skills through practical training modules designed for our internal workflows and client delivery processes.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/class-selection">
                        <Button variant="default" size="lg" className="group min-w-[180px]">
                          <BookOpen className="w-5 h-5 mr-3" />
                          Start Learning
                          <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link href="/developers">
                        <Button variant="outline" size="lg" className="min-w-[160px]">
                          <TrendingUp className="w-5 h-5 mr-3" />
                          View Progress
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Stats Dashboard (1 column) */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <TrainingProgressCard stats={stats} />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Features + CTA Section - Dynamic Grid Composition */}
            <section className="py-4 lg:py-6 px-4 bg-surface-secondary rounded-xl">
              <div className={`grid gap-6 ${features.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
                {/* Left Side - Features (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                  <motion.div
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold mb-3 font-heading text-content-primary">
                      Internal Training Benefits
                    </h2>
                    <p className="text-lg leading-relaxed font-body text-content-secondary">
                      Practical training modules designed by our team for our internal processes and client delivery standards.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="group rounded-lg p-4 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-surface-card border-border-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="mb-3 p-2 rounded-lg w-fit bg-accent-magenta/10 group-hover:bg-accent-magenta/20 transition-colors">
                          <feature.icon className="w-5 h-5 text-accent-magenta" />
                        </div>
                        <h3 className="text-base font-semibold mb-2 font-heading text-content-primary">
                          {feature.title}
                        </h3>
                        <p className="text-sm leading-relaxed font-body text-content-secondary">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Side - CTA with Progressive Disclosure (1 column) */}
                <div className="lg:col-span-1 flex flex-col justify-between space-y-4">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="space-y-3">
                      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-content-primary">
                        Ready to Enhance Your Skills?
                      </h2>
                      <p className="text-base leading-relaxed font-body text-content-secondary">
                        Join your team in developing AI capabilities that will improve our internal processes and client delivery standards.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/class-selection">
                          <Button variant="default" size="lg" className="w-full max-w-xs group">
                            <BookOpen className="w-5 h-5 mr-3" />
                            Choose Your Track
                            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/developers">
                          <Button variant="outline" size="lg" className="w-full max-w-xs">
                            <TrendingUp className="w-5 h-5 mr-3" />
                            View All Modules
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="aspect-square rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold font-heading mb-1">12</div>
                      <div className="text-sm font-body">Training Modules</div>
                      <div className="text-xs font-body opacity-90">Available Now</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Training Summary Card - Content Anchor */}
            <motion.div
              className="mt-8 lg:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="py-6 px-6 bg-gradient-to-r from-accent-magenta/5 to-accent-sage/5 rounded-xl border border-accent-magenta/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent-magenta font-heading">12</div>
                    <div className="text-sm text-content-secondary font-body">Training Modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-sage font-heading">5</div>
                    <div className="text-sm text-content-secondary font-body">Role Tracks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-content-primary font-heading">24/7</div>
                    <div className="text-sm text-content-secondary font-body">Access Available</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Bridge - Gradient Divider */}
            <motion.div
              className="h-[1px] w-full bg-gradient-to-r from-accent-magenta/30 to-accent-sage/30 mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-6 bg-surface-hero border-t border-border-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-primary.png'}
                alt="TBS Digital Labs"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-base font-body text-content-secondary font-medium">
                AI Training Platform
              </span>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-sm mb-1 font-body text-content-secondary">
                © 2025 TBS Digital Labs. Internal team development platform.
              </p>
              <p className="text-xs font-body text-content-tertiary">
                Built with Next.js, Tailwind CSS, and Framer Motion
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}