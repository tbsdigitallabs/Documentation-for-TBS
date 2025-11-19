<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['size' => 'md', 'background' => 'primary', 'class' => '']));

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

foreach (array_filter((['size' => 'md', 'background' => 'primary', 'class' => '']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars); ?>

<?php
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
?>

<section class="<?php echo e($sizeClasses[$size]); ?> <?php echo e($backgroundClasses[$background]); ?> <?php echo e($class); ?>">
    <?php echo e($slot); ?>

</section>

<?php /**PATH /var/www/html/resources/views/components/section.blade.php ENDPATH**/ ?>