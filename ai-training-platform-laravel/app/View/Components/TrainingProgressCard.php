<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TrainingProgressCard extends Component
{
    public function __construct(
        public array $stats,
        public string $title = 'Your Training Progress',
        public ?string $class = null
    ) {}

    public function render()
    {
        return view('components.training-progress-card');
    }
}

