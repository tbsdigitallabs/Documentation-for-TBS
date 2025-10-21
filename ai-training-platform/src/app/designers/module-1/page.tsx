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
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: Introduction to AI Design Tools</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Explore the landscape of AI design tools and understand how they can enhance your creative workflow.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 10 minutes</span>
                        <Link href="/designers/module-1/lesson-1">
                            <button className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Midjourney & DALL-E Mastery</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Learn to create stunning visuals using AI image generation tools.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 12 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Figma AI Plugins</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Integrate AI tools directly into your Figma workflow for enhanced productivity.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 10 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 4: Brand Consistency with AI</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to maintain brand consistency across all design assets.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 8 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
