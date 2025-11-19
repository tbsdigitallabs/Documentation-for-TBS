<?php

namespace App\View\Components;

use Illuminate\View\Component;

class HoloCard extends Component
{
    public function __construct(
        public string $variant = 'default',
        public ?string $role = null,
        public ?string $class = null
    ) {}

    public function variantClasses(): array
    {
        return [
            'default' => 'card-professional',
            'glow' => 'card-professional border-accent shadow-lg',
            'holographic' => 'card-professional border-accent shadow-lg bg-gradient-to-br from-surface-primary to-surface-secondary',
        ];
    }

    public function roleClasses(): array
    {
        return [
            'developers' => 'border-accent-developers',
            'designers' => 'border-accent-designers',
            'project-managers' => 'border-accent-project-managers',
            'content-creators' => 'border-accent-content-creators',
            'sales-business' => 'border-accent-sales-business',
        ];
    }

    public function render()
    {
        return view('components.holo-card');
    }
}

