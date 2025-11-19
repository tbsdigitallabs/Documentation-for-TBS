<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['level' => 1, 'size' => null, 'class' => '']));

foreach ($attributes->all() as $__key => $__value) {
    if (in_array($__key, $__propNames)) {
        $$__key = $$__key ?? $__value;
    } else {
        $__newAttributes[$__key] = $__value;
    }
}

$attributes = new \Illuminate\View\ComponentAttributeBag($__newAttributes);

unset($__propNames);
unset($__newAttributes);

foreach (array_filter((['level' => 1, 'size' => null, 'class' => '']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars); ?>

<?php
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
?>

<<?php echo e($tag); ?> class="<?php echo e(trim($classes)); ?>">
    <?php echo e($slot); ?>

</<?php echo e($tag); ?>>

<?php /**PATH /var/www/html/resources/views/components/heading.blade.php ENDPATH**/ ?>