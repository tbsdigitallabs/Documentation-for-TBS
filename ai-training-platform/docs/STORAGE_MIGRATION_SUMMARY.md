# Storage Migration Summary

## What Changed

The application has been migrated from ephemeral filesystem storage to persistent Google Cloud storage:

### Before
- User data: `data/users.json` (local filesystem - lost on container restart)
- Images: `public/uploads/profiles/` (local filesystem - lost on container restart)

### After
- User data: **Firestore** (persistent NoSQL database)
- Images: **Cloud Storage** (persistent object storage)

## Code Changes

### New Files
- `src/lib/firestore.ts` - Firestore adapter for user data
- `src/lib/gcs-storage.ts` - Cloud Storage adapter for images
- `docs/FIRESTORE_SETUP.md` - Setup instructions
- `docs/CLOUD_RUN_STORAGE_FIX.md` - Service account permissions guide
- `setup-firestore-storage.sh` - Setup script (Linux/Mac)
- `setup-firestore-storage.ps1` - Setup script (Windows)

### Modified Files
- `src/lib/user-store.ts` - Now uses Firestore in production, filesystem in dev
- `src/lib/file-upload.ts` - Now uses Cloud Storage in production, filesystem in dev
- All API routes updated to handle async `getUserByEmail`, `upsertUser`, `getLeaderboard`

### Dependencies Added
- `firebase-admin` - Firestore client
- `@google-cloud/storage` - Cloud Storage client

## Environment Detection

The code automatically detects the environment:
- **Production (`NODE_ENV=production`)**: Uses Firestore + Cloud Storage
- **Development**: Uses local filesystem (unless `USE_FIRESTORE=true` and `USE_CLOUD_STORAGE=true`)

## Setup Required

Before deploying, run the setup script:

**Windows:**
```powershell
.\setup-firestore-storage.ps1
```

**Linux/Mac:**
```bash
chmod +x setup-firestore-storage.sh
./setup-firestore-storage.sh
```

This will:
1. Enable Firestore and Cloud Storage APIs
2. Create Firestore database
3. Create Cloud Storage bucket
4. Grant necessary permissions to service account

## Service Account Permissions

The service account `learninglab-run@learninglab-478822.iam.gserviceaccount.com` needs:
- ✅ `roles/storage.admin` - Already has this
- ✅ `roles/datastore.user` - Will be granted by setup script

**No domain-wide delegation needed** - only required for G Suite/Workspace APIs.

## Testing

After deployment:
1. Upload a profile image - should save to Cloud Storage
2. Save profile changes - should save to Firestore
3. Refresh page - data should persist (no more data loss!)

## Rollback

If needed, you can temporarily disable Firestore/Cloud Storage by setting:
```bash
USE_FIRESTORE=false
USE_CLOUD_STORAGE=false
```

This will fall back to local filesystem (but data will still be lost on restart in Cloud Run).

