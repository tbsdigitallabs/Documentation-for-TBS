<x-layout>
    <x-section background="hero" size="md">
        <x-container>
            <div class="text-center mb-spacing-xl">
                <div class="inline-flex items-center gap-spacing-sm bg-accent-designers/10 text-accent-designers px-3 py-1.5 rounded-full text-small font-medium mb-spacing-md border border-accent-designers/20">
                    <div class="w-1.5 h-1.5 bg-accent-designers rounded-full animate-pulse"></div>
                    Designer Track
                </div>
                <x-heading level="1" class="mb-spacing-md">AI Design & Video Creation</x-heading>
                <p class="text-heading-3 mb-spacing-lg max-w-3xl mx-auto">
                    Create stunning visuals with AI design tools and Sora 2 video generation for client projects.
                </p>
                <div class="flex items-center justify-center">
                    <span class="text-small">3 modules • 2-3 hours total • Self-paced learning</span>
                </div>
            </div>
        </x-container>
    </x-section>

    <x-section background="primary" size="lg">
        <x-container>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-spacing-lg">
                @foreach($modules as $module)
                    <x-holo-card role="designers" class="h-full flex flex-col hover:-translate-y-1 transition-transform">
                        <div class="flex items-center spacing-x-md mb-spacing-md">
                            <div class="w-12 h-12 bg-gradient-to-br from-accent-designers to-accent-designers/70 rounded-lg flex items-center justify-center">
                                <span class="text-lg font-bold text-white">{{ $module['number'] }}</span>
                            </div>
                            <div>
                                <h2 class="text-heading-3">{{ $module['title'] }}</h2>
                                <div class="text-small bg-accent-designers/10 px-2 py-1 rounded">{{ $module['badge'] }}</div>
                            </div>
                        </div>
                        <p class="text-body mb-spacing-lg leading-relaxed">{{ $module['description'] }}</p>
                        <div class="spacing-y-sm mb-spacing-lg">
                            @foreach($module['features'] as $feature)
                                <div class="flex items-center spacing-x-sm text-small">
                                    <span class="w-2 h-2 bg-accent-designers rounded-full"></span>
                                    {{ $feature }}
                                </div>
                            @endforeach
                        </div>
                        <div class="flex items-center justify-between mb-spacing-md">
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);">{{ $module['duration'] }}</span>
                                <span class="text-small">Duration</span>
                            </div>
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);">{{ $module['lessons'] }}</span>
                                <span class="text-small">Lessons</span>
                            </div>
                        </div>
                        <x-progress-bar value="{{ $module['progress'] }}" color="designers" show-label="false" class="mb-spacing-md" />
                        <x-button href="/designers/module-{{ $module['number'] }}" variant="default" size="lg" class="w-full">
                            Start Module {{ $module['number'] }}
                        </x-button>
                    </x-holo-card>
                @endforeach
            </div>
            <div class="mt-spacing-xl text-center">
                <x-button href="/class-selection" variant="outline" size="lg">← Back to Track Selection</x-button>
            </div>
        </x-container>
    </x-section>
</x-layout>

