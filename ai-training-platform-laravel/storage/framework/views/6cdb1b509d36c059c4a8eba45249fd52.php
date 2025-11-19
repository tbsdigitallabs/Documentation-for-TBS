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
<?php $component = App\View\Components\Section::resolve(['background' => 'hero','size' => 'md'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
            <div class="text-center mb-spacing-xl">
                <div class="inline-flex items-center gap-spacing-sm bg-accent-designers/10 text-accent-designers px-3 py-1.5 rounded-full text-small font-medium mb-spacing-md border border-accent-designers/20">
                    <div class="w-1.5 h-1.5 bg-accent-designers rounded-full animate-pulse"></div>
                    Professional Development
                </div>

                <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '1','class' => 'mb-spacing-md'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                    Choose Your Learning Track
                 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $attributes = $__attributesOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__attributesOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $component = $__componentOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__componentOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
                <p class="text-heading-3 mb-spacing-lg max-w-3xl mx-auto">
                    Select the professional track that matches your role at TBS Digital Labs. Each track includes specialised modules and tools relevant to your work.
                </p>
                <div class="flex items-center justify-center">
                    <span class="text-small">Self-paced learning • Real project workflows • Team-specific content</span>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-spacing-md mb-spacing-xl">
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">5</div>
                    <div class="text-small">Professional Tracks</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">15+</div>
                    <div class="text-small">Training Modules</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">2-3</div>
                    <div class="text-small">Hours per Track</div>
                </div>
                <div class="stat-display text-center">
                    <div class="text-heading-2" style="color: var(--color-oxford-blue);">100%</div>
                    <div class="text-small">Team Focused</div>
                </div>
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

    <!-- Track Cards Section -->
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
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-spacing-lg">
                <?php $__currentLoopData = $tracks; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $track): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php if (isset($component)) { $__componentOriginalb98c38c0a97aa983274777c415a6c503 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalb98c38c0a97aa983274777c415a6c503 = $attributes; } ?>
<?php $component = App\View\Components\HoloCard::resolve(['role' => ''.e($track['id']).'','class' => 'h-full flex flex-col hover:-translate-y-1 transition-transform'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('holo-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\HoloCard::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                        <div class="flex items-center spacing-x-md mb-spacing-md">
                            <div class="w-12 h-12 bg-gradient-to-br from-<?php echo e($track['color']); ?> to-<?php echo e($track['color']); ?>/70 rounded-lg flex items-center justify-center">
                                <span class="text-lg font-bold text-white"><?php echo e($track['icon']); ?></span>
                            </div>
                            <div>
                                <h3 class="text-heading-3"><?php echo e($track['title']); ?></h3>
                                <div class="text-small bg-<?php echo e($track['color']); ?>/10 px-2 py-1 rounded"><?php echo e($track['badge']); ?></div>
                            </div>
                        </div>
                        <p class="text-body mb-spacing-lg leading-relaxed">
                            <?php echo e($track['description']); ?>

                        </p>
                        <div class="spacing-y-sm mb-spacing-lg">
                            <?php $__currentLoopData = $track['features']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <div class="flex items-center spacing-x-sm text-small">
                                    <span class="w-2 h-2 bg-<?php echo e($track['color']); ?> rounded-full"></span>
                                    <?php echo e($feature); ?>

                                </div>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </div>
                        <div class="flex items-center justify-between mb-spacing-md">
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);"><?php echo e($track['modules']); ?></span>
                                <span class="text-small">Modules</span>
                            </div>
                            <div class="stat-display">
                                <span class="text-heading-3" style="color: var(--color-oxford-blue);"><?php echo e($track['duration']); ?></span>
                                <span class="text-small">Duration</span>
                            </div>
                        </div>
                        <?php if (isset($component)) { $__componentOriginalaee1ea17b6836e335cc4e2cd0804f87c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalaee1ea17b6836e335cc4e2cd0804f87c = $attributes; } ?>
<?php $component = App\View\Components\ProgressBar::resolve(['value' => '0','color' => ''.e(str_replace('accent-', '', $track['color'])).'','showLabel' => 'true','label' => 'Progress','class' => 'mb-spacing-md'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
                        <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/'.e($track['id']).'','variant' => 'default','size' => 'lg','class' => 'w-full'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                            Start <?php echo e($track['title']); ?> Track
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
                     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalb98c38c0a97aa983274777c415a6c503)): ?>
<?php $attributes = $__attributesOriginalb98c38c0a97aa983274777c415a6c503; ?>
<?php unset($__attributesOriginalb98c38c0a97aa983274777c415a6c503); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalb98c38c0a97aa983274777c415a6c503)): ?>
<?php $component = $__componentOriginalb98c38c0a97aa983274777c415a6c503; ?>
<?php unset($__componentOriginalb98c38c0a97aa983274777c415a6c503); ?>
<?php endif; ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>

            <div class="mt-spacing-xl text-center">
                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/','variant' => 'outline','size' => 'lg'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                    ← Back to AI Training Hub
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

<?php /**PATH /var/www/html/resources/views/pages/class-selection.blade.php ENDPATH**/ ?>