import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function SalesBusinessDevModule2Page() {
    return (
        <ModuleLayout
            title="Proposal Generation"
            description="Use AI to create compelling proposals and presentations that win more business"
            role="Sales & Business Development"
            rolePath="/sales-business-dev"
            moduleNumber={2}
            totalLessons={3}
            estimatedTime="35 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: AI Proposal Writing</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to use AI to create professional proposals tailored to client needs.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 15 minutes</span>
                        <Link href="/sales-business-dev/module-2/lesson-1">
                            <button className="bg-accent-sales-business text-white px-4 py-2 rounded-md hover:bg-accent-sales-business-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Presentation Creation</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI tools to create engaging presentations and pitch decks.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 12 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Client Communication</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to craft personalised communication and follow-up messages.
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
