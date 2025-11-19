<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['value' => 0, 'max' => 100, 'showLabel' => true, 'label' => null, 'color' => 'accent', 'class' => '']));

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

foreach (array_filter((['value' => 0, 'max' => 100, 'showLabel' => true, 'label' => null, 'color' => 'accent', 'class' => '']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars); ?>

<?php
    $percentage = min(($value / $max) * 100, 100);
?>

<div class="w-full <?php echo e($class); ?>" x-data="{ percentage: 0 }" x-init="setTimeout(() => percentage = <?php echo e($percentage); ?>, 100)">
    <?php if($showLabel): ?>
        <div class="flex justify-between items-center mb-spacing-sm">
            <span class="text-sm font-medium" style="color: var(--color-gray-600);">
                <?php echo e($label ?? 'Progress'); ?>

            </span>
            <span class="text-sm" style="color: var(--color-gray-500);">
                <?php echo e(round($percentage)); ?>%
            </span>
        </div>
    <?php endif; ?>
    <div class="progress-tech h-2">
        <div class="progress-fill transition-all duration-800 ease-out"
             :style="`width: ${percentage}%`">
        </div>
    </div>
</div>

<?php /**PATH /var/www/html/resources/views/components/progress-bar.blade.php ENDPATH**/ ?>