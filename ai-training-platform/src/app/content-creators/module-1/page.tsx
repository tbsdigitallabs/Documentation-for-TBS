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
                <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
                    <h2 className="text-xl font-semibold text-content-primary mb-4">Lesson 1: ChatGPT for Content Creation</h2>
                    <p className="text-content-secondary mb-4">
                        Learn effective prompting techniques for creating engaging content with ChatGPT.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <Link href="/content-creators/module-1/lesson-1">
                            <button className="bg-accent-content-creators text-white px-4 py-2 rounded-md hover:bg-accent-content-creators-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 2: Claude for Long-form Content</h2>
                    <p className="text-content-tertiary mb-4">
                        Use Claude for creating comprehensive articles, reports, and detailed content.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 12 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 3: Content Ideation & Brainstorming</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI to generate creative content ideas and overcome writer's block.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 8 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 4: Content Editing & Refinement</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI tools to edit, refine, and polish your content for maximum impact.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 5 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
