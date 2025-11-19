@props(['size' => 'md', 'class' => ''])

@php
    $sizeClasses = [
        'sm' => 'max-w-2xl',
        'md' => 'max-w-4xl',
        'lg' => 'max-w-5xl',
        'xl' => 'max-w-6xl',
        'full' => 'max-w-7xl',
    ];
@endphp

<div class="mx-auto container-padding {{ $sizeClasses[$size] }} {{ $class }}">
    {{ $slot }}
</div>

