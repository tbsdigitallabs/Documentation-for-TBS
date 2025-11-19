@props(['title', 'description', 'role', 'rolePath', 'moduleNumber', 'totalLessons', 'estimatedTime', 'progress' => 0, 'class' => ''])

<div class="min-h-screen bg-surface-primary {{ $class }}">
    <!-- Header -->
    <header class="nav-main">
        <x-container class="py-4" style="padding-top: var(--space-4); padding-bottom: var(--space-4);">
            <div class="flex items-center justify-between">
                <div class="flex items-center spacing-x-md">
                    <img src="{{ asset('images/logo-primary.png') }}" 
                         alt="TBS Digital Labs" 
                         class="h-10 w-auto dark:hidden">
                    <img src="{{ asset('images/logo-white.png') }}" 
                         alt="TBS Digital Labs" 
                         class="h-10 w-auto hidden dark:block">
                    <div>
                        <x-heading level="2">{{ $title }}</x-heading>
                        <p class="text-small">{{ $description }}</p>
                    </div>
                </div>
                <div class="flex items-center spacing-x-md">
                    <button @click="darkMode = !darkMode" class="p-2 rounded-lg hover:bg-surface-secondary transition-colors">
                        <svg x-show="!darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <svg x-show="darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </button>
                    <div class="w-10 h-10 bg-accent-developers rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold text-sm">{{ strtoupper(substr($role, 0, 1)) }}</span>
                    </div>
                </div>
            </div>
        </x-container>
    </header>

    <!-- Main Content -->
    <x-section background="primary" size="lg">
        <x-container>
            <!-- Breadcrumb -->
            <nav class="mb-spacing-lg">
                <ol class="flex items-center spacing-x-sm text-sm" style="color: var(--color-gray-600);">
                    <li><a href="/" class="hover:opacity-75" style="color: var(--color-oxford-blue);">AI Training Platform</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li><a href="{{ $rolePath }}" class="hover:opacity-75" style="color: var(--color-oxford-blue);">{{ $role }} Training</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li style="color: var(--color-oxford-blue);">{{ $title }}</li>
                </ol>
            </nav>

            <!-- Module Header -->
            <div class="mb-spacing-xl">
                <x-heading level="1" class="mb-spacing-md">{{ $title }}</x-heading>
                <p class="text-body mb-spacing-lg">{{ $description }}</p>

                <!-- Module Metadata -->
                <div class="flex items-center spacing-x-lg text-sm mb-spacing-lg" style="color: var(--color-gray-500);">
                    <div class="flex items-center spacing-x-sm">
                        <span>📚</span>
                        {{ $totalLessons }} lessons
                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>⏱️</span>
                        {{ $estimatedTime }}
                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>🎯</span>
                        Module {{ $moduleNumber }}
                    </div>
                </div>

                <!-- Progress Bar -->
                <x-progress-bar value="{{ $progress }}" color="developers" show-label="true" label="Progress" class="mb-spacing-lg" />
            </div>

            <!-- Module Content -->
            <div class="card rounded-lg card-padding-md">
                {{ $slot }}
            </div>

            <!-- Back Button -->
            <div class="mt-spacing-xl">
                <x-button href="{{ $rolePath }}" variant="outline" size="lg">
                    ← Back to {{ $role }} Training
                </x-button>
            </div>
        </x-container>
    </x-section>
</div>

