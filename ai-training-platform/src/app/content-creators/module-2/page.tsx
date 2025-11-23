import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function ContentCreatorsModule2Page() {
    return (
        <ModuleLayout
            title="SEO Optimisation"
            description="Use AI to optimise content for search engines and improve organic visibility"
            role="Content Creator"
            rolePath="/content-creators"
            moduleNumber={2}
            totalLessons={3}
            estimatedTime="30 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: AI Keyword Research</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to use AI tools for effective keyword research and content planning.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 12 minutes</span>
                        <Link href="/content-creators/module-2/lesson-1">
                            <button className="bg-accent-content-creators text-white px-4 py-2 rounded-md hover:bg-accent-content-creators-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Content Optimisation</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to optimise existing content for better search engine rankings.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 10 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Meta Descriptions & Titles</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Generate compelling meta descriptions and titles using AI for better click-through rates.
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
