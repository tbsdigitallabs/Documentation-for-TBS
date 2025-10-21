import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function ProjectManagersModule1Page() {
    return (
        <ModuleLayout
            title="Asana Automation"
            description="Automate project workflows and task management in Asana using AI-powered tools"
            role="Project Manager"
            rolePath="/project-managers"
            moduleNumber={1}
            totalLessons={3}
            estimatedTime="30 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: Asana AI Integration</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to integrate AI tools with Asana for automated project management.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 12 minutes</span>
                        <Link href="/project-managers/module-1/lesson-1">
                            <button className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Automated Task Creation</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Use AI to automatically create and assign tasks based on project requirements.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 10 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Progress Tracking & Reporting</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Automate progress tracking and generate AI-powered project reports.
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
