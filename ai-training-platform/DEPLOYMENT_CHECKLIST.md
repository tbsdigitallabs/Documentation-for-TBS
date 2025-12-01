# Deployment Checklist for Firestore/Cloud Storage

## Prerequisites

Before redeploying, ensure the infrastructure is set up:

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
   - Bucket should exist and be publicly readable

3. **Service Account Permissions**:
   - Go to: https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822
   - Find `learninglab-run@learninglab-478822.iam.gserviceaccount.com`
   - Should have:
     - `roles/datastore.user`
     - `roles/storage.objectAdmin`
     - `roles/secretmanager.secretAccessor`

### Step 3: Redeploy Application

The code changes require a redeploy to take effect. Choose one:

**Option A: Auto-deploy (if Cloud Build trigger is set up)**
```bash
git add .
git commit -m "fix: align Firestore/Cloud Storage with Cloud Run ADC pattern"
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

## Troubleshooting

### If images still don't persist:

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

