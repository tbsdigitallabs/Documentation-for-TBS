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
        <?php if (isset($component)) { $__componentOriginalf79b4dba555e8b4113e3494d784cf4e9 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalf79b4dba555e8b4113e3494d784cf4e9 = $attributes; } ?>
<?php $component = App\View\Components\Container::resolve(['size' => 'full','class' => 'spacing-y-lg'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('container'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Container::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
            <!-- Hero Section -->
            <?php if (isset($component)) { $__componentOriginal06b678ea6fc36cc4d04471936415ef64 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal06b678ea6fc36cc4d04471936415ef64 = $attributes; } ?>
<?php $component = App\View\Components\Section::resolve(['background' => 'primary','size' => 'md','class' => 'rounded-xl'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg lg:gap-spacing-xl items-start">
                    <!-- Left Side - Hero Content -->
                    <div class="lg:col-span-8">
                        <div class="spacing-y-md">
                            <div class="spacing-y-sm">
                                <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '1','class' => 'text-heading-1'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    Internal AI Training
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
                                <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '2','class' => 'text-heading-2'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['style' => 'color: var(--color-gray-600);']); ?>
                                    TBS Digital Labs Team Development
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
                                <p class="text-body max-w-2xl">
                                    Build your AI skills through practical training modules designed for our internal workflows and client delivery processes.
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-spacing-sm">
                                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/class-selection','variant' => 'default','class' => 'group whitespace-nowrap'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Start Learning
                                    <svg class="w-5 h-5 ml-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
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
                                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/developers','variant' => 'outline','class' => 'whitespace-nowrap'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    View Progress
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
                        </div>
                    </div>

                    <!-- Right Side - Stats Dashboard -->
                    <div class="lg:col-span-4">
                        <div class="card rounded-xl card-padding-md">
                            <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '3','class' => 'mb-spacing-md'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>Your Training Progress <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $attributes = $__attributesOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__attributesOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal879506df025bc33800db5cbd420e556f)): ?>
<?php $component = $__componentOriginal879506df025bc33800db5cbd420e556f; ?>
<?php unset($__componentOriginal879506df025bc33800db5cbd420e556f); ?>
<?php endif; ?>
                            <div class="spacing-y-md">
                                <?php $__currentLoopData = $stats; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $stat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <div>
                                        <div class="text-small mb-spacing-xs"><?php echo e($stat['label']); ?></div>
                                        <div class="text-heading-3" style="color: var(--color-oxford-blue);"><?php echo e($stat['value']); ?></div>
                                    </div>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>
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

            <!-- Features Section -->
            <?php if (isset($component)) { $__componentOriginal06b678ea6fc36cc4d04471936415ef64 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal06b678ea6fc36cc4d04471936415ef64 = $attributes; } ?>
<?php $component = App\View\Components\Section::resolve(['background' => 'secondary','size' => 'md','class' => 'rounded-xl'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
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
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg lg:gap-spacing-xl">
                    <div class="lg:col-span-8 spacing-y-lg">
                        <div class="text-center lg:text-left">
                            <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '2','class' => 'text-heading-2 mb-spacing-sm'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                Internal Training Benefits
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
                            <p class="text-body">
                                Practical training modules designed by our team for our internal processes and client delivery standards.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-spacing-md">
                            <?php $__currentLoopData = $features; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <div class="card group rounded-lg card-padding-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="mb-spacing-sm p-2 rounded-lg w-fit bg-accent-magenta/10 group-hover:bg-accent-magenta/20 transition-colors">
                                        <!-- Icon placeholder -->
                                        <div class="w-5 h-5 text-accent-magenta"></div>
                                    </div>
                                    <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '3','class' => 'text-heading-3 mb-spacing-sm'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                        <?php echo e($feature['title']); ?>

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
                                    <p class="text-small">
                                        <?php echo e($feature['description']); ?>

                                    </p>
                                </div>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </div>
                    </div>

                    <!-- CTA Section -->
                    <div class="lg:col-span-4 flex flex-col justify-between spacing-y-md">
                        <div class="spacing-y-md">
                            <div class="spacing-y-sm">
                                <?php if (isset($component)) { $__componentOriginal879506df025bc33800db5cbd420e556f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal879506df025bc33800db5cbd420e556f = $attributes; } ?>
<?php $component = App\View\Components\Heading::resolve(['level' => '2','class' => 'text-heading-2'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('heading'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Heading::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    Ready to Enhance Your Skills?
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
                                <p class="text-body">
                                    Join your team in developing AI capabilities that will improve our internal processes and client delivery standards.
                                </p>
                            </div>
                            <div class="flex flex-col gap-spacing-sm">
                                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/class-selection','variant' => 'default','class' => 'group justify-between whitespace-nowrap'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Choose Your Track
                                    </div>
                                    <svg class="w-5 h-5 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
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
                                <?php if (isset($component)) { $__componentOriginale67687e3e4e61f963b25a6bcf3983629 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginale67687e3e4e61f963b25a6bcf3983629 = $attributes; } ?>
<?php $component = App\View\Components\Button::resolve(['href' => '/developers','variant' => 'outline','class' => 'justify-start whitespace-nowrap'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\Button::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
                                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    View All Modules
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
<?php if (isset($__attributesOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $attributes = $__attributesOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__attributesOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $component = $__componentOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__componentOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>

<?php /**PATH /var/www/html/resources/views/pages/home.blade.php ENDPATH**/ ?>