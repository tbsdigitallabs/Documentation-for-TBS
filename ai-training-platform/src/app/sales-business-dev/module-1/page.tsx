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
                <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
                    <h2 className="text-xl font-semibold text-content-primary mb-4">Lesson 1: HubSpot AI Setup</h2>
                    <p className="text-content-secondary mb-4">
                        Learn how to configure AI features in HubSpot for automated lead management.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 12 minutes</span>
                        <Link href="/sales-business-dev/module-1/lesson-1">
                            <button className="bg-accent-sales-business text-white px-4 py-2 rounded-md hover:bg-accent-sales-business-90">
                                Start Lesson
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 2: Lead Scoring with AI</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI to automatically score and prioritise leads for maximum conversion.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 10 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 3: Automated Follow-ups</h2>
                    <p className="text-content-tertiary mb-4">
                        Set up intelligent follow-up sequences using AI-powered email automation.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 12 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>

                <div className="bg-surface-card p-6 rounded-lg border border-border-primary opacity-75">
                    <h2 className="text-xl font-semibold text-content-tertiary mb-4">Lesson 4: Analytics & Insights</h2>
                    <p className="text-content-tertiary mb-4">
                        Use AI analytics to gain insights into sales performance and opportunities.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-content-tertiary">⏱️ 6 minutes</span>
                        <button className="bg-disabled text-disabled px-4 py-2 rounded-md cursor-not-allowed border border-disabled" disabled>
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
}
