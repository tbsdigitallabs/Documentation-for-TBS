import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function DesignersModule1Page() {
    return (
        <ModuleLayout
            title="AI Design Tools"
            description="Master AI-powered design tools for efficient visual creation and rapid prototyping"
            role="Designer"
            rolePath="/designers"
            moduleNumber={1}
            totalLessons={4}
            estimatedTime="40 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
                    <h2 className="text-xl font-semibold text-content-primary mb-4">Lesson 1: Introduction to AI Design Tools</h2>
                    <p className="text-content-secondary mb-4">
                        Explore the landscape of AI design tools and understand how they can enhance your creative workflow.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <Link href="/designers/module-1/lesson-1">
                            <button className="bg-accent-designers text-white px-4 py-2 rounded-md hover:bg-accent-designers-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 2: Midjourney & DALL-E Mastery</h2>
                    <p className="text-content-tertiary mb-4">
                        Learn to create stunning visuals using AI image generation tools.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 12 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 3: Figma AI Plugins</h2>
                    <p className="text-content-tertiary mb-4">
                        Integrate AI tools directly into your Figma workflow for enhanced productivity.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 4: Brand Consistency with AI</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI to maintain brand consistency across all design assets.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 8 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
