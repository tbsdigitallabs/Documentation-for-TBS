@props(['title', 'description', 'features' => [], 'color', 'href', 'class' => ''])

<div class="hover:shadow-lg transition-shadow cursor-pointer {{ $class }}">
    <div class="card-padding-md">
        <h3 class="text-lg font-semibold text-navy-primary mb-spacing-sm">{{ $title }}</h3>
        <p class="text-gray-700 mb-spacing-md">{{ $description }}</p>
        <div class="spacing-y-sm mb-spacing-md">
            @foreach($features as $feature)
                <div class="flex items-center spacing-x-sm text-sm text-gray-800">
                    <span class="w-2 h-2 {{ $color }} rounded-full"></span>
                    {{ $feature }}
                </div>
            @endforeach
        </div>
        <a href="{{ $href }}">
            <button class="w-full bg-navy-primary hover:bg-navy-primary/90 text-white py-2 px-4 rounded-md transition-colors">
                Start Learning
            </button>
        </a>
    </div>
</div>

