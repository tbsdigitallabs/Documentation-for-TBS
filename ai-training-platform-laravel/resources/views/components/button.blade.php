@props(['variant' => 'default', 'size' => 'default', 'href' => null, 'type' => 'button', 'class' => ''])

@php
    // Use semantic design system classes for consistency
    $variants = [
        'default' => 'btn-primary',
        'destructive' => 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-red-500',
        'outline' => 'btn-secondary',
        'secondary' => 'btn-secondary',
        'ghost' => 'hover:bg-surface-secondary focus-visible:ring-accent-magenta-500',
        'link' => 'underline-offset-4 hover:underline focus-visible:ring-accent-magenta-500',
        'accent' => 'gradient-brand text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-accent-magenta-500',
        'success' => 'bg-gradient-to-r from-accent-sage-500 to-accent-sage-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-accent-sage-500',
    ];
    
    // Size classes - only apply for non-semantic variants
    // Semantic variants (btn-primary, btn-secondary) have their own sizing
    $isSemanticVariant = in_array($variant, ['default', 'outline', 'secondary']);
    $sizes = [
        'default' => '',
        'sm' => $isSemanticVariant ? '' : 'text-small px-3 py-1',
        'lg' => $isSemanticVariant ? '' : 'text-sm px-5 py-2',
        'icon' => 'w-8 h-8 p-0',
        'xs' => $isSemanticVariant ? '' : 'text-xs px-2 py-0.5',
    ];
    
    $baseClasses = 'inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    $variantClass = $variants[$variant] ?? $variants['default'];
    $sizeClass = $sizes[$size] ?? $sizes['default'];
    $classes = trim("{$baseClasses} {$variantClass} {$sizeClass} {$class}");
@endphp

@if($href)
    <a href="{{ $href }}" class="{{ $classes }}" {{ $attributes }}>
        {{ $slot }}
    </a>
@else
    <button type="{{ $type }}" class="{{ $classes }}" {{ $attributes }}>
        {{ $slot }}
    </button>
@endif

