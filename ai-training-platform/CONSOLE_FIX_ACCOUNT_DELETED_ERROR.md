# Fix "Account deleted" Error - Cloud Console Steps

## Problem
Cloud Run source deployments fail with:
```
Account deleted: 281475646085895
could not resolve source: Get "https://storage.googleapis.com/storage/v1/b/run-sources-learninglab-478822-australia-southeast1/..."
```

## Solution: Grant Storage Permissions via Console

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

## Alternative: Fix via IAM & Admin

### Option A: Service Account Permissions
1. Go to [IAM & Admin](https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822)
2. Find service account: `180424126672@cloudbuild.gserviceaccount.com`
3. Click the **pencil icon** (Edit)
4. Click **"Add Another Role"**
5. Select: **Storage Object Admin**
6. Click **"Save"**

Repeat for: `learninglab-run@learninglab-478822.iam.gserviceaccount.com`

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
gcloud run deploy learninglab --source . --region australia-southeast1
```

Or trigger a deployment via the Cloud Build trigger.

