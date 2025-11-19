# Migration to MySQL + PHP Integration

## Overview

This document outlines the migration from SQLite to MySQL and integration of PHP backend components to align with the head dev's tech stack.

## Tech Stack Alignment

**Current Stack:**
- Next.js (JavaScript/TypeScript) ✅
- SQLite (via Prisma)
- React components

**Target Stack:**
- Next.js (JavaScript) ✅ - Already compatible
- MySQL ✅ - Migrating from SQLite
- PHP - Adding for backend API endpoints
- HTML/CSS ✅ - Already in use

## Migration Steps

### 1. Database Migration: SQLite → MySQL

#### Prisma Schema Updated
- ✅ Changed `provider` from `sqlite` to `mysql`
- ✅ Changed `url` from file path to environment variable

#### Environment Variables
Update `.env.local`:

```bash
# MySQL Database Connection
DATABASE_URL="mysql://username:password@localhost:3306/ai_training_platform?schema=public"

# Google OAuth (existing)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

#### MySQL Setup

1. **Create Database:**
```sql
CREATE DATABASE ai_training_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Run Prisma Migrations:**
```bash
cd ai-training-platform
npx prisma migrate dev --name init_mysql
npx prisma generate
```

3. **Verify Connection:**
```bash
npx prisma studio
```

### 2. PHP Backend Integration

#### Directory Structure
```
ai-training-platform/
├── api/                    # Next.js API routes (existing)
├── php-api/                # New PHP backend
│   ├── config/
│   │   └── database.php    # MySQL connection
│   ├── models/             # Data models
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   └── index.php           # Entry point
├── src/                    # Next.js frontend (existing)
└── prisma/                 # Database schema (existing)
```

#### PHP API Endpoints

**Recommended PHP endpoints for backend logic:**

1. **User Management:**
   - `POST /php-api/users/create.php` - Create user
   - `GET /php-api/users/{id}.php` - Get user
   - `PUT /php-api/users/{id}.php` - Update user

2. **Progress Tracking:**
   - `POST /php-api/progress/track.php` - Track module progress
   - `GET /php-api/progress/{userId}.php` - Get user progress

3. **Gamification:**
   - `POST /php-api/achievements/award.php` - Award achievement
   - `GET /php-api/leaderboard.php` - Get leaderboard
   - `POST /php-api/xp/calculate.php` - Calculate XP

4. **Content Management:**
   - `GET /php-api/modules/list.php` - List modules
   - `GET /php-api/modules/{id}.php` - Get module details

### 3. Integration Approach

#### Option A: Hybrid (Recommended)
- **Frontend**: Next.js (React components, routing, UI)
- **Backend API**: PHP (business logic, data processing)
- **Database**: MySQL (via Prisma for Next.js, PDO for PHP)

**Benefits:**
- Leverages Next.js for frontend
- Uses PHP for backend where needed
- Maintains existing React components

#### Option B: Full PHP Migration
- Convert entire Next.js app to PHP framework (Laravel/Symfony)
- **Not recommended** - would require complete rewrite

### 4. PHP Setup

#### Requirements
- PHP 8.1+
- MySQL 8.0+
- Composer (for PHP dependencies)

#### PHP Dependencies
Create `php-api/composer.json`:

```json
{
  "name": "tbs/ai-training-api",
  "description": "PHP API for AI Training Platform",
  "require": {
    "php": ">=8.1",
    "ext-pdo": "*",
    "ext-json": "*"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

#### Database Connection (PHP)
`php-api/config/database.php`:

```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "ai_training_platform";
    private $username = "your_username";
    private $password = "your_password";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection error: " . $e->getMessage();
        }
        
        return $this->conn;
    }
}
?>
```

### 5. Next.js → PHP Communication

#### API Calls from Next.js
```typescript
// src/lib/api.ts
const PHP_API_URL = process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost:8000';

export async function trackProgress(userId: string, moduleId: string) {
  const response = await fetch(`${PHP_API_URL}/php-api/progress/track.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, moduleId })
  });
  return response.json();
}
```

### 6. Migration Checklist

- [x] Update Prisma schema to MySQL
- [ ] Set up MySQL database
- [ ] Update environment variables
- [ ] Run Prisma migrations
- [ ] Create PHP API directory structure
- [ ] Set up PHP database connection
- [ ] Create PHP API endpoints
- [ ] Update Next.js to call PHP APIs
- [ ] Test database operations
- [ ] Update documentation

## Testing

### Test MySQL Connection
```bash
npx prisma db pull
npx prisma studio
```

### Test PHP API
```bash
cd php-api
php -S localhost:8000
curl http://localhost:8000/users/list.php
```

## Notes

- **Next.js remains the frontend** - React components, routing, UI
- **PHP handles backend logic** - Business logic, data processing, complex operations
- **MySQL is the database** - Single source of truth for both Next.js and PHP
- **Prisma continues to work** - Next.js uses Prisma, PHP uses PDO

## Compatibility

✅ **Already Compatible:**
- JavaScript (Next.js uses JS/TS)
- HTML (Next.js renders HTML)
- CSS (Tailwind CSS already in use)
- Next.js (already the framework)

✅ **Migrating:**
- SQLite → MySQL

🆕 **Adding:**
- PHP backend API

## Questions?

If you need a full PHP framework migration instead, we'd need to:
1. Choose a PHP framework (Laravel, Symfony, CodeIgniter)
2. Rewrite all React components as PHP templates
3. Migrate all routing to PHP
4. This would be a complete rewrite (not recommended)

The hybrid approach maintains your existing Next.js frontend while adding PHP backend capabilities.

