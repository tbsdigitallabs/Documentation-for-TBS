<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ModuleLayout extends Component
{
    public function __construct(
        public string $title,
        public string $description,
        public string $role,
        public string $rolePath,
        public int $moduleNumber,
        public int $totalLessons,
        public string $estimatedTime,
        public int $progress = 0,
        public ?string $class = null
    ) {}

    public function render()
    {
        return view('components.module-layout');
    }
}

