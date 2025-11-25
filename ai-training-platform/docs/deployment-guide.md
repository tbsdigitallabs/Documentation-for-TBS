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
  --set-env-vars "NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com" \
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
  --set-env-vars="NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com" \
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

