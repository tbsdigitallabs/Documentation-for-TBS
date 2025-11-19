<!DOCTYPE html>
<html lang="en" x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' }" 
      x-bind:class="{ 'dark': darkMode }"
      x-init="$watch('darkMode', value => localStorage.setItem('darkMode', value))">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TBS Digital Labs - AI Training Platform</title>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
</head>
<body class="min-h-screen bg-gradient-surface">
    <?php if (isset($component)) { $__componentOriginal073ace0d752c9f81a69dddd57a65cc08 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal073ace0d752c9f81a69dddd57a65cc08 = $attributes; } ?>
<?php $component = App\View\Components\HeaderNav::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('header-nav'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\HeaderNav::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal073ace0d752c9f81a69dddd57a65cc08)): ?>
<?php $attributes = $__attributesOriginal073ace0d752c9f81a69dddd57a65cc08; ?>
<?php unset($__attributesOriginal073ace0d752c9f81a69dddd57a65cc08); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal073ace0d752c9f81a69dddd57a65cc08)): ?>
<?php $component = $__componentOriginal073ace0d752c9f81a69dddd57a65cc08; ?>
<?php unset($__componentOriginal073ace0d752c9f81a69dddd57a65cc08); ?>
<?php endif; ?>
    
    <main class="flex-grow">
        <?php echo e($slot); ?>

    </main>
    
    <?php if (isset($component)) { $__componentOriginal99051027c5120c83a2f9a5ae7c4c3cfa = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal99051027c5120c83a2f9a5ae7c4c3cfa = $attributes; } ?>
<?php $component = App\View\Components\Footer::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('footer'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Footer::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal99051027c5120c83a2f9a5ae7c4c3cfa)): ?>
<?php $attributes = $__attributesOriginal99051027c5120c83a2f9a5ae7c4c3cfa; ?>
<?php unset($__attributesOriginal99051027c5120c83a2f9a5ae7c4c3cfa); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal99051027c5120c83a2f9a5ae7c4c3cfa)): ?>
<?php $component = $__componentOriginal99051027c5120c83a2f9a5ae7c4c3cfa; ?>
<?php unset($__componentOriginal99051027c5120c83a2f9a5ae7c4c3cfa); ?>
<?php endif; ?>
</body>
</html>

<?php /**PATH /var/www/html/resources/views/components/layout.blade.php ENDPATH**/ ?>