<x-layout>
    <div class="min-h-screen bg-gradient-surface flex items-center justify-center container-padding" style="padding-top: var(--space-12); padding-bottom: var(--space-12);">
        <div class="max-w-md w-full spacing-y-xl">
            <div class="text-center">
                <img src="{{ asset('images/logo-primary.png') }}" 
                     alt="TBS Digital Labs" 
                     class="mx-auto h-12 w-auto dark:hidden">
                <img src="{{ asset('images/logo-white.png') }}" 
                     alt="TBS Digital Labs" 
                     class="mx-auto h-12 w-auto hidden dark:block">
                <x-heading level="2" class="mt-spacing-lg">
                    Sign in to AI Training Platform
                </x-heading>
                <p class="mt-spacing-sm text-sm" style="color: var(--color-gray-600);">
                    Internal training platform for TBS Digital Labs team members
                </p>
            </div>

            @if(session('error'))
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg card-padding-sm">
                    <p class="text-sm text-red-800 dark:text-red-200">{{ session('error') }}</p>
                </div>
            @endif

            <div class="card rounded-lg shadow-lg card-padding-lg">
                <div class="spacing-y-lg">
                    <div>
                        <p class="text-sm mb-spacing-md" style="color: var(--color-gray-600);">
                            Sign in with your TBS Digital Labs Google account to access the training platform.
                        </p>
                        <p class="text-xs mb-spacing-lg" style="color: var(--color-gray-500);">
                            Only @thebigsmoke.com.au and @tbsdigitallabs.com.au email addresses are allowed.
                        </p>
                    </div>

                    <x-button href="/auth/google" variant="default" size="lg" class="w-full">
                        <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </x-button>

                    <div class="text-center">
                        <a href="/" class="text-sm text-content-secondary hover:text-content-primary">
                            ← Back to home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-layout>

