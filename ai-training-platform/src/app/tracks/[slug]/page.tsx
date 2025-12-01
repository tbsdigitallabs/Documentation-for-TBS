"use client";

import React from 'react';
import { ArrowLeft, Bell, Layers, Cpu, Code, Network, Brain, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useParams } from 'next/navigation';

export default function TrackDetails() {
    const params = useParams();
    const slug = params?.slug;

    return (
        <div className="max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-400" />
                </button>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-gray-800 relative transition-colors">
                        <Bell className="w-6 h-6 text-gray-400" />
                        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        {/* Placeholder for user avatar */}
                        <div className="w-full h-full bg-gradient-to-br from-primary to-cyber-magenta"></div>
                    </div>
                </div>
            </header>

            <div className="mb-12">
                <h1 className="text-5xl font-bold tracking-tight text-white mb-3 capitalize">
                    {slug?.toString().replace('-', ' ') || "Advanced Neural Networks"}
                </h1>
                <p className="text-lg text-gray-400 max-w-3xl">
                    A comprehensive track covering the principles and applications of advanced neural network architectures.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 mb-12">
                <GlassCard className="p-6 rounded-lg text-center bg-transparent">
                    <span className="block text-3xl font-bold text-white">12h 30m</span>
                    <span className="text-sm text-gray-400">Total Duration</span>
                </GlassCard>
                <GlassCard className="p-6 rounded-lg text-center bg-transparent">
                    <span className="block text-3xl font-bold text-white">15</span>
                    <span className="text-sm text-gray-400">Modules</span>
                </GlassCard>
                <button className="w-full text-lg font-semibold text-white py-5 px-8 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-magenta hover:from-cyan-500 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-cyan-500/30">
                    Start Track
                </button>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Modules in this Track</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                                <Layers className="text-cyan-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Introduction to CNNs</h3>
                                <p className="text-sm text-gray-400">45m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Learn the fundamentals of Convolutional Neural Networks, a class of deep neural networks.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>

                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center">
                                <Cpu className="text-purple-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Recurrent Neural Networks</h3>
                                <p className="text-sm text-gray-400">1h 15m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Explore RNNs, a class of artificial neural networks where connections between nodes form a directed graph.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>

                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-400/20 flex items-center justify-center">
                                <Code className="text-green-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Transformers & Attention</h3>
                                <p className="text-sm text-gray-400">2h 00m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Dive deep into the transformer architecture and the attention mechanism.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>

                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-red-400/20 flex items-center justify-center">
                                <Network className="text-red-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">GANs</h3>
                                <p className="text-sm text-gray-400">1h 45m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Understand Generative Adversarial Networks and their applications.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>

                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                                <Brain className="text-yellow-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Reinforcement Learning</h3>
                                <p className="text-sm text-gray-400">2h 30m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Learn about how intelligent agents take actions in an environment.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>

                    <GlassCard className="p-5 rounded-lg bg-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-indigo-400/20 flex items-center justify-center">
                                <Sparkles className="text-indigo-400 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Autoencoders</h3>
                                <p className="text-sm text-gray-400">1h 00m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Discover autoencoders and their use in unsupervised learning.</p>
                        <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">View Module</button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
