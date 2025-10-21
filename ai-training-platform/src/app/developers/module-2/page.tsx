import Link from 'next/link';
import ModuleLayout from '@/components/ModuleLayout';

export default function DevelopersModule2Page() {
    return (
        <ModuleLayout
            title="GitHub Copilot Workflows"
            description="Integrate GitHub Copilot into your development workflow for enhanced productivity and code quality"
            role="Developer"
            rolePath="/developers"
            moduleNumber={2}
            totalLessons={4}
            estimatedTime="30 minutes"
            progress={0}
        >
            <div className="space-y-6">
                <div className="bg-surface-card p-6 rounded-lg border border-primary">
                    <h2 className="text-xl font-semibold text-content-primary mb-4">Lesson 1: GitHub Copilot Setup</h2>
                    <p className="text-content-secondary mb-4">
                        Learn how to install and configure GitHub Copilot in your development environment.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 8 minutes</span>
                        <Link href="/developers/module-2/lesson-1">
                            <button className="bg-accent-developers text-white px-4 py-2 rounded-md hover:bg-accent-developers/90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 2: Effective Prompting for Code</h2>
                    <p className="text-content-tertiary mb-4">
                        Master the art of writing effective prompts to get the best code suggestions from Copilot.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 3: Code Review with Copilot</h2>
                    <p className="text-content-tertiary mb-4">
                        Use Copilot to enhance your code review process and catch potential issues.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 7 minutes</span>
                        <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 4: Advanced Copilot Techniques</h2>
                    <p className="text-content-tertiary mb-4">
                        Learn advanced techniques for maximising Copilot's potential in complex development scenarios.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 5 minutes</span>
                        <button className="bg-surface-tertiary text-content-tertiary px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
