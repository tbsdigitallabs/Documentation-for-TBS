# Cloud Run Storage Fix - Service Account Permissions

## The Problem

Cloud Run has an **ephemeral filesystem**. Files written to the local filesystem (`data/users.json` and `public/uploads/profiles/`) are **lost** when:
- Container restarts
- Container scales to zero
- New revision deploys

This is why profileImage saves but disappears - it's written to ephemeral storage.

## Service Account: `learninglab-run@learninglab-478822.iam.gserviceaccount.com`

### Current Permissions (Already Have)
✅ **Secret Manager Secret Accessor** - For NextAuth secrets  
✅ **Storage Admin** - Can read/write to Cloud Storage  
✅ **Service Account User** - Can use service accounts  

### Additional Permissions Needed (For Cloud Storage)

The service account already has **Storage Admin**, which is sufficient. No additional permissions needed.

### Domain-Wide Delegation

**NOT REQUIRED** - Domain-wide delegation is only needed for:
- G Suite/Workspace API access
- Google Calendar/Drive API with user impersonation
- Admin SDK operations

For Cloud Storage, standard IAM roles are sufficient.

## Quick Fix: Use Cloud Storage

### Step 1: Create Cloud Storage Bucket

```bash
# Set variables
PROJECT_ID="learninglab-478822"
BUCKET_NAME="learninglab-storage"
REGION="us-central1"

# Create bucket
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME

# Make bucket public for image access (or use signed URLs)
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME
```

### Step 2: Update Service Account (Already Done)

The service account `learninglab-run@learninglab-478822.iam.gserviceaccount.com` already has:
- **Storage Admin** role - Can read/write to Cloud Storage

No changes needed.

### Step 3: Update Code to Use Cloud Storage

The code needs to be updated to:
1. Upload images to Cloud Storage instead of local filesystem
2. Store user data in Firestore/Cloud SQL instead of `data/users.json`

## Alternative: Use Cloud SQL or Firestore

For user data (`users.json`), consider:
- **Firestore** (NoSQL, serverless) - Recommended
- **Cloud SQL** (PostgreSQL/MySQL) - More traditional

Both require the service account to have:
- **Cloud SQL Client** (for Cloud SQL)
- **Cloud Datastore User** (for Firestore)

## Verification

Check current permissions:

```bash
gcloud projects get-iam-policy learninglab-478822 \
  --flatten="bindings[].members" \
  --filter="bindings.members:learninglab-run@learninglab-478822.iam.gserviceaccount.com" \
  --format="table(bindings.role)"
```

## Summary

**Service Account Status:** ✅ Already has correct permissions  
**Domain-Wide Delegation:** ❌ Not needed  
**Real Issue:** Ephemeral filesystem - need to migrate to Cloud Storage/Firestore

