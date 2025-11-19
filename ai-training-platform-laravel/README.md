# TBS Digital Labs - AI Training Platform (Laravel)

Full PHP rewrite of the AI Training Platform using Laravel 11, maintaining composition architecture and design system principles.

## 🎉 Migration Complete

This is a complete migration from Next.js to Laravel, preserving:
- ✅ Composition architecture (Blade components with slots)
- ✅ Brand guidelines and design tokens
- ✅ All features and functionality
- ✅ Australian English throughout
- ✅ Accessibility standards
- ✅ Performance optimisations

## Tech Stack

- **Backend**: Laravel 11.x (PHP 8.1+)
- **Frontend**: Blade templates, Alpine.js, Tailwind CSS v4
- **Database**: MySQL
- **Authentication**: Laravel Socialite (Google OAuth)
- **Asset Compilation**: Vite

## Quick Start

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8.0+

### Installation

1. **Install Dependencies**:
```bash
composer install
npm install
```

2. **Environment Setup**:
```bash
cp .env.example .env
php artisan key:generate
```

3. **Configure Database** (update `.env`):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ai_training_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

4. **Run Migrations**:
```bash
php artisan migrate
```

5. **Compile Assets**:
```bash
npm run dev
# or for production
npm run build
```

6. **Start Server**:
```bash
php artisan serve
```

Visit `http://localhost:8000`

## Project Structure

```
ai-training-platform-laravel/
├── app/
│   ├── Http/Controllers/     # All controllers
│   ├── Models/                # Eloquent models
│   ├── Services/              # Business logic services
│   ├── View/Components/       # Blade component classes
│   └── Providers/             # Service providers
├── resources/
│   ├── views/
│   │   ├── components/        # Blade component templates
│   │   ├── pages/             # Page templates
│   │   └── auth/              # Authentication views
│   ├── css/app.css            # Main stylesheet
│   └── js/app.js              # Main JavaScript
├── routes/
│   ├── web.php                # Web routes
│   └── api.php                 # API routes
└── database/migrations/       # Database migrations
```

## Features

- ✅ Role-based training tracks (Developers, Designers, PMs, Content Creators, Sales)
- ✅ Module-based learning system
- ✅ Progress tracking and XP system
- ✅ Achievement system
- ✅ Leaderboards
- ✅ Google OAuth authentication
- ✅ Email domain restrictions
- ✅ Dark mode support
- ✅ Responsive design
- ✅ MDX content support

## Composition Architecture

All components follow the composition pattern using Blade slots:

```blade
<x-container size="lg">
    <x-section background="primary">
        <x-heading level="1">Title</x-heading>
        <x-button variant="default" href="/path">Click Me</x-button>
    </x-section>
</x-container>
```

## Brand Guidelines

- Colours: Oxford Blue, Ultramarine, Light Magenta, Sage
- Typography: Funnel Display (headings), Rethink Sans (body)
- Language: Australian English
- All brand tokens in `resources/css/app.css`

## API Endpoints

All API routes require authentication (`auth:sanctum`):

- `POST /api/progress/track` - Track user progress
- `GET /api/progress/{userId}` - Get user progress
- `POST /api/achievements/award` - Award achievement
- `GET /api/achievements/{userId}` - Get user achievements
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/analytics/user/{userId}` - User analytics
- `GET /api/analytics/module/{moduleId}` - Module analytics

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

### Asset Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
php artisan optimize
```

## Documentation

- `MIGRATION_COMPLETE.md` - Full migration details
- `MIGRATION_PROGRESS.md` - Migration checklist
- `LARAVEL_MIGRATION_PLAN.md` - Original migration plan

## License

Internal use only - TBS Digital Labs
