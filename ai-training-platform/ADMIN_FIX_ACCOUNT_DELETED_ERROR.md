# Fix "Account deleted" Error - Admin Steps

## Problem
Cloud Run source deployments fail with error:
```
Account deleted: 281475646085895
could not resolve source: Get "https://storage.googleapis.com/storage/v1/b/run-sources-learninglab-478822-australia-southeast1/..."
```

## Root Cause
The storage bucket `run-sources-learninglab-478822-australia-southeast1` is trying to use a deleted service account (`180424126672-compute@developer.gserviceaccount.com`).

## Solution Steps

### Step 1: Verify Service Account Status
```bash
# Check if compute service account exists
gcloud iam service-accounts describe 180424126672-compute@developer.gserviceaccount.com \
  --project=learninglab-478822
```

**If it doesn't exist**, proceed to Step 2.

### Step 2: Recreate Compute Service Account (if needed)
```bash
# Enable Compute Engine API (creates default service account)
gcloud services enable compute.googleapis.com --project=learninglab-478822

# Or create service account manually
gcloud iam service-accounts create compute \
  --display-name="Compute Engine default service account" \
  --project=learninglab-478822 \
  --description="Default Compute Engine service account"
```

### Step 3: Grant Storage Permissions
```bash
# Grant storage access to Cloud Build service account
gcloud storage buckets add-iam-policy-binding \
  gs://run-sources-learninglab-478822-australia-southeast1 \
  --member="serviceAccount:180424126672@cloudbuild.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Grant storage access to Cloud Run service account
gcloud storage buckets add-iam-policy-binding \
  gs://run-sources-learninglab-478822-australia-southeast1 \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### Step 4: Verify Bucket Permissions
```bash
# Check current permissions
gcloud storage buckets get-iam-policy \
  gs://run-sources-learninglab-478822-australia-southeast1
```

### Step 5: Alternative - Recreate Bucket (if Step 3 doesn't work)
```bash
# Delete old bucket (if safe to do so)
gcloud storage buckets delete gs://run-sources-learninglab-478822-australia-southeast1

# Recreate with proper permissions
gcloud storage buckets create gs://run-sources-learninglab-478822-australia-southeast1 \
  --location=australia-southeast1 \
  --project=learninglab-478822

# Grant permissions
gcloud storage buckets add-iam-policy-binding \
  gs://run-sources-learninglab-478822-australia-southeast1 \
  --member="serviceAccount:180424126672@cloudbuild.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

gcloud storage buckets add-iam-policy-binding \
  gs://run-sources-learninglab-478822-australia-southeast1 \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### Step 6: Test Deployment
```bash
cd ai-training-platform
gcloud run deploy learninglab \
  --source . \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000
```

## Required Permissions
Admin needs:
- `roles/storage.admin` - To manage buckets
- `roles/iam.serviceAccountAdmin` - To manage service accounts
- `roles/compute.admin` - To enable Compute Engine API

## Project Details
- **Project ID:** `learninglab-478822`
- **Project Number:** `180424126672`
- **Region:** `australia-southeast1`
- **Bucket:** `run-sources-learninglab-478822-australia-southeast1`

## Service Accounts Involved
- `180424126672@cloudbuild.gserviceaccount.com` - Cloud Build
- `learninglab-run@learninglab-478822.iam.gserviceaccount.com` - Cloud Run
- `180424126672-compute@developer.gserviceaccount.com` - Compute Engine (may be deleted)

## Quick Fix Command (All-in-One)
```bash
# Run as admin with proper permissions
PROJECT_ID="learninglab-478822"
BUCKET="run-sources-learninglab-478822-australia-southeast1"

# Grant permissions to both service accounts
gcloud storage buckets add-iam-policy-binding gs://$BUCKET \
  --member="serviceAccount:180424126672@cloudbuild.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

gcloud storage buckets add-iam-policy-binding gs://$BUCKET \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

