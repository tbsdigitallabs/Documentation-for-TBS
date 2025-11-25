# Deployment Troubleshooting Guide

## Fix "Account deleted" Error

### Problem
Cloud Run source deployments fail with error:
```
Account deleted: 281475646085895
could not resolve source: Get "https://storage.googleapis.com/storage/v1/b/run-sources-learninglab-478822-australia-southeast1/..."
```

### Root Cause
The storage bucket `run-sources-learninglab-478822-australia-southeast1` is trying to use a deleted service account (`180424126672-compute@developer.gserviceaccount.com`).

### Solution Options

You can fix this issue using either the **Cloud Console** (easier) or **gcloud CLI** (faster for admins).

---

## Option 1: Fix via Cloud Console (Recommended)

### Step 1: Navigate to Cloud Storage
1. Go to [Cloud Storage Browser](https://console.cloud.google.com/storage/browser?project=learninglab-478822)
2. Find bucket: `run-sources-learninglab-478822-australia-southeast1`
3. Click on the bucket name

### Step 2: Open Permissions Tab
1. Click the **"Permissions"** tab at the top
2. You'll see a list of principals and their roles

### Step 3: Add Cloud Build Service Account
1. Click **"Grant Access"** button (or **"Add Principal"**)
2. In **"New principals"** field, enter:
   ```
   180424126672@cloudbuild.gserviceaccount.com
   ```
3. In **"Select a role"** dropdown, choose:
   - **Storage** → **Storage Object Admin** (`roles/storage.objectAdmin`)
4. Click **"Save"**

### Step 4: Add Cloud Run Service Account
1. Click **"Grant Access"** again
2. In **"New principals"** field, enter:
   ```
   learninglab-run@learninglab-478822.iam.gserviceaccount.com
   ```
3. In **"Select a role"** dropdown, choose:
   - **Storage** → **Storage Object Admin** (`roles/storage.objectAdmin`)
4. Click **"Save"**

### Step 5: Verify Permissions
You should now see both service accounts in the permissions list:
- `180424126672@cloudbuild.gserviceaccount.com` - Storage Object Admin
- `learninglab-run@learninglab-478822.iam.gserviceaccount.com` - Storage Object Admin

### Step 6: Test Deployment
1. Go to [Cloud Run Services](https://console.cloud.google.com/run?project=learninglab-478822)
2. Click on service: **learninglab**
3. Click **"Edit & Deploy New Revision"**
4. Click **"Deploy"** to test

---

## Option 2: Fix via gcloud CLI (Admin)

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

---

## Quick Fix Command (All-in-One)

For admins with proper permissions:
```bash
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

---

## Required Permissions

Admin needs:
- `roles/storage.admin` - To manage buckets
- `roles/iam.serviceAccountAdmin` - To manage service accounts
- `roles/compute.admin` - To enable Compute Engine API

---

## Project Details

- **Project ID:** `learninglab-478822`
- **Project Number:** `180424126672`
- **Region:** `australia-southeast1` (or `us-central1` if deployed there)
- **Bucket:** `run-sources-learninglab-478822-australia-southeast1`

## Service Accounts Involved

- `180424126672@cloudbuild.gserviceaccount.com` - Cloud Build
- `learninglab-run@learninglab-478822.iam.gserviceaccount.com` - Cloud Run
- `180424126672-compute@developer.gserviceaccount.com` - Compute Engine (may be deleted)

---

## Quick Links

- **Storage Bucket:** https://console.cloud.google.com/storage/browser/run-sources-learninglab-478822-australia-southeast1?project=learninglab-478822
- **IAM & Admin:** https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822
- **Cloud Run:** https://console.cloud.google.com/run?project=learninglab-478822
- **Cloud Build:** https://console.cloud.google.com/cloud-build?project=learninglab-478822

---

## What This Fixes

After granting these permissions:
- ✅ Cloud Run source deployments will work
- ✅ `gcloud run deploy --source` commands will succeed
- ✅ Auto-deployment triggers will be able to deploy
- ✅ No more "Account deleted" errors

---

## Verification

After fixing, test with:
```bash
cd ai-training-platform
gcloud run deploy learninglab --source . --region us-central1
```

Or trigger a deployment via the Cloud Build trigger.

