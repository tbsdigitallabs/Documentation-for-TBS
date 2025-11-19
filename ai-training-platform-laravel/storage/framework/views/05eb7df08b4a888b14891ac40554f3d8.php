<?php if (isset($component)) { $__componentOriginal23a33f287873b564aaf305a1526eada4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal23a33f287873b564aaf305a1526eada4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.layout','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
    <?php if (isset($component)) { $__componentOriginal06b678ea6fc36cc4d04471936415ef64 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal06b678ea6fc36cc4d04471936415ef64 = $attributes; } ?>
<?php $component = App\View\Components\Section::resolve(['background' => 'primary','size' => 'lg'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('section'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Section::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
        <?php if (isset($component)) { $__componentOriginalf79b4dba555e8b4113e3494d784cf4e9 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalf79b4dba555e8b4113e3494d784cf4e9 = $attributes; } ?>
<?php $component = App\View\Components\Container::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('container'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Container::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
            <!-- Breadcrumb -->
            <nav class="mb-spacing-lg">
                <ol class="flex items-center spacing-x-sm text-sm" style="color: var(--color-gray-600);">
                    <li><a href="/" class="hover:opacity-75" style="color: var(--color-oxford-blue);">AI Training Platform</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li><a href="<?php echo e($role['path']); ?>" class="hover:opacity-75" style="color: var(--color-oxford-blue);"><?php echo e($role['title']); ?> Training</a></li>
                    <li style="color: var(--color-gray-500);">/</li>
                    <li style="color: var(--color-oxford-blue);"><?php echo e($module['title']); ?></li>
                </ol>
            </nav>

            <!-- Module Header -->
            <div class="mb-spacing-xl">
                <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '1','class' => 'mb-spacing-md'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?><?php echo e($module['title']); ?> <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $attributes = $__attributesOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__attributesOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $component = $__componentOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__componentOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
                <p class="text-body mb-spacing-lg"><?php echo e($module['description']); ?></p>

                <!-- Module Metadata -->
                <div class="flex items-center spacing-x-lg text-sm mb-spacing-lg" style="color: var(--color-gray-500);">
                    <div class="flex items-center spacing-x-sm">
                        <span>📚</span>
                        <?php echo e($module['lessons']); ?> lessons
                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>⏱️</span>
                        <?php echo e($module['estimatedTime']); ?>

                    </div>
                    <div class="flex items-center spacing-x-sm">
                        <span>🎯</span>
                        Module <?php echo e(request()->route('module')); ?>

                    </div>
                </div>

                <!-- Progress Bar -->
                <?php if (isset($component)) { $__componentOriginalaee1ea17b6836e335cc4e2cd0804f87c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalaee1ea17b6836e335cc4e2cd0804f87c = $attributes; } ?>
<?php $component = App\View\Components\ProgressBar::resolve(['value' => ''.e($module['progress']).'','color' => ''.e(str_replace('accent-', '', $role['color'])).'','showLabel' => 'true','label' => 'Progress','class' => 'mb-spacing-lg'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('progress-bar'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\ProgressBar::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalaee1ea17b6836e335cc4e2cd0804f87c)): ?>
<?php $attributes = $__attributesOriginalaee1ea17b6836e335cc4e2cd0804f87c; ?>
<?php unset($__attributesOriginalaee1ea17b6836e335cc4e2cd0804f87c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalaee1ea17b6836e335cc4e2cd0804f87c)): ?>
<?php $component = $__componentOriginalaee1ea17b6836e335cc4e2cd0804f87c; ?>
<?php unset($__componentOriginalaee1ea17b6836e335cc4e2cd0804f87c); ?>
<?php endif; ?>
            </div>

            <!-- Module Content -->
            <div class="card rounded-lg card-padding-md mb-spacing-xl">
                <div class="prose max-w-none prose-headings:!text-oxford-blue prose-p:!text-gray-600 prose-a:!text-accent-magenta-500">
                    <?php if(isset($content)): ?>
                        <?php echo \Illuminate\Support\Str::markdown($content); ?>

                    <?php else: ?>
                        <p class="text-body">
                            Module content will be displayed here. This is a placeholder for the actual training content.
                        </p>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Back Button -->
            <div class="mt-spacing-xl">
                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => ''.e($role['path']).'','variant' => 'outline','size' => 'lg'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                    ← Back to <?php echo e($role['title']); ?> Training
                 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginale67687e3e4e61f963b25a6bcf3983629)): ?>
<?php $attributes = $__attributesOriginale67687e3e4e61f963b25a6bcf3983629; ?>
<?php unset($__attributesOriginale67687e3e4e61f963b25a6bcf3983629); ?>
<?php endif; ?>
<?php if (isset($__componentOriginale67687e3e4e61f963b25a6bcf3983629)): ?>
<?php $component = $__componentOriginale67687e3e4e61f963b25a6bcf3983629; ?>
<?php unset($__componentOriginale67687e3e4e61f963b25a6bcf3983629); ?>
<?php endif; ?>
            </div>
         <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalf79b4dba555e8b4113e3494d784cf4e9)): ?>
<?php $attributes = $__attributesOriginalf79b4dba555e8b4113e3494d784cf4e9; ?>
<?php unset($__attributesOriginalf79b4dba555e8b4113e3494d784cf4e9); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalf79b4dba555e8b4113e3494d784cf4e9)): ?>
<?php $component = $__componentOriginalf79b4dba555e8b4113e3494d784cf4e9; ?>
<?php unset($__componentOriginalf79b4dba555e8b4113e3494d784cf4e9); ?>
<?php endif; ?>
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal06b678ea6fc36cc4d04471936415ef64)): ?>
<?php $attributes = $__attributesOriginal06b678ea6fc36cc4d04471936415ef64; ?>
<?php unset($__attributesOriginal06b678ea6fc36cc4d04471936415ef64); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal06b678ea6fc36cc4d04471936415ef64)): ?>
<?php $component = $__componentOriginal06b678ea6fc36cc4d04471936415ef64; ?>
<?php unset($__componentOriginal06b678ea6fc36cc4d04471936415ef64); ?>
<?php endif; ?>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $attributes = $__attributesOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__attributesOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $component = $__componentOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__componentOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>

<?php /**PATH /var/www/html/resources/views/pages/module.blade.php ENDPATH**/ ?>