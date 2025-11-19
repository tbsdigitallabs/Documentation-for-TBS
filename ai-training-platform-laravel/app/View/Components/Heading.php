<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Heading extends Component
{
    public function __construct(
        public int $level = 1,
        public ?string $size = null,
        public ?string $class = null
    ) {}

    public function sizeClasses(): array
    {
        return [
            'sm' => [
                1 => 'text-3xl',
                2 => 'text-2xl',
                3 => 'text-xl',
            ],
            'md' => [
                1 => 'text-4xl',
                2 => 'text-3xl',
                3 => 'text-2xl',
            ],
            'lg' => [
                1 => 'text-5xl',
                2 => 'text-4xl',
                3 => 'text-3xl',
            ],
        ];
    }

    public function defaultSizeClasses(): array
    {
        return [
            1 => 'text-4xl font-bold',
            2 => 'text-3xl font-semibold',
            3 => 'text-2xl font-semibold',
        ];
    }

    public function tag(): string
    {
        return "h{$this->level}";
    }

    public function classes(): string
    {
        $baseClasses = 'font-heading text-content-primary';
        
        if ($this->size) {
            $sizeClasses = $this->sizeClasses()[$this->size][$this->level] ?? '';
            return "{$baseClasses} {$sizeClasses} {$this->class}";
        }
        
        $defaultClasses = $this->defaultSizeClasses()[$this->level] ?? '';
        return "{$baseClasses} {$defaultClasses} {$this->class}";
    }

    public function render()
    {
        return view('components.heading');
    }
}

