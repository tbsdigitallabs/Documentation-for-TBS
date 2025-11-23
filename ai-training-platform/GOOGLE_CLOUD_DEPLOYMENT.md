# Google Cloud Run Deployment Guide

## Quick Start

### 1. Prerequisites

```bash
# Install Google Cloud SDK (if not installed)
# Windows: Download from https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Install beta component (for domain mappings)
# Windows CMD: Run install-gcloud-beta.bat
# PowerShell: Run install-gcloud-beta.ps1
# Or manually: gcloud components install beta

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Deploy to Cloud Run

**From the `ai-training-platform` directory:**

```bash
cd ai-training-platform

# Deploy with environment variables
gcloud run deploy learninglab \
  --source . \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production" \
  --set-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,DATABASE_URL=database-url:latest"
```

### 3. Set Up Secrets (First Time Only)

```bash
# Create secrets in Secret Manager
echo -n "180424126672-apvmt8evgneepbu2iaebijv1ko3jean1.apps.googleusercontent.com" | gcloud secrets create google-client-id --data-file=-
echo -n "YOUR_CLIENT_SECRET" | gcloud secrets create google-client-secret --data-file=-
echo -n "YOUR_NEXTAUTH_SECRET" | gcloud secrets create nextauth-secret --data-file=-
echo -n "mysql://user:pass@host:3306/db?schema=public" | gcloud secrets create database-url --data-file=-

# Grant Cloud Run access to secrets
gcloud secrets add-iam-policy-binding google-client-id --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
gcloud secrets add-iam-policy-binding google-client-secret --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
gcloud secrets add-iam-policy-binding nextauth-secret --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
gcloud secrets add-iam-policy-binding database-url --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
```

**Get your project number:**
```bash
gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)"
```

### 4. Configure Custom Domain

**Option A: Via CLI (requires beta component)**
```bash
# Install beta component first (see Prerequisites)
gcloud beta run domain-mappings create \
  --service=learninglab \
  --domain=learninglab.tbsdigitallabs.com \
  --region=australia-southeast1

# Get DNS records
gcloud beta run domain-mappings describe learninglab.tbsdigitallabs.com \
  --region=australia-southeast1 \
  --format="value(status.resourceRecords)"
```

**Option B: Via Console**
1. Go to [Cloud Run](https://console.cloud.google.com/run)
2. Click `learninglab` service
3. **Manage Custom Domains** tab
4. **Add Mapping**
5. Enter: `learninglab.tbsdigitallabs.com`
6. Note the IP addresses provided

**Configure DNS:**
- At your domain registrar (where `tbsdigitallabs.com` is managed)
- Add **A record**:
  - **Name**: `learninglab`
  - **Value**: (IP addresses from Cloud Run)
  - **TTL**: 3600

**Wait for SSL:**
- DNS propagation: 5-60 minutes
- SSL certificate: Automatic (Google-managed)

### 5. Verify Deployment

```bash
# Check service status
gcloud run services describe learninglab --region australia-southeast1

# View logs
gcloud run services logs read learninglab --region australia-southeast1 --limit 50

# Test the service
curl https://learninglab.tbsdigitallabs.com
```

## Continuous Deployment from GitHub

### Set Up Cloud Build Trigger

1. **Connect Repository:**
   - Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - **Create Trigger**
   - Connect GitHub repository
   - Authorize Cloud Build

2. **Configure Trigger:**
   - **Name**: `learninglab-deploy`
   - **Event**: Push to branch
   - **Branch**: `main` (or your default branch)
   - **Configuration**: Cloud Build configuration file
   - **Location**: `ai-training-platform/cloudbuild.yaml`

3. **Update cloudbuild.yaml** (if using secrets):
   - Modify to include secret references
   - See `DEPLOYMENT.md` for details

4. **Push to GitHub:**
   - Every push to `main` will trigger deployment
   - Check Cloud Build logs for status

## Environment Variables

### Option 1: Direct (Simple, less secure)
```bash
gcloud run services update learninglab \
  --region australia-southeast1 \
  --update-env-vars "GOOGLE_CLIENT_ID=your_id,GOOGLE_CLIENT_SECRET=your_secret,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,NEXTAUTH_SECRET=your_secret,DATABASE_URL=your_database_url"
```

### Option 2: Secret Manager (Recommended)
```bash
# Create secrets first (see step 3 above)
gcloud run services update learninglab \
  --region australia-southeast1 \
  --update-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,DATABASE_URL=database-url:latest"
```

## Troubleshooting

### Build Fails
```bash
# Check build logs
gcloud builds list --limit 5
gcloud builds log BUILD_ID
```

### Service Won't Start
```bash
# Check service logs
gcloud run services logs read learninglab --region australia-southeast1 --limit 100
```

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Cloud Run IPs
- For Cloud SQL, use Cloud SQL Proxy or Private IP

### Domain Not Working
- Verify DNS records are correct: `nslookup learninglab.tbsdigitallabs.com`
- Check domain mapping in Cloud Run console
- Wait for DNS propagation (can take up to 48 hours)

## Useful Commands

```bash
# List services
gcloud run services list

# Update service
gcloud run services update learninglab --region australia-southeast1

# Delete service
gcloud run services delete learninglab --region australia-southeast1

# View service details
gcloud run services describe learninglab --region australia-southeast1

# Stream logs
gcloud run services logs tail learninglab --region australia-southeast1
```

## Cost Considerations

- Cloud Run charges per request and compute time
- Free tier: 2 million requests/month, 360,000 GB-seconds
- Typical small app: ~$5-20/month
- Monitor usage in [Cloud Console](https://console.cloud.google.com/run)

