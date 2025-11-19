<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Container extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $class = null
    ) {}

    public function sizeClasses(): array
    {
        return [
            'sm' => 'max-w-2xl',
            'md' => 'max-w-4xl',
            'lg' => 'max-w-5xl',
            'xl' => 'max-w-6xl',
            'full' => 'max-w-7xl',
        ];
    }

    public function render()
    {
        return view('components.container');
    }
}

