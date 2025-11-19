<!DOCTYPE html>
<html lang="en" x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' }" 
      x-bind:class="{ 'dark': darkMode }"
      x-init="$watch('darkMode', value => localStorage.setItem('darkMode', value))">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TBS Digital Labs - AI Training Platform</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-gradient-surface">
    <x-header-nav />
    
    <main class="flex-grow">
        {{ $slot }}
    </main>
    
    <x-footer />
</body>
</html>

