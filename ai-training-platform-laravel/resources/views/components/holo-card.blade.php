@props(['variant' => 'default', 'role' => null, 'class' => ''])

@php
    $variants = [
        'default' => 'card-professional',
        'glow' => 'card-professional border-accent shadow-lg',
        'holographic' => 'card-professional border-accent shadow-lg bg-gradient-to-br from-surface-primary to-surface-secondary',
    ];
    
    $roleClasses = [
        'developers' => 'border-accent-developers',
        'designers' => 'border-accent-designers',
        'project-managers' => 'border-accent-project-managers',
        'content-creators' => 'border-accent-content-creators',
        'sales-business' => 'border-accent-sales-business',
    ];
    
    $variantClass = $variants[$variant] ?? $variants['default'];
    $roleClass = $role ? ($roleClasses[$role] ?? '') : '';
@endphp

<div class="{{ $variantClass }} {{ $roleClass }} relative overflow-hidden {{ $class }}">
    @if($variant === 'holographic')
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-accent-magenta-100 to-transparent opacity-10 pointer-events-none"></div>
    @endif
    <div class="relative z-10">
        {{ $slot }}
    </div>
</div>

