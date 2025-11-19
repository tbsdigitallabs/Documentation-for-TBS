@props(['value' => 0, 'max' => 100, 'showLabel' => true, 'label' => null, 'color' => 'accent', 'class' => ''])

@php
    $percentage = min(($value / $max) * 100, 100);
@endphp

<div class="w-full {{ $class }}" x-data="{ percentage: 0 }" x-init="setTimeout(() => percentage = {{ $percentage }}, 100)">
    @if($showLabel)
        <div class="flex justify-between items-center mb-spacing-sm">
            <span class="text-sm font-medium" style="color: var(--color-gray-600);">
                {{ $label ?? 'Progress' }}
            </span>
            <span class="text-sm" style="color: var(--color-gray-500);">
                {{ round($percentage) }}%
            </span>
        </div>
    @endif
    <div class="progress-tech h-2">
        <div class="progress-fill transition-all duration-800 ease-out"
             :style="`width: ${percentage}%`">
        </div>
    </div>
</div>

