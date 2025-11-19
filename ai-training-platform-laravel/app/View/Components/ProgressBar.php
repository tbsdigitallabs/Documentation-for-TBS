<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ProgressBar extends Component
{
    public function __construct(
        public int|float $value,
        public int|float $max = 100,
        public bool $showLabel = true,
        public ?string $label = null,
        public string $color = 'accent',
        public ?string $class = null
    ) {}

    public function percentage(): float
    {
        return min(($this->value / $this->max) * 100, 100);
    }

    public function colorClasses(): array
    {
        return [
            'accent' => 'bg-gradient-to-r from-accent-designers to-accent-project-managers',
            'developers' => 'bg-accent-developers',
            'designers' => 'bg-accent-designers',
            'project-managers' => 'bg-accent-project-managers',
        ];
    }

    public function render()
    {
        return view('components.progress-bar');
    }
}

