# Deployment Guide

Complete guide for deploying LearningLab to Google Cloud Run.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Manual Deployment](#manual-deployment)
3. [Auto-Deployment Setup](#auto-deployment-setup)
4. [Service Accounts](#service-accounts)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Google Cloud SDK Setup

```bash
# Install Google Cloud SDK (if not installed)
# Windows: Download from https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your project
gcloud config set project learninglab-478822

# Install beta component (for domain mappings)
# Windows: Run install-gcloud-beta.ps1 or install-gcloud-beta.bat
# Or manually: gcloud components install beta

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Secrets Setup

Create secrets in Google Cloud Secret Manager:

```bash
# Create secrets
echo -n "YOUR_GOOGLE_CLIENT_ID" | gcloud secrets create google-client-id --data-file=-
echo -n "YOUR_GOOGLE_CLIENT_SECRET" | gcloud secrets create google-client-secret --data-file=-
echo -n "YOUR_NEXTAUTH_SECRET" | gcloud secrets create nextauth-secret --data-file=-

# Grant Cloud Run access to secrets
gcloud secrets add-iam-policy-binding google-client-id \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding google-client-secret \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding nextauth-secret \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Manual Deployment

### Quick Deploy

From the `ai-training-platform` directory:

```bash
cd ai-training-platform

# Build and deploy
gcloud run deploy learninglab \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,GCS_BUCKET_NAME=learninglab-storage" \
  --set-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest" \
  --service-account=learninglab-run@learninglab-478822.iam.gserviceaccount.com
```

### Using Docker Build

```bash
cd ai-training-platform

# Build image
$commitSha = git rev-parse --short HEAD
docker build -t gcr.io/learninglab-478822/learninglab:$commitSha .

# Push to Container Registry
docker push gcr.io/learninglab-478822/learninglab:$commitSha

# Deploy
gcloud run deploy learninglab \
  --image=gcr.io/learninglab-478822/learninglab:$commitSha \
  --region=us-central1 \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --project=learninglab-478822 \
  --set-env-vars="NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,GCS_BUCKET_NAME=learninglab-storage" \
  --set-secrets="GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest" \
  --service-account=learninglab-run@learninglab-478822.iam.gserviceaccount.com
```

---

## Auto-Deployment Setup

### Option 1: Cloud Console (Recommended)

#### Step 1: Connect GitHub Repository

1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers?project=learninglab-478822)
2. Click **"Connect Repository"**
3. Select **GitHub (Cloud Build GitHub App)**
4. Authorize Google Cloud Build to access your GitHub account
5. Select repository: **tbsdigitallabs/Documentation-for-TBS**
6. Click **"Connect"**

#### Step 2: Create Trigger

1. Click **"Create Trigger"**
2. Fill in the form:
   - **Name**: `learninglab-auto-deploy`
   - **Event**: `Push to a branch`
   - **Branch**: `^master$` (regex pattern)
   - **Configuration**: `Cloud Build configuration file (yaml or json)`
   - **Location**: `ai-training-platform/cloudbuild.yaml`
   - **Service account**: `180424126672@cloudbuild.gserviceaccount.com` (Cloud Build default)
3. Click **"Create"**

#### Step 3: Test

Push a commit to master branch:
```bash
git push origin master
```

Monitor the build: https://console.cloud.google.com/cloud-build/builds?project=learninglab-478822

### Option 2: PowerShell Script

Run the setup script:
```powershell
cd ai-training-platform
.\setup-auto-deploy.ps1
```

---

## Service Accounts

### Cloud Build Service Account

**Email**: `180424126672@cloudbuild.gserviceaccount.com`

**Format**: `PROJECT_NUMBER@cloudbuild.gserviceaccount.com`

Where `PROJECT_NUMBER` = `180424126672` for project `learninglab-478822`

**Permissions**: Automatically has all required permissions for Cloud Build operations.

### Cloud Run Service Account

**Email**: `learninglab-run@learninglab-478822.iam.gserviceaccount.com`

**Required Roles**:
- `roles/secretmanager.secretAccessor` - To access secrets
- `roles/run.invoker` - To invoke Cloud Run services
- `roles/datastore.user` - To access Firestore database
- `roles/storage.objectAdmin` - To access Cloud Storage

---

## Environment Variables

### Required Variables

| Variable | Source | Description |
|----------|--------|-------------|
| `GOOGLE_CLIENT_ID` | Secret Manager | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Secret Manager | Google OAuth Client Secret |
| `NEXTAUTH_SECRET` | Secret Manager | NextAuth session encryption key |
| `NEXTAUTH_URL` | Environment | Production URL: `https://learninglab.tbsdigitallabs.com` |
| `NODE_ENV` | Environment | Set to `production` |
| `GCS_BUCKET_NAME` | Environment | Cloud Storage bucket name (default: `learninglab-storage`) |

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Create OAuth 2.0 Client ID (Web application)
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://learninglab.tbsdigitallabs.com/api/auth/callback/google`
5. Copy Client ID and Client Secret to Secret Manager

---

## Firestore and Cloud Storage

The application uses Firestore for user data persistence and Cloud Storage for image uploads. This replaces the ephemeral filesystem storage that was causing data loss in Cloud Run.

### Required Setup

**Before deploying**, run the setup script to create the necessary infrastructure:

**Windows:**
```powershell
cd ai-training-platform
.\setup-firestore-storage.ps1
```

**Linux/Mac:**
```bash
cd ai-training-platform
chmod +x setup-firestore-storage.sh
./setup-firestore-storage.sh
```

This script will:
1. Enable Firestore and Cloud Storage APIs
2. Create Firestore database (Native mode)
3. Create Cloud Storage bucket (`learninglab-storage`)
4. Grant necessary permissions to the service account

### Environment Variables

| Variable | Source | Description |
|----------|--------|-------------|
| `GCS_BUCKET_NAME` | Environment | Cloud Storage bucket name (default: `learninglab-storage`) |

**Note:** The bucket name is set in `cloudbuild.yaml` and manual deployment commands. For local development, you can set `GCS_BUCKET_NAME` in `.env.local` or it will default to `learninglab-storage`.

### Service Account Permissions

The service account `learninglab-run@learninglab-478822.iam.gserviceaccount.com` needs the following roles:

- `roles/datastore.user` - For Firestore database access
- `roles/storage.objectAdmin` - For Cloud Storage uploads and management

These permissions are automatically granted by the setup scripts. To verify or manually grant:

```bash
# Grant Firestore permissions
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/datastore.user"

# Grant Cloud Storage permissions
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### Application Default Credentials (ADC)

The application uses Application Default Credentials (ADC) for authentication:

- **On Cloud Run**: ADC is automatically available via the service account. No configuration needed.
- **Local Development**: Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to a service account key file:
  ```bash
  export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
  ```

### Manual Deployment Updates

When deploying manually, include `GCS_BUCKET_NAME` in the environment variables:

```bash
gcloud run deploy learninglab \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,GCS_BUCKET_NAME=learninglab-storage" \
  --set-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest" \
  --service-account=learninglab-run@learninglab-478822.iam.gserviceaccount.com
```

### Related Documentation

- [Firestore Setup Guide](./FIRESTORE_SETUP.md) - Detailed Firestore setup instructions
- [Cloud Run Storage Fix](./CLOUD_RUN_STORAGE_FIX.md) - Service account permissions guide
- [Storage Migration Summary](./STORAGE_MIGRATION_SUMMARY.md) - Overview of storage changes

---

## Deployment Checklist

Use this checklist before deploying to ensure all infrastructure is properly configured:

### Step 1: Run Setup Scripts

**Windows:**
```powershell
cd ai-training-platform
.\setup-firestore-storage.ps1
```

**Linux/Mac:**
```bash
cd ai-training-platform
chmod +x setup-firestore-storage.sh
./setup-firestore-storage.sh
```

This will:
- Enable Firestore and Cloud Storage APIs
- Create Firestore database
- Create Cloud Storage bucket (`learninglab-storage`)
- Grant service account permissions

### Step 2: Verify Infrastructure

Check that the following exist:

1. **Firestore Database**: 
   - Go to: https://console.cloud.google.com/firestore?project=learninglab-478822
   - Should see a database in Native mode

2. **Cloud Storage Bucket**:
   - Go to: https://console.cloud.google.com/storage/browser/learninglab-storage?project=learninglab-478822
   - Bucket should exist

3. **Service Account Permissions**:
   - Go to: https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822
   - Find `learninglab-run@learninglab-478822.iam.gserviceaccount.com`
   - Should have:
     - `roles/datastore.user`
     - `roles/storage.objectAdmin`
     - `roles/secretmanager.secretAccessor`

### Step 3: Deploy Application

**Option A: Auto-deploy (if Cloud Build trigger is set up)**
```bash
git add .
git commit -m "your commit message"
git push origin master
```

**Option B: Manual deploy**
```bash
cd ai-training-platform
gcloud run deploy learninglab \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,GCS_BUCKET_NAME=learninglab-storage" \
  --set-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest" \
  --service-account=learninglab-run@learninglab-478822.iam.gserviceaccount.com
```

### Step 4: Verify Deployment

After deployment:

1. **Check Cloud Run logs** for any initialization errors:
   - Go to: https://console.cloud.google.com/run?project=learninglab-478822
   - Click on `learninglab` service
   - Check "Logs" tab

2. **Test profile image upload**:
   - Go to profile page
   - Upload an image
   - Save profile
   - Refresh page - image should persist

3. **Check Firestore**:
   - Go to Firestore console
   - Check `users` collection
   - Verify user data is being saved

4. **Check Cloud Storage**:
   - Go to Cloud Storage console
   - Check `learninglab-storage` bucket
   - Verify images are in `profiles/` folder

### Troubleshooting Checklist

If images still don't persist:

1. **Check environment variables**:
   - Verify `NODE_ENV=production` is set in Cloud Run
   - Verify `GCS_BUCKET_NAME=learninglab-storage` is set

2. **Check service account permissions**:
   ```bash
   gcloud projects get-iam-policy learninglab-478822 \
     --flatten="bindings[].members" \
     --filter="bindings.members:serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com"
   ```

3. **Check Cloud Run logs** for errors:
   - Look for "Firestore" or "Cloud Storage" errors
   - Look for "Application Default Credentials" errors

4. **Verify ADC is working**:
   - On Cloud Run, ADC should work automatically
   - If errors, check service account has correct permissions

### Common Issues

- **"Permission denied" errors**: Service account missing roles
- **"Bucket not found"**: Bucket name mismatch or doesn't exist
- **"Database not found"**: Firestore database not created
- **Images upload but don't persist**: Check if `profileImage` is being saved to Firestore

---

## Troubleshooting

See [deployment-troubleshooting.md](./deployment-troubleshooting.md) for common issues and solutions.

### Common Issues

1. **"Account deleted" error** - Service account permissions issue
2. **Build failures** - Check Cloud Build logs
3. **Deployment errors** - Verify secrets exist and service account has access

### Quick Links

- **Cloud Build**: https://console.cloud.google.com/cloud-build?project=learninglab-478822
- **Cloud Run**: https://console.cloud.google.com/run?project=learninglab-478822
- **Secret Manager**: https://console.cloud.google.com/security/secret-manager?project=learninglab-478822
- **IAM & Admin**: https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822

---

## Project Details

- **Project ID**: `learninglab-478822`
- **Project Number**: `180424126672`
- **Region**: `us-central1` (or `australia-southeast1` if preferred)
- **Service Name**: `learninglab`
- **Service URL**: `https://learninglab-180424126672.us-central1.run.app`
- **Custom Domain**: `https://learninglab.tbsdigitallabs.com`

---

## Related Documentation

- [Environment Setup](./env-setup.md)
- [Authentication Setup](./authentication-setup.md)
- [DNS Configuration](./dns-configuration.md)
- [Deployment Troubleshooting](./deployment-troubleshooting.md)

