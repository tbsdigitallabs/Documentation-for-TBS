<x-layout>
    <x-section background="primary" size="lg">
        <x-container>
            <!-- Breadcrumb -->
            <nav class="mb-spacing-lg">
                <ol class="flex items-center spacing-x-sm text-sm" style="color: var(--color-gray-600);">
                    <li><a href="/" class="hover:opacity-75" style="color: var(--color-oxford-blue);">AI Training Platform</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li><a href="{{ $role['path'] }}" class="hover:opacity-75" style="color: var(--color-oxford-blue);">{{ $role['title'] }} Training</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li style="color: var(--color-oxford-blue);">{{ $module['title'] }}</li>
                </ol>
            </nav>

            <!-- Module Header -->
            <div class="mb-spacing-xl">
                <x-heading level="1" class="mb-spacing-md">{{ $module['title'] }}</x-heading>
                <p class="text-body mb-spacing-lg">{{ $module['description'] }}</p>

                <!-- Module Metadata -->
                <div class="flex items-center spacing-x-lg text-sm mb-spacing-lg" style="color: var(--color-gray-500);">
                    <div class="flex items-center spacing-x-sm">
                        <span>📚</span>
                        {{ $module['lessons'] }} lessons
                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>⏱️</span>
                        {{ $module['estimatedTime'] }}
                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>🎯</span>
                        Module {{ request()->route('module') }}
                    </div>
                </div>

                <!-- Progress Bar -->
                <x-progress-bar value="{{ $module['progress'] }}" color="{{ str_replace('accent-', '', $role['color']) }}" show-label="true" label="Progress" class="mb-spacing-lg" />
            </div>

            <!-- Module Content -->
            <div class="card rounded-lg card-padding-md mb-spacing-xl">
                <div class="prose max-w-none prose-headings:!text-oxford-blue prose-p:!text-gray-600 prose-a:!text-accent-magenta-500">
                    @if(isset($content))
                        {!! \Illuminate\Support\Str::markdown($content) !!}
                    @else
                        <p class="text-body">
                            Module content will be displayed here. This is a placeholder for the actual training content.
                        </p>
                    @endif
                </div>
            </div>

            <!-- Back Button -->
            <div class="mt-spacing-xl">
                <x-button href="{{ $role['path'] }}" variant="outline" size="lg">
                    ← Back to {{ $role['title'] }} Training
                </x-button>
            </div>
        </x-container>
    </x-section>
</x-layout>

