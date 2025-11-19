@props(['level' => 1, 'size' => null, 'class' => ''])

@php
    $tag = "h{$level}";
    
    $sizeClasses = [
        'sm' => [1 => 'text-heading-2', 2 => 'text-heading-3', 3 => 'text-heading-3'],
        'md' => [1 => 'text-heading-1', 2 => 'text-heading-2', 3 => 'text-heading-3'],
        'lg' => [1 => 'text-heading-1', 2 => 'text-heading-1', 3 => 'text-heading-2'],
    ];
    
    $defaultSizeClasses = [
        1 => 'text-heading-1',
        2 => 'text-heading-2',
        3 => 'text-heading-3',
    ];
    
    $baseClasses = 'font-heading';
    
    if ($size) {
        $sizeClass = $sizeClasses[$size][$level] ?? '';
        $classes = "{$baseClasses} {$sizeClass} {$class}";
    } else {
        $defaultClass = $defaultSizeClasses[$level] ?? '';
        $classes = "{$baseClasses} {$defaultClass} {$class}";
    }
@endphp

<{{ $tag }} class="{{ trim($classes) }}">
    {{ $slot }}
</{{ $tag }}>

