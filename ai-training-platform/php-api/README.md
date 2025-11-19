# PHP API for AI Training Platform

## Overview

PHP backend API for handling business logic, data processing, and complex operations while Next.js handles the frontend.

## Setup

### 1. Install Dependencies

```bash
cd php-api
composer install
```

### 2. Configure Environment

Create `.env` file:

```bash
DB_HOST=localhost
DB_NAME=ai_training_platform
DB_USER=your_username
DB_PASSWORD=your_password
```

### 3. Start PHP Server

```bash
php -S localhost:8000
```

Or use Apache/Nginx with proper configuration.

## API Endpoints

### User Management
- `GET /users/{id}.php` - Get user details
- `POST /users/create.php` - Create new user
- `PUT /users/{id}.php` - Update user

### Progress Tracking
- `POST /progress/track.php` - Track module progress
- `GET /progress/{userId}.php` - Get user progress

### Gamification
- `POST /achievements/award.php` - Award achievement
- `GET /leaderboard.php` - Get leaderboard
- `POST /xp/calculate.php` - Calculate and award XP

### Content
- `GET /modules/list.php` - List all modules
- `GET /modules/{id}.php` - Get module details

## Database

Uses MySQL database shared with Next.js Prisma setup.

## Integration with Next.js

Next.js frontend calls PHP API endpoints for backend operations:

```typescript
// Example from Next.js
const response = await fetch('http://localhost:8000/progress/track.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, moduleId })
});
```

## Notes

- PHP handles backend business logic
- Next.js handles frontend UI and routing
- Both use the same MySQL database
- CORS enabled for Next.js frontend

