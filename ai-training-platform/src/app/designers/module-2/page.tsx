import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function DesignersModule2Page() {
    return (
        <ModuleLayout
            title="Sora 2 Video Creation"
            description="Learn to create professional videos with Sora 2 AI for client projects and marketing content"
            role="Designer"
            rolePath="/designers"
            moduleNumber={2}
            totalLessons={3}
            estimatedTime="35 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lesson 1: Sora 2 Setup & Access</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to access Sora 2 from Australia and set up your account for video creation.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">⏱️ 15 minutes</span>
                        <Link href="/designers/module-2/lesson-1">
                            <button className="bg-accent-designers text-white px-4 py-2 rounded-md hover:bg-accent-designers-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 2: Video Prompt Engineering</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Master the art of writing effective prompts for Sora 2 video generation.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">⏱️ 12 minutes</span>
                        <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg opacity-75">
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">Lesson 3: Professional Video Workflows</h2>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Create professional video content for client projects and marketing campaigns.
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
