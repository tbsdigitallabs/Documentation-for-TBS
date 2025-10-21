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

# Database URL for Prisma
DATABASE_URL="file:./dev.db"
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

Run the following commands to set up the database:

```bash
npx prisma generate
npx prisma db push
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/auth/signin`
3. Click "Continue with Google"
4. Sign in with an authorized email address
5. You'll be redirected to `/class-selection` upon successful authentication
