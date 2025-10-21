import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function ContentCreatorsModule1Page() {
    return (
        <ModuleLayout
            title="AI Writing Assistants"
            description="Master AI-powered writing tools for efficient content creation and ideation"
            role="Content Creator"
            rolePath="/content-creators"
            moduleNumber={1}
            totalLessons={4}
            estimatedTime="35 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: ChatGPT for Content Creation</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn effective prompting techniques for creating engaging content with ChatGPT.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 10 minutes</span>
                        <Link href="/content-creators/module-1/lesson-1">
                            <button className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Claude for Long-form Content</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use Claude for creating comprehensive articles, reports, and detailed content.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 12 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Content Ideation & Brainstorming</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to generate creative content ideas and overcome writer's block.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 8 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 4: Content Editing & Refinement</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI tools to edit, refine, and polish your content for maximum impact.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 5 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
