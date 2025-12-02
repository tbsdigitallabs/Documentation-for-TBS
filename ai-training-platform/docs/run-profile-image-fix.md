# Running Profile Image Fix Script in Cloud Run

This guide walks you through running the one-time profile image fix script in your Cloud Run deployment.

## Overview

The script fixes broken profile images for all users by:
1. Finding users with broken/missing profile images
2. Generating new DiceBear avatars using their email as seed
3. Updating their profile images in Firestore

## Step 1: Commit and Deploy the Endpoint

The endpoint is already included in the codebase at:
```
src/app/api/admin/fix-profile-images/route.ts
```

**First, commit the new files:**

```bash
git add src/app/api/admin/fix-profile-images/ docs/run-profile-image-fix.md
git commit -m "Add profile image fix endpoint"
git push origin master
```

**Then deploy your application to Cloud Run:**

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

Or if you have auto-deployment set up, just push to master:

```bash
git add .
git commit -m "Add profile image fix endpoint"
git push origin master
```

## Step 2: Run the Script

Once deployed, call the endpoint:

### Option A: Using PowerShell (Windows) - Recommended

```powershell
$response = Invoke-RestMethod -Uri "https://learninglab.tbsdigitallabs.com/api/admin/fix-profile-images" -Method POST -ContentType "application/json"
$response | ConvertTo-Json -Depth 10
```

**Note:** If you get a 404 error, the endpoint hasn't been deployed yet. Wait for the Cloud Build to complete (usually 2-3 minutes after pushing to master).

### Option B: Using curl (with Content-Length header)

```bash
curl -X POST https://learninglab.tbsdigitallabs.com/api/admin/fix-profile-images -H "Content-Type: application/json" -H "Content-Length: 0"
```

### Option C: Using Browser/Postman

1. Open your browser or Postman
2. Make a POST request to: `https://learninglab.tbsdigitallabs.com/api/admin/fix-profile-images`
3. Set Content-Type header to `application/json`
4. View the response JSON

## Step 3: Check the Results

The endpoint will return a JSON response like:

```json
{
  "message": "Profile images fixed successfully. This endpoint can now be safely deleted.",
  "success": true,
  "summary": {
    "fixed": 5,
    "skipped": 10,
    "errors": 0,
    "total": 15
  },
  "fixedUsers": ["user1@example.com", "user2@example.com", ...],
  "errors": []
}
```

## Step 4: Verify in Cloud Run Logs

1. Go to [Cloud Run Console](https://console.cloud.google.com/run?project=learninglab-478822)
2. Click on `learninglab` service
3. Check the "Logs" tab
4. Look for messages like:
   - `🚀 Starting profile image fix script...`
   - `🔍 Scanning for users with broken profile images...`
   - `✅ Updated profile image: ...`
   - `📊 Summary:`

## Step 5: Verify in Firestore

1. Go to [Firestore Console](https://console.cloud.google.com/firestore?project=learninglab-478822)
2. Check the `users` collection
3. Verify that users now have `profileImage` fields with DiceBear URLs

## Step 6: Clean Up (Optional)

After verifying the script worked:

1. **Delete the endpoint file:**
   ```bash
   git rm src/app/api/admin/fix-profile-images/route.ts
   git commit -m "Remove profile image fix endpoint (already run)"
   git push origin master
   ```

2. **Or leave it** - The endpoint is safe to keep. It will return early on subsequent calls since it's already been marked as completed in Firestore.

## Safety Features

- **Idempotent**: Safe to call multiple times. After the first successful run, it will return early.
- **Flagged in Firestore**: Uses `admin_flags/profile-images-fixed` document to track completion.
- **Non-destructive**: Only updates users with broken images, skips users with valid images.

## Troubleshooting

### Error: "Failed to fix profile images"

1. Check Cloud Run logs for detailed error messages
2. Verify service account has `roles/datastore.user` permission
3. Check that Firestore is accessible from Cloud Run

### No users found

- This is normal if you're running locally (uses local filesystem)
- In production (Cloud Run), it will access Firestore automatically

### Endpoint returns "already completed"

- The script has already been run successfully
- Check Firestore `admin_flags` collection to see the completion flag
- You can safely delete the endpoint file

