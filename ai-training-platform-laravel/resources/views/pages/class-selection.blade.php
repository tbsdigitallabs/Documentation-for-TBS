<x-layout>
    <x-section background="hero" size="md">
        <x-container>
            <div class="text-center mb-spacing-xl">
                <div class="inline-flex items-center gap-spacing-sm bg-accent-designers/10 text-accent-designers px-3 py-1.5 rounded-full text-small font-medium mb-spacing-md border border-accent-designers/20">
                    <div class="w-1.5 h-1.5 bg-accent-designers rounded-full animate-pulse"></div>
                    Professional Development
                </div>

                <x-heading level="1" class="mb-spacing-md">
                    Choose Your Learning Track
                </x-heading>
                <p class="text-heading-3 mb-spacing-lg max-w-3xl mx-auto">
                    Select the professional track that matches your role at TBS Digital Labs. Each track includes specialised modules and tools relevant to your work.
                </p>
                <div class="flex items-center justify-center">
                    <span class="text-small">Self-paced learning • Real project workflows • Team-specific content</span>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-spacing-md mb-spacing-xl">
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">5</div>
                    <div class="text-small">Professional Tracks</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">15+</div>
                    <div class="text-small">Training Modules</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">2-3</div>
                    <div class="text-small">Hours per Track</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">100%</div>
                    <div class="text-small">Team Focused</div>
                </div>
            </div>
        </x-container>
    </x-section>

    <!-- Track Cards Section -->
    <x-section background="primary" size="lg">
        <x-container>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-spacing-lg">
                @foreach($tracks as $track)
                    <x-holo-card role="{{ $track['id'] }}" class="h-full flex flex-col hover:-translate-y-1 transition-transform">
                        <div class="flex items-center spacing-x-md mb-spacing-md">
                            <div class="w-12 h-12 bg-gradient-to-br from-{{ $track['color'] }} to-{{ $track['color'] }}/70 rounded-lg flex items-center justify-center">
                                <span class="text-lg font-bold text-white">{{ $track['icon'] }}</span>
                            </div>
                            <div>
                                <h3 class="text-heading-3">{{ $track['title'] }}</h3>
                                <div class="text-small bg-{{ $track['color'] }}/10 px-2 py-1 rounded">{{ $track['badge'] }}</div>
                            </div>
                        </div>
                        <p class="text-body mb-spacing-lg leading-relaxed">
                            {{ $track['description'] }}
                        </p>
                        <div class="spacing-y-sm mb-spacing-lg">
                            @foreach($track['features'] as $feature)
                                <div class="flex items-center spacing-x-sm text-small">
                                    <span class="w-2 h-2 bg-{{ $track['color'] }} rounded-full"></span>
                                    {{ $feature }}
                                </div>
                            @endforeach
                        </div>
                        <div class="flex items-center justify-between mb-spacing-md">
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);">{{ $track['modules'] }}</span>
                                <span class="text-small">Modules</span>
                            </div>
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);">{{ $track['duration'] }}</span>
                                <span class="text-small">Duration</span>
                            </div>
                        </div>
                        <x-progress-bar value="0" color="{{ str_replace('accent-', '', $track['color']) }}" show-label="true" label="Progress" class="mb-spacing-md" />
                        <x-button href="/{{ $track['id'] }}" variant="default" size="lg" class="w-full">
                            Start {{ $track['title'] }} Track
                        </x-button>
                    </x-holo-card>
                @endforeach
            </div>

            <div class="mt-spacing-xl text-center">
                <x-button href="/" variant="outline" size="lg">
                    ← Back to AI Training Hub
                </x-button>
            </div>
        </x-container>
    </x-section>
</x-layout>

