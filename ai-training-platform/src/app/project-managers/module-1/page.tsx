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
                <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
                    <h2 className="text-xl font-semibold text-content-primary mb-4">Lesson 1: Asana AI Integration</h2>
                    <p className="text-content-secondary mb-4">
                        Learn how to integrate AI tools with Asana for automated project management.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 12 minutes</span>
                        <Link href="/project-managers/module-1/lesson-1">
                            <button className="bg-accent-project-managers text-white px-4 py-2 rounded-md hover:bg-accent-project-managers-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 2: Automated Task Creation</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI to automatically create and assign tasks based on project requirements.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 3: Progress Tracking & Reporting</h2>
                    <p className="text-content-tertiary mb-4">
                        Automate progress tracking and generate AI-powered project reports.
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
