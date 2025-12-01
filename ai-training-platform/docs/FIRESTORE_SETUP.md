# Firestore and Cloud Storage Setup Guide

## Overview

The application now uses:
- **Firestore** for user data (profiles, XP, completed modules, cosmetic loadout)
- **Cloud Storage** for uploaded images (profile pictures, avatars)

This replaces the ephemeral filesystem storage that was causing data loss in Cloud Run.

## Prerequisites

1. Google Cloud Project: `learninglab-478822`
2. Service Account: `learninglab-run@learninglab-478822.iam.gserviceaccount.com`
3. Required APIs enabled:
   - Firestore API
   - Cloud Storage API

## Step 1: Enable Required APIs

```bash
gcloud services enable firestore.googleapis.com --project=learninglab-478822
gcloud services enable storage.googleapis.com --project=learninglab-478822
```

Or via Console:
- [Enable Firestore API](https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=learninglab-478822)
- [Enable Cloud Storage API](https://console.cloud.google.com/apis/library/storage-component.googleapis.com?project=learninglab-478822)

## Step 2: Create Firestore Database

1. Go to [Firestore Console](https://console.cloud.google.com/firestore?project=learninglab-478822)
2. Click **"Create Database"**
3. Select **Native mode** (not Datastore mode)
4. Choose location: **us-central** (or your preferred region)
5. Click **"Create"**

**Note:** Firestore will automatically create the `users` collection when the first user is saved.

## Step 3: Create Cloud Storage Bucket

```bash
# Set variables
PROJECT_ID="learninglab-478822"
BUCKET_NAME="learninglab-storage"
REGION="us-central1"

# Create bucket
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME

# Make bucket publicly readable for images
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

# Set CORS for web access (optional, for direct browser uploads)
gsutil cors set cors.json gs://$BUCKET_NAME
```

Create `cors.json`:
```json
[
  {
    "origin": ["https://learninglab.tbsdigitallabs.com"],
    "method": ["GET", "POST", "PUT"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

Or via Console:
1. Go to [Cloud Storage Console](https://console.cloud.google.com/storage?project=learninglab-478822)
2. Click **"Create Bucket"**
3. Name: `learninglab-storage`
4. Location: `us-central1`
5. Access: **Public** (or use signed URLs for private)
6. Click **"Create"**

## Step 4: Verify Service Account Permissions

The service account `learninglab-run@learninglab-478822.iam.gserviceaccount.com` should already have:
- ✅ **Storage Admin** - For Cloud Storage access
- ✅ **Cloud Datastore User** - For Firestore access (may need to add)

If Firestore access is missing, add it:

```bash
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/datastore.user"
```

## Step 5: Environment Variables

No additional environment variables needed! The code uses:
- **Application Default Credentials (ADC)** in Cloud Run - automatically available via service account
- **GCP_PROJECT_ID** - defaults to `learninglab-478822` if not set
- **GCS_BUCKET_NAME** - defaults to `learninglab-storage` if not set

Optional (for local development):
```bash
# .env.local
GCP_PROJECT_ID=learninglab-478822
GCS_BUCKET_NAME=learninglab-storage
USE_FIRESTORE=true  # Force Firestore in local dev
USE_CLOUD_STORAGE=true  # Force Cloud Storage in local dev
```

## Step 6: Deploy

The code automatically detects the environment:
- **Production (NODE_ENV=production)**: Uses Firestore + Cloud Storage
- **Development**: Uses local filesystem (unless `USE_FIRESTORE=true`)

Just deploy as normal - the build will include the new dependencies.

## Verification

After deployment:

1. **Check Firestore:**
   - Go to [Firestore Console](https://console.cloud.google.com/firestore?project=learninglab-478822)
   - You should see a `users` collection after first profile save

2. **Check Cloud Storage:**
   - Go to [Cloud Storage Console](https://console.cloud.google.com/storage/browser/learninglab-storage?project=learninglab-478822)
   - You should see a `profiles/` folder after first image upload

3. **Test Profile Save:**
   - Upload a profile image
   - Check that it persists after page refresh
   - Check Firestore for user data
   - Check Cloud Storage for image file

## Troubleshooting

### "Permission denied" errors
- Verify service account has `roles/datastore.user` for Firestore
- Verify service account has `roles/storage.admin` for Cloud Storage

### Images not displaying
- Check bucket is publicly readable: `gsutil iam get gs://learninglab-storage`
- Verify CORS is configured if uploading from browser

### Firestore not saving
- Check Firestore database is created in Native mode
- Verify API is enabled: `gcloud services list --enabled | grep firestore`

## Migration Notes

- Existing local data (`data/users.json`) will not be automatically migrated
- Users will start fresh in Firestore
- Old uploaded images in `public/uploads/` will not be migrated to Cloud Storage
- New uploads will go to Cloud Storage automatically

