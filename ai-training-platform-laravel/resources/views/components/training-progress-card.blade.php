@props(['stats' => [], 'title' => 'Your Training Progress', 'class' => ''])

<div class="card rounded-xl card-padding-md {{ $class }}">
    <h3 class="text-xl font-semibold mb-spacing-lg font-heading" style="color: var(--color-oxford-blue);">
        {{ $title }}
    </h3>
    <div class="spacing-y-lg">
        @foreach($stats as $index => $stat)
            <div class="spacing-y-sm" x-data="{ progress: {{ $stat['progress'] ?? 0 }} }" 
                 x-init="setTimeout(() => { progress = {{ $stat['progress'] ?? 0 }} }, {{ $index * 100 }})">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium font-body" style="color: var(--color-gray-600);">
                        {{ $stat['label'] }}
                    </span>
                    <span class="text-lg font-semibold font-heading" style="color: var(--color-oxford-blue);">
                        {{ $stat['value'] }}
                    </span>
                </div>
                @if(isset($stat['progress']))
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-accent-magenta to-accent-sage rounded-full transition-all duration-800"
                             :style="`width: ${progress}%`">
                        </div>
                    </div>
                @endif
            </div>
        @endforeach
    </div>
</div>

