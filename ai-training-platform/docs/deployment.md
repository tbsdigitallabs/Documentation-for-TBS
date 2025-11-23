---
title: D EP LO YM EN T
description: Documentation for D EP LO YM EN T
last_updated: 2025-11-23
author: TBS Digital Labs
category: General
---
# Deployment Guide

## Prerequisites

1. **Database**: MySQL database (local or cloud-hosted)
2. **Google OAuth**: Google Cloud Console project with OAuth credentials
3. **Hosting**: Vercel, Netlify, or similar Next.js-compatible platform

## Environment Variables

Create a `.env.local` file (or set environment variables in your hosting platform):

```bash
# Google OAuth Configuration
# Production (learninglab.tbsdigitallabs.com):
GOOGLE_CLIENT_ID=180424126672-apvmt8evgneepbu2iaebijv1ko3jean1.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database URL
DATABASE_URL="mysql://username:password@host:port/database_name?schema=public"
```

**Note**: The Google OAuth Client ID is configured. Add the NextAuth callback URL to the authorized redirect URIs in Google Cloud Console:
- `http://localhost:3000/api/auth/callback/google` (development)
- `https://learninglab.tbsdigitallabs.com/api/auth/callback/google` (production)

**Important**: Retrieve the `GOOGLE_CLIENT_SECRET` from Google Cloud Console or your secret manager and add it to your deployment platform's environment variables.

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://learninglab.tbsdigitallabs.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your environment variables

## Database Setup

### Local MySQL

```sql
CREATE DATABASE ai_training_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Cloud Database (Recommended for Production)

Use a managed MySQL service like:
- **PlanetScale** (recommended for Next.js)
- **AWS RDS**
- **Google Cloud SQL**
- **Azure Database for MySQL**

## Deployment Steps

### 1. Database Migration

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Or push schema (for development)
npx prisma db push
```

### 2. Build and Deploy

#### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Run `npm run build`
- Deploy to production
- Set up HTTPS

**Domain Configuration (learninglab.tbsdigitallabs.com):**

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `learninglab.tbsdigitallabs.com`
4. Vercel will provide DNS records to configure:
   - **CNAME record**: Point `learninglab` to `cname.vercel-dns.com`
   - Or **A record**: Use the IP addresses provided by Vercel
5. Configure DNS at your domain registrar (where `tbsdigitallabs.com` is managed)
6. Wait for DNS propagation (usually 5-60 minutes)
7. Vercel will automatically provision SSL certificate

**DNS Configuration:**
- **Type**: CNAME
- **Name**: `learninglab`
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600 (or default)

#### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

**Domain Configuration (learninglab.tbsdigitallabs.com):**

1. In Netlify dashboard, go to your site → **Domain settings** → **Custom domains**
2. Click **Add custom domain**
3. Enter: `learninglab.tbsdigitallabs.com`
4. Netlify will provide DNS records:
   - **CNAME record**: Point `learninglab` to your Netlify site (e.g., `your-site.netlify.app`)
5. Configure DNS at your domain registrar
6. Netlify will automatically provision SSL certificate

**DNS Configuration:**
- **Type**: CNAME
- **Name**: `learninglab`
- **Value**: `your-site-name.netlify.app` (or the value Netlify provides)
- **TTL**: 3600 (or default)

#### Google Cloud Run

**Prerequisites:**
- Google Cloud SDK installed (`gcloud`)
- Project created in Google Cloud Console
- Billing enabled on the project

**Initial Setup:**

1. **Install Google Cloud SDK** (if not already installed):
```bash
# Windows (PowerShell)
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
& $env:Temp\GoogleCloudSDKInstaller.exe

# Or use package manager
winget install Google.CloudSDK
```

2. **Authenticate and set project:**
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

3. **Enable required APIs:**
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

**Deployment Options:**

**Option A: Deploy from local machine**

```bash
cd ai-training-platform

# Build and deploy
gcloud run deploy learninglab \
  --source . \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,GOOGLE_CLIENT_ID=your_client_id,GOOGLE_CLIENT_SECRET=your_secret,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,NEXTAUTH_SECRET=your_secret,DATABASE_URL=your_database_url"
```

**Option B: Deploy from GitHub (recommended)**

1. **Connect GitHub repository to Cloud Build:**
   - Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - Click **Create Trigger**
   - Connect your GitHub repository
   - Set trigger configuration:
     - **Name**: `learninglab-deploy`
     - **Event**: Push to branch (e.g., `main` or `master`)
     - **Configuration**: Cloud Build configuration file
     - **Location**: `ai-training-platform/cloudbuild.yaml`

2. **Set up environment variables in Secret Manager:**
```bash
# Create secrets
gcloud secrets create google-client-id --data-file=- <<< "180424126672-apvmt8evgneepbu2iaebijv1ko3jean1.apps.googleusercontent.com"
gcloud secrets create google-client-secret --data-file=- <<< "your_client_secret"
gcloud secrets create nextauth-secret --data-file=- <<< "your_nextauth_secret"
gcloud secrets create database-url --data-file=- <<< "your_database_url"
```

3. **Update cloudbuild.yaml to use secrets** (see below)

