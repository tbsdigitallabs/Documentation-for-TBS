<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['variant' => 'default', 'role' => null, 'class' => '']));

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

foreach (array_filter((['variant' => 'default', 'role' => null, 'class' => '']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars); ?>

<?php
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
?>

<div class="<?php echo e($variantClass); ?> <?php echo e($roleClass); ?> relative overflow-hidden <?php echo e($class); ?>">
    <?php if($variant === 'holographic'): ?>
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-accent-magenta-100 to-transparent opacity-10 pointer-events-none"></div>
    <?php endif; ?>
    <div class="relative z-10">
        <?php echo e($slot); ?>

    </div>
</div>

<?php /**PATH /var/www/html/resources/views/components/holo-card.blade.php ENDPATH**/ ?>