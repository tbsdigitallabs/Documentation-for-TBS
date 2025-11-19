<header class="nav-main">
    <div class="max-w-7xl mx-auto header-padding">
        <div class="flex items-center justify-between gap-spacing-lg">
            <div class="flex items-center gap-spacing-lg flex-1 min-w-0">
                <a href="/" class="flex-shrink-0">
                    <div class="flex items-center gap-spacing-sm">
                        <img src="<?php echo e(asset('images/logo-primary.png')); ?>" 
                             alt="TBS Digital Labs" 
                             class="h-8 w-auto dark:hidden"
                             x-show="!darkMode">
                        <img src="<?php echo e(asset('images/logo-white.png')); ?>" 
                             alt="TBS Digital Labs" 
                             class="h-8 w-auto hidden dark:block"
                             x-show="darkMode">
                        <span class="text-heading-3 hidden sm:inline">AI Training Hub</span>
                    </div>
                </a>
                <nav class="hidden md:flex items-center gap-spacing-sm lg:gap-spacing-md">
                    <a href="/" 
                       class="nav-link whitespace-nowrap <?php echo e(request()->is('/') ? 'active' : ''); ?>">
                        Home
                    </a>
                    <a href="/class-selection" 
                       class="nav-link whitespace-nowrap <?php echo e(request()->is('class-selection*') ? 'active' : ''); ?>">
                        Tracks
                    </a>
                    <a href="/developers" 
                       class="nav-link whitespace-nowrap <?php echo e(request()->is('developers*') ? 'active' : ''); ?>">
                        My Progress
                    </a>
                </nav>
            </div>
            <div class="flex items-center gap-spacing-sm flex-shrink-0">
                <button @click="darkMode = !darkMode" 
                        class="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                        aria-label="Toggle dark mode">
                    <svg x-show="!darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <svg x-show="darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</header>

<?php /**PATH /var/www/html/resources/views/components/header-nav.blade.php ENDPATH**/ ?>