4. **Push to GitHub** - Cloud Build will automatically deploy

**Option C: Manual Docker build and deploy**

```bash
cd ai-training-platform

# Build Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/learninglab:latest .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/learninglab:latest

# Deploy to Cloud Run
gcloud run deploy learninglab \
  --image gcr.io/YOUR_PROJECT_ID/learninglab:latest \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000
```

**Domain Configuration (learninglab.tbsdigitallabs.com):**

1. **Get Cloud Run service URL:**
```bash
gcloud run services describe learninglab --region australia-southeast1 --format 'value(status.url)'
```

2. **Map custom domain:**
   - Go to [Cloud Run Services](https://console.cloud.google.com/run)
   - Click on `learninglab` service
   - Go to **Manage Custom Domains** tab
   - Click **Add Mapping**
   - Enter: `learninglab.tbsdigitallabs.com`
   - Cloud Run will provide DNS records

3. **Configure DNS at your registrar:**
   - **Type**: A record
   - **Name**: `learninglab`
   - **Value**: (IP addresses provided by Cloud Run)
   - Or use **CNAME** if Cloud Run provides one

4. **Verify domain:**
   - Cloud Run will automatically provision SSL certificate
   - Wait 5-60 minutes for DNS propagation
   - Test: `https://learninglab.tbsdigitallabs.com`

**Environment Variables:**

Set via Cloud Run console or CLI:
```bash
gcloud run services update learninglab \
  --region australia-southeast1 \
  --update-env-vars "GOOGLE_CLIENT_ID=your_id,GOOGLE_CLIENT_SECRET=your_secret,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,NEXTAUTH_SECRET=your_secret,DATABASE_URL=your_database_url"
```

Or use Secret Manager (recommended for production):
```bash
gcloud run services update learninglab \
  --region australia-southeast1 \
  --update-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest,DATABASE_URL=database-url:latest"
```

**Useful Commands:**

```bash
# View logs
gcloud run services logs read learninglab --region australia-southeast1

# Update service
gcloud run services update learninglab --region australia-southeast1

# View service details
gcloud run services describe learninglab --region australia-southeast1
```

#### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 3. Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test Google OAuth sign-in
- [ ] Verify email domain restrictions work
- [ ] Test protected routes redirect to sign-in
- [ ] Verify session persistence
- [ ] Check error pages (`/auth/error`)

## Protected Routes

The following routes require authentication:
- `/class-selection`
- `/developers/*`
- `/designers/*`
- `/project-managers/*`
- `/content-creators/*`
- `/sales-business-dev/*`
- `/session-0/*`

Public routes:
- `/` (home page)
- `/auth/signin`
- `/auth/error`

## Troubleshooting

### Authentication Not Working

1. Verify `NEXTAUTH_URL` matches your domain exactly
2. Check Google OAuth redirect URI matches exactly
3. Verify `NEXTAUTH_SECRET` is set
4. Check database connection

### Database Connection Issues

1. Verify `DATABASE_URL` format is correct
2. Check database is accessible from hosting platform
3. For cloud databases, ensure IP whitelist includes hosting platform IPs
4. Verify SSL/TLS settings if required

### Build Errors

1. Ensure all environment variables are set
2. Run `npx prisma generate` before building
3. Check Node.js version matches (18+ recommended)

## Domain Configuration

### Where to Point learninglab.tbsdigitallabs.com

The domain should point to your hosting platform's servers. Here are the common options:

**If using Google Cloud Run:**
- Go to Cloud Run service → **Manage Custom Domains**
- Add `learninglab.tbsdigitallabs.com`
- Cloud Run will provide A record IP addresses
- Configure DNS at your registrar with the provided IPs
- SSL certificate is automatically provisioned

**If using Vercel:**
- **CNAME**: `learninglab` → `cname.vercel-dns.com`
- Or use the specific CNAME provided in Vercel dashboard

**If using Netlify:**
- **CNAME**: `learninglab` → `your-site-name.netlify.app`

**If using another platform:**
- Check your hosting platform's documentation for custom domain setup
- They will provide the CNAME or A record values

### DNS Configuration Steps

1. Log into your domain registrar (where `tbsdigitallabs.com` is managed)
2. Navigate to DNS management
3. Add a new record:
   - **Type**: CNAME (or A record if platform requires)
   - **Name/Host**: `learninglab`
   - **Value/Target**: (provided by your hosting platform)
   - **TTL**: 3600 (or default)
4. Save changes
5. Wait for DNS propagation (5-60 minutes typically)
6. Your hosting platform will automatically provision SSL certificate

### Verifying Domain Setup

After DNS propagation:
1. Check domain resolves: `nslookup learninglab.tbsdigitallabs.com`
2. Verify SSL certificate is active (should be automatic)
3. Test the site loads at `https://learninglab.tbsdigitallabs.com`
4. Verify `NEXTAUTH_URL` environment variable matches the domain exactly

## Security Notes

- Never commit `.env.local` to version control
- Use strong, randomly generated `NEXTAUTH_SECRET`
- Enable HTTPS in production (automatic with Vercel/Netlify)
- Regularly update dependencies
- Monitor authentication logs for suspicious activity


