<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Section extends Component
{
    public function __construct(
        public string $size = 'md',
        public string $background = 'primary',
        public ?string $class = null
    ) {}

    public function sizeClasses(): array
    {
        return [
            'sm' => 'py-8',
            'md' => 'py-16',
            'lg' => 'py-24',
        ];
    }

    public function backgroundClasses(): array
    {
        return [
            'primary' => 'bg-surface-primary',
            'secondary' => 'bg-surface-secondary',
            'tertiary' => 'bg-surface-tertiary',
            'hero' => 'bg-surface-hero',
            'card' => 'bg-surface-card',
        ];
    }

    public function render()
    {
        return view('components.section');
    }
}

