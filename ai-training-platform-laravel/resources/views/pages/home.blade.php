<x-layout>
        <x-container size="full" class="spacing-y-lg">
            <!-- Hero Section -->
            <x-section background="primary" size="md" class="rounded-xl">
                <x-container>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg lg:gap-spacing-xl items-start">
                    <!-- Left Side - Hero Content -->
                    <div class="lg:col-span-8">
                        <div class="spacing-y-md">
                            <div class="spacing-y-sm">
                                <x-heading level="1" class="text-heading-1">
                                    Internal AI Training
                                </x-heading>
                                <x-heading level="2" class="text-heading-2" style="color: var(--color-gray-600);">
                                    TBS Digital Labs Team Development
                                </x-heading>
                                <p class="text-body max-w-2xl">
                                    Build your AI skills through practical training modules designed for our internal workflows and client delivery processes.
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-spacing-sm">
                                <x-button href="/class-selection" variant="default" class="group whitespace-nowrap">
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Start Learning
                                    <svg class="w-5 h-5 ml-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </x-button>
                                <x-button href="/developers" variant="outline" class="whitespace-nowrap">
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    View Progress
                                </x-button>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Stats Dashboard -->
                    <div class="lg:col-span-4">
                        <div class="card rounded-xl card-padding-md">
                            <x-heading level="3" class="mb-spacing-md">Your Training Progress</x-heading>
                            <div class="spacing-y-md">
                                @foreach($stats as $stat)
                                    <div>
                                        <div class="text-small mb-spacing-xs">{{ $stat['label'] }}</div>
                                        <div class="text-heading-3" style="color: var(--color-oxford-blue);">{{ $stat['value'] }}</div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </x-container>
            </x-section>

            <!-- Features Section -->
            <x-section background="secondary" size="md" class="rounded-xl">
                <x-container>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg lg:gap-spacing-xl">
                    <div class="lg:col-span-8 spacing-y-lg">
                        <div class="text-center lg:text-left">
                            <x-heading level="2" class="text-heading-2 mb-spacing-sm">
                                Internal Training Benefits
                            </x-heading>
                            <p class="text-body">
                                Practical training modules designed by our team for our internal processes and client delivery standards.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-spacing-md">
                            @foreach($features as $feature)
                                <div class="card group rounded-lg card-padding-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="mb-spacing-sm p-2 rounded-lg w-fit bg-accent-magenta/10 group-hover:bg-accent-magenta/20 transition-colors">
                                        <!-- Icon placeholder -->
                                        <div class="w-5 h-5 text-accent-magenta"></div>
                                    </div>
                                    <x-heading level="3" class="text-heading-3 mb-spacing-sm">
                                        {{ $feature['title'] }}
                                    </x-heading>
                                    <p class="text-small">
                                        {{ $feature['description'] }}
                                    </p>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <!-- CTA Section -->
                    <div class="lg:col-span-4 flex flex-col justify-between spacing-y-md">
                        <div class="spacing-y-md">
                            <div class="spacing-y-sm">
                                <x-heading level="2" class="text-heading-2">
                                    Ready to Enhance Your Skills?
                                </x-heading>
                                <p class="text-body">
                                    Join your team in developing AI capabilities that will improve our internal processes and client delivery standards.
                                </p>
                            </div>
                            <div class="flex flex-col gap-spacing-sm">
                                <x-button href="/class-selection" variant="default" class="group justify-between whitespace-nowrap">
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Choose Your Track
                                    </div>
                                    <svg class="w-5 h-5 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </x-button>
                                <x-button href="/developers" variant="outline" class="justify-start whitespace-nowrap">
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    View All Modules
                                </x-button>
                            </div>
                        </div>
                    </div>
                </x-container>
            </x-section>
        </x-container>
</x-layout>

