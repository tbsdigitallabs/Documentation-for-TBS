<?php

namespace App\View\Components;

use Illuminate\View\Component;

class RoleCard extends Component
{
    public function __construct(
        public string $title,
        public string $description,
        public array $features,
        public string $color,
        public string $href,
        public ?string $class = null
    ) {}

    public function render()
    {
        return view('components.role-card');
    }
}

