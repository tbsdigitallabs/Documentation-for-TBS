import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function ProjectManagersModule2Page() {
    return (
        <ModuleLayout
            title="Resource Optimisation"
            description="Use AI to optimise team resources and project timelines for maximum efficiency"
            role="Project Manager"
            rolePath="/project-managers"
            moduleNumber={2}
            totalLessons={3}
            estimatedTime="25 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: AI Resource Planning</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to use AI for intelligent resource allocation and capacity planning.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 10 minutes</span>
                        <Link href="/project-managers/module-2/lesson-1">
                            <button className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Timeline Optimisation</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to create realistic project timelines and identify potential bottlenecks.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 8 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Risk Management with AI</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Leverage AI for proactive risk identification and mitigation strategies.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 7 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
