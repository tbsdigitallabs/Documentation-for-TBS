import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function SalesBusinessDevModule1Page() {
    return (
        <ModuleLayout
            title="HubSpot Automation"
            description="Automate CRM workflows and lead management in HubSpot using AI-powered tools"
            role="Sales & Business Development"
            rolePath="/sales-business-dev"
            moduleNumber={1}
            totalLessons={4}
            estimatedTime="40 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: HubSpot AI Setup</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to configure AI features in HubSpot for automated lead management.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 12 minutes</span>
                        <Link href="/sales-business-dev/module-1/lesson-1">
                            <button className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Lead Scoring with AI</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to automatically score and prioritise leads for maximum conversion.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 10 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Automated Follow-ups</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Set up intelligent follow-up sequences using AI-powered email automation.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 12 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 4: Analytics & Insights</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI analytics to gain insights into sales performance and opportunities.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 6 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
