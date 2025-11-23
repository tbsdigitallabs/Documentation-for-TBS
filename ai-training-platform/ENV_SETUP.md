# Environment Variables Setup

## Google OAuth Credentials

### Production (learninglab.tbsdigitallabs.com)

- **Client ID**: `your_google_client_id_here`
- **Client Secret**: _(Retrieve from Google Cloud Console or secret manager)_
- **Redirect URI**: `https://learninglab.tbsdigitallabs.com/api/auth/callback/google`

### Legacy (Karyn Content Engine project)

- **Client ID**: `847745245279-al0k7miipvk31p148t44m2etkochuik8.apps.googleusercontent.com`
- **Client Secret**: `your_legacy_client_secret_here`
- **Project ID**: `tbs-lab-476700`

## Required Environment Variables

Create a `.env.local` file in the `ai-training-platform` directory with:

```bash
# Google OAuth Configuration
# Production (learninglab.tbsdigitallabs.com):
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# Legacy (for reference):
# GOOGLE_CLIENT_ID=847745245279-al0k7miipvk31p148t44m2etkochuik8.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=your_legacy_client_secret_here

# NextAuth Configuration
# For local development:
NEXTAUTH_URL=http://localhost:3000
# For production (learninglab.tbsdigitallabs.com):
# NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com

# Generate a random secret for NextAuth
# You can use: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database URL for Prisma (MySQL)
# Format: mysql://username:password@host:port/database_name?schema=public
DATABASE_URL="mysql://username:password@localhost:3306/ai_training_platform?schema=public"
```

## Google OAuth Redirect URI Setup

When deploying, ensure the redirect URI in Google Cloud Console matches:

- **Development**: `http://localhost:3000/api/auth/callback/google`
- **Production**: `https://learninglab.tbsdigitallabs.com/api/auth/callback/google`

## Next Steps

1. Copy the credentials above to your `.env.local` file
2. Generate a `NEXTAUTH_SECRET` using `openssl rand -base64 32`
3. Set up your MySQL database and update `DATABASE_URL`
4. Run `npx prisma generate` and `npx prisma db push` to set up the database
5. Update the redirect URI in Google Cloud Console if deploying to a new domain

