# Google Authentication Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database URL for Prisma (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/ai_training_platform?schema=public"
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your `.env.local` file

## Email Domain Restrictions

The authentication is configured to only allow users with:
- `@thebigsmoke.com.au` email addresses
- `@tbsdigitallabs.com.au` email addresses

## Database Setup

### MySQL Setup

1. **Create MySQL Database:**
```sql
CREATE DATABASE ai_training_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Update Environment Variables:**
```bash
DATABASE_URL="mysql://username:password@localhost:3306/ai_training_platform?schema=public"
```

3. **Run Prisma Migrations:**
```bash
npx prisma migrate dev --name init_mysql
npx prisma generate
npx prisma db push
```

### PHP API Setup (Optional)

If using PHP backend API:

```bash
cd php-api
composer install
# Configure .env file with database credentials
php -S localhost:8000
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/auth/signin`
3. Click "Continue with Google"
4. Sign in with an authorized email address
5. You'll be redirected to `/class-selection` upon successful authentication
