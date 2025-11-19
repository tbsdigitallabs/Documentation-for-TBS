@props(['size' => 'md', 'background' => 'primary', 'class' => ''])

@php
    $sizeClasses = [
        'sm' => 'section-padding-sm',
        'md' => 'section-padding-md',
        'lg' => 'section-padding-lg',
    ];
    
    $backgroundClasses = [
        'primary' => 'bg-surface-primary',
        'secondary' => 'bg-surface-secondary',
        'tertiary' => 'bg-surface-tertiary',
        'hero' => 'bg-surface-hero',
        'card' => 'bg-surface-card',
    ];
@endphp

<section class="{{ $sizeClasses[$size] }} {{ $backgroundClasses[$background] }} {{ $class }}">
    {{ $slot }}
</section>

